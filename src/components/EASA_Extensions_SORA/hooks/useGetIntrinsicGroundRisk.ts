import { useState, useCallback, useRef } from 'react';
import type { PopulationDensity } from '../types';

const calculateGroundRisk = (
  populationDensity: number | null,
  cd: number | null,
  vO: number | null,
  controlledGroundArea: boolean,
  criticalArea: number | null
): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null => {
  // Return null if inputs are invalid
  if (populationDensity === null || cd === null || vO === null || criticalArea === null)
    return null;

  // claulated critical area in pega
  let criticalAreaCategory: number;
  if (criticalArea <= 6.5) criticalAreaCategory = 0;
  else if (criticalArea <= 65) criticalAreaCategory = 1;
  else if (criticalArea <= 650) criticalAreaCategory = 2;
  else if (criticalArea <= 6500) criticalAreaCategory = 3;
  else if (criticalArea <= 65000) criticalAreaCategory = 4;
  else return null; // Invalid critical area

  // Get dimension category based on characteristic dimension (cd)
  let dimensionCategory: number;
  if (cd <= 1) dimensionCategory = 0;
  else if (cd <= 3) dimensionCategory = 1;
  else if (cd <= 8) dimensionCategory = 2;
  else if (cd <= 20) dimensionCategory = 3;
  else if (cd <= 40) dimensionCategory = 4;
  else return null; // Invalid dimension

  // Get speed category based on maximum speed (vO)
  let speedCategory: number;
  if (vO <= 25) speedCategory = 0;
  else if (vO <= 35) speedCategory = 1;
  else if (vO <= 75) speedCategory = 2;
  else if (vO <= 120) speedCategory = 3;
  else if (vO <= 200) speedCategory = 4;
  else return null; // Invalid speed

  // Get population density category
  let densityCategory: number;
  if (populationDensity === 0)
    densityCategory = 0; // Controlled Ground Area
  else if (populationDensity < 5) densityCategory = 1;
  else if (populationDensity < 50) densityCategory = 2;
  else if (populationDensity < 500) densityCategory = 3;
  else if (populationDensity < 5000) densityCategory = 4;
  else if (populationDensity < 50000) densityCategory = 5;
  else if (populationDensity >= 50000) densityCategory = 6;
  else return null; // Invalid density

  // Ground risk matrix based on the image
  const groundRiskMatrix = [
    [1, 1, 2, 3, 3], // Controlled Ground Area
    [2, 3, 4, 5, 6], // < 5
    [3, 4, 5, 6, 7], // < 50
    [4, 5, 6, 7, 8], // < 500
    [5, 6, 7, 8, 9], // < 5,000
    [6, 7, 8, 9, 10], // < 50,000
    [7, 8, null, null, null] // > 50,000
  ];

  // Get the ground risk values from the matrix for both dimension and speed
  const groundRiskByDimension = groundRiskMatrix[densityCategory][dimensionCategory];
  const groundRiskBySpeed = groundRiskMatrix[densityCategory][speedCategory];
  const groundRiskByCriticalArea = groundRiskMatrix[criticalAreaCategory][speedCategory];

  // Return null if either combination is not part of SORA
  if (
    groundRiskByDimension === null ||
    groundRiskBySpeed === null ||
    groundRiskByCriticalArea === null
  )
    return null;

  // Return the higher (more conservative) value
  let groundRisk: number | null = Math.max(
    groundRiskByDimension,
    groundRiskBySpeed,
    groundRiskByCriticalArea
  );

  // eslint-disable-next-line no-console
  console.log('groundRiskByDimension', groundRiskByDimension);
  // eslint-disable-next-line no-console
  console.log('groundRiskBySpeed', groundRiskBySpeed);
  // eslint-disable-next-line no-console
  console.log('groundRiskByCriticalArea', groundRiskByCriticalArea);

  if (controlledGroundArea) {
    if (groundRiskByDimension > groundRiskBySpeed) {
      groundRisk = groundRiskMatrix[0][densityCategory];
    } else {
      groundRisk = groundRiskMatrix[0][speedCategory];
    }
    // eslint-disable-next-line no-console
    console.log('controlledGroundArea groundRisk', groundRisk);
  }

  return groundRisk as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null;
};

const useGetIntrinsicGroundRisk = (params: {
  populationDensity: PopulationDensity | null;
  cd: number | null;
  vO: number | null;
  controlledGroundArea: boolean;
  criticalArea: number | null;
}) => {
  const [groundRisk, setGroundRisk] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null>(null);

  const calculationInProgress = useRef(false);
  const paramsRef = useRef(params);

  // Update the ref when params change
  paramsRef.current = params;

  const calculateIntrinsicGroundRisk = useCallback(() => {
    const currentParams = paramsRef.current;

    // Prevent multiple simultaneous calculations
    if (calculationInProgress.current) return;

    // Reset states if no params
    if (!currentParams) {
      setGroundRisk(null);
      return;
    }

    const { populationDensity, cd, vO, controlledGroundArea, criticalArea } = currentParams;

    // Check if params are valid
    if (!populationDensity || cd === undefined || cd === null || vO === undefined || vO === null) {
      setGroundRisk(null);
      return;
    }

    const risk = calculateGroundRisk(
      populationDensity.avgPopDensityAdjacentArea,
      cd,
      vO,
      controlledGroundArea,
      criticalArea
    );

    setGroundRisk(risk);
  }, []);

  return {
    groundRisk,
    calculateIntrinsicGroundRisk
  };
};

export default useGetIntrinsicGroundRisk;
