import {
  withConfiguration,
  Card,
  CardContent,
  FieldValueList,
  Text,
  useTheme,
  Progress,
  Button,
  useModalManager,
} from '@pega/cosmos-react-core';
import { merge } from 'lodash';
import { useEffect, useMemo, useState, useCallback } from 'react';
import '../create-nonce';
import { Toolbar, type Tool } from './tools/toolbar/toolbar';
import SearchTool from './tools/search-tool';
import { useGetPopulationDensity } from './hooks/useGetPopulationDensity';
import useCalculateFlightVolumes from './hooks/useCalculateFlightVolume';
import {
  validateComponentProps,
  type ComponentProps,
  type MapState,
  type ImpactedLandUse,
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
import PopulationDensityOverrideModal from './components/population-density-override-modal';
import PopDensitySourceInfo from './components/pop-density-source-info';
import FlightPaths from './components/flight-paths';

import Legends from './legends/legends';
import { getFlightPaths } from './tools/toolbar/draw-utils';
import useGetIntersectingLanduses from './hooks/useGetIntersectingLanduses';
import { getView } from './map/view';
import {
  landUseLabels,
  landusePeopleOutdoor,
  landusePopDensityLookup,
} from './renderers';
import geozonesDefintions from './geozone-definitions';
import CircleRadius from './tools/toolbar/circle-radius';

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

  const [flightPaths, setFlightPaths] = useState<__esri.Graphic[]>([]);
  // const [flightPath, setFlightPath] = useState<__esri.Geometry | null>(null);
  const [layersAdded, setLayersAdded] = useState(false);
  const [mapState, setMapState] = useState<MapState | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [geozoneInfo, setGeozoneInfo] = useState<string | null>(null);
  const [propsValid, setPropsValid] = useState(false);
  const [geozonesRenderer, setGeozonesRenderer] =
    useState<__esri.UniqueValueRenderer | null>(null);
  const [showPopulationDensityCorrection, setShowPopulationDensityCorrection] =
    useState(false);
  const [overriddenLandUse, setOverriddenLandUse] = useState<
    ImpactedLandUse[] | null
  >(null);
  const [isMultiMode, setIsMultiMode] = useState(true);
  const [forceClearToolbar, setForceClearToolbar] = useState(false);
  const [circleRadius, setCircleRadius] = useState<number | undefined>(
    undefined,
  );
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const { create } = useModalManager();

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
      setErrorText(null);
      // eslint-disable-next-line no-console
      console.log('%cProps are valid!', `color: ${'rgb(93, 255, 153)'}`);
    } catch (error: any) {
      setErrorText(error.message);
      // eslint-disable-next-line no-console
      console.error('Error validating props:', error);
      setPropsValid(false);
    }
  }, [
    props,
    // Critical props that should trigger re-validation when they change
    props.tR,
    props.vO,
    props.hFG,
    props.cd,
    props.controlledGroundArea,
    props.criticalArea,
    props.flightPathJSON,
    props.mapStateJSON,
    props.vWind,
  ]);

  const { flightVolumes, calculateVolume } = useCalculateFlightVolumes({
    ...props,
    flightPaths, // Pass the array of flight paths
  });

  // Replace the existing useEffect with useDebouncedEffect
  useDebouncedEffect(
    () => {
      if (!layersAdded || !propsValid) return;
      setErrorText(null);
      if (flightPaths?.length > 0 && !isMultiMode) {
        setLoading(true);
      }
      try {
        calculateVolume();
      } catch (error: any) {
        setErrorText(error.message);
        setLoading(false);
        // Silently handle errors
      }
    },
    300,
    [flightPaths, props, layersAdded, calculateVolume],
  );

  // Function to toggle drawing mode for additional flight paths
  const handleMultiModeToggleClick = useCallback(() => {
    if (propsValid) {
      // toggle add mode
      setIsMultiMode(!isMultiMode);
      setShowPopulationDensityCorrection(false); // Close any open modals
    }
  }, [propsValid, isMultiMode]);

  // Function to remove a specific flight path
  const handleRemoveFlightPath = useCallback((index: number) => {
    setFlightPaths((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      // If no flight paths remain, clear all graphics
      if (updated.length === 0) {
        // Clear sketch view model layer graphics
        const view = getView();
        const sketchLayer = view.map?.findLayerById(
          'easa-sora-sketch-layer',
        ) as any;
        sketchLayer?.removeAll();

        // Force clear the toolbar state
        setForceClearToolbar(true);
      }

      return updated;
    });
  }, []);

  // Function to clear all flight paths
  const handleClearAllFlightPaths = useCallback(() => {
    setFlightPaths([]);
    // setIsMultiMode(false);

    // Clear all graphics layers
    const view = getView();
    const sketchLayer = view.map?.findLayerById(
      'easa-sora-sketch-layer',
    ) as any;
    sketchLayer?.removeAll();

    // Force clear the toolbar state
    setForceClearToolbar(true);
  }, []);

  // Set up the hook for population density
  const { populationDensity, calculatePopDensities } = useGetPopulationDensity(
    flightVolumes,
    hFG,
    overriddenLandUse,
  );

  // Set up the hook to get the intersecting landuses
  const {
    intersectingLanduseClasses,
    intersectingAdjacentAreaLanduseClasses,
    queryIntersectingLanduses,
  } = useGetIntersectingLanduses(flightVolumes);

  // Set up the hook to get the intersecting geozones
  const { intersectingGeozones, queryIntersectingGeozones } =
    useGetIntersectingGeozones(flightVolumes);

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
    useHighlightIntersectingLanduse(flightVolumes);

  const getGeozoneLabel = (geozone: __esri.Graphic) => {
    if (!geozone || !geozonesRenderer) return null;
    const def = geozonesDefintions.find(
      (g) => g.value === geozone.attributes[geozonesRenderer?.field],
    );
    return (
      def?.label ??
      `Unknown - ${geozone.attributes[geozonesRenderer?.field]} not found in geozones defintions`
    );
  };

  // Helper function to build impacted landuse data with existing overrides
  const buildImpactedLandUseData = useCallback(() => {
    if (!intersectingLanduseClasses) return null;

    return intersectingLanduseClasses
      .map((landuse) => {
        // Check if there's an existing override for this landuse
        const existingOverride = overriddenLandUse?.find(
          (override: ImpactedLandUse) => override.Code === `${landuse}`,
        );

        return {
          pyLabel: landUseLabels[landuse],
          Code: `${landuse}`,
          PopulationDensity: landusePopDensityLookup[landuse] ?? 0,
          PeopleOutdoor: landusePeopleOutdoor.includes(landuse),
          AssemblyOfPeople: landusePeopleOutdoor.includes(landuse),
          OverridePopulationDensity:
            existingOverride?.OverridePopulationDensity ?? null,
          OverrideReason: existingOverride?.OverrideReason ?? null,
        };
      })
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [intersectingLanduseClasses, overriddenLandUse]);

  // TODO: do we need to send contingencyVolumeHeight, adjacentVolumeWidth, contingencyVolumeWidth, groundRiskBufferWidth as an array?
  // Or do we need to send the max values?

  // Set up the hook for updating Pega props
  const updatePegaProps = useUpdatePegaProps(
    pConnect,
    populationDensity,
    printRequest,
    flightPaths?.map((fg) => fg.geometry as __esri.Geometry) ?? null,
    mapState,
    groundRisk,
    errorText,
    flightVolumes?.length > 0
      ? flightVolumes
          .filter((fv) => fv.contingencyVolumeHeight !== null)
          .map((fv) => fv.contingencyVolumeHeight!)
          .reduce((max, current) => Math.max(max, current), 0)
      : null,
    flightVolumes?.length > 0
      ? flightVolumes
          .filter((fv) => fv.adjacentVolumeWidth !== null)
          .map((fv) => fv.adjacentVolumeWidth!)
          .reduce((max, current) => Math.max(max, current), 0)
      : null,
    flightVolumes?.length > 0
      ? flightVolumes
          .filter((fv) => fv.contingencyVolumeWidth !== null)
          .map((fv) => fv.contingencyVolumeWidth!)
          .reduce((max, current) => Math.max(max, current), 0)
      : null,
    flightVolumes?.length > 0
      ? flightVolumes
          .filter((fv) => fv.groundRiskBufferWidth !== null)
          .map((fv) => fv.groundRiskBufferWidth!)
          .reduce((max, current) => Math.max(max, current), 0)
      : null,
    intersectingGeozones
      ?.map((geozone: __esri.Graphic) => {
        return getGeozoneLabel(geozone);
      })
      .filter((gz) => gz !== null)
      .filter((value, index, self) => self.indexOf(value) === index) ?? null,
    (overriddenLandUse || buildImpactedLandUseData()) ?? null,
    intersectingAdjacentAreaLanduseClasses
      ?.map((landuse) => {
        return {
          pyLabel: landUseLabels[landuse],
          Code: `${landuse}`,
          PopulationDensity:
            populationDensity?.maxPopDensityOperationalGroundRisk ?? 0,
          PeopleOutdoor: landusePeopleOutdoor.includes(landuse),
          AssemblyOfPeople: landusePeopleOutdoor.includes(landuse),
          OverridePopulationDensity: null,
          OverrideReason: null,
        };
      })
      .filter((value, index, self) => self.indexOf(value) === index) ?? null,
  );

  // Set up the effect for flight geometry which comes in as a parameter
  useEffect(() => {
    if (flightPathJSON && layersAdded) {
      // Reset corrected landuse when flight geometry changes
      setOverriddenLandUse(null);

      const fg = getFlightPaths(flightPathJSON);
      if (!fg) return;
      setFlightPaths([fg]);
    }
  }, [flightPathJSON, layersAdded]);

  // Set up the effect for map state
  const updatedMapState = useMapState(mapState);

  // Set up the effect for print request
  useEffect(() => {
    if (flightVolumes.length === 0) return;
    getPrintRequest();
  }, [getPrintRequest, flightVolumes]);

  useEffect(() => {
    if (updatedMapState) {
      setMapState({ ...updatedMapState });
    }
  }, [updatedMapState]);

  useEffect(() => {
    // Reset corrected landuse when flight volumes change
    setOverriddenLandUse(null);
  }, [flightVolumes]);

  // Call calculatePopDensities when flightVolumes change
  useEffect(() => {
    queryIntersectingLanduses();
    if (flightVolumes.length === 0) return;
    calculatePopDensities()
      .catch((error) => {
        setErrorText(error.message);
        // Silently handle errors
      })
      .finally(() => {
        setLoading(false);
      });
  }, [flightVolumes, calculatePopDensities, queryIntersectingLanduses]);

  // Recalculate population densities when overrides change
  useEffect(() => {
    if (flightVolumes.length === 0 || !layersAdded) return;
    setLoading(true);
    calculatePopDensities().catch((error) => {
      setErrorText(error.message);
      // Silently handle errors
    });
  }, [overriddenLandUse, calculatePopDensities, flightVolumes, layersAdded]);

  // highlight the intersecting landuse when flightVolumes change
  useEffect(() => {
    if (!layersAdded) return;
    highlightIntersectingLanduse();
  }, [flightVolumes, layersAdded, highlightIntersectingLanduse]);

  // Call calculateIntrinsicGroundRisk when populationDensity, cd, or vO changes
  useEffect(() => {
    if (!layersAdded) return;
    try {
      calculateIntrinsicGroundRisk();
    } catch (error: any) {
      if (error instanceof GroundRiskError) {
        setErrorText(`Error calculating ground risk: ${error.message}`);
      }
      // Silently handle errors
    }
  }, [populationDensity, cd, vO, layersAdded, calculateIntrinsicGroundRisk]);

  // Call queryIntersectingGeozones when flightVolumes change
  useEffect(() => {
    if (!layersAdded) return;
    queryIntersectingGeozones();
  }, [flightVolumes, layersAdded, queryIntersectingGeozones]);

  // Call updatePegaProps when groundRisk, printRequest, or intersectingGeozones changes
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
    intersectingGeozones,
    intersectingLanduseClasses,
    intersectingAdjacentAreaLanduseClasses,
    overriddenLandUse,
  ]);

  const maxPopDensity = useMemo(() => {
    if (!populationDensity || flightPaths.length === 0) return null;
    return populationDensity?.maxPopDensityOperationalGroundRisk === 0
      ? '0'
      : populationDensity?.maxPopDensityOperationalGroundRisk;
  }, [populationDensity, flightPaths]);

  // Handler for removing overrides
  const handleRemoveOverride = useCallback(
    (landuseClass: string) => {
      if (overriddenLandUse) {
        // Find the override by matching the landuse class name (pyLabel)
        const overrideToRemove = overriddenLandUse.find(
          (override) => override.pyLabel === landuseClass,
        );

        if (overrideToRemove) {
          const updatedOverrides = overriddenLandUse.filter(
            (override) => override.Code !== overrideToRemove.Code,
          );
          setOverriddenLandUse(
            updatedOverrides.length > 0 ? updatedOverrides : null,
          );
        }
      }
    },
    [overriddenLandUse],
  );

  const avgPopDensity = useMemo(() => {
    if (!populationDensity || !flightPaths) return null;
    return populationDensity?.avgPopDensityAdjacentArea === 0
      ? '0'
      : populationDensity?.avgPopDensityAdjacentArea;
  }, [populationDensity, flightPaths]);

  const groundRiskValue = useMemo(() => {
    if (!groundRisk || !flightPaths) return null;
    return groundRisk;
  }, [groundRisk, flightPaths]);

  const populationDensityCorrectionModal = useCallback(() => {
    return (
      <PopulationDensityOverrideModal
        impactedLandUse={
          intersectingLanduseClasses
            ?.map((landuse) => {
              // Check if there's an existing override for this landuse
              const existingOverride = overriddenLandUse?.find(
                (override) => override.Code === `${landuse}`,
              );

              return {
                pyLabel: landUseLabels[landuse],
                Code: `${landuse}`,
                PopulationDensity:
                  populationDensity?.maxPopDensityOperationalGroundRisk ?? 0,
                PeopleOutdoor: landusePeopleOutdoor.includes(landuse),
                AssemblyOfPeople: landusePeopleOutdoor.includes(landuse),
                OverridePopulationDensity:
                  existingOverride?.OverridePopulationDensity ?? null,
                OverrideReason: existingOverride?.OverrideReason ?? null,
              };
            })
            .filter((value, index, self) => self.indexOf(value) === index) ??
          null
        }
        onClose={() => setShowPopulationDensityCorrection(false)}
        onSave={(overriddenLandUseData: ImpactedLandUse[]) => {
          setOverriddenLandUse(overriddenLandUseData);
          setShowPopulationDensityCorrection(false);
        }}
      />
    );
  }, [intersectingLanduseClasses, populationDensity, overriddenLandUse]);

  // Create modal when button is clicked
  useEffect(() => {
    if (showPopulationDensityCorrection) {
      create(populationDensityCorrectionModal);
    }
  }, [
    showPopulationDensityCorrection,
    create,
    populationDensityCorrectionModal,
  ]);

  // Reset force clear flag after it's been used
  useEffect(() => {
    if (forceClearToolbar) {
      setForceClearToolbar(false);
    }
  }, [forceClearToolbar]);

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
                onSelectedToolChange={setSelectedTool}
                flightPaths={flightPaths}
                onNewFlightPaths={(graphics, autoZoomToFlightPath) => {
                  if (!isMultiMode) {
                    setFlightPaths(graphics || []);
                    return;
                  }

                  if (graphics) {
                    // Check if this graphic is already in the array to prevent duplicates
                    setFlightPaths((prev) => {
                      // compare the arrays and return only those that are not in both arrays
                      if (prev.length === 0) {
                        return graphics;
                      }
                      const allGraphics = [...prev, ...graphics];

                      // remove all duplicate graphics from the allGraphics array
                      const uniqueGraphics: __esri.Graphic[] = [];
                      allGraphics.forEach((g, i) => {
                        if (i === allGraphics.length - 1) {
                          uniqueGraphics.push(g);
                          return;
                        }
                        const nextGraphic = allGraphics[i + 1];

                        const isDuplicate =
                          g.geometry &&
                          nextGraphic.geometry &&
                          g.geometry.type === nextGraphic.geometry.type &&
                          JSON.stringify(g.geometry.toJSON()) ===
                            JSON.stringify(nextGraphic.geometry.toJSON());

                        if (!isDuplicate) {
                          uniqueGraphics.push(g);
                        }
                      });

                      return uniqueGraphics;
                    });
                    // Keep add mode active so user can continue adding more paths
                    // Add mode will be exited when user clicks the button again or clears
                  } else {
                    setFlightPaths([]);
                  }

                  if (autoZoomToFlightPath && graphics) {
                    getView().goTo(
                      (graphics[0].geometry as __esri.Geometry)?.extent?.expand(
                        1.5,
                      ),
                    );
                  }
                }}
                // onFlightPathChange={setFlightPath}
                flightPathJSON={flightPathJSON}
                onGeozoneInfoChange={setGeozoneInfo}
                enabled={propsValid}
                isMultiMode={isMultiMode}
                forceClear={forceClearToolbar}
                circleRadius={circleRadius}
                onCircleRadiusChange={setCircleRadius}
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
        <div style={{ position: 'relative', height }}>
          <SoraMap
            style={{ height, position: 'relative' }}
            mapState={mapState}
            mapProps={props}
            onLayersAdded={() => setLayersAdded(true)}
            onGeozonesLoaded={(renderer: __esri.UniqueValueRenderer) =>
              setGeozonesRenderer(renderer)
            }
          />

          {(selectedTool === 'circle' || flightPaths.length > 0) && (
            <FlightPaths
              flightPaths={flightPaths}
              onRemoveFlightPath={handleRemoveFlightPath}
              onClearAllFlightPaths={handleClearAllFlightPaths}
              onMultiModeToggleClick={handleMultiModeToggleClick}
              isMultiMode={isMultiMode}
              disabled={!propsValid}
            >
              {selectedTool === 'circle' && (
                <CircleRadius
                  onCircleRadiusChange={setCircleRadius}
                  circleRadius={circleRadius}
                />
              )}
            </FlightPaths>
          )}

          {/* Population Density Correction Button - positioned over bottom left corner of map */}
          {intersectingLanduseClasses &&
            intersectingLanduseClasses.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  zIndex: 1000,
                }}
              >
                <Button
                  variant='primary'
                  onClick={() => setShowPopulationDensityCorrection(true)}
                  disabled={!propsValid}
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #e0e0e0',
                    position: 'relative',
                  }}
                >
                  Override Landuse Population Density?
                  {/* Badge showing override count */}
                  {overriddenLandUse &&
                    overriddenLandUse.length > 0 &&
                    (() => {
                      const activeOverrideCount = overriddenLandUse.filter(
                        (item) =>
                          item.OverridePopulationDensity !== null ||
                          item.OverrideReason !== null,
                      ).length;

                      return activeOverrideCount > 0 ? (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-6px',
                            right: '-6px',
                            backgroundColor: '#f57c00',
                            color: 'white',
                            borderRadius: '12px',
                            minWidth: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: '600',
                            padding: '0 6px',
                            border: '2px solid white',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                            lineHeight: '1',
                          }}
                        >
                          {activeOverrideCount}
                        </div>
                      ) : null;
                    })()}
                </Button>
              </div>
            )}
        </div>
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
                value:
                  maxPopDensity || loading ? (
                    <div>
                      {loading ? (
                        <Progress variant='ring' placement='inline' visible />
                      ) : (
                        `${maxPopDensity} ppl/km²`
                      )}
                      {populationDensity &&
                        flightVolumes.length > 0 &&
                        !loading && (
                          <PopDensitySourceInfo
                            populationDensity={populationDensity}
                            overriddenLandUse={overriddenLandUse}
                            intersectingLanduseClasses={
                              intersectingLanduseClasses
                            }
                            onRemoveOverride={handleRemoveOverride}
                          />
                        )}
                    </div>
                  ) : null,
              },
              {
                name: 'Average population density in adjacent area',
                value:
                  avgPopDensity || loading ? (
                    <div>
                      {loading ? (
                        <Progress variant='ring' placement='inline' visible />
                      ) : (
                        `${avgPopDensity} ppl/km²`
                      )}
                    </div>
                  ) : null,
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
            flightVolumes={flightVolumes}
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
