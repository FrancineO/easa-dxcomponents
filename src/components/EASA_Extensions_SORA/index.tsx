import {
  withConfiguration,
  Card,
  Text,
  CardContent,
  CardHeader,
  useTheme
} from '@pega/cosmos-react-core';
import MapView from '@arcgis/core/views/MapView';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Layer from '@arcgis/core/layers/Layer';
import Point from '@arcgis/core/geometry/Point';
import PortalItem from '@arcgis/core/portal/PortalItem';
import Map from '@arcgis/core/Map';
import { useEffect, useRef, useState } from 'react';
import StyledEasaExtensionsSORA from './styles';
import { createGraphic } from './utils';
// import { getAllFields, createGraphic } from './utils';
import '../create-nonce';
import type Graphic from '@arcgis/core/Graphic';

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
  const [graphic, setGraphic] = useState<Graphic | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!graphic) {
      graphicsLayer.removeAll();
      return;
    }
    createGraphic(graphicsLayer, View, graphic.geometry, true, theme);
  }, [graphic, graphicsLayer, theme]);

  /**
   * Initialize application
   */
  useEffect(() => {
    // const tmpFields: any = getAllFields(getPConnect);
    // console.log(tmpFields);

    let map: Map;
    let sketchViewModel: SketchViewModel;

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
      View.when(() => {
        sketchViewModel = new SketchViewModel({
          view: View,
          layer: graphicsLayer
        });
        sketchViewModel.create('polyline');
        sketchViewModel.on('create', event => {
          if (event.state === 'start') {
            setGraphic(null);
            graphicsLayer.removeAll();
          }
          if (event.state === 'complete') {
            setGraphic(event.graphic);
            sketchViewModel.create('polyline');
          }
        });
      });
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
      </CardContent>
    </Card>
  );
};
export default withConfiguration(EasaExtensionsSORA);
