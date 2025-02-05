import {
  withConfiguration,
  Card,
  Text,
  CardContent,
  FieldValueList
} from '@pega/cosmos-react-core';
import Layer from '@arcgis/core/layers/Layer';
import Point from '@arcgis/core/geometry/Point';
import PortalItem from '@arcgis/core/portal/PortalItem';
import Map from '@arcgis/core/Map';
import Basemap from '@arcgis/core/Basemap';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import * as rendererJsonUtils from '@arcgis/core/renderers/support/jsonUtils.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import StyledEasaExtensionsSORA from './styles';
import '../create-nonce';
import { DrawToolbar } from './draw-toolbar';
import View from './View';
import SearchTool from './search-tool';
// import populationDensityRenderer, { landuseRenderer } from './renderers';
import populationDensityRenderer from './renderers';
import { useGetPopulationDensity } from './hooks/useGetPopulationDensity';
import useCalculateFlightVolume from './hooks/useCalculateFlightVolume';
import type { ComponentProps } from './types';
import useUpdatePegaProps from './hooks/useUpdatePegaProps';
import useDebouncedEffect from './hooks/useDebouncedEffect';
import useGetPrintRequest from './hooks/useGetPrintRequest';
import useGetIntrinsicGroundRisk from './hooks/useGetIntrinsicGroundRisk';

export const EasaExtensionsSORA = (props: ComponentProps) => {
  const { getPConnect, heading, height, Latitude, Longitude, Zoom, cd, vO, agolToken } = props;

  const mapDiv = useRef(null);
  const [flightGeography, setFlightGeography] = useState<__esri.Graphic | null>(null);

  const pConnect = getPConnect();

  const createMap = useCallback(() => {
    if (View?.map) return;

    if (mapDiv.current) {
      IdentityManager.registerToken({
        token: agolToken,
        server: 'https://easa.maps.arcgis.com/'
      });

      const basemap = new Basemap({
        portalItem: new PortalItem({
          id: '979c6cc89af9449cbeb5342a439c6a76',
          portal: {
            url: 'https://arcgis.com/'
          }
        })
      });

      const map = new Map({
        basemap
      });

      // TODO: send to backend IntrinsicGroundRisk and MapImageJSON
      // TODO: react to properties and recalculate the pop density etc.

      Layer.fromPortalItem({
        portalItem: new PortalItem({
          id: '0bfa97c0648449069cf45586578459c5',
          portal: {
            url: 'https://easa.maps.arcgis.com/'
          }
        })
      }).then(layer => {
        const imageryLayer = layer as ImageryLayer;
        imageryLayer.renderer = rendererJsonUtils.fromJSON(
          populationDensityRenderer
        ) as __esri.ClassBreaksRenderer;
        imageryLayer.id = 'PopulationDensity';
        map.add(imageryLayer, 0);
      });

      View.container = mapDiv.current;
      View.map = map;
      View.center = new Point({ latitude: parseFloat(Latitude), longitude: parseFloat(Longitude) });
      View.zoom = parseFloat(Zoom);

      View.focus();
    }
  }, [Latitude, Longitude, Zoom, agolToken]);

  const { flightVolume, calculateVolume } = useCalculateFlightVolume({ ...props, flightGeography });

  // Replace the existing useEffect with useDebouncedEffect
  useDebouncedEffect(
    () => {
      calculateVolume();
    },
    300,
    [flightGeography, calculateVolume]
  );

  const { populationDensity, calculateDensities } = useGetPopulationDensity(
    flightVolume
      ? {
          contingencyVolume: flightVolume.contingencyVolume,
          groundRiskVolume: flightVolume.groundRiskVolume,
          adjacentArea: flightVolume.adjacentArea,
          flightGeography
        }
      : null
  );

  const { groundRisk, calculateIntrinsicGroundRisk } = useGetIntrinsicGroundRisk({
    populationDensity,
    cd,
    vO
  });

  const { printRequest, getPrintRequest } = useGetPrintRequest();

  useEffect(() => {
    if (!flightVolume) return;
    getPrintRequest();
  }, [flightVolume, getPrintRequest]);

  // Call calculateDensities when flightVolume changes
  useEffect(() => {
    calculateDensities();
  }, [flightVolume, calculateDensities]); // Safe to include calculateDensities now

  useEffect(() => {
    calculateIntrinsicGroundRisk();
  }, [populationDensity, cd, vO, calculateIntrinsicGroundRisk]);

  const updatePegaProps = useUpdatePegaProps(pConnect, populationDensity, printRequest, groundRisk);

  // Call updatePegaProps when density values change
  useEffect(() => {
    updatePegaProps();
  }, [populationDensity, groundRisk, updatePegaProps]); // Safe to include updatePegaProps now

  useEffect(() => {
    createMap();
  }, [createMap]);

  return (
    <Card style={{ height }}>
      <CardContent style={{ height: '100%' }}>
        <div style={{ height: '10%', display: 'flex', justifyContent: 'space-between' }}>
          <Text variant='h2'>{heading}</Text>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <SearchTool />
            <DrawToolbar cd={cd} onFlightGeographyChange={setFlightGeography} />
          </div>
        </div>
        <StyledEasaExtensionsSORA height='70%' ref={mapDiv} />
        <FieldValueList
          style={{ height: '20%', marginTop: '0.25rem' }}
          variant='stacked'
          fields={[
            {
              name: 'Max. population in op. volume + ground risk buffer',
              value: populationDensity?.maxPopDensityAdjacentArea
            },
            {
              name: 'Average population density in adjacent area',
              value: populationDensity?.avgOperationalGroundRiskPopDensity
            }
          ]}
        />
      </CardContent>
    </Card>
  );
};
export default withConfiguration(EasaExtensionsSORA);
