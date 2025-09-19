import { useCallback, useState, useRef } from 'react';
import { getView } from '../map/view';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import {
  type FlightVolume,
  type PopulationDensity,
  type ImpactedLandUse,
  LayerId,
} from '../types';
import { landusePopDensityLookup } from '../renderers';
import _ from 'lodash';
// import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

// const pixelSizes: { maxHeight: number; resolution: number }[] = [
//   { maxHeight: 152, resolution: 200 },
//   { maxHeight: 305, resolution: 400 },
//   { maxHeight: 762, resolution: 1000 },
//   { maxHeight: 1524, resolution: 2000 },
//   { maxHeight: 3048, resolution: 4000 },
//   { maxHeight: 6096, resolution: 5000 },
//   { maxHeight: 18288, resolution: 10000 }
// ];

// const getPixelSize = (height: number) => {
const getPixelSize = () => {
  // const pixelSizeDef = pixelSizes.find(size => size.maxHeight >= height);
  // if (!pixelSizeDef) {
  return {
    x: getView().resolution,
    y: getView().resolution,
    spatialReference: {
      wkid: getView().spatialReference.wkid,
    },
  };
  // }
  // return {
  //   x: pixelSizeDef.resolution,
  //   y: pixelSizeDef.resolution,
  //   spatialReference: {
  //     wkid: getView().spatialReference.wkid
  //   }
  // };
};

export const useGetPopulationDensity = (
  flightVolumes: FlightVolume[] | null,
  hFG: number,
  overriddenLandUse?: ImpactedLandUse[] | null,
) => {
  const [populationDensity, setPopulationDensity] =
    useState<PopulationDensity | null>(null);
  const calculationInProgress = useRef(false);
  const flightVolumesRef = useRef(flightVolumes);

  // Update the ref when params change
  flightVolumesRef.current = flightVolumes;

  const getMaxDensity = useCallback(
    async (geometry: __esri.Polygon, layer: __esri.ImageryLayer) => {
      if (hFG < 0) {
        throw new Error(
          'Cannot calculate population density with a negative height.',
        );
      }

      // const pixelSize = getPixelSize(hFG);
      const pixelSize = getPixelSize();
      const adjacentStats = await layer.computeStatisticsHistograms({
        geometry,
        pixelSize,
      });

      if (adjacentStats.statistics[0]?.max) {
        return _.round(adjacentStats.statistics[0].max, 2);
      }
      return 0;
    },
    [],
  );

  const getAvgDensity = useCallback(
    async (geometry: __esri.Polygon, layer: __esri.ImageryLayer) => {
      if (hFG < 0) {
        throw new Error(
          'Cannot calculate population density with a negative height.',
        );
      }

      // const pixelSize = getPixelSize(hFG);
      const pixelSize = getPixelSize();

      const opStats = await layer.computeStatisticsHistograms({
        geometry,
        pixelSize,
      });

      if (opStats.statistics[0]?.avg) {
        return _.round(opStats.statistics[0].avg, 2);
      }
      return null;
    },
    [],
  );

  const getOperationalAndGroundRiskGeometry = useCallback(() => {
    const currentFlightVolumes = flightVolumesRef.current;

    if (!currentFlightVolumes || currentFlightVolumes.length === 0) {
      return null;
    }

    try {
      const allGeometries: __esri.Polygon[] = [];

      // Collect all geometries from all flight volumes
      for (const flightVolume of currentFlightVolumes) {
        if (
          flightVolume?.flightGeography?.geometry &&
          flightVolume?.contingencyVolume?.geometry &&
          flightVolume?.groundRiskVolume?.geometry
        ) {
          allGeometries.push(
            flightVolume.flightGeography.geometry as __esri.Polygon,
            flightVolume.contingencyVolume.geometry as __esri.Polygon,
            flightVolume.groundRiskVolume.geometry as __esri.Polygon,
          );
        }
      }

      if (allGeometries.length === 0) {
        return null;
      }

      // Union all geometries
      return geometryEngine.union(allGeometries);
    } catch (error) {
      // If geometry union fails, return null
      return null;
    }
  }, []);

  const getPopulationDensity = useCallback(
    async (layer: __esri.ImageryLayer) => {
      // Use the ref instead of the params dependency
      const currentFlightVolumes = flightVolumesRef.current;

      const popDensity: PopulationDensity = {
        maxPopDensityOperationalGroundRisk: null,
        avgPopDensityAdjacentArea: null,
        maxPopDensitySource: 'pop-density',
      };

      // Get the max density for the combined operational and ground risk area
      const opAndGr = getOperationalAndGroundRiskGeometry();
      if (!opAndGr) {
        return popDensity;
      }
      const maxDensity = await getMaxDensity(opAndGr as __esri.Polygon, layer);
      popDensity.maxPopDensityOperationalGroundRisk = maxDensity;

      // Get the average density for all adjacent areas combined
      if (currentFlightVolumes && currentFlightVolumes.length > 0) {
        const adjacentAreas = currentFlightVolumes
          .map((fv) => fv.adjacentArea?.geometry)
          .filter(Boolean) as __esri.Polygon[];

        if (adjacentAreas.length > 0) {
          try {
            // Union all adjacent areas
            const combinedAdjacentArea = geometryEngine.union(adjacentAreas);
            if (combinedAdjacentArea) {
              const avgDensity = await getAvgDensity(
                combinedAdjacentArea as __esri.Polygon,
                layer,
              );
              popDensity.avgPopDensityAdjacentArea = avgDensity;
            }
          } catch (error) {
            // If union fails, use the first adjacent area as fallback
            const avgDensity = await getAvgDensity(adjacentAreas[0], layer);
            popDensity.avgPopDensityAdjacentArea = avgDensity;
          }
        }
      }

      return popDensity;
    },
    [],
  );

  // const waitForLayerViewsToUpdate = useCallback(async (layerIds: LayerId[]) => {
  //   const view = getView();

  //   // get the layers from the map
  //   const layersNotLoaded: LayerId[] = [];
  //   layerIds.forEach((layerId) => {
  //     const layer = view.map.allLayers.find((l) => l.id === layerId);
  //     if (layer && !layer.loaded) {
  //       layersNotLoaded.push(layerId);
  //     }
  //   });

  //   if (layersNotLoaded.length > 0) {
  //     await reactiveUtils.whenOnce(() =>
  //       layersNotLoaded.every(
  //         (layerId) => view.map.allLayers.find((l) => l.id === layerId)?.loaded,
  //       ),
  //     );
  //   }

  //   const additionalTimeout = 100;
  //   const promises: Promise<undefined>[] = [];
  //   const layerViews: __esri.LayerView[] = [];
  //   layerIds.forEach((layerId) => {
  //     const layerView = view.allLayerViews.find((l) => l.layer.id === layerId);
  //     if (layerView) {
  //       layerViews.push(layerView);
  //     }
  //   });
  //   layerViews.forEach((layerView) => {
  //     promises.push(
  //       new Promise<undefined>((resolve) => {
  //         if (!layerView?.updating) {
  //           // wait for 100ms
  //           setTimeout(() => {
  //             resolve(undefined);
  //           }, additionalTimeout);
  //         }
  //         reactiveUtils.watch(
  //           () => layerView?.updating,
  //           (updating: boolean) => {
  //             if (!updating) {
  //               setTimeout(() => {
  //                 resolve(undefined);
  //               }, additionalTimeout);
  //             }
  //           },
  //         );
  //       }),
  //     );
  //   });

  //   await Promise.all(promises);
  // }, []);

  const getLanduseMaxPopDensityOperationalGroundrisk = useCallback(
    async (layer: __esri.ImageryLayer) => {
      if (hFG < 0) {
        throw new Error(
          'Cannot calculate population density with a negative height.',
        );
      }

      // get the max population density in the Operational Ground Risk area
      const opAndGr = getOperationalAndGroundRiskGeometry();
      if (!opAndGr) {
        return null;
      }

      const landuseHistograms = await layer.computeHistograms({
        geometry: opAndGr as __esri.Polygon,
      });
      const intersectedLanduseClasses: number[] = [];
      const counts = landuseHistograms.histograms?.[0]?.counts;
      if (counts) {
        counts.forEach((count: number, landuseClass: number) => {
          if (count > 0) {
            intersectedLanduseClasses.push(landuseClass);
          }
        });
      }
      // Use corrected values if available, otherwise use default lookup
      const densities = intersectedLanduseClasses.map((index) => {
        // eslint-disable-next-line no-console
        console.log(
          `Processing landuse index: ${index} (type: ${typeof index})`,
        );

        if (overriddenLandUse) {
          // eslint-disable-next-line no-console
          console.log(`Looking for override with Code: '${index.toString()}'`);
          // eslint-disable-next-line no-console
          console.log(
            'Available overrides:',
            overriddenLandUse.map((lu) => ({
              Code: lu.Code,
              pyLabel: lu.pyLabel,
              OverridePopulationDensity: lu.OverridePopulationDensity,
            })),
          );

          const corrected = overriddenLandUse.find(
            (lu) => lu.Code === index.toString(),
          );

          if (corrected && corrected.OverridePopulationDensity !== null) {
            // eslint-disable-next-line no-console
            console.log(`Found override for landuse ${index}:`, corrected);
            return corrected.OverridePopulationDensity;
          }
          // eslint-disable-next-line no-console
          console.log(`No override found for landuse ${index}`);
        }
        const defaultDensity = landusePopDensityLookup[index];
        // eslint-disable-next-line no-console
        console.log(
          `Using default density for landuse ${index}:`,
          defaultDensity,
        );
        return defaultDensity;
      });

      // eslint-disable-next-line no-console
      console.log('Intersected landuse classes:', intersectedLanduseClasses);
      // eslint-disable-next-line no-console
      console.log('Corrected landuse data:', overriddenLandUse);
      // eslint-disable-next-line no-console
      console.log('Calculated densities:', densities);

      // Filter out undefined/null values and ensure we have valid densities
      const validDensities = densities.filter(
        (density) => density !== undefined && density !== null,
      );

      if (validDensities.length === 0) {
        return 0;
      }

      return Math.max(...validDensities);
    },
    [overriddenLandUse],
  );

  const calculatePopDensities = useCallback(async () => {
    // Use the ref instead of the params dependency
    const currentFlightVolumes = flightVolumesRef.current;

    // Prevent multiple simultaneous calculations
    if (calculationInProgress.current) return;

    // Reset states if no params
    if (!currentFlightVolumes || currentFlightVolumes.length === 0) {
      setPopulationDensity(null);
      return;
    }

    // Check that all flight volumes have the required properties
    const hasValidVolumes = currentFlightVolumes.every(
      (fv) =>
        fv.flightGeography &&
        fv.contingencyVolume &&
        fv.groundRiskVolume &&
        fv.adjacentArea,
    );

    if (!hasValidVolumes) {
      setPopulationDensity(null);
      return;
    }

    try {
      calculationInProgress.current = true;
      const view = getView();

      // Ensure the view and layers are ready before accessing map layers
      await view.when();

      // // Wait for layer views to finish updating
      // await waitForLayerViewsToUpdate([
      //   LayerId.populationDensity,
      //   LayerId.landuse,
      // ]);

      const popDensityLayer = view.map.layers.find(
        (layer) => layer.id === LayerId.populationDensity,
      ) as __esri.ImageryLayer;

      const landuseLayer = view.map.layers.find(
        (layer) => layer.id === LayerId.landuse,
      ) as __esri.ImageryLayer;

      if (!popDensityLayer) return;

      // First, get the landuse-based calculation for operational ground risk area
      let maxPopDensityOperationalGroundRisk = null;
      if (landuseLayer && landuseLayer.loaded) {
        try {
          maxPopDensityOperationalGroundRisk =
            await getLanduseMaxPopDensityOperationalGroundrisk(landuseLayer);
        } catch (error) {
          // If landuse calculation fails, continue with population density layer
          // The error is silently handled to prevent breaking the calculation
        }
      }

      // Then get the population density layer calculation
      const popDensity = await getPopulationDensity(popDensityLayer);

      // Use the maximum of both calculations when landuse-based calculation is available
      if (
        maxPopDensityOperationalGroundRisk !== null &&
        maxPopDensityOperationalGroundRisk > 0 &&
        Number.isFinite(maxPopDensityOperationalGroundRisk)
      ) {
        const popDensityValue =
          popDensity.maxPopDensityOperationalGroundRisk ?? 0;
        const landuseValue = maxPopDensityOperationalGroundRisk;

        if (landuseValue > popDensityValue) {
          // Landuse-based calculation (which includes overrides) is higher
          popDensity.maxPopDensityOperationalGroundRisk = landuseValue;
          popDensity.maxPopDensitySource = 'landuse';

          // Check if this is from an overridden value
          if (overriddenLandUse && overriddenLandUse.length > 0) {
            // Find which landuse class contributed to this value
            const contributingLanduse = overriddenLandUse.find(
              (lu) => lu.OverridePopulationDensity === landuseValue,
            );
            if (contributingLanduse) {
              popDensity.maxPopDensitySource = 'overridden-landuse';
              popDensity.maxPopDensityLanduseClass =
                contributingLanduse.pyLabel;
            }
          }
        } else {
          // Population density layer is higher
          popDensity.maxPopDensityOperationalGroundRisk = popDensityValue;
          popDensity.maxPopDensitySource = 'pop-density';
        }
      } else {
        // Only population density layer calculation available
        popDensity.maxPopDensitySource = 'pop-density';
      }

      // Calculate average density for all adjacent areas combined using landuse layer
      if (
        landuseLayer &&
        currentFlightVolumes &&
        currentFlightVolumes.length > 0
      ) {
        const adjacentAreas = currentFlightVolumes
          .map((fv) => fv.adjacentArea?.geometry)
          .filter(Boolean) as __esri.Polygon[];

        if (adjacentAreas.length > 0) {
          try {
            // Union all adjacent areas
            const combinedAdjacentArea = geometryEngine.union(adjacentAreas);
            if (combinedAdjacentArea) {
              const avgPopDensityLanduseAdjacentArea = await getAvgDensity(
                combinedAdjacentArea as __esri.Polygon,
                landuseLayer,
              );

              // TODO: Is this correct? Can I just take an average of the two averages?
              if (avgPopDensityLanduseAdjacentArea !== 0) {
                const combined =
                  (popDensity.avgPopDensityAdjacentArea ?? 0) +
                  (avgPopDensityLanduseAdjacentArea ?? 0);

                popDensity.avgPopDensityAdjacentArea =
                  combined !== 0
                    ? _.round(combined / 2, combined < 1 ? 2 : 0)
                    : 0;
              }
            }
          } catch (error) {
            // If union fails, use the first adjacent area as fallback
            const avgPopDensityLanduseAdjacentArea = await getAvgDensity(
              adjacentAreas[0],
              landuseLayer,
            );

            if (avgPopDensityLanduseAdjacentArea !== 0) {
              const combined =
                (popDensity.avgPopDensityAdjacentArea ?? 0) +
                (avgPopDensityLanduseAdjacentArea ?? 0);

              popDensity.avgPopDensityAdjacentArea =
                combined !== 0
                  ? _.round(combined / 2, combined < 1 ? 2 : 0)
                  : 0;
            }
          }
        }
      }

      setPopulationDensity(popDensity);
    } catch (error: any) {
      setPopulationDensity(null);
      const message =
        error?.details?.messages?.join(' ') ??
        error?.message ??
        'Unknown error';

      throw new Error(`Error calculating population densities: \r ${message}`);
    } finally {
      calculationInProgress.current = false;
    }
  }, [overriddenLandUse]); // Add overriddenLandUse dependency since it's used in landuse calculation

  return {
    populationDensity,
    calculatePopDensities,
  };
};

export default useGetPopulationDensity;
