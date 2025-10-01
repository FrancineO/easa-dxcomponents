import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import { LayerId, type MapProps, type MapState } from '../types';
import { getView, getNewView } from './view';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import Basemap from '@arcgis/core/Basemap';
import PortalItem from '@arcgis/core/portal/PortalItem';
import Map from '@arcgis/core/Map';
import Point from '@arcgis/core/geometry/Point';
import {
  landuseRenderer,
  populationDensityRenderer,
  getLanduseRasterFunction,
} from '../renderers';
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
  registerIcon,
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
    geozonePortalItemIds,
  } = mapProps;

  let PCore: any;
  const defaultTheme = useTheme();
  const theme = PCore
    ? merge(defaultTheme, PCore.getEnvironmentInfo().getTheme())
    : defaultTheme;

  const basemapPortalItemIdsArray = useMemo(() => {
    const bmIds = basemapPortalItemIds?.split(',').map((id) => id.trim());
    if (!bmIds || bmIds.length === 0) {
      return [
        '979c6cc89af9449cbeb5342a439c6a76',
        '86265e5a4bbb4187a59719cf134e0018',
        '67372ff42cd145319639a99152b15bc3',
      ];
    }
    return bmIds;
  }, [basemapPortalItemIds]);

  const geozonePortalItemIdsArray = useMemo(() => {
    const gzIds = geozonePortalItemIds?.split(',').map((id) => id.trim());
    if (!gzIds || gzIds.length === 0) {
      return [
        '961089b2b5934678966938195a745029',
        'eebdb68dbdb44859925d868399cecdf3',
      ];
    }
    return gzIds;
  }, [geozonePortalItemIds]);

  const mapDiv = useRef(null);

  const [signedIn, setSignedIn] = useState(false);
  const [signInStatusChecked, setSignInStatusChecked] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [locateVM, setLocateVM] = useState<LocateViewModel | null>(null);
  const [locateError, setLocateError] = useState<string | null>(null);
  const [addingLayers, setAddingLayers] = useState(false);
  const [loadingDots, setLoadingDots] = useState(1);
  const checkingSignInStatus = useRef(false);

  const checkSignInStatus = useCallback(() => {
    if (checkingSignInStatus.current) return;
    checkingSignInStatus.current = true;
    IdentityManager.registerToken({
      token: agolToken,
      server: agolUrl,
    });

    IdentityManager.checkSignInStatus(agolUrl)
      .then(() => {
        setSignedIn(true);
      })
      .catch((error) => {
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
          populationDensityRenderer,
        ) as __esri.ClassBreaksRenderer;
      }
      if (layer.portalItem.id === landusePortalItemId) {
        const landuseLayer = getView().map?.findLayerById(LayerId.landuse);

        layer.id = landuseLayer ? LayerId.landuseHighlight : LayerId.landuse;
        layer.visible = !landuseLayer;

        // Set renderer for legend compatibility
        layer.renderer = rendererJsonUtils.fromJSON(
          landuseRenderer,
        ) as __esri.ClassBreaksRenderer;

        // For ImageryLayers (raster), set the rasterFunction to generate
        // the proper Remap → Colormap chain for correct rendering
        if (!landuseLayer) {
          // Base landuse layer - apply the raster function
          (layer as __esri.ImageryLayer).rasterFunction =
            getLanduseRasterFunction() as any;
        }
        // The highlight layer will get its rasterFunction set later via useApplySpatialFilter

        layer.opacity = landuseLayer ? 0.75 : 1;
      }
      if (geozonePortalItemIdsArray.includes(layer.portalItem.id)) {
        // Use the portal item ID to create a unique layer ID
        layer.id = `${LayerId.geozones}_${layer.portalItem.id}`;
      }
      if (layer.portalItem.id === popDensityPortalItemId) {
        layer.opacity = 0.65;
      }
    },
    [popDensityPortalItemId, landusePortalItemId, geozonePortalItemIdsArray],
  );

  const configureGeozonesLayer = useCallback(
    (layer: Layer) => {
      (layer as FeatureLayer).popupEnabled = false;
      (layer as FeatureLayer).outFields = ['*'];
      const hasGeozonesVisibilityProperty =
        mapState?.layerVisibility &&
        Object.prototype.hasOwnProperty.call(
          mapState.layerVisibility,
          'Geozones',
        );

      if (hasGeozonesVisibilityProperty) {
        layer.visible = mapState?.layerVisibility?.Geozones as boolean;
      }
      reactiveUtils
        .whenOnce(() => layer.loaded)
        .then(() => {
          // Only call onGeozonesLoaded for the first geozone layer in the array
          if ((layer as any).portalItem?.id === geozonePortalItemIdsArray[0]) {
            onGeozonesLoaded(
              (layer as FeatureLayer).renderer as __esri.UniqueValueRenderer,
            );
          }
        });
    },
    [mapState, onGeozonesLoaded, geozonePortalItemIdsArray],
  );

  const configureLandUseAndPopulationDensity = useCallback(
    (layer: Layer) => {
      const hasPopulationDensityVisibilityProperty =
        mapState?.layerVisibility &&
        Object.prototype.hasOwnProperty.call(
          mapState.layerVisibility,
          'PopulationDensity',
        );
      if (hasPopulationDensityVisibilityProperty) {
        layer.visible = mapState?.layerVisibility?.PopulationDensity as boolean;
      }
    },
    [mapState],
  );

  const configureLayer = useCallback(
    (layer: Layer) => {
      applyRenderer(layer as ImageryLayer | FeatureLayer);

      if (layer.id?.startsWith(LayerId.geozones)) {
        configureGeozonesLayer(layer);
      }
      if (
        layer.id === LayerId.populationDensity ||
        layer.id === LayerId.landuse
      ) {
        configureLandUseAndPopulationDensity(layer);
      }
      getView().map.add(layer, 0);
    },
    [
      applyRenderer,
      configureGeozonesLayer,
      configureLandUseAndPopulationDensity,
    ],
  );

  const createLayersFromPortalIds = useCallback(async (): Promise<Layer[]> => {
    const promises: Promise<__esri.Layer>[] = [];

    promises.push(
      Layer.fromPortalItem({
        portalItem: new PortalItem({
          id: popDensityPortalItemId,
          portal: {
            url: agolUrl,
          },
        }),
      }),

      // Add landuse layer twice. once for the landuse layer and once for the landuse highlight layer
      Layer.fromPortalItem({
        portalItem: new PortalItem({
          id: landusePortalItemId,
          portal: {
            url: agolUrl,
          },
        }),
      }),
      Layer.fromPortalItem({
        portalItem: new PortalItem({
          id: landusePortalItemId,
          portal: {
            url: agolUrl,
          },
        }),
      }),
    );

    // Add multiple geozone layers
    geozonePortalItemIdsArray.forEach((geozoneId) => {
      promises.push(
        Layer.fromPortalItem({
          portalItem: new PortalItem({
            id: geozoneId,
            portal: {
              url: agolUrl,
            },
          }),
        }),
      );
    });

    const layers = await Promise.all(promises);
    const layersLoadedPromises: Promise<Layer>[] = [];

    layers.forEach((layer) => {
      configureLayer(layer);

      const layerPromise = new Promise<Layer>((resolve) => {
        if (layer.loaded) {
          resolve(layer);
        } else {
          reactiveUtils
            .whenOnce(() => layer.loaded)
            .then(() => {
              resolve(layer);
            });
        }
      });

      layersLoadedPromises.push(layerPromise);
    });

    return Promise.all(layersLoadedPromises);
  }, [
    popDensityPortalItemId,
    landusePortalItemId,
    geozonePortalItemIdsArray,
    agolUrl,
    configureLayer,
  ]);

  const addLayers = useCallback(() => {
    setAddingLayers(true);
    createLayersFromPortalIds().then(() => {
      // wait for the layerviews to be updated
      reactiveUtils
        .whenOnce(() =>
          getView().allLayerViews.every((layerView) => !layerView.updating),
        )
        .then(() => {
          setAddingLayers(false);
          onLayersAdded();
        });
    });
  }, [createLayersFromPortalIds, onLayersAdded]);

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
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <Text>
            Please check your browser location settings and try again.
          </Text>
        </div>
      </Modal>
    );
  }, [locateError]);

  const createMap = useCallback(() => {
    if (getView()?.map) return;

    if (mapDiv.current) {
      setLocateVM(
        new LocateViewModel({
          view: getView(),
        }),
      );

      IdentityManager.registerToken({
        token: agolToken,
        server: agolUrl,
      });

      const basemap = new Basemap({
        portalItem: new PortalItem({
          id: basemapPortalItemIdsArray[0],
          portal: {
            url: agolUrl,
          },
        }),
      });

      const map = new Map({
        basemap,
      });

      getView().container = mapDiv.current;
      getView().map = map;
      if (!mapState) {
        getView().center = new Point({ latitude: 53, longitude: 16 });
        getView().zoom = 4;
      } else {
        getView().center = new Point(mapState.center);
        getView().zoom = mapState.zoom ?? 4;
      }

      getView()
        .when()
        .then(() => {
          addLayers();
        });

      getView().focus();
    }
  }, [
    mapState,
    agolToken,
    agolUrl,
    mapDiv,
    addLayers,
    basemapPortalItemIdsArray,
  ]);

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

  useEffect(() => {
    if (!addingLayers) return;

    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, [addingLayers]);

  const locateMe = useCallback(() => {
    if (locateVM) {
      locateVM.locate().catch((error) => {
        setLocateError(error.message);
      });
    }
  }, [locateVM]);

  return (
    <>
      {signedIn ? (
        <div style={style}>
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
            ref={mapDiv}
          />
          {addingLayers && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none',
                zIndex: 1000,
              }}
            >
              <Card style={{ padding: '1rem' }}>
                <CardContent
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  <Text>
                    Loading map
                    <span style={{ opacity: loadingDots >= 1 ? 1 : 0.3 }}>
                      .
                    </span>
                    <span style={{ opacity: loadingDots >= 2 ? 1 : 0.3 }}>
                      .
                    </span>
                    <span style={{ opacity: loadingDots >= 3 ? 1 : 0.3 }}>
                      .
                    </span>
                  </Text>
                </CardContent>
              </Card>
            </div>
          )}
          <Card style={{ position: 'absolute', top: '0', left: '0' }}>
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.15rem',
              }}
            >
              <Button
                label='Zoom in'
                style={{
                  width: '2rem',
                  height: '2rem',
                  marginLeft: '0.25rem',
                  marginTop: '0.25rem',
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
                  marginTop: '0.25rem',
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
                  marginTop: '0.25rem',
                }}
                disabled={locateVM === null}
                variant='secondary'
                onClick={locateMe}
              >
                <Icon name='crosshairs' />
              </Button>
            </CardContent>
          </Card>
          <BasemapChooser
            basemapPortalItemIds={basemapPortalItemIdsArray}
            mapState={mapState}
          />
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
              gap: '0.5rem',
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
                inlineSize: '50%',
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
