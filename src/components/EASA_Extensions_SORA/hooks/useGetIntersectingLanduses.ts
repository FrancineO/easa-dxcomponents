import { useState, useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import { getView } from '../map/view';

const useGetIntersectingLanduses = (flightVolume: FlightVolume | null) => {
  const [intersectingLanduseClasses, setIntersectingLanduseClasses] = useState<number[]>([]);

  const queryIntersectingLanduses = useCallback(async () => {
    if (
      !flightVolume ||
      !flightVolume.flightGeography ||
      !flightVolume.contingencyVolume ||
      !flightVolume.groundRiskVolume
    ) {
      setIntersectingLanduseClasses([]);
      return;
    }

    const geometry = geometryEngine.union([
      flightVolume.flightGeography?.geometry,
      flightVolume.contingencyVolume?.geometry,
      flightVolume.groundRiskVolume?.geometry
    ]) as __esri.Polygon;

    getView().when(async () => {
      const landuseLayer = getView().map?.findLayerById(LayerId.landuse) as __esri.ImageryLayer;
      const landuseHistograms = await landuseLayer?.computeHistograms({
        geometry
      });

      const intersectedLanduseClasses: number[] = [];
      const counts = landuseHistograms.histograms?.[0]?.counts;
      if (counts) {
        counts.forEach((count: number, landuseClass: number) => {
          if (count > 0) {
            intersectedLanduseClasses.push(landuseClass);
          }
        });
      }

      setIntersectingLanduseClasses(intersectedLanduseClasses);
    });
  }, [flightVolume]);

  return {
    intersectingLanduseClasses,
    queryIntersectingLanduses
  };
};

export default useGetIntersectingLanduses;
