import { useState, useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import { getView } from '../map/view';

const useGetIntersectingGeozones = (flightVolume: FlightVolume | null) => {
  const [intersectingGeozones, setIntersectingGeozones] = useState<
    __esri.Graphic[]
  >([]);

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
      flightVolume.groundRiskVolume?.geometry,
    ]) as __esri.Polygon;

    getView().when(async () => {
      const map = getView().map;
      if (!map) return;

      // Find all geozone layers (they have IDs like geozones_961089b2b5934678966938195a745029)
      const geozoneLayers = map.layers
        .toArray()
        .filter((layer) =>
          layer.id?.startsWith(LayerId.geozones),
        ) as __esri.FeatureLayer[];

      if (geozoneLayers.length === 0) {
        setIntersectingGeozones([]);
        return;
      }

      // Query all geozone layers and combine results
      const allFeatures: __esri.Graphic[] = [];

      try {
        // Use Promise.all to query all layers concurrently
        const queryPromises = geozoneLayers.map((layer) =>
          layer.queryFeatures({
            geometry,
            outFields: ['*'],
            spatialRelationship: 'intersects',
          }),
        );

        const results = await Promise.all(queryPromises);

        // Combine all results
        results.forEach((features) => {
          if (features.features) {
            allFeatures.push(...features.features);
          }
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Error querying geozone layers:', error);
      }

      setIntersectingGeozones(allFeatures);
    });
  }, [flightVolume]);

  return {
    intersectingGeozones,
    queryIntersectingGeozones,
  };
};

export default useGetIntersectingGeozones;
