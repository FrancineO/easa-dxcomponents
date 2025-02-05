import { useCallback, useRef } from 'react';
import type { PopulationDensity } from '../types';

const useUpdatePegaProps = (
  pConnect: any,
  populationDensity: PopulationDensity | null,
  printRequest: any
) => {
  const paramsRef = useRef({
    pConnect,
    populationDensity,
    printRequest
  });
  const updateInProgress = useRef(false);

  // Update the ref when params change
  paramsRef.current = {
    pConnect,
    populationDensity,
    printRequest
  };

  // Empty dependency array since we're using ref
  return useCallback(async () => {
    const currentParams = paramsRef.current;
    const { populationDensity: pD, printRequest: pR, pConnect: pC } = currentParams;
    if (!pD?.maxPopDensityAdjacentArea || !pD?.avgOperationalGroundRiskPopDensity || !pR) return;

    // Prevent multiple simultaneous updates
    if (updateInProgress.current) return;
    if (!pC.getValue || !pConnect) return;

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
            MapImageJson: JSON.stringify(pR)
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
