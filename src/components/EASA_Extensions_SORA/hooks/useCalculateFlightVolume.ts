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
      const cv = getContingencyVolume(currentParams);
      if (!cv) return;
      const grVolume = getGroundRiskVolume(currentParams, cv);
      if (!grVolume) return;

      const aa = getAdjacentArea(currentParams, cv.contingencyVolume.geometry, grVolume.geometry);
      if (!aa) return;

      // Add graphics to layer
      layer.addMany([cv.contingencyVolume, grVolume, aa]);

      // Update state with new volumes
      setFlightVolume({
        contingencyVolume: cv.contingencyVolume,
        groundRiskVolume: grVolume,
        adjacentArea: aa,
        flightGeography: currentParams.flightGeography,
        contingencyVolumeHeight: cv.contingencyVolumeHeight
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
