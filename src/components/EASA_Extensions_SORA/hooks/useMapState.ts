import { useEffect, useRef, useState } from 'react';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import { getView } from '../map/view';
import debounce from 'lodash/debounce';
import { LayerGroupType, type MapState, LayerId, layerGroups } from '../types';

const useMapState = (originalMapState: MapState | null) => {
  const [mapState, setMapState] = useState<MapState | null>(originalMapState);
  const getLayerGroup = (layer: __esri.Layer) => {
    const layerId = layer.id;
    return layerGroups.find(layerGroup => layerGroup.ids.includes(layerId as LayerId));
  };

  const debouncedCallback = useRef(
    debounce((callback: () => void) => {
      callback();
    }, 500)
  ).current;

  const updateMapState = () => {
    const view = getView();
    const map = view.map;
    const basemap = map.basemap;
    const center = view.extent.center;
    const zoom = view.zoom;
    if (zoom === -1) return;

    setMapState({
      basemap: basemap.portalItem.id,
      center: {
        latitude: center.latitude,
        longitude: center.longitude
      },
      zoom,
      layerVisibility: {
        [LayerGroupType.geozones]:
          map.layers.find(layer => layer.id === LayerId.geozones)?.visible ?? false,
        [LayerGroupType.populationDensity]:
          map.layers.find(layer => layer.id === LayerId.populationDensity)?.visible ?? false
      }
    });
  };

  useEffect(() => {
    let mounted = true;

    reactiveUtils
      .whenOnce(() => getView().ready)
      .then(() => {
        if (!mounted) return;

        const handle = reactiveUtils.watch(
          () => getView().extent,
          () => {
            if (!mounted || !getView().extent) return;
            debouncedCallback(() => {
              updateMapState();
            });
          }
        );

        reactiveUtils
          .whenOnce(() => getView().basemapView)
          .then(() => {
            if (!mounted) return;
            debouncedCallback(() => {
              updateMapState();
            });
          });

        getView().on('layerview-create', (event: __esri.ViewLayerviewCreateEvent) => {
          const layer = event.layerView.layer;
          const layerGroup = getLayerGroup(layer);
          if (layerGroup) {
            reactiveUtils.watch(
              () => layer.visible,
              () => {
                if (!mounted) return;
                debouncedCallback(() => {
                  updateMapState();
                });
              }
            );
          }
        });

        return () => {
          mounted = false;
          handle?.remove();
          debouncedCallback.cancel();
        };
      });

    return () => {
      mounted = false;
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  return mapState;
};

export default useMapState;
