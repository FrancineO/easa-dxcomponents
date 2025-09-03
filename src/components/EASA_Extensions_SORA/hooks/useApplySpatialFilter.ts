import { useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import { getView } from '../map/view';
import type ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import * as rasterFunctionUtils from '@arcgis/core/layers/support/rasterFunctionUtils';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';

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

    landuseHighlightLayer.rasterFunction = rasterFunctionUtils.clip({
      geometry: operationalAndGroundRiskGeometry,
      keepOutside: false,
    });
  }, [flightVolumes]);

  return { highlightIntersectingLanduse };
};

export default useHighlightIntersectingLanduse;
