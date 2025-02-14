import {
  withConfiguration,
  Card,
  // Text,
  CardContent,
  FieldValueList
} from '@pega/cosmos-react-core';
import { useCallback, useEffect, useState } from 'react';
import '../create-nonce';
import { DrawToolbar } from './tools/draw-toolbar/draw-toolbar';
import SearchTool from './tools/search-tool';
import { useGetPopulationDensity } from './hooks/useGetPopulationDensity';
import useCalculateFlightVolume from './hooks/useCalculateFlightVolume';
import type { ComponentProps } from './types';
import useUpdatePegaProps from './hooks/useUpdatePegaProps';
import useDebouncedEffect from './hooks/useDebouncedEffect';
import useGetPrintRequest from './hooks/useGetPrintRequest';
import useGetIntrinsicGroundRisk from './hooks/useGetIntrinsicGroundRisk';
import useMapExtent from './hooks/useMapExtent';
import SoraMap from './map/sora-map';
import useApplySpatialFilter from './hooks/useApplySpatialFilter';
import LayerList from './tools/layer-list';
import useGetIntersectingGeozones from './hooks/useGetIntersectingGeozones';

import Legends from './legends/legends';
import { getFlightGeography } from './tools/draw-toolbar/draw-utils';
import useGetIntersectingLanduses from './hooks/useGetIntersectingLanduses';

// IRLi9g31pindstu7
// mzFcMRqhxzPAoRJavp2MJnT86fp9vdIuHnlcY6yRjycMNMkD4n52uRAbbfniWAIwcJvOrFZPH8C_SP83gjBjxrV_sWf3RPNCjViDUmYVp7JvtqEydYhZ44rqgr31kl76Gi6-n6nx--QmMACz79SCOnfiQnL_H17j1s6ou-8RX8mWvUPH0Xz3cduYS6dohl6x

// https://map.droneguide.be/
// it seems clicking on the previous button and then going forward again is killing the map
// TODO: Legend for the flight geography contingency etc.
// show geographical zones - where drones may fly - red, yellow and green zones
// ask eike about the geozone data
// display also whether the user has drawn a flight volume within a geozone

// geozones in the future will be updateable by an api
// - they will then be single files from each memeber states which will then mean sinlge layers for each member state, or the api can update the whole layer.

// ability to toggle the geozones on and off
// ability to toggle the popdensity and landusage on and off

// population density color coded not in reds
// landuse - color coded light to dark purple

export const EasaExtensionsSORA = (props: ComponentProps) => {
  const {
    getPConnect,
    height,
    flightPathJSON,
    cd,
    vO,
    controlledGroundArea,
    printServiceUrl,
    printWidth,
    printHeight,
    printFormat,
    printDpi
  } = props;

  const [flightGeography, setFlightGeography] = useState<__esri.Graphic | null>(null);
  const [flightPath, setFlightPath] = useState<__esri.Geometry | null>(null);
  const [layersAdded, setLayersAdded] = useState(false);

  const pConnect = getPConnect();

  const { flightVolume, calculateVolume } = useCalculateFlightVolume({ ...props, flightGeography });

  // Replace the existing useEffect with useDebouncedEffect
  useDebouncedEffect(
    () => {
      if (!layersAdded) return;
      calculateVolume();
    },
    300,
    [flightGeography, props, layersAdded, calculateVolume]
  );

  // Set up the hook for population density
  const { populationDensity, calculatePopDensities } = useGetPopulationDensity(
    flightVolume
      ? {
          ...flightVolume,
          flightGeography
        }
      : null
  );

  // Set up the hook to get the intersecting landuses
  const { intersectingLanduseClasses, queryIntersectingLanduses } =
    useGetIntersectingLanduses(flightVolume);

  // Set up the hook to get the intersecting geozones
  const { intersectingGeozones, queryIntersectingGeozones } =
    useGetIntersectingGeozones(flightVolume);

  // Set up the hook for ground risk
  const { groundRisk, calculateIntrinsicGroundRisk } = useGetIntrinsicGroundRisk({
    populationDensity,
    cd,
    vO,
    controlledGroundArea
  });

  // Set up the hook for print request
  const { printRequest, getPrintRequest } = useGetPrintRequest(
    printServiceUrl,
    printWidth,
    printHeight,
    printFormat,
    printDpi
  );

  // Set up the hook for applying spatial filter
  const { applySpatialFilter } = useApplySpatialFilter(flightVolume);

  // Set up the callback for extent change
  const handleExtentChange = useCallback(() => {
    if (!flightVolume) return;
    getPrintRequest();
  }, [flightVolume, getPrintRequest]);

  // Set up the hook for updating Pega props
  const updatePegaProps = useUpdatePegaProps(
    pConnect,
    populationDensity,
    printRequest,
    flightPath,
    groundRisk
  );

  // Set up the effect for flight geometry which comes in as a parameter
  useEffect(() => {
    if (flightPathJSON && layersAdded) {
      const fg = getFlightGeography(flightPathJSON);
      if (!fg) return;
      setFlightGeography(fg);
    }
  }, [flightPathJSON, layersAdded]);

  // Set up the effect for extent change
  useEffect(() => {
    // if (!View?.extent) return;
    if (!layersAdded) return;
    handleExtentChange();
  }, [handleExtentChange, layersAdded]);

  // Set up the effect for map extent
  useMapExtent(() => {
    // if (!View?.extent) return;
    handleExtentChange();
  });

  // Call calculatePopDensities when flightVolume changes
  useEffect(() => {
    if (!layersAdded) return;
    calculatePopDensities();
    queryIntersectingLanduses();
  }, [flightVolume, layersAdded, calculatePopDensities, queryIntersectingLanduses]);

  // call applyFlightVolume when flightVolume changes
  useEffect(() => {
    if (!layersAdded) return;
    applySpatialFilter();
  }, [flightVolume, layersAdded, applySpatialFilter]);

  // Call calculateIntrinsicGroundRisk when populationDensity, cd, or vO changes
  useEffect(() => {
    if (!layersAdded) return;
    calculateIntrinsicGroundRisk();
  }, [populationDensity, cd, vO, layersAdded, calculateIntrinsicGroundRisk]);

  // Call queryIntersectingGeozones when flightVolume changes
  useEffect(() => {
    if (!layersAdded) return;
    queryIntersectingGeozones();
  }, [flightVolume, layersAdded, queryIntersectingGeozones]);

  // Call updatePegaProps when groundRisk, or printRequest changes
  useEffect(() => {
    if (!layersAdded) return;
    updatePegaProps();
  }, [groundRisk, printRequest, layersAdded, updatePegaProps]);

  return (
    <Card style={{ height: '100%' }}>
      <CardContent style={{ height: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <LayerList />
            <SearchTool />
            <DrawToolbar
              cd={cd}
              onFlightGeographyChange={setFlightGeography}
              onFlightPathChange={setFlightPath}
              flightPathJSON={flightPathJSON}
            />
          </div>
        </div>
        <SoraMap
          style={{ height, position: 'relative' }}
          mapProps={props}
          onLayersAdded={() => setLayersAdded(true)}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.25rem'
          }}
        >
          <FieldValueList
            style={{
              maxWidth: '30%'
            }}
            variant='stacked'
            fields={[
              {
                name: 'Max. population in op. volume + ground risk buffer',
                value: populationDensity?.maxPopDensityOperationalGroundRisk
              },
              {
                name: 'Average population density in adjacent area',
                value: populationDensity?.avgPopDensityAdjacentArea
              },
              {
                name: 'Intrinsic ground risk',
                value: groundRisk
              }
            ]}
          />
          <Legends
            style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', maxWidth: '70%' }}
            flightVolume={flightVolume}
            intersectingGeozones={intersectingGeozones}
            intersectingLanduseClasses={intersectingLanduseClasses}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default withConfiguration(EasaExtensionsSORA);
