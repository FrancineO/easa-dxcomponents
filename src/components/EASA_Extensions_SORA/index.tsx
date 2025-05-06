import {
  withConfiguration,
  Card,
  CardContent,
  FieldValueList,
  Text,
  useTheme,
  Progress
} from '@pega/cosmos-react-core';
import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import '../create-nonce';
import { Toolbar } from './tools/toolbar/toolbar';
import SearchTool from './tools/search-tool';
import { useGetPopulationDensity } from './hooks/useGetPopulationDensity';
import useCalculateFlightVolume from './hooks/useCalculateFlightVolume';
import type { ComponentProps, MapState } from './types';
import useUpdatePegaProps from './hooks/useUpdatePegaProps';
import useDebouncedEffect from './hooks/useDebouncedEffect';
import useGetPrintRequest from './hooks/useGetPrintRequest';
import useGetIntrinsicGroundRisk, { GroundRiskError } from './hooks/useGetIntrinsicGroundRisk';
import useMapState from './hooks/useMapState';
import SoraMap from './map/sora-map';
import useHighlightIntersectingLanduse from './hooks/useApplySpatialFilter';
import LayerList from './tools/layer-list';
import useGetIntersectingGeozones from './hooks/useGetIntersectingGeozones';

import Legends from './legends/legends';
import { getFlightGeography } from './tools/toolbar/draw-utils';
import useGetIntersectingLanduses from './hooks/useGetIntersectingLanduses';
import { getView } from './map/view';
import { geozoneRenderer, geozones, landUseLabels } from './renderers';

// https://map.droneguide.be/
// https://maptool-dipul.dfs.de/

// geozones in the future will be updateable by an api
// - they will then be single files from each member states which will then mean single layers for each member state, or the api can update the whole layer.

// TODO: can we make an interactive map of the resulting flight volume

// TODO: change the pop density layers from a resolution of 200m resolution to another value based on the drone height.
// See table in screenshot from alberto.
// Should write a script which fetches the data from the url this url: https://jrcbox.jrc.ec.europa.eu/index.php/s/QN29mKagdLqnfnT
// See mail from Alberto on 2025-01-23 (subject: Population density data for eSORA) for the password
// The various pop density layers need to be used to make the calculation.
// For visualizing on the map, we probably always want to show the 200m resolution (confirm with alberto)

// TODO: allow the user to upload a gpx or kml. low priority

// TODO: ask Piotr about the parameters that are text and if we want to add them to the pega database. such as portal url, print service url, etc.

// TODO: need to handle the geozones correctly. Only have geozones for portugal at the moment.

export const EasaExtensionsSORA = (props: ComponentProps) => {
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
    printDpi
  } = props;

  const [flightGeography, setFlightGeography] = useState<__esri.Graphic | null>(null);
  const [flightPath, setFlightPath] = useState<__esri.Geometry | null>(null);
  const [layersAdded, setLayersAdded] = useState(false);
  const [mapState, setMapState] = useState<MapState | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [geozoneInfo, setGeozoneInfo] = useState<string | null>(null);

  const pConnect = getPConnect();
  let PCore: any;
  const defaultTheme = useTheme();
  const theme = PCore ? merge(defaultTheme, PCore.getEnvironmentInfo().getTheme()) : defaultTheme;

  const { flightVolume, calculateVolume } = useCalculateFlightVolume({ ...props, flightGeography });

  // Replace the existing useEffect with useDebouncedEffect
  useDebouncedEffect(
    () => {
      if (!layersAdded) return;
      setErrorText(null);
      if (flightGeography) {
        setLoading(true);
      }
      try {
        calculateVolume();
      } catch (error: any) {
        setErrorText(error.message);
        setLoading(false);
      }
    },
    300,
    [flightGeography, props, layersAdded, calculateVolume]
  );

  // Set up the hook for population density
  const { populationDensity, calculatePopDensities } = useGetPopulationDensity(
    flightVolume
      ? {
          ...flightVolume,
          flightGeography
        }
      : null,
    hFG
  );

  // Set up the hook to get the intersecting landuses
  const { intersectingLanduseClasses, queryIntersectingLanduses } =
    useGetIntersectingLanduses(flightVolume);

  // Set up the hook to get the intersecting geozones
  const { intersectingGeozones, queryIntersectingGeozones } =
    useGetIntersectingGeozones(flightVolume);

  // Set up the hook for ground risk
  const { groundRisk, calculateIntrinsicGroundRisk } = useGetIntrinsicGroundRisk({
    populationDensity,
    cd,
    vO,
    controlledGroundArea,
    criticalArea
  });

  // Set up the hook for print request
  const { printRequest, getPrintRequest } = useGetPrintRequest(
    printServiceUrl,
    printWidth,
    printHeight,
    printFormat,
    printDpi
  );

  useEffect(() => {
    if (mapStateJSON) {
      setMapState(JSON.parse(mapStateJSON));
    }
  }, [mapStateJSON]);

  // Set up the hook for highlighting the intersecting landuse
  const { highlightIntersectingLanduse } = useHighlightIntersectingLanduse(flightVolume);

  // Set up the hook for updating Pega props
  const updatePegaProps = useUpdatePegaProps(
    pConnect,
    populationDensity,
    printRequest,
    flightPath,
    mapState,
    groundRisk,
    errorText,
    flightVolume?.contingencyVolumeHeight ?? null,
    flightVolume?.adjacentVolumeWidth ?? null,
    flightVolume?.contingencyVolumeWidth ?? null,
    flightVolume?.groundRiskBufferWidth ?? null,
    intersectingGeozones
      ?.map(geozone => {
        return (
          geozones.find(g => g.value === geozone.attributes[geozoneRenderer.field1])?.label ?? ''
        );
      })
      .filter((value, index, self) => self.indexOf(value) === index) ?? null,
    intersectingLanduseClasses
      ?.map(landuse => {
        return landUseLabels[landuse];
      })
      .filter((value, index, self) => self.indexOf(value) === index) ?? null
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
    if (!flightVolume) return;
    calculatePopDensities()
      .catch(error => {
        setErrorText(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
    queryIntersectingLanduses();
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
  }, [groundRisk, printRequest, layersAdded, updatePegaProps, mapState, errorText]);

  const maxPopDensity =
    populationDensity?.maxPopDensityOperationalGroundRisk === 0
      ? '0'
      : populationDensity?.maxPopDensityOperationalGroundRisk;
  const avgPopDensity =
    populationDensity?.avgPopDensityAdjacentArea === 0
      ? '0'
      : populationDensity?.avgPopDensityAdjacentArea;

  return (
    <Card style={{ height: '100%' }}>
      <CardContent style={{ height: '100%' }}>
        {loading && <Progress variant='ring' placement='global' visible />}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
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
                fontSize: '10'
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
              flexGrow: 1
            }}
          >
            <LayerList mapState={mapState} />
            <SearchTool />
            <Toolbar
              cd={cd}
              onFlightGeographyChange={setFlightGeography}
              onFlightPathChange={setFlightPath}
              flightPathJSON={flightPathJSON}
              onGeozoneInfoChange={setGeozoneInfo}
            />
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
              border: `1px solid ${theme.base.palette['brand-primary']}`
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onClick={() => {
                setGeozoneInfo(null);
                getView().graphics.removeAll();
              }}
              onKeyDown={e => {
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
            <div
              style={{
                display: 'flex',
                fontSize: '1.5rem'
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
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.25rem'
          }}
        >
          <FieldValueList
            style={{
              maxWidth: '30%'
            }}
            variant='stacked'
            fields={[
              {
                name: 'Max. population in op. volume + ground risk buffer',
                value: loading ? (
                  <Progress variant='ring' placement='inline' visible />
                ) : (
                  maxPopDensity
                )
              },
              {
                name: 'Average population density in adjacent area',
                value: loading ? (
                  <Progress variant='ring' placement='inline' visible />
                ) : (
                  avgPopDensity
                )
              },
              {
                name: 'Intrinsic ground risk',
                value: loading ? <Progress variant='ring' placement='inline' visible /> : groundRisk
              }
            ]}
          />
          <Legends
            style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', maxWidth: '70%' }}
            flightVolume={flightVolume}
            intersectingGeozones={intersectingGeozones}
            intersectingLanduseClasses={intersectingLanduseClasses}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default withConfiguration(EasaExtensionsSORA);
