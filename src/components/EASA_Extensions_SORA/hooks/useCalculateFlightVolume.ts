import { useCallback, useState, useRef } from 'react';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { getView } from '../map/view';
import {
  getAdjacentArea,
  getContingencyVolume,
  getGroundRiskVolume
} from '../flight-volume/flight-volume-calculations';
import type { FlightVolume, FlightVolumeParams } from '../types';

const useCalculateFlightVolume = (params: FlightVolumeParams) => {
  const [flightVolume, setFlightVolume] = useState<FlightVolume | null>(null);
  const paramsRef = useRef(params);
  const calculationInProgress = useRef(false);

  // Update the ref when params change
  paramsRef.current = params;

  const calculateVolume = useCallback(() => {
    // Use the ref instead of the params dependency
    const currentParams = paramsRef.current;

    // Prevent multiple simultaneous calculations
    if (calculationInProgress.current) return;

    // Only proceed if we have a flight geography
    if (!currentParams.flightGeography) {
      // clear the flight volume
      const layer = getView().map?.findLayerById('flight-volumes') as GraphicsLayer;
      if (layer) {
        layer.removeAll();
      }
      setFlightVolume(null);
      return;
    }

    // Get or create the layer only once when needed
    let layer: GraphicsLayer = getView().map?.findLayerById('flight-volumes') as GraphicsLayer;
    if (!layer) {
      layer = new GraphicsLayer({ id: 'flight-volumes' });
      getView().map?.add(layer);
    }

    // Clear existing graphics
    layer.removeAll();

    // TODO: get rid of this try catch and push it higher
    try {
      calculationInProgress.current = true;

      // Calculate volumes
      const cvResult = getContingencyVolume(currentParams);
      if (!cvResult) return;
      const grVolumeResult = getGroundRiskVolume(currentParams, cvResult);
      if (!grVolumeResult) return;

      const aaResult = getAdjacentArea(
        currentParams,
        cvResult.contingencyVolume.geometry,
        grVolumeResult.groundRiskVolume.geometry
      );
      if (!aaResult) return;

      // Add graphics to layer
      layer.addMany([
        cvResult.contingencyVolume,
        grVolumeResult.groundRiskVolume,
        aaResult.adjacentArea
      ]);

      // Update state with new volumes
      setFlightVolume({
        contingencyVolume: cvResult.contingencyVolume,
        groundRiskVolume: grVolumeResult.groundRiskVolume,
        adjacentArea: aaResult.adjacentArea,
        flightGeography: currentParams.flightGeography,
        contingencyVolumeHeight: cvResult.contingencyVolumeHeight,
        contingencyVolumeWidth: cvResult.contingencyVolumeWidth,
        groundRiskBufferWidth: grVolumeResult.groundRiskBufferWidth,
        adjacentVolumeWidth: aaResult.adjacentAreaWidth
      });
    } catch (error) {
      setFlightVolume(null);
      throw error;
    } finally {
      calculationInProgress.current = false;
    }
  }, []); // Empty dependency array since we're using ref

  return { flightVolume, calculateVolume };
};

export default useCalculateFlightVolume;
