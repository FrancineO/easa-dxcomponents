import { useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import View from '../View';
import type ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import * as rasterFunctionUtils from '@arcgis/core/layers/support/rasterFunctionUtils';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';

export const useApplySpatialFilter = (flightVolume: FlightVolume | null) => {
  const applySpatialFilter = useCallback(() => {
    const landuseHighlightLayer = View.map?.findLayerById(LayerId.landuseHighlight) as ImageryLayer;
    if (!flightVolume) {
      if (landuseHighlightLayer) {
        landuseHighlightLayer.visible = false;
      }
      return;
    }

    if (!landuseHighlightLayer) {
      return;
    }

    landuseHighlightLayer.visible = true;
    View.map?.reorder(landuseHighlightLayer, View.map.layers.length - 1);

    const flightVolumeGeometry = geometryEngine.union([
      flightVolume?.flightGeography?.geometry as __esri.Polygon,
      flightVolume?.contingencyVolume?.geometry as __esri.Polygon,
      flightVolume?.groundRiskVolume?.geometry as __esri.Polygon,
      flightVolume?.adjacentArea?.geometry as __esri.Polygon
    ]) as __esri.Polygon;

    landuseHighlightLayer.rasterFunction = rasterFunctionUtils.clip({
      geometry: flightVolumeGeometry,
      keepOutside: false
    });
  }, [flightVolume]);

  return { applySpatialFilter };
};

export default useApplySpatialFilter;
