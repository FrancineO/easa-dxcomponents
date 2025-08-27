import { useCallback, useState, useRef } from 'react';
import { getView } from '../map/view';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import type {
  FlightVolume,
  PopulationDensity,
  ImpactedLandUse,
} from '../types';
import { landusePopDensityLookup } from '../renderers';
import _ from 'lodash';

// const pixelSizes: { maxHeight: number; resolution: number }[] = [
//   { maxHeight: 152, resolution: 200 },
//   { maxHeight: 305, resolution: 400 },
//   { maxHeight: 762, resolution: 1000 },
//   { maxHeight: 1524, resolution: 2000 },
//   { maxHeight: 3048, resolution: 4000 },
//   { maxHeight: 6096, resolution: 5000 },
//   { maxHeight: 18288, resolution: 10000 }
// ];

// const getPixelSize = (height: number) => {
const getPixelSize = () => {
  // const pixelSizeDef = pixelSizes.find(size => size.maxHeight >= height);
  // if (!pixelSizeDef) {
  return {
    x: getView().resolution,
    y: getView().resolution,
    spatialReference: {
      wkid: getView().spatialReference.wkid,
    },
  };
  // }
  // return {
  //   x: pixelSizeDef.resolution,
  //   y: pixelSizeDef.resolution,
  //   spatialReference: {
  //     wkid: getView().spatialReference.wkid
  //   }
  // };
};

export const useGetPopulationDensity = (
  flightVolume: FlightVolume | null,
  hFG: number,
  correctedLandUse?: ImpactedLandUse[] | null,
) => {
  const [populationDensity, setPopulationDensity] =
    useState<PopulationDensity | null>(null);
  const calculationInProgress = useRef(false);
  const flightVolumeRef = useRef(flightVolume);

  // Update the ref when params change
  flightVolumeRef.current = flightVolume;

  const getMaxDensity = useCallback(
    async (geometry: __esri.Polygon, layer: __esri.ImageryLayer) => {
      if (hFG < 0) {
        throw new Error(
          'Cannot calculate population density with a negative height.',
        );
      }

      // const pixelSize = getPixelSize(hFG);
      const pixelSize = getPixelSize();
      const adjacentStats = await layer.computeStatisticsHistograms({
        geometry,
        pixelSize,
      });

      if (adjacentStats.statistics[0]?.max) {
        return _.round(adjacentStats.statistics[0].max, 2);
      }
      return null;
    },
    [],
  );

  const getAvgDensity = useCallback(
    async (geometry: __esri.Polygon, layer: __esri.ImageryLayer) => {
      if (hFG < 0) {
        throw new Error(
          'Cannot calculate population density with a negative height.',
        );
      }

      // const pixelSize = getPixelSize(hFG);
      const pixelSize = getPixelSize();

      const opStats = await layer.computeStatisticsHistograms({
        geometry,
        pixelSize,
      });

      if (opStats.statistics[0]?.avg) {
        return _.round(opStats.statistics[0].avg, 2);
      }
      return null;
    },
    [],
  );

  const getOperationalAndGroundRiskGeometry = useCallback(() => {
    const currentFlightVolume = flightVolumeRef.current;

    if (
      !currentFlightVolume?.flightGeography?.geometry ||
      !currentFlightVolume?.contingencyVolume?.geometry ||
      !currentFlightVolume?.groundRiskVolume?.geometry
    ) {
      return null;
    }

    try {
      return geometryEngine.union([
        currentFlightVolume.flightGeography.geometry as __esri.Polygon,
        currentFlightVolume.contingencyVolume.geometry as __esri.Polygon,
        currentFlightVolume.groundRiskVolume.geometry as __esri.Polygon,
      ]);
    } catch (error) {
      // If geometry union fails, return null
      return null;
    }
  }, []);

  const getPopulationDensity = useCallback(
    async (layer: __esri.ImageryLayer) => {
      // Use the ref instead of the params dependency
      const currentFlightVolume = flightVolumeRef.current;

      const popDensity: PopulationDensity = {
        maxPopDensityOperationalGroundRisk: null,
        avgPopDensityAdjacentArea: null,
      };

      // Get the max density for the adjacent area
      const opAndGr = getOperationalAndGroundRiskGeometry();
      if (!opAndGr) {
        return popDensity;
      }
      const maxDensity = await getMaxDensity(opAndGr as __esri.Polygon, layer);
      popDensity.maxPopDensityOperationalGroundRisk = maxDensity;

      // Get the average density for the adjacent area
      const avgDensity = await getAvgDensity(
        currentFlightVolume?.adjacentArea?.geometry as __esri.Polygon,
        layer,
      );
      popDensity.avgPopDensityAdjacentArea = avgDensity;

      return popDensity;
    },
    [],
  );

  const getLanduseMaxPopDensityOperationalGroundrisk = useCallback(
    async (layer: __esri.ImageryLayer) => {
      if (hFG < 0) {
        throw new Error(
          'Cannot calculate population density with a negative height.',
        );
      }

      // get the max population density in the Operational Ground Risk area
      const opAndGr = getOperationalAndGroundRiskGeometry();
      if (!opAndGr) {
        return null;
      }
      // const pixelSize = getPixelSize(hFG);
      const pixelSize = getPixelSize();
      const landuseHistograms = await layer.computeHistograms({
        geometry: opAndGr as __esri.Polygon,
        pixelSize,
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
      // Use corrected values if available, otherwise use default lookup
      const densities = intersectedLanduseClasses.map((index) => {
        if (correctedLandUse) {
          const corrected = correctedLandUse.find(
            (lu) => lu.Code === index.toString(),
          );
          if (corrected && corrected.OverridePopulationDensity !== null) {
            return corrected.OverridePopulationDensity;
          }
        }
        return landusePopDensityLookup[index];
      });

      // Filter out undefined/null values and ensure we have valid densities
      const validDensities = densities.filter(
        (density) => density !== undefined && density !== null,
      );

      if (validDensities.length === 0) {
        return null;
      }

      return Math.max(...validDensities);
    },
    [correctedLandUse],
  );

  const calculatePopDensities = useCallback(async () => {
    // Use the ref instead of the params dependency
    const currentFlightVolume = flightVolumeRef.current;

    // Prevent multiple simultaneous calculations
    if (calculationInProgress.current) return;

    // Reset states if no params
    if (!currentFlightVolume) {
      setPopulationDensity(null);
      return;
    }

    const {
      flightGeography,
      contingencyVolume,
      groundRiskVolume,
      adjacentArea,
    } = currentFlightVolume;
    if (
      !flightGeography ||
      !contingencyVolume ||
      !groundRiskVolume ||
      !adjacentArea
    ) {
      setPopulationDensity(null);
      return;
    }

    const popDensityLayer = getView().map.layers.find(
      (layer) => layer.id === 'PopulationDensity',
    ) as __esri.ImageryLayer;

    const landuseLayer = getView().map.layers.find(
      (layer) => layer.id === 'Landuse',
    ) as __esri.ImageryLayer;

    if (!popDensityLayer) return;

    try {
      calculationInProgress.current = true;

      // Ensure the view is ready before accessing map layers
      await getView().when();

      // First, get the landuse-based calculation for operational ground risk area
      let maxPopDensityOperationalGroundRisk = null;
      if (landuseLayer && landuseLayer.loaded) {
        try {
          maxPopDensityOperationalGroundRisk =
            await getLanduseMaxPopDensityOperationalGroundrisk(landuseLayer);
        } catch (error) {
          // If landuse calculation fails, continue with population density layer
          // The error is silently handled to prevent breaking the calculation
        }
      }

      // Then get the population density layer calculation
      const popDensity = await getPopulationDensity(popDensityLayer);

      // Use the maximum of both calculations when landuse-based calculation is available
      if (
        maxPopDensityOperationalGroundRisk !== null &&
        maxPopDensityOperationalGroundRisk > 0 &&
        Number.isFinite(maxPopDensityOperationalGroundRisk)
      ) {
        popDensity.maxPopDensityOperationalGroundRisk = Math.max(
          popDensity.maxPopDensityOperationalGroundRisk ?? 0,
          maxPopDensityOperationalGroundRisk,
        );
      }

      const avgPopDensityLanduseAdjacentArea = await getAvgDensity(
        adjacentArea.geometry as __esri.Polygon,
        landuseLayer,
      );

      // TODO: Is this correct? Can I just take an average of the two averages?
      if (avgPopDensityLanduseAdjacentArea !== 0) {
        const combined =
          (popDensity.avgPopDensityAdjacentArea ?? 0) +
          (avgPopDensityLanduseAdjacentArea ?? 0);

        popDensity.avgPopDensityAdjacentArea =
          combined !== 0 ? _.round(combined / 2, combined < 1 ? 2 : 0) : 0;
      }

      setPopulationDensity(popDensity);
    } catch (error: any) {
      setPopulationDensity(null);
      const message =
        error?.details?.messages?.join(' ') ??
        error?.message ??
        'Unknown error';

      throw new Error(`Error calculating population densities: \r ${message}`);
    } finally {
      calculationInProgress.current = false;
    }
  }, [correctedLandUse]); // Add correctedLandUse dependency since it's used in landuse calculation

  return {
    populationDensity,
    calculatePopDensities,
  };
};

export default useGetPopulationDensity;
