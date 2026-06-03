import { useCallback, useState, useRef } from 'react';
import { getView } from '../map/view';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
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
// The pop-density and landuse services have ~100 m native resolution.
// Using the raw view resolution at high zoom (e.g. 0.6 m at zoom 18) would
// request a ~277 M pixel image for a 5 km adjacent-area query and hit the
// service's image-size limit. Clamp to a minimum of 100 m.
const MIN_PIXEL_SIZE_METERS = 100;

const getPixelSize = () => {
  const resolution = Math.max(getView().resolution, MIN_PIXEL_SIZE_METERS);
  return {
    x: resolution,
    y: resolution,
    spatialReference: {
      wkid: getView().spatialReference.wkid,
    },
  };
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

      const pixelSize = getPixelSize();

      const opStats = await layer.computeStatisticsHistograms({
        geometry,
        pixelSize,
      });

      const stats = opStats.statistics[0];
      if (stats?.count && stats?.avg !== null && stats?.avg !== undefined) {
        // Geographic average: multiply the cell-only average by the fraction of
        // populated (non-NoData) cells. This accounts for uninhabited areas which
        // have NoData in the raster and would otherwise be excluded from the average.
        const pixelArea = pixelSize.x * pixelSize.y;
        const totalCellCount =
          Math.abs(geometryEngine.planarArea(geometry)) / pixelArea;
        if (!totalCellCount) return _.round(stats.avg, 2);
        return _.round((stats.avg * stats.count) / totalCellCount, 2);
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

      // Define a clip raster function to include partial cells
      // buffer the opAndGr by 1/2 the diagonal of the pixel size to pick up partial cells
      const bufferedOpAndGr = geometryEngine.buffer(
        opAndGr as __esri.Polygon,
        (layer.serviceRasterInfo.pixelSize.x / 2) * 1.22,
      );
      const clipRF = new RasterFunction({
        functionName: 'Clip',
        functionArguments: {
          ClippingGeometry: bufferedOpAndGr as __esri.Polygon,
          ClippingType: 1, // 1 = keep inside, set outside to NoData
        },
      });

      const landuseHistograms = await layer.computeHistograms({
        geometry: bufferedOpAndGr as __esri.Polygon,
        rasterFunction: clipRF as __esri.RasterFunction,
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

  const getLanduseAvgPopDensityAdjacentArea = useCallback(
    async (geometry: __esri.Polygon, layer: __esri.ImageryLayer) => {
      const bufferedGeometry = geometryEngine.buffer(
        geometry,
        (layer.serviceRasterInfo.pixelSize.x / 2) * 1.22,
      );
      const clipRF = new RasterFunction({
        functionName: 'Clip',
        functionArguments: {
          ClippingGeometry: bufferedGeometry as __esri.Polygon,
          ClippingType: 1,
        },
      });
      const landuseHistograms = await layer.computeHistograms({
        geometry: bufferedGeometry as __esri.Polygon,
        rasterFunction: clipRF as __esri.RasterFunction,
      });
      const counts = landuseHistograms.histograms?.[0]?.counts;
      if (!counts) return null;

      // Weighted geographic average: sum(count[i] * density[i]) / total_cells.
      // total_cells includes all pixels (uninhabited land, water, etc.) so the
      // result is the true area-averaged population density, not just the average
      // over inhabited classes.
      let weightedSum = 0;
      let totalCells = 0;
      counts.forEach((count: number, landuseClass: number) => {
        totalCells += count;
        if (count > 0) {
          const override = overriddenLandUse?.find(
            (lu) => lu.Code === landuseClass.toString(),
          );
          const density =
            override?.OverridePopulationDensity !== null && override?.OverridePopulationDensity !== undefined
              ? override.OverridePopulationDensity
              : landusePopDensityLookup[landuseClass];
          if (density !== null && density !== undefined) {
            weightedSum += count * density;
          }
        }
      });

      if (!totalCells) return null;
      return _.round(weightedSum / totalCells, 2);
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
      let maxPopDensityOperationalGroundRisk: number | null = null;
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

      // Compute landuse-based geographic average for adjacent areas and keep
      // the higher of the two estimates (pop-density layer vs landuse layer).
      if (
        landuseLayer &&
        landuseLayer.loaded &&
        currentFlightVolumes &&
        currentFlightVolumes.length > 0
      ) {
        const adjacentAreas = currentFlightVolumes
          .map((fv) => fv.adjacentArea?.geometry)
          .filter(Boolean) as __esri.Polygon[];

        if (adjacentAreas.length > 0) {
          const computeLanduseAvg = async (area: __esri.Polygon) => {
            const landuseAvg = await getLanduseAvgPopDensityAdjacentArea(
              area,
              landuseLayer,
            );
            if (landuseAvg !== null && landuseAvg > 0) {
              popDensity.avgPopDensityAdjacentArea = Math.max(
                popDensity.avgPopDensityAdjacentArea ?? 0,
                landuseAvg,
              );
            }
          };

          try {
            const combinedAdjacentArea = geometryEngine.union(adjacentAreas);
            if (combinedAdjacentArea) {
              await computeLanduseAvg(combinedAdjacentArea as __esri.Polygon);
            }
          } catch (error) {
            await computeLanduseAvg(adjacentAreas[0]);
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
  }, [overriddenLandUse, getLanduseAvgPopDensityAdjacentArea]);

  return {
    populationDensity,
    calculatePopDensities,
  };
};

export default useGetPopulationDensity;
