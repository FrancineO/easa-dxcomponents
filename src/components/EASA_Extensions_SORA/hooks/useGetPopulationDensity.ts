import { useCallback, useState, useRef } from 'react';
import View from '../View';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import type { FlightVolume, PopulationDensity } from '../types';
import { landusePopDensityLookup } from '../renderers';
import _ from 'lodash';

export const useGetPopulationDensity = (flightVolume: FlightVolume | null) => {
  const [populationDensity, setPopulationDensity] = useState<PopulationDensity | null>(null);
  const [intersectingLanduseClasses, setIntersectingLanduseClasses] = useState<number[]>([]);
  const calculationInProgress = useRef(false);
  const flightVolumeRef = useRef(flightVolume);

  // Update the ref when params change
  flightVolumeRef.current = flightVolume;

  const getMaxDensity = useCallback(
    async (geometry: __esri.Polygon, layer: __esri.ImageryLayer) => {
      const pixelSize = {
        x: View.resolution,
        y: View.resolution,
        spatialReference: {
          wkid: View.spatialReference.wkid
        }
      };
      const adjacentStats = await layer.computeStatisticsHistograms({
        geometry,
        pixelSize
      });

      if (adjacentStats.statistics[0]?.max) {
        return Math.round(adjacentStats.statistics[0].max);
      }
      return null;
    },
    []
  );

  const getAvgDensity = useCallback(
    async (geometry: __esri.Polygon, layer: __esri.ImageryLayer) => {
      const pixelSize = {
        x: View.resolution,
        y: View.resolution,
        spatialReference: {
          wkid: View.spatialReference.wkid
        }
      };

      // Calculate operational and ground risk density
      const opStats = await layer.computeStatisticsHistograms({
        geometry,
        pixelSize
      });

      if (opStats.statistics[0]?.avg) {
        return Math.round(opStats.statistics[0].avg);
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
      setIntersectingLanduseClasses([]);

      // get the max population density in the Operational Ground Risk area
      const opAndGr = getOperationalAndGroundRiskGeometry();
      const landuseHistograms = await layer.computeHistograms({
        geometry: opAndGr as __esri.Polygon
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
      setIntersectingLanduseClasses([]);
      return;
    }

    const { flightGeography, contingencyVolume, groundRiskVolume, adjacentArea } =
      currentFlightVolume;
    if (!flightGeography || !contingencyVolume || !groundRiskVolume || !adjacentArea) {
      setPopulationDensity(null);
      return;
    }

    const popDensityLayer = View.map.layers.find(
      layer => layer.id === 'PopulationDensity'
    ) as __esri.ImageryLayer;

    const landuseLayer = View.map.layers.find(
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

      // TODO: calculate the average population density for the adjacent area
      const avgPopDensityLanduseAdjacentArea = await getAvgDensity(
        adjacentArea.geometry as __esri.Polygon,
        landuseLayer
      );

      if (avgPopDensityLanduseAdjacentArea !== 0) {
        const combined =
          (popDensity.avgPopDensityAdjacentArea ?? 0) + (avgPopDensityLanduseAdjacentArea ?? 0);

        popDensity.avgPopDensityAdjacentArea = combined !== 0 ? _.round(combined / 2) : 0;
      }

      setPopulationDensity(popDensity);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error calculating population densities:', error);
    } finally {
      calculationInProgress.current = false;
    }
  }, []); // Empty dependency array since we're using ref

  return {
    populationDensity,
    intersectingLanduseClasses,
    calculatePopDensities
  };
};

export default useGetPopulationDensity;
