import { useState, useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import { getView } from '../map/view';

const useGetIntersectingLanduses = (flightVolumes: FlightVolume[] | null) => {
  const [intersectingLanduseClasses, setIntersectingLanduseClasses] = useState<
    number[]
  >([]);
  const [
    intersectingAdjacentAreaLanduseClasses,
    setIntersectingAdjacentAreaLanduseClasses,
  ] = useState<number[]>([]);

  const queryIntersectingLanduses = useCallback(async () => {
    if (!flightVolumes || flightVolumes.length === 0) {
      setIntersectingLanduseClasses([]);
      setIntersectingAdjacentAreaLanduseClasses([]);
      return;
    }

    // Check that all flight volumes have the required properties
    const hasValidVolumes = flightVolumes.every(
      (fv) =>
        fv.flightGeography &&
        fv.contingencyVolume &&
        fv.groundRiskVolume &&
        fv.adjacentArea,
    );

    if (!hasValidVolumes) {
      setIntersectingLanduseClasses([]);
      setIntersectingAdjacentAreaLanduseClasses([]);
      return;
    }

    // Collect all geometries from all flight volumes
    const allGeometries: __esri.Polygon[] = [];
    const allAdjacentAreaGeometries: __esri.Polygon[] = [];

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

      if (flightVolume.adjacentArea?.geometry) {
        allAdjacentAreaGeometries.push(
          flightVolume.adjacentArea.geometry as __esri.Polygon,
        );
      }
    }

    if (allGeometries.length === 0 || allAdjacentAreaGeometries.length === 0) {
      setIntersectingLanduseClasses([]);
      setIntersectingAdjacentAreaLanduseClasses([]);
      return;
    }

    // Union all geometries
    const geometry = geometryEngine.union(allGeometries) as __esri.Polygon;
    const adjacentAreaGeometry = geometryEngine.union(
      allAdjacentAreaGeometries,
    ) as __esri.Polygon;

    getView().when(async () => {
      const landuseLayer = getView().map?.findLayerById(
        LayerId.landuse,
      ) as __esri.ImageryLayer;

      const landuseHistograms = await landuseLayer?.computeHistograms({
        geometry,
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

      const adjacentAreaLanduseHistograms =
        await landuseLayer?.computeHistograms({
          geometry: adjacentAreaGeometry,
        });

      const adjacentAreaCounts =
        adjacentAreaLanduseHistograms.histograms?.[0]?.counts;

      const adjacentAreaIntersectedLanduseClasses: number[] = [];
      if (adjacentAreaCounts) {
        adjacentAreaCounts.forEach((count: number, landuseClass: number) => {
          if (count > 0) {
            adjacentAreaIntersectedLanduseClasses.push(landuseClass);
          }
        });
      }

      setIntersectingLanduseClasses(intersectedLanduseClasses);
      setIntersectingAdjacentAreaLanduseClasses(
        adjacentAreaIntersectedLanduseClasses,
      );
    });
  }, [flightVolumes]);

  return {
    intersectingLanduseClasses,
    intersectingAdjacentAreaLanduseClasses,
    queryIntersectingLanduses,
  };
};

export default useGetIntersectingLanduses;
