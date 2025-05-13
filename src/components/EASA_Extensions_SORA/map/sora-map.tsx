import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import { LayerId, type MapProps, type MapState } from '../types';
import { getView, getNewView } from './view';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import Basemap from '@arcgis/core/Basemap';
import PortalItem from '@arcgis/core/portal/PortalItem';
import Map from '@arcgis/core/Map';
import Point from '@arcgis/core/geometry/Point';
import { landuseRenderer, populationDensityRenderer } from '../renderers';
import Layer from '@arcgis/core/layers/Layer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import * as rendererJsonUtils from '@arcgis/core/renderers/support/jsonUtils.js';
import {
  Button,
  Modal,
  Text,
  useModalManager,
  Card,
  CardContent,
  useTheme,
  registerIcon
} from '@pega/cosmos-react-core';
import { Icon } from '@pega/cosmos-react-core';
import BasemapChooser from '../tools/basemap-chooser/basemap-chooser';
import LocateViewModel from '@arcgis/core/widgets/Locate/LocateViewModel';
import { merge } from 'lodash';
import * as Plus from '@pega/cosmos-react-core/lib/components/Icon/icons/plus.icon';
import * as Minus from '@pega/cosmos-react-core/lib/components/Icon/icons/minus.icon';
import * as Crosshairs from '@pega/cosmos-react-core/lib/components/Icon/icons/crosshairs.icon';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

registerIcon(Plus, Minus, Crosshairs);

type Props = {
  style: React.CSSProperties;
  mapProps: MapProps;
  mapState: MapState | null;
  onLayersAdded: () => void;
  onGeozonesLoaded: (renderer: __esri.UniqueValueRenderer) => void;
};

const SoraMap = (props: Props) => {
  const { style, mapProps, mapState, onLayersAdded, onGeozonesLoaded } = props;
  const {
    agolUrl,
    agolToken,
    popDensityPortalItemId,
    basemapPortalItemIds,
    landusePortalItemId,
    geozonePortalItemId
  } = mapProps;

  let PCore: any;
  const defaultTheme = useTheme();
  const theme = PCore ? merge(defaultTheme, PCore.getEnvironmentInfo().getTheme()) : defaultTheme;

  const basemapPortalItemIdsArray = useMemo(() => {
    const bmIds = basemapPortalItemIds?.split(',');
    if (!bmIds || bmIds.length === 0) {
      return [
        '979c6cc89af9449cbeb5342a439c6a76',
        '86265e5a4bbb4187a59719cf134e0018',
        '67372ff42cd145319639a99152b15bc3'
      ];
    }
    return bmIds;
  }, [basemapPortalItemIds]);

  const mapDiv = useRef(null);

  const [signedIn, setSignedIn] = useState(false);
  const [signInStatusChecked, setSignInStatusChecked] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [locateVM, setLocateVM] = useState<LocateViewModel | null>(null);
  const [locateError, setLocateError] = useState<string | null>(null);
  const checkingSignInStatus = useRef(false);

  const checkSignInStatus = useCallback(() => {
    if (checkingSignInStatus.current) return;
    checkingSignInStatus.current = true;
    IdentityManager.registerToken({
      token: agolToken,
      server: agolUrl
    });

    IdentityManager.checkSignInStatus(agolUrl)
      .then(() => {
        setSignedIn(true);
      })
      .catch(error => {
        setSignInError(error?.message);
        setSignedIn(false);
      })
      .finally(() => {
        setSignInStatusChecked(true);
        checkingSignInStatus.current = false;
      });
  }, [agolToken, agolUrl]);

  const applyRenderer = useCallback(
    (layer: __esri.ImageryLayer | FeatureLayer) => {
      if (layer.portalItem.id === popDensityPortalItemId) {
        layer.id = LayerId.populationDensity;
        layer.renderer = rendererJsonUtils.fromJSON(
          populationDensityRenderer
        ) as __esri.ClassBreaksRenderer;
      }
      if (layer.portalItem.id === landusePortalItemId) {
        const landuseLayer = getView().map?.findLayerById(LayerId.landuse);

        layer.id = landuseLayer ? LayerId.landuseHighlight : LayerId.landuse;
        layer.visible = !landuseLayer;
        layer.renderer = rendererJsonUtils.fromJSON(landuseRenderer) as __esri.ClassBreaksRenderer;
        layer.opacity = landuseLayer ? 1 : 0.85;
      }
      if (layer.portalItem.id === geozonePortalItemId) {
        layer.id = LayerId.geozones;
      }
      if (layer.portalItem.id === popDensityPortalItemId) {
        layer.opacity = 0.65;
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
          if (layer.id === LayerId.geozones) {
            (layer as FeatureLayer).popupEnabled = false;
            (layer as FeatureLayer).outFields = ['*'];
            const hasGeozonesVisibilityProperty =
              mapState?.layerVisibility &&
              Object.prototype.hasOwnProperty.call(mapState.layerVisibility, 'Geozones');

            if (hasGeozonesVisibilityProperty) {
              layer.visible = mapState?.layerVisibility?.Geozones as boolean;
            }
            reactiveUtils
              .whenOnce(() => layer.loaded)
              .then(() => {
                onGeozonesLoaded((layer as FeatureLayer).renderer as __esri.UniqueValueRenderer);
              });
          }
          if (layer.id === LayerId.populationDensity || layer.id === LayerId.landuse) {
            const hasPopulationDensityVisibilityProperty =
              mapState?.layerVisibility &&
              Object.prototype.hasOwnProperty.call(mapState.layerVisibility, 'PopulationDensity');
            if (hasPopulationDensityVisibilityProperty) {
              layer.visible = mapState?.layerVisibility?.PopulationDensity as boolean;
            }
          }
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
      onLayersAdded,
      mapState,
      onGeozonesLoaded
    ]
  );

  const { create } = useModalManager();

  const locationErrorModal = useCallback(() => {
    return (
      <Modal
        dismissible
        heading={locateError}
        center
        onAfterClose={() => {
          setLocateError(null);
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Text>Please check your browser location settings and try again.</Text>
        </div>
      </Modal>
    );
  }, [locateError]);

  const createMap = useCallback(() => {
    if (getView()?.map) return;

    if (mapDiv.current) {
      setLocateVM(
        new LocateViewModel({
          view: getView()
        })
      );

      IdentityManager.registerToken({
        token: agolToken,
        server: agolUrl
      });

      const basemap = new Basemap({
        portalItem: new PortalItem({
          id: basemapPortalItemIdsArray[0],
          portal: {
            url: agolUrl
          }
        })
      });

      const map = new Map({
        basemap
      });

      addLayers(map);

      getView().container = mapDiv.current;
      getView().map = map;
      if (!mapState) {
        getView().center = new Point({ latitude: 53, longitude: 16 });
        getView().zoom = 4;
      } else {
        getView().center = new Point(mapState.center);
        getView().zoom = mapState.zoom ?? 4;
      }

      getView().focus();
    }
  }, [mapState, agolToken, agolUrl, mapDiv, addLayers, basemapPortalItemIdsArray]);

  useEffect(() => {
    if (!signInStatusChecked) {
      checkSignInStatus();
    }
    if (!agolToken || !signedIn) return;
    createMap();
  }, [createMap, agolToken, signInStatusChecked, signedIn, checkSignInStatus]);

  useEffect(() => {
    return () => {
      const color = 'rgb(225, 152, 83)';
      // eslint-disable-next-line no-console
      console.log('%c--------------------------------', `color: ${color}`);
      // eslint-disable-next-line no-console
      console.log('%c Recreating view', `color: ${color}`);
      getView()?.destroy();
      // eslint-disable-next-line no-console
      console.log('%c   View destroyed', `color: ${color}`);
      getNewView();
      // eslint-disable-next-line no-console
      console.log('%c   New view created', `color: ${color}`);
      // eslint-disable-next-line no-console
      console.log('%c--------------------------------', `color: ${color}`);
    };
  }, []);

  useEffect(() => {
    if (!locateError) return;
    create(locationErrorModal);
  }, [locateError, create, locationErrorModal]);

  const locateMe = useCallback(() => {
    if (locateVM) {
      locateVM.locate().catch(error => {
        setLocateError(error.message);
      });
    }
  }, [locateVM]);

  return (
    <>
      {signedIn ? (
        <div style={style}>
          <div style={{ width: '100%', height: '100%' }} ref={mapDiv} />
          <Card style={{ position: 'absolute', top: '0', left: '0' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <Button
                label='Zoom in'
                style={{
                  width: '2rem',
                  height: '2rem',
                  marginLeft: '0.25rem',
                  marginTop: '0.25rem'
                }}
                variant='secondary'
                onClick={() => {
                  getView().zoom = getView().zoom + 1;
                }}
              >
                <Icon name='plus' />
              </Button>
              <Button
                label='Zoom out'
                style={{
                  width: '2rem',
                  height: '2rem',
                  marginLeft: '0.25rem',
                  marginTop: '0.25rem'
                }}
                variant='secondary'
                onClick={() => {
                  getView().zoom = getView().zoom - 1;
                }}
              >
                <Icon name='minus' />
              </Button>
              <Button
                label='Locate Me'
                style={{
                  width: '2rem',
                  height: '2rem',
                  marginLeft: '0.25rem',
                  marginTop: '0.25rem'
                }}
                disabled={locateVM === null}
                variant='secondary'
                onClick={locateMe}
              >
                <Icon name='crosshairs' />
              </Button>
            </CardContent>
          </Card>
          <BasemapChooser basemapPortalItemIds={basemapPortalItemIdsArray} mapState={mapState} />
        </div>
      ) : (
        signInStatusChecked && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              margin: '1rem',
              padding: '1rem',
              border: `1px solid ${theme.base.palette.urgent}`,
              gap: '0.5rem'
            }}
          >
            <Text variant='h3' style={{ color: theme.base.palette.urgent }}>
              Agol token may have expired!
            </Text>
            <Text variant='h3' style={{ color: theme.base.palette.urgent }}>
              Your token is:
            </Text>
            <Text
              variant='h3'
              style={{
                color: theme.base.palette.urgent,
                overflowWrap: 'break-word',
                inlineSize: '50%'
              }}
            >
              {agolToken}
            </Text>
            <Text variant='h3' style={{ color: theme.base.palette.urgent }}>
              {signInError}
            </Text>
          </div>
        )
      )}
    </>
  );
};

export default SoraMap;
