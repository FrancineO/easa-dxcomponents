import { useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import { getView } from '../map/view';
import type ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import { getLanduseRasterFunction } from '../renderers';

export const useHighlightIntersectingLanduse = (
  flightVolumes: FlightVolume[] | null,
) => {
  const highlightIntersectingLanduse = useCallback(() => {
    const landuseHighlightLayer = getView().map?.findLayerById(
      LayerId.landuseHighlight,
    ) as ImageryLayer;
    if (!flightVolumes || flightVolumes.length === 0) {
      if (landuseHighlightLayer) {
        landuseHighlightLayer.visible = false;
      }
      return;
    }

    if (!landuseHighlightLayer) {
      return;
    }

    landuseHighlightLayer.visible = true;
    getView().map?.reorder(
      landuseHighlightLayer,
      getView().map.layers.length - 1,
    );

    // Collect all geometries from all flight volumes
    const allGeometries: __esri.Polygon[] = [];

    for (const flightVolume of flightVolumes) {
      if (
        flightVolume.flightGeography?.geometry &&
        flightVolume.contingencyVolume?.geometry &&
        flightVolume.groundRiskVolume?.geometry
      ) {
        allGeometries.push(
          flightVolume.flightGeography.geometry as __esri.Polygon,
          flightVolume.contingencyVolume.geometry as __esri.Polygon,
          flightVolume.groundRiskVolume.geometry as __esri.Polygon,
        );
      }
    }

    if (allGeometries.length === 0) {
      landuseHighlightLayer.visible = false;
      return;
    }

    // Union all geometries
    const operationalAndGroundRiskGeometry = geometryEngine.union(
      allGeometries,
    ) as __esri.Polygon;

    // Build the complete raster function chain: Clip → Remap → Colormap
    const landuseRasterFunc = getLanduseRasterFunction();

    // Wrap the Remap → Colormap chain with a Clip function
    const clippedRasterFunction = {
      rasterFunction: 'Colormap',
      rasterFunctionArguments: {
        Colormap: landuseRasterFunc.rasterFunctionArguments.Colormap,
        Raster: {
          rasterFunction: 'Remap',
          rasterFunctionArguments: {
            ...landuseRasterFunc.rasterFunctionArguments.Raster
              .rasterFunctionArguments,
            Raster: {
              rasterFunction: 'Clip',
              rasterFunctionArguments: {
                ClippingGeometry: operationalAndGroundRiskGeometry,
                ClippingType: 1, // 1 = keep inside
              },
            },
          },
          variableName: 'Raster',
        },
      },
    };

    landuseHighlightLayer.rasterFunction = clippedRasterFunction as any;
  }, [flightVolumes]);

  return { highlightIntersectingLanduse };
};

export default useHighlightIntersectingLanduse;
