import { useCallback, useEffect, useRef } from 'react';
import StyledSORAMap from './styles';
import type ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import { LayerId, type MapProps } from './types';
import View from './View';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import Basemap from '@arcgis/core/Basemap';
import PortalItem from '@arcgis/core/portal/PortalItem';
import Map from '@arcgis/core/Map';
import Point from '@arcgis/core/geometry/Point';
import populationDensityRenderer, { geozoneRenderer, landuseRenderer } from './renderers';
import Layer from '@arcgis/core/layers/Layer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import * as rendererJsonUtils from '@arcgis/core/renderers/support/jsonUtils.js';
import { Text } from '@pega/cosmos-react-core';

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
    basemapPortalItemId,
    landusePortalItemId,
    geozonePortalItemId
  } = mapProps;
  const mapDiv = useRef(null);

  // for publishing
  // const agolToken =
  //   'mzFcMRqhxzPAoRJavp2MJnT86fp9vdIuHnlcY6yRjycMNMkD4n52uRAbbfniWAIwcJvOrFZPH8C_SP83gjBjxrV_sWf3RPNCjViDUmYVp7JvtqEydYhZ44rqgr31kl76Gi6-n6nx--QmMACz79SCOnfiQnL_H17j1s6ou-8RX8mWvUPH0Xz3cduYS6dohl6x';

  // from Piotr
  // mzFcMRqhxzPAoRJavp2MJtFI_Vj3noDUjaUFIsUu5ObcYgL0WG9UdlYwuGUrlGEGnxW94bF1MSabQrDWr6yPabIUywOWxBzUSX9zKknGn2fv_nxxjna_xNVe1B0BpqVvxhthxkuRO5ZxlJnGpNIAEMASjUxX6vgyk6UndXNCLBFkS

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
        imageryLayer.id = LayerId.populationDensity;
        map.add(imageryLayer, 0);
      });

      Layer.fromPortalItem({
        portalItem: new PortalItem({
          id: landusePortalItemId,
          portal: {
            url: agolUrl
          }
        })
      }).then(layer => {
        const imageryLayer = layer as ImageryLayer;
        imageryLayer.renderer = rendererJsonUtils.fromJSON(
          landuseRenderer
        ) as __esri.ClassBreaksRenderer;
        imageryLayer.id = LayerId.landuse;
        imageryLayer.opacity = 0.5;
        map.add(imageryLayer, 0);
      });

      Layer.fromPortalItem({
        portalItem: new PortalItem({
          id: landusePortalItemId,
          portal: {
            url: agolUrl
          }
        })
      }).then(layer => {
        const imageryLayer = layer as ImageryLayer;
        imageryLayer.renderer = rendererJsonUtils.fromJSON(
          landuseRenderer
        ) as __esri.ClassBreaksRenderer;
        imageryLayer.id = LayerId.landuseHighlight;
        imageryLayer.visible = false;
        map.add(imageryLayer, 0);
      });

      Layer.fromPortalItem({
        portalItem: new PortalItem({
          id: geozonePortalItemId,
          portal: {
            url: agolUrl
          }
        })
      }).then(layer => {
        const geozonesLayer = layer as FeatureLayer;
        geozonesLayer.id = LayerId.geozones;
        geozonesLayer.popupEnabled = false;
        geozonesLayer.renderer = rendererJsonUtils.fromJSON(
          geozoneRenderer
        ) as __esri.UniqueValueRenderer;
        map.add(geozonesLayer, 0);
      });

      View.container = mapDiv.current;
      View.map = map;
      View.center = new Point({ latitude, longitude });
      View.zoom = zoom;

      View.focus();
    }
  }, [
    latitude,
    longitude,
    zoom,
    agolToken,
    agolUrl,
    basemapPortalItemId,
    popDensityPortalItemId,
    landusePortalItemId,
    geozonePortalItemId
  ]);

  useEffect(() => {
    if (!agolToken) return;
    createMap();
  }, [createMap, agolToken]);

  return (
    <>
      {agolToken ? (
        <div style={style}>
          <StyledSORAMap ref={mapDiv} />
        </div>
      ) : (
        <Text>No agol token</Text>
      )}
    </>
  );
};

export default SoraMap;
