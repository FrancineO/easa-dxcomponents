import { useCallback, useRef } from 'react';
import type { PopulationDensity } from '../types';

const useUpdatePegaProps = (
  pConnect: any,
  populationDensity: PopulationDensity | null,
  printRequest: any,
  groundRisk: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null
) => {
  const paramsRef = useRef({
    pConnect,
    populationDensity,
    printRequest,
    groundRisk
  });
  const updateInProgress = useRef(false);

  // Update the ref when params change
  paramsRef.current = {
    pConnect,
    populationDensity,
    printRequest,
    groundRisk
  };

  // Empty dependency array since we're using ref
  return useCallback(async () => {
    // TODO: might have to call D_MapOutputSavable with all null values to clear the state
    const currentParams = paramsRef.current;
    const { populationDensity: pD, printRequest: pR, pConnect: pC, groundRisk: gR } = currentParams;
    if (!pD?.maxPopDensityAdjacentArea || !pD?.avgOperationalGroundRiskPopDensity || !pR || !gR)
      return;

    // Prevent multiple simultaneous updates
    if (updateInProgress.current) return;
    if (!pC.getValue || !pConnect) return;

    // eslint-disable-next-line no-console
    console.log('groundRisk', gR);
    // eslint-disable-next-line no-console
    console.log('populationDensity', pD);
    // eslint-disable-next-line no-console
    console.log('printRequest', pR);

    try {
      updateInProgress.current = true;
      const caseId = pC.getValue('.pyID');

      if (!caseId) {
        // eslint-disable-next-line no-console
        console.warn("Could not get caseId '.pyID'");
        return;
      }

      await PCore.getRestClient().invokeRestApi('updateDataObject', {
        queryPayload: {
          data_view_ID: 'D_MapOutputSavable'
        },
        body: {
          data: {
            pyGUID: caseId,
            MaxPopulationVolume: pD.maxPopDensityAdjacentArea,
            AveragePopulationDensityInAdjacentArea: pD.avgOperationalGroundRiskPopDensity,
            MapImageJSON: pR,
            IntrinsicGroundRisk: gR
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
