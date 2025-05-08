import { useCallback, useState, useRef } from 'react';
import { getView } from '../map/view';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import type { FlightVolume, PopulationDensity } from '../types';
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
      wkid: getView().spatialReference.wkid
    }
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

export const useGetPopulationDensity = (flightVolume: FlightVolume | null, hFG: number) => {
  const [populationDensity, setPopulationDensity] = useState<PopulationDensity | null>(null);
  const calculationInProgress = useRef(false);
  const flightVolumeRef = useRef(flightVolume);

  // Update the ref when params change
  flightVolumeRef.current = flightVolume;

  const getMaxDensity = useCallback(
    async (geometry: __esri.Polygon, layer: __esri.ImageryLayer) => {
      if (hFG < 0) {
        throw new Error('Cannot calculate population density with a negative height.');
      }

      // const pixelSize = getPixelSize(hFG);
      const pixelSize = getPixelSize();
      const adjacentStats = await layer.computeStatisticsHistograms({
        geometry,
        pixelSize
      });

      if (adjacentStats.statistics[0]?.max) {
        return _.round(adjacentStats.statistics[0].max, 2);
      }
      return null;
    },
    []
  );

  const getAvgDensity = useCallback(
    async (geometry: __esri.Polygon, layer: __esri.ImageryLayer) => {
      if (hFG < 0) {
        throw new Error('Cannot calculate population density with a negative height.');
      }

      // const pixelSize = getPixelSize(hFG);
      const pixelSize = getPixelSize();

      const opStats = await layer.computeStatisticsHistograms({
        geometry,
        pixelSize
      });

      if (opStats.statistics[0]?.avg) {
        return _.round(opStats.statistics[0].avg, 2);
      }
      return null;
    },
    []
  );

  const getOperationalAndGroundRiskGeometry = useCallback(() => {
    const currentFlightVolume = flightVolumeRef.current;

    return geometryEngine.union([
      currentFlightVolume?.flightGeography?.geometry as __esri.Polygon,
      currentFlightVolume?.contingencyVolume?.geometry as __esri.Polygon,
      currentFlightVolume?.groundRiskVolume?.geometry as __esri.Polygon
    ]);
  }, []);

  const getPopulationDensity = useCallback(async (layer: __esri.ImageryLayer) => {
    // Use the ref instead of the params dependency
    const currentFlightVolume = flightVolumeRef.current;

    const popDensity: PopulationDensity = {
      maxPopDensityOperationalGroundRisk: null,
      avgPopDensityAdjacentArea: null
    };

    // Get the max density for the adjacent area
    const opAndGr = getOperationalAndGroundRiskGeometry();
    const maxDensity = await getMaxDensity(opAndGr as __esri.Polygon, layer);
    popDensity.maxPopDensityOperationalGroundRisk = maxDensity;

    // Get the average density for the adjacent area
    const avgDensity = await getAvgDensity(
      currentFlightVolume?.adjacentArea?.geometry as __esri.Polygon,
      layer
    );
    popDensity.avgPopDensityAdjacentArea = avgDensity;

    return popDensity;
  }, []);

  const getLanduseMaxPopDensityOperationalGroundrisk = useCallback(
    async (layer: __esri.ImageryLayer) => {
      if (hFG < 0) {
        throw new Error('Cannot calculate population density with a negative height.');
      }

      // get the max population density in the Operational Ground Risk area
      const opAndGr = getOperationalAndGroundRiskGeometry();
      // const pixelSize = getPixelSize(hFG);
      const pixelSize = getPixelSize();
      const landuseHistograms = await layer.computeHistograms({
        geometry: opAndGr as __esri.Polygon,
        pixelSize
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
      return Math.max(...intersectedLanduseClasses.map(index => landusePopDensityLookup[index]));
    },
    []
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

    const { flightGeography, contingencyVolume, groundRiskVolume, adjacentArea } =
      currentFlightVolume;
    if (!flightGeography || !contingencyVolume || !groundRiskVolume || !adjacentArea) {
      setPopulationDensity(null);
      return;
    }

    const popDensityLayer = getView().map.layers.find(
      layer => layer.id === 'PopulationDensity'
    ) as __esri.ImageryLayer;

    const landuseLayer = getView().map.layers.find(
      layer => layer.id === 'Landuse'
    ) as __esri.ImageryLayer;

    if (!popDensityLayer) return;

    try {
      calculationInProgress.current = true;

      const popDensity = await getPopulationDensity(popDensityLayer);

      const maxPopDensityLanduseOperationalGroundRisk =
        await getLanduseMaxPopDensityOperationalGroundrisk(landuseLayer);

      popDensity.maxPopDensityOperationalGroundRisk = Math.max(
        popDensity.maxPopDensityOperationalGroundRisk ?? 0,
        maxPopDensityLanduseOperationalGroundRisk ?? 0
      );

      const avgPopDensityLanduseAdjacentArea = await getAvgDensity(
        adjacentArea.geometry as __esri.Polygon,
        landuseLayer
      );

      // TODO: Is this correct? Can I just take an average of the two averages?
      if (avgPopDensityLanduseAdjacentArea !== 0) {
        const combined =
          (popDensity.avgPopDensityAdjacentArea ?? 0) + (avgPopDensityLanduseAdjacentArea ?? 0);

        popDensity.avgPopDensityAdjacentArea =
          combined !== 0 ? _.round(combined / 2, combined < 1 ? 2 : 0) : 0;
      }

      setPopulationDensity(popDensity);
    } catch (error: any) {
      setPopulationDensity(null);
      const message = error?.details?.messages?.join(' ') ?? error?.message ?? 'Unknown error';

      throw new Error(`Error calculating population densities: \r ${message}`);
    } finally {
      calculationInProgress.current = false;
    }
  }, []); // Empty dependency array since we're using ref

  return {
    populationDensity,
    calculatePopDensities
  };
};

export default useGetPopulationDensity;
