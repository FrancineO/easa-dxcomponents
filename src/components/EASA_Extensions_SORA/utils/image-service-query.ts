import Extent from '@arcgis/core/geometry/Extent';
import Polygon from '@arcgis/core/geometry/Polygon';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import * as projection from '@arcgis/core/geometry/projection';
import {
  getTileSizeMeters,
  insetSharedTileEdges,
  listTileBounds,
  mergeStatistics,
  SAFE_IMAGE_DIMENSION,
  sumHistogramCounts,
  type StatLike,
  type TileBounds,
} from './image-service-tiles';

export type PixelSize = {
  x: number;
  y: number;
  spatialReference?: { wkid: number };
};

const FALLBACK_LANDUSE_PIXEL_SIZE_METERS = 50;

const mapPool = async <T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> => {
  if (items.length === 0) return [];
  const results: R[] = new Array(items.length);
  let next = 0;

  const worker = async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await fn(items[index]);
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () =>
      worker(),
    ),
  );
  return results;
};

const asPolygon = (geometry: __esri.Geometry | null): __esri.Polygon | null => {
  if (!geometry) return null;
  if (geometry.type === 'polygon') return geometry as __esri.Polygon;
  if (geometry.type === 'extent') {
    return Polygon.fromExtent(geometry as __esri.Extent);
  }
  return null;
};

const projectGeometry = async (
  geometry: __esri.Polygon,
  outSr: __esri.SpatialReference,
): Promise<__esri.Polygon> => {
  if (geometry.spatialReference?.wkid === outSr.wkid) {
    return geometry;
  }
  await projection.load();
  const projected = projection.project(geometry, outSr);
  if (Array.isArray(projected)) {
    const parts = projected
      .map((part) => asPolygon(part as __esri.Geometry))
      .filter((part): part is __esri.Polygon => part !== null);
    if (parts.length === 0) {
      throw new Error('Unable to project geometry for image-service query.');
    }
    if (parts.length === 1) return parts[0];
    return geometryEngine.union(parts) as __esri.Polygon;
  }
  const polygon = asPolygon(projected as __esri.Geometry);
  if (!polygon) {
    throw new Error('Unable to project geometry for image-service query.');
  }
  return polygon;
};

/**
 * Split a polygon into pieces whose bounding boxes fit under the image
 * service's max export size at the given pixel size. Each piece is the
 * intersection of the input with one tile, so empty tiles are dropped.
 */
export const getGeometryTiles = async (
  geometry: __esri.Polygon,
  pixelSize: PixelSize,
  maxDimension = SAFE_IMAGE_DIMENSION,
): Promise<__esri.Polygon[]> => {
  const serviceSr = new SpatialReference({
    wkid:
      pixelSize.spatialReference?.wkid ??
      geometry.spatialReference?.wkid ??
      102100,
  });
  const projected = await projectGeometry(geometry, serviceSr);
  const extent = projected.extent;
  if (!extent) return [geometry];

  const full: TileBounds = {
    xmin: extent.xmin,
    ymin: extent.ymin,
    xmax: extent.xmax,
    ymax: extent.ymax,
  };
  const tileWidth = getTileSizeMeters(pixelSize.x, maxDimension);
  const tileHeight = getTileSizeMeters(pixelSize.y, maxDimension);
  const bounds = listTileBounds(
    full.xmin,
    full.ymin,
    full.xmax,
    full.ymax,
    tileWidth,
    tileHeight,
  );

  if (bounds.length <= 1) {
    return [geometry];
  }

  const tiles: __esri.Polygon[] = [];
  for (const bound of bounds) {
    const inset = insetSharedTileEdges(bound, full, pixelSize.x, pixelSize.y);
    if (!inset) continue;

    const tilePolygon = Polygon.fromExtent(
      new Extent({
        ...inset,
        spatialReference: serviceSr,
      }),
    );
    const intersection = asPolygon(
      geometryEngine.intersect(projected, tilePolygon) as __esri.Geometry,
    );
    if (!intersection) continue;
    const area = Math.abs(geometryEngine.planarArea(intersection));
    if (!area) continue;
    tiles.push(intersection);
  }

  if (tiles.length === 0) {
    throw new Error(
      'Unable to tile geometry for image-service query; no non-empty tile intersections.',
    );
  }
  return tiles;
};

export const computeStatisticsHistogramsTiled = async (
  layer: __esri.ImageryLayer,
  geometry: __esri.Polygon,
  pixelSize: PixelSize,
  concurrency = 4,
) => {
  const tiles = await getGeometryTiles(geometry, pixelSize);
  const results = await mapPool(tiles, concurrency, (tile) =>
    layer.computeStatisticsHistograms({
      geometry: tile,
      pixelSize,
    }),
  );

  const merged = mergeStatistics(
    results
      .map((result) => result.statistics?.[0])
      .filter((stat): stat is StatLike => Boolean(stat)),
  );

  return {
    statistics: merged ? [merged] : [],
    histograms: results[0]?.histograms ?? [],
  };
};

export const computeHistogramsTiled = async (
  layer: __esri.ImageryLayer,
  params: {
    geometry: __esri.Polygon;
    // Prefer a per-tile factory when the raster function embeds a Clip:
    // clipping the full path would recreate the size-limit error.
    rasterFunction?:
      | __esri.RasterFunction
      | ((tile: __esri.Polygon) => __esri.RasterFunction);
    pixelSize?: PixelSize;
  },
  concurrency = 4,
) => {
  const pixelSize: PixelSize = params.pixelSize ?? {
    x: layer.serviceRasterInfo?.pixelSize?.x ?? FALLBACK_LANDUSE_PIXEL_SIZE_METERS,
    y: layer.serviceRasterInfo?.pixelSize?.y ?? FALLBACK_LANDUSE_PIXEL_SIZE_METERS,
    spatialReference: {
      wkid:
        layer.serviceRasterInfo?.spatialReference?.wkid ??
        layer.spatialReference?.wkid ??
        102100,
    },
  };

  const tiles = await getGeometryTiles(params.geometry, pixelSize);
  const results = await mapPool(tiles, concurrency, (tile) => {
    const rasterFunction =
      typeof params.rasterFunction === 'function'
        ? params.rasterFunction(tile)
        : params.rasterFunction;
    return layer.computeHistograms({
      geometry: tile,
      rasterFunction,
    });
  });

  return {
    histograms: [
      {
        ...(results[0]?.histograms?.[0] ?? {}),
        counts: sumHistogramCounts(
          results.map((result) => result.histograms?.[0]?.counts),
        ),
      },
    ],
  };
};
