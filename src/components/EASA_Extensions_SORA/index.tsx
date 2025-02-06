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
import useMapExtent from './hooks/useMapExtent';
// IRLi9g31pindstu7

export const EasaExtensionsSORA = (props: ComponentProps) => {
  const {
    getPConnect,
    heading,
    height,
    latitude,
    longitude,
    zoom,
    cd,
    vO,
    agolToken,
    agolUrl,
    printServiceUrl,
    printWidth,
    printHeight,
    printFormat,
    printDpi,
    popDensityPortalItemId,
    basemapPortalItemId
    // landusePortalItemId
  } = props;

  const mapDiv = useRef(null);
  const [flightGeography, setFlightGeography] = useState<__esri.Graphic | null>(null);

  const pConnect = getPConnect();

  const createMap = useCallback(() => {
    if (View?.map) return;

    if (mapDiv.current) {
      IdentityManager.registerToken({
        token: agolToken,
        server: agolUrl
      });

      const basemap = new Basemap({
        portalItem: new PortalItem({
          id: basemapPortalItemId,
          portal: {
            url: agolUrl
          }
        })
      });

      const map = new Map({
        basemap
      });

      Layer.fromPortalItem({
        portalItem: new PortalItem({
          id: popDensityPortalItemId,
          portal: {
            url: agolUrl
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
      View.center = new Point({ latitude, longitude });
      View.zoom = zoom;

      View.focus();
    }
  }, [latitude, longitude, zoom, agolToken, agolUrl, basemapPortalItemId, popDensityPortalItemId]);

  const { flightVolume, calculateVolume } = useCalculateFlightVolume({ ...props, flightGeography });

  // Replace the existing useEffect with useDebouncedEffect
  useDebouncedEffect(
    () => {
      calculateVolume();
    },
    300,
    [flightGeography, props, calculateVolume]
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

  const { printRequest, getPrintRequest } = useGetPrintRequest(
    printServiceUrl,
    printWidth,
    printHeight,
    printFormat,
    printDpi
  );

  const handleExtentChange = useCallback(() => {
    if (!flightVolume) return;
    getPrintRequest();
  }, [flightVolume, getPrintRequest]);

  useEffect(() => {
    if (!View?.extent) return;
    handleExtentChange();
  }, [handleExtentChange]);

  useMapExtent(() => {
    if (!View?.extent) return;
    handleExtentChange();
  });

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
  }, [populationDensity, groundRisk, printRequest, updatePegaProps]); // Added printRequest to dependencies

  useEffect(() => {
    if (!agolToken) return;
    createMap();
  }, [createMap, agolToken]);

  return (
    <>
      {agolToken && (
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
                },
                {
                  name: 'Intrinsic ground risk',
                  value: groundRisk
                }
              ]}
            />
          </CardContent>
        </Card>
      )}
      {!agolToken && <Text variant='h2'>No agol token!</Text>}
    </>
  );
};
export default withConfiguration(EasaExtensionsSORA);
