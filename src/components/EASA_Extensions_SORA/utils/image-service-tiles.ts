// Hosted image services reject compute* when the export would exceed
// maxImageWidth/Height (4000 on the pop-density and landuse layers). Stay
// under that to absorb rounding.
export const SAFE_IMAGE_DIMENSION = 3800;

export type TileBounds = {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
};

export type StatLike = {
  min?: number;
  max?: number;
  avg?: number | null;
  count?: number;
};

export const getTileSizeMeters = (
  pixelSize: number,
  maxDimension = SAFE_IMAGE_DIMENSION,
) => maxDimension * pixelSize;

/**
 * Cover [xmin,xmax]×[ymin,ymax] with tiles of at most tileWidth×tileHeight.
 * Adjacent tiles share an edge in these bounds; callers that query rasters
 * should inset the shared max edges by half a pixel so cell centres are not
 * counted twice.
 */
export const listTileBounds = (
  xmin: number,
  ymin: number,
  xmax: number,
  ymax: number,
  tileWidth: number,
  tileHeight: number,
): TileBounds[] => {
  const width = xmax - xmin;
  const height = ymax - ymin;
  if (width <= 0 || height <= 0) return [];
  if (width <= tileWidth && height <= tileHeight) {
    return [{ xmin, ymin, xmax, ymax }];
  }

  const tiles: TileBounds[] = [];
  for (let x = xmin; x < xmax; x += tileWidth) {
    for (let y = ymin; y < ymax; y += tileHeight) {
      tiles.push({
        xmin: x,
        ymin: y,
        xmax: Math.min(x + tileWidth, xmax),
        ymax: Math.min(y + tileHeight, ymax),
      });
    }
  }
  return tiles;
};

/** Inset shared max edges by half a pixel; leave the extent's outer edges alone. */
export const insetSharedTileEdges = (
  tile: TileBounds,
  full: TileBounds,
  pixelSizeX: number,
  pixelSizeY: number,
): TileBounds | null => {
  const insetX = pixelSizeX / 2;
  const insetY = pixelSizeY / 2;
  const xmax = tile.xmax < full.xmax ? tile.xmax - insetX : tile.xmax;
  const ymax = tile.ymax < full.ymax ? tile.ymax - insetY : tile.ymax;
  if (xmax <= tile.xmin || ymax <= tile.ymin) return null;
  return { xmin: tile.xmin, ymin: tile.ymin, xmax, ymax };
};

export const sumHistogramCounts = (
  countArrays: Array<number[] | undefined | null>,
): number[] => {
  const merged: number[] = [];
  for (const counts of countArrays) {
    if (!counts) continue;
    for (let i = 0; i < counts.length; i += 1) {
      merged[i] = (merged[i] ?? 0) + (counts[i] ?? 0);
    }
  }
  return merged;
};

export const mergeStatistics = (stats: StatLike[]): StatLike | null => {
  const usable = stats.filter((s) => (s?.count ?? 0) > 0);
  if (usable.length === 0) return null;

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  let weightedSum = 0;
  let count = 0;

  for (const s of usable) {
    if (s.min !== undefined && s.min !== null) min = Math.min(min, s.min);
    if (s.max !== undefined && s.max !== null) max = Math.max(max, s.max);
    if (s.avg !== undefined && s.avg !== null) {
      weightedSum += s.avg * (s.count ?? 0);
    }
    count += s.count ?? 0;
  }

  return {
    min: Number.isFinite(min) ? min : undefined,
    max: Number.isFinite(max) ? max : undefined,
    avg: count ? weightedSum / count : null,
    count,
  };
};
