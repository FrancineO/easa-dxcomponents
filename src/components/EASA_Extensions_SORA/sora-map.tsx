import { useCallback, useEffect, useRef } from 'react';
import StyledSORAMap from './styles';
import type ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import type { MapProps } from './types';
import View from './View';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import Basemap from '@arcgis/core/Basemap';
import PortalItem from '@arcgis/core/portal/PortalItem';
import Map from '@arcgis/core/Map';
import Point from '@arcgis/core/geometry/Point';
import populationDensityRenderer from './renderers';
import Layer from '@arcgis/core/layers/Layer';
import * as rendererJsonUtils from '@arcgis/core/renderers/support/jsonUtils.js';

type Props = {
  style: React.CSSProperties;
  mapProps: MapProps;
};

const SoraMap = (props: Props) => {
  const { style, mapProps } = props;
  const {
    latitude,
    longitude,
    zoom,
    agolUrl,
    agolToken,
    popDensityPortalItemId,
    basemapPortalItemId
  } = mapProps;
  const mapDiv = useRef(null);

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

  useEffect(() => {
    if (!agolToken) return;
    createMap();
  }, [createMap, agolToken]);

  return <StyledSORAMap style={style} ref={mapDiv} />;
};

export default SoraMap;
