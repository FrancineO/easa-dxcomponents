import { withConfiguration, Card, Text, CardContent, CardHeader } from '@pega/cosmos-react-core';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Layer from '@arcgis/core/layers/Layer';
import Point from '@arcgis/core/geometry/Point';
import PortalItem from '@arcgis/core/portal/PortalItem';
import Map from '@arcgis/core/Map';
import { useEffect, useRef, useState } from 'react';
import StyledEasaExtensionsSORA from './styles';
// import { getAllFields, createGraphic } from './utils';
import '../create-nonce';
import { DrawToolbar } from './draw-toolbar';

export const View = new MapView({
  ui: {
    components: []
  }
});

type MapProps = {
  // getPConnect?: any;
  heading?: string;
  height?: string;
  Latitude?: string;
  Longitude?: string;
  Zoom?: string;
};

export const EasaExtensionsSORA = (props: MapProps) => {
  const {
    // getPConnect,
    heading = 'SORA',
    height = '40rem',
    Latitude = '50.9375',
    Longitude = '6.9603',
    Zoom = '8'
  } = props;

  const mapDiv = useRef(null);
  const [graphicsLayer] = useState<GraphicsLayer>(new GraphicsLayer({}));

  /**
   * Initialize application
   */
  useEffect(() => {
    // const tmpFields: any = getAllFields(getPConnect);
    // console.log(tmpFields);

    let map: Map;

    if (mapDiv.current) {
      map = new Map({
        basemap: 'gray-vector',
        layers: [graphicsLayer]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Latitude, Longitude, Zoom, height]);

  return (
    <Card>
      <CardHeader>
        <Text variant='h2'>{heading}</Text>
      </CardHeader>
      <CardContent>
        <StyledEasaExtensionsSORA height={height} ref={mapDiv} />
        <DrawToolbar
          style={{ position: 'absolute', right: '15px', top: '5px' }}
          graphicsLayer={graphicsLayer}
        />
      </CardContent>
    </Card>
  );
};
export default withConfiguration(EasaExtensionsSORA);
