import { useCallback, useState, useRef } from 'react';
import View from '../View';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import type { FlightVolume, PopulationDensity } from '../types';

export const useGetPopulationDensity = (params: FlightVolume | null) => {
  const [populationDensity, setPopulationDensity] = useState<PopulationDensity | null>(null);
  const calculationInProgress = useRef(false);
  const paramsRef = useRef(params);

  // Update the ref when params change
  paramsRef.current = params;

  const calculateDensities = useCallback(async () => {
    // Use the ref instead of the params dependency
    const currentParams = paramsRef.current;

    // Prevent multiple simultaneous calculations
    if (calculationInProgress.current) return;

    // Reset states if no params
    if (!currentParams) {
      setPopulationDensity(null);
      return;
    }

    const { flightGeography, contingencyVolume, groundRiskVolume, adjacentArea } = currentParams;
    if (!flightGeography || !contingencyVolume || !groundRiskVolume || !adjacentArea) {
      setPopulationDensity(null);
      return;
    }

    const imageryLayer = View.map.layers.find(
      layer => layer.id === 'PopulationDensity'
    ) as __esri.ImageryLayer;

    if (!imageryLayer) return;

    try {
      calculationInProgress.current = true;

      const pixelSize = {
        x: View.resolution,
        y: View.resolution,
        spatialReference: {
          wkid: View.spatialReference.wkid
        }
      };

      // Calculate adjacent area density
      const adjacentStats = await imageryLayer.computeStatisticsHistograms({
        geometry: adjacentArea.geometry as __esri.Polygon,
        pixelSize
      });

      const popDensity: PopulationDensity = {
        maxPopDensityAdjacentArea: null,
        avgOperationalGroundRiskPopDensity: null
      };

      if (adjacentStats.statistics[0]?.max) {
        const max = Math.round(adjacentStats.statistics[0].max);
        popDensity.maxPopDensityAdjacentArea = max;
      }

      // Calculate operational and ground risk density
      const opAndGr = geometryEngine.union([
        flightGeography.geometry,
        contingencyVolume.geometry,
        groundRiskVolume.geometry
      ]);

      const opStats = await imageryLayer.computeStatisticsHistograms({
        geometry: opAndGr as __esri.Polygon,
        pixelSize
      });

      if (opStats.statistics[0]?.avg) {
        const avg = Math.round(opStats.statistics[0].avg);
        popDensity.avgOperationalGroundRiskPopDensity = avg;
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
    calculateDensities
  };
};

export default useGetPopulationDensity;
