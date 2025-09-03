import { useCallback, useState, useRef } from 'react';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { getView } from '../map/view';
import {
  getAdjacentArea,
  getContingencyVolume,
  getGroundRiskVolume,
} from '../flight-volume/flight-volume-calculations';
import type { FlightVolume, FlightVolumeParams } from '../types';

const useCalculateFlightVolume = (params: FlightVolumeParams) => {
  const [flightVolumes, setFlightVolumes] = useState<FlightVolume[]>([]);
  const paramsRef = useRef(params);
  const calculationInProgress = useRef(false);

  // Update the ref when params change
  paramsRef.current = params;

  const calculateVolume = useCallback(() => {
    // Use the ref instead of the params dependency
    const currentParams = paramsRef.current;

    // Prevent multiple simultaneous calculations
    if (calculationInProgress.current) return;

    // Only proceed if we have flight geographies
    if (
      !currentParams.flightGeographies ||
      currentParams.flightGeographies.length === 0
    ) {
      // clear the flight volumes
      const layer = getView().map?.findLayerById(
        'flight-volumes',
      ) as GraphicsLayer;
      if (layer) {
        layer.removeAll();
      }
      setFlightVolumes([]);
      return;
    }

    // Get or create the layer only once when needed
    let layer: GraphicsLayer = getView().map?.findLayerById(
      'flight-volumes',
    ) as GraphicsLayer;
    if (!layer) {
      layer = new GraphicsLayer({ id: 'flight-volumes' });
      getView().map?.add(layer);
    }

    // Clear existing graphics
    layer.removeAll();

    // TODO: get rid of this try catch and push it higher
    try {
      calculationInProgress.current = true;

      const calculatedVolumes: FlightVolume[] = [];
      const allGraphics: __esri.Graphic[] = [];

      // Calculate volumes for each flight path
      for (let i = 0; i < currentParams.flightGeographies.length; i++) {
        const flightGeography = currentParams.flightGeographies[i];

        // Create params for this specific flight path
        const pathParams = {
          ...currentParams,
          flightGeography: flightGeography,
        };

        // Calculate volumes for this path
        const cvResult = getContingencyVolume(pathParams);
        if (!cvResult) continue;
        const grVolumeResult = getGroundRiskVolume(pathParams, cvResult);
        if (!grVolumeResult) continue;

        const aaResult = getAdjacentArea(
          pathParams,
          cvResult.contingencyVolume.geometry,
          grVolumeResult.groundRiskVolume.geometry,
        );
        if (!aaResult) continue;

        // Add graphics to layer
        allGraphics.push(
          cvResult.contingencyVolume,
          grVolumeResult.groundRiskVolume,
          aaResult.adjacentArea,
        );

        // Create flight volume for this path
        const flightVolume: FlightVolume = {
          contingencyVolume: cvResult.contingencyVolume,
          groundRiskVolume: grVolumeResult.groundRiskVolume,
          adjacentArea: aaResult.adjacentArea,
          flightGeography: flightGeography,
          contingencyVolumeHeight: cvResult.contingencyVolumeHeight,
          contingencyVolumeWidth: cvResult.contingencyVolumeWidth,
          groundRiskBufferWidth: grVolumeResult.groundRiskBufferWidth,
          adjacentVolumeWidth: aaResult.adjacentAreaWidth,
        };

        calculatedVolumes.push(flightVolume);
      }

      // Add all graphics to layer at once
      if (allGraphics.length > 0) {
        layer.addMany(allGraphics);
      }

      // Update state with new volumes
      setFlightVolumes(calculatedVolumes);
    } catch (error) {
      setFlightVolumes([]);
      throw error;
    } finally {
      calculationInProgress.current = false;
    }
  }, []); // Empty dependency array since we're using ref

  return { flightVolumes, calculateVolume };
};

export default useCalculateFlightVolume;
