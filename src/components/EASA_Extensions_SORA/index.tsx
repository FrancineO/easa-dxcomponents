import {
  withConfiguration,
  Card,
  Text,
  CardContent,
  CardHeader,
  Popover
} from '@pega/cosmos-react-core';
import Layer from '@arcgis/core/layers/Layer';
import Point from '@arcgis/core/geometry/Point';
import PortalItem from '@arcgis/core/portal/PortalItem';
import Map from '@arcgis/core/Map';
import { useEffect, useRef, useState } from 'react';
import StyledEasaExtensionsSORA from './styles';
// import { getAllFields, createGraphic } from './utils';
import '../create-nonce';
import { DrawToolbar } from './draw-toolbar';
import View from './View';
import FlightVolumeCalculator from './flight-volume-calculator';

type MapProps = {
  getPConnect?: any;
  heading?: string;
  height?: string;
  Latitude?: string;
  Longitude?: string;
  Zoom?: string;
};

export const EasaExtensionsSORA = (props: MapProps) => {
  const [flightGeography, setFlightGeography] = useState<__esri.Graphic | null>(null);

  const {
    getPConnect,
    heading = 'SORA',
    height = '40rem',
    Latitude = '50.9375',
    Longitude = '6.9603',
    Zoom = '8'
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
  }, [Latitude, Longitude, Zoom, height]);

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

  return (
    <Card style={{ height }}>
      <CardHeader>
        <Text variant='h2'>{heading}</Text>
      </CardHeader>
      <CardContent style={{ height: '100%' }}>
        <StyledEasaExtensionsSORA height='100%' ref={mapDiv} />
        {mousePoint && (
          <>
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
          </>
        )}
        <DrawToolbar
          style={{ position: 'absolute', right: '20px', top: '5px' }}
          cd={1}
          onFlightGeographyChange={setFlightGeography}
          onMouseOverVertex={v => setMouseOverVertex(v)}
        />
      </CardContent>
      <FlightVolumeCalculator
        flightGeography={flightGeography}
        parachute={false}
        sGPS={3}
        sPos={3}
        sK={1}
        vO={20}
        tR={2}
        tP={2}
        rollAngle={25}
        multirotor={false}
        hFG={100}
        hAM={100}
        simplified={false}
        cd={1}
        vWind={10}
        vZ={10}
        power={false}
        cL={0.5}
        gliding={false}
      />
    </Card>
  );
};
export default withConfiguration(EasaExtensionsSORA);
