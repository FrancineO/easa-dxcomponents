import { useCallback, useRef } from 'react';

const useUpdatePegaProps = (pConnect: any, populationDensity: PopulationDensity | null) => {
  const paramsRef = useRef({
    pConnect,
    populationDensity
  });
  const updateInProgress = useRef(false);

  // Update the ref when params change
  paramsRef.current = {
    pConnect,
    populationDensity
  };

  // Empty dependency array since we're using ref

  return useCallback(async () => {
    // Prevent multiple simultaneous updates
    if (updateInProgress.current) return;
    if (!pConnect?.getValue || !pConnect) return;

    try {
      updateInProgress.current = true;
      const caseId = pConnect.getValue('.pyID');

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
            MaxPopulationVolume: populationDensity?.maxPopDensityAdjacentArea,
            AveragePopulationDensityInAdjacentArea:
              populationDensity?.avgOperationalGroundRiskPopDensity
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
