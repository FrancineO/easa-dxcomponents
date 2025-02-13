import { useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import { getView } from '../View';
import type ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import * as rasterFunctionUtils from '@arcgis/core/layers/support/rasterFunctionUtils';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';

export const useApplySpatialFilter = (flightVolume: FlightVolume | null) => {
  const applySpatialFilter = useCallback(() => {
    const landuseHighlightLayer = getView().map?.findLayerById(
      LayerId.landuseHighlight
    ) as ImageryLayer;
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
    getView().map?.reorder(landuseHighlightLayer, getView().map.layers.length - 1);

    const operationalAndGroundRiskGeometry = geometryEngine.union([
      flightVolume?.flightGeography?.geometry as __esri.Polygon,
      flightVolume?.contingencyVolume?.geometry as __esri.Polygon,
      flightVolume?.groundRiskVolume?.geometry as __esri.Polygon
    ]) as __esri.Polygon;

    landuseHighlightLayer.rasterFunction = rasterFunctionUtils.clip({
      geometry: operationalAndGroundRiskGeometry,
      keepOutside: false
    });
  }, [flightVolume]);

  return { applySpatialFilter };
};

export default useApplySpatialFilter;
