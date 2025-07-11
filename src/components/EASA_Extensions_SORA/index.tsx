import {
  withConfiguration,
  Card,
  CardContent,
  FieldValueList,
  Text,
  useTheme,
  Progress,
} from '@pega/cosmos-react-core';
import { merge } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import '../create-nonce';
import { Toolbar } from './tools/toolbar/toolbar';
import SearchTool from './tools/search-tool';
import { useGetPopulationDensity } from './hooks/useGetPopulationDensity';
import useCalculateFlightVolume from './hooks/useCalculateFlightVolume';
import {
  validateComponentProps,
  type ComponentProps,
  type MapState,
} from './types';
import useUpdatePegaProps from './hooks/useUpdatePegaProps';
import useDebouncedEffect from './hooks/useDebouncedEffect';
import useGetPrintRequest from './hooks/useGetPrintRequest';
import useGetIntrinsicGroundRisk, {
  GroundRiskError,
} from './hooks/useGetIntrinsicGroundRisk';
import useMapState from './hooks/useMapState';
import SoraMap from './map/sora-map';
import useHighlightIntersectingLanduse from './hooks/useApplySpatialFilter';
import LayerList from './tools/layer-list';
import useGetIntersectingGeozones from './hooks/useGetIntersectingGeozones';

import Legends from './legends/legends';
import { getFlightGeography } from './tools/toolbar/draw-utils';
import useGetIntersectingLanduses from './hooks/useGetIntersectingLanduses';
import { getView } from './map/view';
import { geozones, landUseLabels } from './renderers';

// eslint-disable-next-line no-console
console.log(
  '%c Do not throw errors. Just log them.',
  `color: ${'rgb(255, 0, 195)'}`,
);

// https://map.droneguide.be/
// https://maptool-dipul.dfs.de/

// geozones in the future will be updateable by an api
// - they will then be single files from each member states which will then mean single layers for each member state, or the api can update the whole layer.

// TODO: change the pop density layers from a resolution of 200m resolution to another value based on the drone height.
// See table in screenshot from alberto.
// Should write a script which fetches the data from the url this url: https://jrcbox.jrc.ec.europa.eu/index.php/s/QN29mKagdLqnfnT
// See mail from Alberto on 2025-01-23 (subject: Population density data for eSORA) for the password
// The various pop density layers need to be used to make the calculation.
// For visualizing on the map, we probably always want to show the 200m resolution (confirm with alberto)

// TODO: allow the user to upload a gpx or kml. low priority

// TODO: need to handle the geozones correctly. Only have geozones for denmark at the moment.

export const EasaExtensionsSORA = (props: ComponentProps) => {
  // check that the props are valid by testing the values against their types

  const {
    getPConnect,
    height,
    flightPathJSON,
    mapStateJSON,
    cd,
    vO,
    hFG,
    criticalArea,
    controlledGroundArea,
    printServiceUrl,
    printWidth,
    printHeight,
    printFormat,
    printDpi,
  } = props;

  const [flightGeography, setFlightGeography] = useState<__esri.Graphic | null>(
    null,
  );
  // const [flightPath, setFlightPath] = useState<__esri.Geometry | null>(null);
  const [layersAdded, setLayersAdded] = useState(false);
  const [mapState, setMapState] = useState<MapState | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [geozoneInfo, setGeozoneInfo] = useState<string | null>(null);
  const [propsValid, setPropsValid] = useState(false);
  const [geozonesRenderer, setGeozonesRenderer] =
    useState<__esri.UniqueValueRenderer | null>(null);

  const pConnect = getPConnect();
  let PCore: any;
  const defaultTheme = useTheme();
  const theme = PCore
    ? merge(defaultTheme, PCore.getEnvironmentInfo().getTheme())
    : defaultTheme;

  useEffect(() => {
    try {
      // eslint-disable-next-line no-console
      console.log('%cValidating props:', `color: ${'rgb(125, 205, 248)'}`);
      // eslint-disable-next-line no-console
      console.log(props);
      validateComponentProps(props);
      setPropsValid(true);
      // eslint-disable-next-line no-console
      console.log('%cProps are valid!', `color: ${'rgb(93, 255, 153)'}`);
    } catch (error: any) {
      setErrorText(error.message);
      // eslint-disable-next-line no-console
      console.error('Error validating props:', error);
      setPropsValid(false);
    }
  }, [props]);

  const { flightVolume, calculateVolume } = useCalculateFlightVolume({
    ...props,
    flightGeography,
  });

  // Replace the existing useEffect with useDebouncedEffect
  useDebouncedEffect(
    () => {
      if (!layersAdded || !propsValid) return;
      setErrorText(null);
      if (flightGeography) {
        setLoading(true);
      }
      try {
        calculateVolume();
      } catch (error: any) {
        setErrorText(error.message);
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    300,
    [flightGeography, props, layersAdded, calculateVolume],
  );

  // Set up the hook for population density
  const { populationDensity, calculatePopDensities } = useGetPopulationDensity(
    flightVolume
      ? {
          ...flightVolume,
          flightGeography,
        }
      : null,
    hFG,
  );

  // Set up the hook to get the intersecting landuses
  const { intersectingLanduseClasses, queryIntersectingLanduses } =
    useGetIntersectingLanduses(flightVolume);

  // Set up the hook to get the intersecting geozones
  const { intersectingGeozones, queryIntersectingGeozones } =
    useGetIntersectingGeozones(flightVolume);

  // Set up the hook for ground risk
  const { groundRisk, calculateIntrinsicGroundRisk } =
    useGetIntrinsicGroundRisk({
      populationDensity,
      cd,
      vO,
      controlledGroundArea,
      criticalArea,
    });

  // Set up the hook for print request
  const { printRequest, getPrintRequest } = useGetPrintRequest(
    printServiceUrl,
    printWidth,
    printHeight,
    printFormat,
    printDpi,
  );

  useEffect(() => {
    if (mapStateJSON) {
      setMapState(JSON.parse(mapStateJSON));
    }
  }, [mapStateJSON]);

  // Set up the hook for highlighting the intersecting landuse
  const { highlightIntersectingLanduse } =
    useHighlightIntersectingLanduse(flightVolume);

  // Set up the hook for updating Pega props
  const updatePegaProps = useUpdatePegaProps(
    pConnect,
    populationDensity,
    printRequest,
    flightGeography?.geometry ?? null,
    mapState,
    groundRisk,
    errorText,
    flightVolume?.contingencyVolumeHeight ?? null,
    flightVolume?.adjacentVolumeWidth ?? null,
    flightVolume?.contingencyVolumeWidth ?? null,
    flightVolume?.groundRiskBufferWidth ?? null,
    intersectingGeozones
      ?.map((geozone: __esri.Graphic) => {
        return geozonesRenderer
          ? (geozones.find(
              (g) => g.value === geozone.attributes[geozonesRenderer?.field],
            )?.label ?? '')
          : null;
      })
      .filter((gz) => gz !== null)
      .filter((value, index, self) => self.indexOf(value) === index) ?? null,
    intersectingLanduseClasses
      ?.map((landuse) => {
        return landUseLabels[landuse];
      })
      .filter((value, index, self) => self.indexOf(value) === index) ?? null,
  );

  // Set up the effect for flight geometry which comes in as a parameter
  useEffect(() => {
    if (flightPathJSON && layersAdded) {
      const fg = getFlightGeography(flightPathJSON);
      if (!fg) return;
      setFlightGeography(fg);
    }
  }, [flightPathJSON, layersAdded]);

  // Set up the effect for map state
  const updatedMapState = useMapState(mapState);

  // Set up the effect for print request
  useEffect(() => {
    if (!flightVolume) return;
    getPrintRequest();
  }, [getPrintRequest, flightVolume]);

  useEffect(() => {
    if (updatedMapState) {
      setMapState({ ...updatedMapState });
    }
  }, [updatedMapState]);

  // Call calculatePopDensities when flightVolume changes
  useEffect(() => {
    queryIntersectingLanduses();
    if (!flightVolume) return;
    calculatePopDensities()
      .catch((error) => {
        setErrorText(error.message);
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [flightVolume, calculatePopDensities, queryIntersectingLanduses]);

  // highlight the intersecting landuse when flightVolume changes
  useEffect(() => {
    if (!layersAdded) return;
    highlightIntersectingLanduse();
  }, [flightVolume, layersAdded, highlightIntersectingLanduse]);

  // Call calculateIntrinsicGroundRisk when populationDensity, cd, or vO changes
  useEffect(() => {
    if (!layersAdded) return;
    try {
      calculateIntrinsicGroundRisk();
    } catch (error: any) {
      if (error instanceof GroundRiskError) {
        setErrorText(`Error calculating ground risk: ${error.message}`);
      }
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [populationDensity, cd, vO, layersAdded, calculateIntrinsicGroundRisk]);

  // Call queryIntersectingGeozones when flightVolume changes
  useEffect(() => {
    if (!layersAdded) return;
    queryIntersectingGeozones();
  }, [flightVolume, layersAdded, queryIntersectingGeozones]);

  // Call updatePegaProps when groundRisk, or printRequest changes
  useEffect(() => {
    if (!layersAdded) return;
    updatePegaProps();
  }, [
    groundRisk,
    printRequest,
    layersAdded,
    updatePegaProps,
    mapState,
    errorText,
  ]);

  const maxPopDensity = useMemo(() => {
    if (!populationDensity || !flightGeography) return null;
    return populationDensity?.maxPopDensityOperationalGroundRisk === 0
      ? '0'
      : populationDensity?.maxPopDensityOperationalGroundRisk;
  }, [populationDensity, flightGeography]);

  const avgPopDensity = useMemo(() => {
    if (!populationDensity || !flightGeography) return null;
    return populationDensity?.avgPopDensityAdjacentArea === 0
      ? '0'
      : populationDensity?.avgPopDensityAdjacentArea;
  }, [populationDensity, flightGeography]);

  const groundRiskValue = useMemo(() => {
    if (!groundRisk || !flightGeography) return null;
    return groundRisk;
  }, [groundRisk, flightGeography]);

  return (
    <Card style={{ height: '100%' }}>
      <CardContent style={{ height: '100%' }}>
        {loading && <Progress variant='ring' placement='global' visible />}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          {errorText && (
            <Text
              variant='secondary'
              style={{
                color: theme.base.palette.urgent,
                border: `1px solid ${theme.base.palette.urgent}`,
                padding: '0.5rem',
                borderRadius: '0.5rem',
                fontSize: '10',
                whiteSpace: 'pre-line',
              }}
            >
              {errorText}
            </Text>
          )}

          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexGrow: 1,
            }}
          >
            <LayerList mapState={mapState} />
            <SearchTool />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {!propsValid && (
                <Text
                  variant='secondary'
                  style={{
                    color: theme.base.palette.urgent,
                  }}
                >
                  Tools disabled!
                </Text>
              )}
              <Toolbar
                cd={cd}
                onFlightGeographyChange={(g, autoZoomToFlightPath) => {
                  setFlightGeography(g);
                  if (autoZoomToFlightPath) {
                    getView().goTo(
                      (g?.geometry as __esri.Geometry)?.extent?.expand(1.5),
                    );
                  }
                }}
                // onFlightPathChange={setFlightPath}
                flightPathJSON={flightPathJSON}
                onGeozoneInfoChange={setGeozoneInfo}
                enabled={propsValid}
              />
            </div>
          </div>
        </div>
        {geozoneInfo && (
          <div
            style={{
              position: 'absolute',
              top: '4rem',
              right: '1.25rem',
              maxWidth: '50%',
              zIndex: 1000,
              backgroundColor: 'white',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: `1px solid ${theme.base.palette['brand-primary']}`,
              minWidth: '14rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '1rem',
                paddingBottom: '0.5rem',
              }}
            >
              <Text variant='h3'>GeoZone Info</Text>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginBottom: '-0.5rem',
                  marginRight: '-0.25rem',
                }}
                onClick={() => {
                  setGeozoneInfo(null);
                  getView().graphics.removeAll();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setGeozoneInfo(null);
                    getView().graphics.removeAll();
                  }
                }}
                role='button'
                tabIndex={0}
              >
                x
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '1.5rem',
              }}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: geozoneInfo }}
            />
          </div>
        )}
        <SoraMap
          style={{ height, position: 'relative' }}
          mapState={mapState}
          mapProps={props}
          onLayersAdded={() => setLayersAdded(true)}
          onGeozonesLoaded={(renderer: __esri.UniqueValueRenderer) =>
            setGeozonesRenderer(renderer)
          }
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.25rem',
          }}
        >
          <FieldValueList
            style={{
              maxWidth: '30%',
            }}
            variant='stacked'
            fields={[
              {
                name: 'Max. population in op. volume + ground risk buffer',
                value: loading ? (
                  <Progress variant='ring' placement='inline' visible />
                ) : (
                  maxPopDensity
                ),
              },
              {
                name: 'Average population density in adjacent area',
                value: loading ? (
                  <Progress variant='ring' placement='inline' visible />
                ) : (
                  avgPopDensity
                ),
              },
              {
                name: 'Intrinsic ground risk',
                value: loading ? (
                  <Progress variant='ring' placement='inline' visible />
                ) : (
                  groundRiskValue
                ),
              },
            ]}
          />
          <Legends
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              maxWidth: '70%',
            }}
            flightVolume={flightVolume}
            intersectingGeozones={intersectingGeozones}
            intersectingLanduseClasses={intersectingLanduseClasses}
            geozonesRenderer={geozonesRenderer}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default withConfiguration(EasaExtensionsSORA);
