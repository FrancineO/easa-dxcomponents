import { useCallback, useState, useRef } from 'react';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { getView } from '../map/view';
import {
  getAdjacentArea,
  getContingencyVolume,
  getGroundRiskVolume,
} from '../flight-volume/flight-volume-calculations';
import type { FlightVolume, FlightVolumesParams } from '../types';
import { omit } from 'lodash';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import Graphic from '@arcgis/core/Graphic';
import { getFillSymbol } from '../tools/toolbar/draw-utils';

const useCalculateFlightVolumes = (params: FlightVolumesParams) => {
  const [flightVolumes, setFlightVolumes] = useState<FlightVolume[]>([]);
  const paramsRef = useRef(params);
  const calculationInProgress = useRef(false);

  // Update the ref when params change
  paramsRef.current = params;

  const calculateVolume = useCallback(async () => {
    // Use the ref instead of the params dependency
    const currentParams = paramsRef.current;

    // Prevent multiple simultaneous calculations
    if (calculationInProgress.current) {
      return;
    }

    // Only proceed if we have flight geographies
    if (!currentParams.flightPaths || currentParams.flightPaths.length === 0) {
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

      const baseParams = omit(currentParams, 'flightPaths');

      const results = await Promise.all(
        currentParams.flightPaths.map(async (flightPath) => {
          const pathParams = { ...baseParams, flightPath };

          const flightGeographyWidth = currentParams.cd * 3; // minimum is 3 times the drone width as per annex
          const buffer = geometryEngine.buffer(
            flightPath.geometry as __esri.Polyline,
            flightGeographyWidth,
          ) as __esri.Polygon;
          const flightGeography = new Graphic({
            geometry: buffer,
            symbol: getFillSymbol(false),
          });

          const cvResult = getContingencyVolume({ ...pathParams, flightGeography });
          if (!cvResult) return null;

          const grVolumeResult = getGroundRiskVolume({ ...pathParams, flightGeography }, cvResult);
          if (!grVolumeResult) return null;

          const aaResult = await getAdjacentArea(
            { ...pathParams, flightGeography },
            cvResult.contingencyVolume.geometry,
            grVolumeResult.groundRiskVolume.geometry,
          );
          if (!aaResult) return null;

          return { cvResult, grVolumeResult, aaResult, flightGeography };
        }),
      );

      const calculatedVolumes: FlightVolume[] = [];
      const allGraphics: __esri.Graphic[] = [];

      for (const result of results.filter(Boolean)) {
        const { cvResult, grVolumeResult, aaResult, flightGeography } = result!;

        allGraphics.push(
          cvResult.contingencyVolume,
          grVolumeResult.groundRiskVolume,
          aaResult.adjacentArea,
          flightGeography,
        );

        calculatedVolumes.push({
          contingencyVolume: cvResult.contingencyVolume,
          groundRiskVolume: grVolumeResult.groundRiskVolume,
          adjacentArea: aaResult.adjacentArea,
          flightGeography,
          contingencyVolumeHeight: cvResult.contingencyVolumeHeight,
          contingencyVolumeWidth: cvResult.contingencyVolumeWidth,
          groundRiskBufferWidth: grVolumeResult.groundRiskBufferWidth,
          adjacentVolumeWidth: aaResult.adjacentAreaWidth,
        });
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

export default useCalculateFlightVolumes;
