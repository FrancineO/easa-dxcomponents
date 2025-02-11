import { useState, useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import View from '../View';

const useGetIntersectingGeozones = (flightVolume: FlightVolume | null) => {
  const [intersectingGeozones, setIntersectingGeozones] = useState<any[]>([]);

  const queryIntersectingGeozones = useCallback(async () => {
    if (
      !flightVolume ||
      !flightVolume.flightGeography ||
      !flightVolume.adjacentArea ||
      !flightVolume.contingencyVolume ||
      !flightVolume.groundRiskVolume
    )
      return;

    const geometry = geometryEngine.union([
      flightVolume.adjacentArea?.geometry,
      flightVolume.flightGeography?.geometry,
      flightVolume.contingencyVolume?.geometry,
      flightVolume.groundRiskVolume?.geometry
    ]) as __esri.Polygon;

    const geozonesLayer = View?.map?.findLayerById(LayerId.geozones) as __esri.FeatureLayer;
    const features = await geozonesLayer?.queryFeatures({
      geometry,
      outFields: ['*'],
      spatialRelationship: 'intersects'
    });

    setIntersectingGeozones(features.features);
  }, [flightVolume]);

  return {
    intersectingGeozones,
    queryIntersectingGeozones
  };
};

export default useGetIntersectingGeozones;
