import { useCallback, useRef } from 'react';
import type { MapState, PopulationDensity } from '../types';
import _ from 'lodash';

const useUpdatePegaProps = (
  pConnect: any,
  populationDensity: PopulationDensity | null,
  printRequest: any,
  flightPath: __esri.Geometry | null,
  mapState: MapState | null,
  groundRisk: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null,
  errorText: string | null,
  contingencyVolumeHeight: number | null
) => {
  const paramsRef = useRef({
    pConnect,
    populationDensity,
    printRequest,
    flightPath,
    mapState,
    groundRisk,
    errorText,
    contingencyVolumeHeight
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
    contingencyVolumeHeight
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
      contingencyVolumeHeight: hCV
    } = currentParams;

    // if (!pD?.maxPopDensityOperationalGroundRisk || !pD?.avgPopDensityAdjacentArea || !pR || !gR)
    //   return;

    // Prevent multiple simultaneous updates
    if (updateInProgress.current) return;
    if (!pC.getValue || !pConnect) return;

    const hCVRounded = hCV ? _.round(hCV) : null;

    // eslint-disable-next-line no-console
    console.log('sending to pega:');
    // eslint-disable-next-line no-console
    console.log('   groundRisk', gR);
    // eslint-disable-next-line no-console
    console.log('   populationDensity', pD);
    // eslint-disable-next-line no-console
    console.log('   printRequest', pR);
    // eslint-disable-next-line no-console
    console.log('   flightPath', fP);
    // eslint-disable-next-line no-console
    console.log('   mapState', mS);
    // eslint-disable-next-line no-console
    console.log('   errorText', eT);
    // eslint-disable-next-line no-console
    console.log('   contingencyVolumeHeight', hCVRounded);

    try {
      updateInProgress.current = true;
      const caseId = pC.getValue('.pyID');

      if (!caseId) {
        // eslint-disable-next-line no-console
        console.warn("Could not get caseId '.pyID'");
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
          data_view_ID: 'D_MapOutputSavable'
        },
        body: {
          data: {
            pyGUID: caseId,
            MaxPopulationVolume: pD?.maxPopDensityOperationalGroundRisk,
            AveragePopulationDensityInAdjacentArea: pD?.avgPopDensityAdjacentArea,
            MapImageJSON: pR ? JSON.stringify(pR) : null,
            FlightGeometryJSON: flightGeometryJSON,
            MapStateJSON: mS ? JSON.stringify(mS) : null,
            IntrinsicGroundRisk: eT ? -1 : gR,
            ErrorText: eT,
            ContingencyVolumeHeight: hCVRounded
          }
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating Pega props:', error);
    } finally {
      updateInProgress.current = false;
    }
  }, []);
};

export default useUpdatePegaProps;
