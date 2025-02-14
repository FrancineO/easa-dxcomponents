import { useState, useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import { getView } from '../map/view';

const useGetIntersectingGeozones = (flightVolume: FlightVolume | null) => {
  const [intersectingGeozones, setIntersectingGeozones] = useState<any[]>([]);

  const queryIntersectingGeozones = useCallback(async () => {
    if (
      !flightVolume ||
      !flightVolume.flightGeography ||
      !flightVolume.contingencyVolume ||
      !flightVolume.groundRiskVolume
    ) {
      setIntersectingGeozones([]);
      return;
    }

    const geometry = geometryEngine.union([
      flightVolume.flightGeography?.geometry,
      flightVolume.contingencyVolume?.geometry,
      flightVolume.groundRiskVolume?.geometry
    ]) as __esri.Polygon;

    getView().when(async () => {
      const geozonesLayer = getView().map?.findLayerById(LayerId.geozones) as __esri.FeatureLayer;
      const features = await geozonesLayer?.queryFeatures({
        geometry,
        outFields: ['*'],
        spatialRelationship: 'intersects'
      });

      setIntersectingGeozones(features.features);
    });
  }, [flightVolume]);

  return {
    intersectingGeozones,
    queryIntersectingGeozones
  };
};

export default useGetIntersectingGeozones;
