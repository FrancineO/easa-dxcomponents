import { useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import { getView } from '../map/view';
import type ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import * as rasterFunctionUtils from '@arcgis/core/layers/support/rasterFunctionUtils';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';

export const useHighlightIntersectingLanduse = (flightVolume: FlightVolume | null) => {
  const highlightIntersectingLanduse = useCallback(() => {
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

    const area = geometryEngine.planarArea(operationalAndGroundRiskGeometry);
    // eslint-disable-next-line no-console
    console.log('area highlight', area);

    landuseHighlightLayer.rasterFunction = rasterFunctionUtils.clip({
      geometry: operationalAndGroundRiskGeometry,
      keepOutside: false
    });
  }, [flightVolume]);

  return { highlightIntersectingLanduse };
};

export default useHighlightIntersectingLanduse;
