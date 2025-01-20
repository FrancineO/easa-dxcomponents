import { withConfiguration, Card, Text, CardContent, CardHeader } from '@pega/cosmos-react-core';
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

  return (
    <Card style={{ height }}>
      <CardHeader>
        <Text variant='h2'>{heading}</Text>
      </CardHeader>
      <CardContent style={{ height: '100%' }}>
        <StyledEasaExtensionsSORA height='100%' ref={mapDiv} />
        <DrawToolbar
          style={{ position: 'absolute', right: '20px', top: '5px' }}
          onFlightGeographyChange={setFlightGeography}
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
        thetaMax={25}
        hFG={100}
        hAM={100}
      />
    </Card>
  );
};
export default withConfiguration(EasaExtensionsSORA);
