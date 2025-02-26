import {
  withConfiguration,
  Card,
  // Text,
  CardContent,
  FieldValueList
} from '@pega/cosmos-react-core';
import { useEffect, useState } from 'react';
import '../create-nonce';
import { DrawToolbar } from './tools/draw-toolbar/draw-toolbar';
import SearchTool from './tools/search-tool';
import { useGetPopulationDensity } from './hooks/useGetPopulationDensity';
import useCalculateFlightVolume from './hooks/useCalculateFlightVolume';
import type { ComponentProps, MapState } from './types';
import useUpdatePegaProps from './hooks/useUpdatePegaProps';
import useDebouncedEffect from './hooks/useDebouncedEffect';
import useGetPrintRequest from './hooks/useGetPrintRequest';
import useGetIntrinsicGroundRisk from './hooks/useGetIntrinsicGroundRisk';
import useMapState from './hooks/useMapState';
import SoraMap from './map/sora-map';
import useHighlightIntersectingLanduse from './hooks/useApplySpatialFilter';
import LayerList from './tools/layer-list';
import useGetIntersectingGeozones from './hooks/useGetIntersectingGeozones';

import Legends from './legends/legends';
import { getFlightGeography } from './tools/draw-toolbar/draw-utils';
import useGetIntersectingLanduses from './hooks/useGetIntersectingLanduses';

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

// TODO: ask Piotr about the parameters that are text and if we want to add them to the pega database. such as portal url, print service url, etc.

// TODO: need to handle the geozones correctly. Only have geozones for portugal at the moment.

// TODO: seems like the iGRC is not calculated correctly. see area where the max pop density is like 7

export const EasaExtensionsSORA = (props: ComponentProps) => {
  const {
    getPConnect,
    height,
    flightPathJSON,
    mapStateJSON,
    cd,
    vO,
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

  const pConnect = getPConnect();

  const { flightVolume, calculateVolume } = useCalculateFlightVolume({ ...props, flightGeography });

  // Replace the existing useEffect with useDebouncedEffect
  useDebouncedEffect(
    () => {
      if (!layersAdded) return;
      calculateVolume();
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
      : null
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
    groundRisk
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
    if (!layersAdded) return;
    calculatePopDensities();
    queryIntersectingLanduses();
  }, [flightVolume, layersAdded, calculatePopDensities, queryIntersectingLanduses]);

  // highlight the intersecting landuse when flightVolume changes
  useEffect(() => {
    if (!layersAdded) return;
    highlightIntersectingLanduse();
  }, [flightVolume, layersAdded, highlightIntersectingLanduse]);

  // Call calculateIntrinsicGroundRisk when populationDensity, cd, or vO changes
  useEffect(() => {
    if (!layersAdded) return;
    calculateIntrinsicGroundRisk();
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
  }, [groundRisk, printRequest, layersAdded, updatePegaProps, mapState]);

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
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <LayerList mapState={mapState} />
            <SearchTool />
            <DrawToolbar
              cd={cd}
              onFlightGeographyChange={setFlightGeography}
              onFlightPathChange={setFlightPath}
              flightPathJSON={flightPathJSON}
            />
          </div>
        </div>
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
                value: maxPopDensity
              },
              {
                name: 'Average population density in adjacent area',
                value: avgPopDensity
              },
              {
                name: 'Intrinsic ground risk',
                value: groundRisk
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
