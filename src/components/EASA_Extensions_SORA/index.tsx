import {
  withConfiguration,
  Card,
  Text,
  CardContent,
  Popover,
  Modal
} from '@pega/cosmos-react-core';
import Layer from '@arcgis/core/layers/Layer';
import Point from '@arcgis/core/geometry/Point';
import PortalItem from '@arcgis/core/portal/PortalItem';
import Map from '@arcgis/core/Map';
import { useCallback, useEffect, useRef, useState } from 'react';
import StyledEasaExtensionsSORA from './styles';
// import { getAllFields, createGraphic } from './utils';
import '../create-nonce';
import { DrawToolbar } from './draw-toolbar';
import View from './View';
import FlightVolumeCalculator from './flight-volume-calculator';
import SearchTool from './search-tool';

type MapProps = {
  getPConnect?: any;
  heading?: string;
  height?: string;
  Latitude?: string;
  Longitude?: string;
  Zoom?: string;
  maxDimensionProperty?: number;
  cruiseSpeedProperty?: number;
};

export const EasaExtensionsSORA = (props: MapProps) => {
  const [flightGeography, setFlightGeography] = useState<__esri.Graphic | null>(null);

  const {
    getPConnect,
    heading = 'SORA',
    height = '30rem',
    Latitude = '50.9375',
    Longitude = '6.9603',
    Zoom = '8',
    maxDimensionProperty = -1,
    cruiseSpeedProperty = -1
  } = props;

  const mapDiv = useRef(null);
  const tooltipElement = useRef<HTMLDivElement | null>(null);
  const [mousePoint, setMousePoint] = useState<__esri.MapViewScreenPoint | null>(null);

  const pConnect = getPConnect();

  /**
   * Initialize application
   */
  useEffect(() => {
    // const tmpFields: any = getAllFields(getPConnect);
    // console.log(tmpFields);

    // eslint-disable-next-line no-console
    console.log('maxDimensionProperty', maxDimensionProperty);
    // eslint-disable-next-line no-console
    console.log('cruiseSpeedProperty', cruiseSpeedProperty);

    // if (pConnect) {
    //   const value = pConnect?.getValue(maxDimensionProperty);
    //   // eslint-disable-next-line no-console
    //   console.log('maxDimensionProperty', maxDimensionProperty, 'parsedValue', value);
    // }

    let map: Map;

    if (mapDiv.current) {
      map = new Map({
        basemap: 'gray-vector'
      });

      Layer.fromPortalItem({
        portalItem: new PortalItem({
          id: '448c4a8b91b6481cb59330dceaa89e66'
        })
      }).then(layer => {
        map.add(layer, 0);
      });

      View.container = mapDiv.current;
      View.map = map;
      View.center = new Point({ latitude: parseFloat(Latitude), longitude: parseFloat(Longitude) });
      View.zoom = parseFloat(Zoom);

      View.focus();
    }
    return () => {
      View.destroy();
    };
  }, [Latitude, Longitude, Zoom, height, maxDimensionProperty, cruiseSpeedProperty]);

  if (pConnect?.getCaseInfo) {
    const caseInfo = pConnect?.getCaseInfo();
    // eslint-disable-next-line no-console
    console.log(caseInfo);
  }

  const setMouseOverVertex = (mp: { x: number; y: number } | null) => {
    setMousePoint(mp);
    if (tooltipElement.current) {
      if (mp) {
        tooltipElement.current.style.left = `${mp.x}px`;
        tooltipElement.current.style.top = `${mp.y}px`;
        tooltipElement.current.style.position = 'absolute';
        tooltipElement.current.style.display = 'block';
        tooltipElement.current.style.pointerEvents = 'none';
      } else {
        tooltipElement.current.style.display = 'none';
      }
    }
  };

  const propertiesValid = () => {
    return maxDimensionProperty !== -1;
  };

  const setFlightVolumeMaxPopulationDensity = useCallback(() => {
    if (!flightGeography || !PCore?.getRestClient || !pConnect) return null;

    const caseId = pConnect?.getValue('.pyID');

    // eslint-disable-next-line no-console
    console.log('Setting data for caseId', caseId);

    if (!caseId) {
      // eslint-disable-next-line no-console
      console.warn("Could not get caseId '.pyID'");
      return;
    }

    PCore.getRestClient().invokeRestApi('updateDataObject', {
      queryPayload: {
        data_view_ID: 'D_MapOutputSavable'
      },
      body: {
        data: {
          pyGUID: caseId,
          IntrinsicGroundRisk: '100',
          MaxPopulationVolume: 2000,
          AveragePopulationDensityInAdjacentArea: 1000
        }
      }
    });
  }, [flightGeography, pConnect]);

  useEffect(() => {
    setFlightVolumeMaxPopulationDensity();
  }, [flightGeography, setFlightVolumeMaxPopulationDensity]);

  return (
    <Card style={{ height }}>
      <CardContent style={{ height: '100%' }}>
        <div style={{ height: '10%', display: 'flex', justifyContent: 'space-between' }}>
          <Text variant='h2'>{heading}</Text>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <SearchTool />
            <DrawToolbar
              cd={1}
              onFlightGeographyChange={setFlightGeography}
              onMouseOverVertex={v => setMouseOverVertex(v)}
            />
          </div>
        </div>
        <StyledEasaExtensionsSORA height='90%' ref={mapDiv} />
        {mousePoint && (
          <div>
            <div ref={tooltipElement} />
            <Popover
              style={{ pointerEvents: 'none', borderRadius: '4px', padding: '4px' }}
              target={tooltipElement.current}
              strategy='fixed'
              arrow
            >
              <div
                style={{
                  gap: '0.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Text style={{ fontSize: '10px' }}>Right click to remove vertex</Text>
                <Text style={{ fontSize: '10px' }}>or</Text>
                <Text style={{ fontSize: '10px' }}>Drag to move vertex</Text>
              </div>
            </Popover>
          </div>
        )}
      </CardContent>
      {propertiesValid() && (
        <FlightVolumeCalculator
          flightGeography={flightGeography}
          parachute={false}
          sGPS={3}
          sPos={3}
          sK={1}
          vO={8} // TODO: set to cruiseSpeedProperty
          tR={2}
          tP={2}
          rollAngle={25}
          multirotor={false}
          hFG={100}
          hAM={100}
          simplified={false}
          cd={maxDimensionProperty}
          vWind={10}
          vZ={10}
          power={false}
          cL={0.5}
          gliding={false}
        />
      )}
      {!propertiesValid() && (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Modal heading='Drone properties are not valid'>
            <Text style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }} variant='h2'>
              Drone properties are not valid
            </Text>
          </Modal>
        </div>
      )}
    </Card>
  );
};
export default withConfiguration(EasaExtensionsSORA);
