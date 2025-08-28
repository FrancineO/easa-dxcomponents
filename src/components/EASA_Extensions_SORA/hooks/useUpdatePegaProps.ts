import { useCallback, useRef } from 'react';
import type { ImpactedLandUse, MapState, PopulationDensity } from '../types';
import _ from 'lodash';

const useUpdatePegaProps = (
  pConnect: any,
  populationDensity: PopulationDensity | null,
  printRequest: any,
  flightPath: __esri.Geometry | null,
  mapState: MapState | null,
  groundRisk: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null,
  errorText: string | null,
  contingencyVolumeHeight: number | null,
  adjacentVolumeWidth: number | null,
  contingencyVolumeWidth: number | null,
  groundRiskBufferWidth: number | null,
  impactedGeoZones: string[] | null,
  impactedLandUse: ImpactedLandUse[] | null,
  impactedLandUseAdjacentArea: ImpactedLandUse[] | null,
) => {
  const paramsRef = useRef({
    pConnect,
    populationDensity,
    printRequest,
    flightPath,
    mapState,
    groundRisk,
    errorText,
    contingencyVolumeHeight,
    adjacentVolumeWidth,
    contingencyVolumeWidth,
    groundRiskBufferWidth,
    impactedGeoZones,
    impactedLandUse,
    impactedLandUseAdjacentArea,
  });
  const updateInProgress = useRef(false);

  // Update the ref when params change
  paramsRef.current = {
    pConnect,
    populationDensity,
    printRequest,
    flightPath,
    mapState,
    groundRisk,
    errorText,
    contingencyVolumeHeight,
    adjacentVolumeWidth,
    contingencyVolumeWidth,
    groundRiskBufferWidth,
    impactedGeoZones,
    impactedLandUse,
    impactedLandUseAdjacentArea,
  };

  // Empty dependency array since we're using ref
  return useCallback(async () => {
    // TODO: might have to call D_MapOutputSavable with all null values to clear the state
    const currentParams = paramsRef.current;
    const {
      populationDensity: pD,
      printRequest: pR,
      pConnect: pC,
      groundRisk: gR,
      flightPath: fP,
      mapState: mS,
      errorText: eT,
      contingencyVolumeHeight: hCV,
      adjacentVolumeWidth: aVW,
      contingencyVolumeWidth: cVW,
      groundRiskBufferWidth: gRW,
      impactedGeoZones: iGZ,
      impactedLandUse: iLU,
      impactedLandUseAdjacentArea: iLUAA,
    } = currentParams;

    // if (!pD?.maxPopDensityOperationalGroundRisk || !pD?.avgPopDensityAdjacentArea || !pR || !gR)
    //   return;

    // Prevent multiple simultaneous updates
    if (updateInProgress.current) return;
    if (!pC.getValue || !pConnect) return;

    const hCVRounded = hCV ? _.round(hCV) : null;

    const color = 'rgb(3, 124, 26)';
    const errorColor = 'rgb(194, 52, 52)';
    // eslint-disable-next-line no-console
    console.log('%c--------------------------------', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log('%c Props to send to pega:', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log('%c   groundRisk:', `color: ${color}`, gR);
    // eslint-disable-next-line no-console
    console.log('%c   populationDensity:', `color: ${color}`, pD);
    // eslint-disable-next-line no-console
    console.log('%c   printRequest:', `color: ${color}`, pR);
    // eslint-disable-next-line no-console
    console.log('%c   flightPath:', `color: ${color}`, fP);
    // eslint-disable-next-line no-console
    console.log('%c   mapState:', `color: ${color}`, mS);
    // eslint-disable-next-line no-console
    console.log('%c   errorText:', `color: ${color}`, eT);
    // eslint-disable-next-line no-console
    console.log('%c   contingencyVolumeHeight:', `color: ${color}`, hCVRounded);
    // eslint-disable-next-line no-console
    console.log('%c   adjacentVolumeWidth:', `color: ${color}`, aVW);
    // eslint-disable-next-line no-console
    console.log('%c   contingencyVolumeWidth:', `color: ${color}`, cVW);
    // eslint-disable-next-line no-console
    console.log('%c   groundRiskBufferWidth:', `color: ${color}`, gRW);
    // eslint-disable-next-line no-console
    console.log('%c   impactedGeoZones:', `color: ${color}`, iGZ);
    // eslint-disable-next-line no-console
    console.log('%c   impactedLandUse:', `color: ${color}`, iLU);
    // eslint-disable-next-line no-console
    console.log('%c   impactedLandUseAdjacentArea:', `color: ${color}`, iLUAA);

    try {
      // eslint-disable-next-line no-console
      console.log('%c Updating Pega props...', `color: ${color}`);
      updateInProgress.current = true;
      const caseId = pC.getValue('.pyID');

      if (!caseId) {
        // eslint-disable-next-line no-console
        console.log(
          "%c   Could not get caseId '.pyID'",
          `color: ${errorColor}`,
        );
        // eslint-disable-next-line no-console
        console.log(
          '%c   Props will not be sent to pega',
          `color: ${errorColor}`,
        );
        // eslint-disable-next-line no-console
        console.log('%c--------------------------------', `color: ${color}`);
        return;
      }

      let flightGeometryJSON = null;
      if (fP) {
        const json = fP.toJSON();
        // for some reason the js api does not set type on the json object
        json.type = fP.type;
        flightGeometryJSON = JSON.stringify(json);
      }

      await PCore.getRestClient().invokeRestApi('updateDataObject', {
        queryPayload: {
          data_view_ID: 'D_MapOutputSavable',
        },
        body: {
          data: {
            pyGUID: caseId,
            MaxPopulationVolume: pD?.maxPopDensityOperationalGroundRisk,
            AveragePopulationDensityInAdjacentArea:
              pD?.avgPopDensityAdjacentArea,
            MapImageJSON: pR ? JSON.stringify(pR) : null,
            FlightGeometryJSON: flightGeometryJSON,
            MapStateJSON: mS ? JSON.stringify(mS) : null,
            IntrinsicGroundRisk: eT ? -1 : gR,
            ErrorText: eT,
            ContingencyVolumeHeight: hCVRounded,
            AdjacentVolumeWidth: aVW,
            ContingencyVolumeWidth: cVW,
            GroundRiskBufferWidth: gRW,
            ImpactedGeoZones: iGZ,
            ImpactedLandUseList: iLU ?? null,
            ImpactedLandUseInAdjacentAreaList: iLUAA ?? null,
          },
        },
      });
      // eslint-disable-next-line no-console
      console.log('%c   Pega props updated', `color: ${color}`);
      // eslint-disable-next-line no-console
      console.log('%c--------------------------------', `color: ${color}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error updating Pega props:',
        `color: ${errorColor}`,
        error,
      );
      // eslint-disable-next-line no-console
      console.log('%c--------------------------------', `color: ${color}`);
    } finally {
      updateInProgress.current = false;
    }
  }, []);
};

export default useUpdatePegaProps;
