import { useState, useCallback } from 'react';
import { LayerId, type FlightVolume } from '../types';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
import { getView } from '../map/view';
import {
  getLanduseCountsByCode,
  getLanduseHistogramRasterFunctionJson,
  landusePopDensityLookup,
} from '../renderers';

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

      const rasterFunction = new RasterFunction(
        getLanduseHistogramRasterFunctionJson(),
      ) as __esri.RasterFunction;

      const [landuseHistograms, adjacentAreaLanduseHistograms] =
        await Promise.all([
          landuseLayer?.computeHistograms({ geometry, rasterFunction }),
          landuseLayer?.computeHistograms({
            geometry: adjacentAreaGeometry,
            rasterFunction,
          }),
        ]);

      // A class with a null density is drawn and legended but never reported
      // as intersecting, because null is falsy. 1221 is the only one today.
      // Pending a decision from EASA on whether it should be reported.
      const hasDensity = (landuseClass: number) =>
        Boolean(landusePopDensityLookup[landuseClass]);

      const intersectedLanduseClasses = [
        ...getLanduseCountsByCode(
          landuseHistograms.histograms?.[0]?.counts,
        ).keys(),
      ].filter(hasDensity);

      const adjacentAreaIntersectedLanduseClasses = [
        ...getLanduseCountsByCode(
          adjacentAreaLanduseHistograms.histograms?.[0]?.counts,
        ).keys(),
      ].filter(hasDensity);

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
