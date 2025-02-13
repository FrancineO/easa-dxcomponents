import { useCallback, useEffect, useRef } from 'react';
import type ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import { LayerId, type MapProps } from './types';
import View from './View';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import Basemap from '@arcgis/core/Basemap';
import PortalItem from '@arcgis/core/portal/PortalItem';
import Map from '@arcgis/core/Map';
import Point from '@arcgis/core/geometry/Point';
import { geozoneRenderer, landuseRenderer, populationDensityRenderer } from './renderers';
import Layer from '@arcgis/core/layers/Layer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import * as rendererJsonUtils from '@arcgis/core/renderers/support/jsonUtils.js';
import { Text } from '@pega/cosmos-react-core';

type Props = {
  style: React.CSSProperties;
  mapProps: MapProps;
  onLayersAdded: () => void;
};

const SoraMap = (props: Props) => {
  const { style, mapProps, onLayersAdded } = props;
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

  const applyRenderer = useCallback(
    (layer: __esri.ImageryLayer | FeatureLayer) => {
      if (layer.portalItem.id === popDensityPortalItemId) {
        layer.id = LayerId.populationDensity;
        layer.renderer = rendererJsonUtils.fromJSON(
          populationDensityRenderer
        ) as __esri.ClassBreaksRenderer;
      }
      if (layer.portalItem.id === landusePortalItemId) {
        const landuseLayer = View.map?.findLayerById(LayerId.landuse);

        layer.id = landuseLayer ? LayerId.landuseHighlight : LayerId.landuse;
        layer.visible = !landuseLayer;
        layer.renderer = rendererJsonUtils.fromJSON(landuseRenderer) as __esri.ClassBreaksRenderer;
        layer.opacity = landuseLayer ? 1 : 0.5;
      }
      if (layer.portalItem.id === geozonePortalItemId) {
        layer.id = LayerId.geozones;
        layer.renderer = rendererJsonUtils.fromJSON(geozoneRenderer) as __esri.UniqueValueRenderer;
      }
    },
    [popDensityPortalItemId, landusePortalItemId, geozonePortalItemId]
  );

  const addLayers = useCallback(
    (map: Map) => {
      const promises: Promise<__esri.Layer>[] = [];
      promises.push(
        Layer.fromPortalItem({
          portalItem: new PortalItem({
            id: popDensityPortalItemId,
            portal: {
              url: agolUrl
            }
          })
        }),
        Layer.fromPortalItem({
          portalItem: new PortalItem({
            id: landusePortalItemId,
            portal: {
              url: agolUrl
            }
          })
        }),
        Layer.fromPortalItem({
          portalItem: new PortalItem({
            id: landusePortalItemId,
            portal: {
              url: agolUrl
            }
          })
        }),
        Layer.fromPortalItem({
          portalItem: new PortalItem({
            id: geozonePortalItemId,
            portal: {
              url: agolUrl
            }
          })
        })
      );

      Promise.all(promises).then(layers => {
        layers.forEach(layer => {
          applyRenderer(layer as ImageryLayer | FeatureLayer);
          map.add(layer, 0);
        });
        onLayersAdded();
      });
    },
    [
      popDensityPortalItemId,
      landusePortalItemId,
      geozonePortalItemId,
      applyRenderer,
      agolUrl,
      onLayersAdded
    ]
  );

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

      addLayers(map);

      View.container = mapDiv.current;
      View.map = map;
      View.center = new Point({ latitude, longitude });
      View.zoom = zoom;

      View.focus();
    }
  }, [latitude, longitude, zoom, agolToken, agolUrl, basemapPortalItemId, mapDiv, addLayers]);

  useEffect(() => {
    if (!agolToken) return;
    createMap();
  }, [createMap, agolToken]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line no-console
      console.log('destroying view');
      View?.destroy();
      // eslint-disable-next-line no-console
      console.log('view destroyed');
    };
  }, []);

  return (
    <>
      {agolToken ? (
        <div style={style}>
          <div style={{ width: '100%', height: '100%' }} ref={mapDiv} />
        </div>
      ) : (
        <Text>No agol token</Text>
      )}
    </>
  );
};

export default SoraMap;
