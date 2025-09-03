import { useState, useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import { getView } from '../map/view';

const useGetIntersectingGeozones = (flightVolumes: FlightVolume[] | null) => {
  const [intersectingGeozones, setIntersectingGeozones] = useState<
    __esri.Graphic[]
  >([]);

  const queryIntersectingGeozones = useCallback(async () => {
    if (!flightVolumes || flightVolumes.length === 0) {
      setIntersectingGeozones([]);
      return;
    }

    // Check that all flight volumes have the required properties
    const hasValidVolumes = flightVolumes.every(
      (fv) => fv.flightGeography && fv.contingencyVolume && fv.groundRiskVolume,
    );

    if (!hasValidVolumes) {
      setIntersectingGeozones([]);
      return;
    }

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
      setIntersectingGeozones([]);
      return;
    }

    // Union all geometries
    const geometry = geometryEngine.union(allGeometries) as __esri.Polygon;

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
  }, [flightVolumes]);

  return {
    intersectingGeozones,
    queryIntersectingGeozones,
  };
};

export default useGetIntersectingGeozones;
