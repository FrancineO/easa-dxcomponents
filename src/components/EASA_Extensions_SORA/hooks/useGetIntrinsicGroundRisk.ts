import { useState, useCallback, useRef } from 'react';
import type { PopulationDensity } from '../types';

export class GroundRiskError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GroundRiskError';
  }
}

const calculateGroundRisk = (
  populationDensity: number | null,
  cd: number | null,
  vO: number | null,
  controlledGroundArea: boolean,
  criticalArea: number | null,
): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null => {
  // Return null if inputs are invalid
  if (
    populationDensity === null ||
    cd === null ||
    vO === null ||
    criticalArea === null
  )
    throw new GroundRiskError(
      'Population density, characteristic dimension, maximum speed, or critical area is null',
    );

  // calculated critical area in pega
  let criticalAreaCategory: number;
  if (criticalArea <= 6.5) criticalAreaCategory = 0;
  else if (criticalArea <= 65) criticalAreaCategory = 1;
  else if (criticalArea <= 650) criticalAreaCategory = 2;
  else if (criticalArea <= 6500) criticalAreaCategory = 3;
  else if (criticalArea <= 65000) criticalAreaCategory = 4;
  else throw new GroundRiskError(`Critical area -> ${criticalArea}`); // return null; // Invalid critical area

  // Get dimension category based on characteristic dimension (cd)
  let dimensionCategory: number;
  if (cd <= 1) dimensionCategory = 0;
  else if (cd <= 3) dimensionCategory = 1;
  else if (cd <= 8) dimensionCategory = 2;
  else if (cd <= 20) dimensionCategory = 3;
  else if (cd <= 40) dimensionCategory = 4;
  else throw new GroundRiskError(`Dimension -> ${cd}`); // return null; // Invalid dimension

  // Get speed category based on maximum speed (vO)
  let speedCategory: number;
  if (vO <= 25) speedCategory = 0;
  else if (vO <= 35) speedCategory = 1;
  else if (vO <= 75) speedCategory = 2;
  else if (vO <= 120) speedCategory = 3;
  else if (vO <= 200) speedCategory = 4;
  else throw new GroundRiskError(`Speed -> ${vO}`); // return null; // Invalid speed

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
  else throw new GroundRiskError(`Population density -> ${populationDensity}`); // return null; // Invalid density

  // Ground risk matrix based on the image
  const groundRiskMatrix = [
    [1, 1, 2, 3, 3], // Controlled Ground Area
    [2, 3, 4, 5, 6], // < 5
    [3, 4, 5, 6, 7], // < 50
    [4, 5, 6, 7, 8], // < 500
    [5, 6, 7, 8, 9], // < 5,000
    [6, 7, 8, 9, 10], // < 50,000
    [7, 8, null, null, null], // > 50,000
  ];

  const color = 'rgb(179, 66, 151)';
  // eslint-disable-next-line no-console
  console.log('%c--------------------------------', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log('%cGround Risk Calculations:', `color: ${color}`);

  // eslint-disable-next-line no-console
  console.log(`%c   densityCategory: ${densityCategory}`, `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log(
    `%c   dimensionCategory: ${dimensionCategory}`,
    `color: ${color}`,
  );
  // eslint-disable-next-line no-console
  console.log(`%c   speedCategory: ${speedCategory}`, `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log(
    `%c   criticalAreaCategory: ${criticalAreaCategory}`,
    `color: ${color}`,
  );

  // Get the ground risk values from the matrix for both dimension and speed
  const groundRiskByDimension =
    groundRiskMatrix[densityCategory][dimensionCategory] ?? -1;
  const groundRiskBySpeed =
    groundRiskMatrix[densityCategory][speedCategory] ?? -1;
  const groundRiskByCriticalArea =
    groundRiskMatrix[densityCategory][criticalAreaCategory];

  if (groundRiskByCriticalArea === null) {
    throw new GroundRiskError(
      `Ground risk by critical area returned null. Population density: ${populationDensity}, cd: ${cd}, vO: ${vO}, criticalArea: ${criticalArea}`,
    );
  }
  // // Return null if either combination is not part of SORA
  // if (
  //   groundRiskByDimension === null ||
  //   groundRiskBySpeed === null ||
  //   groundRiskByCriticalArea === null
  // )
  //   throw new GroundRiskError('Ground risk matrix returned null');

  // Return the higher (more conservative) value
  let groundRisk: number | null = Math.max(
    groundRiskByDimension,
    groundRiskBySpeed,
    groundRiskByCriticalArea,
  );

  // eslint-disable-next-line no-console
  console.log(
    `%c   groundRiskByDimension: ${groundRiskByDimension}`,
    `color: ${color}`,
  );
  // eslint-disable-next-line no-console
  console.log(
    `%c   groundRiskBySpeed: ${groundRiskBySpeed}`,
    `color: ${color}`,
  );
  // eslint-disable-next-line no-console
  console.log(
    `%c   groundRiskByCriticalArea: ${groundRiskByCriticalArea}`,
    `color: ${color}`,
  );

  // if the critical area is not null, then use the critical area value
  if (groundRiskByCriticalArea !== null) {
    groundRisk = groundRiskByCriticalArea;
  }

  if (controlledGroundArea) {
    if (groundRiskByCriticalArea !== null) {
      groundRisk = groundRiskMatrix[0][criticalAreaCategory];
    } else if (groundRiskByDimension > groundRiskBySpeed) {
      groundRisk = groundRiskMatrix[0][dimensionCategory];
    } else {
      groundRisk = groundRiskMatrix[0][speedCategory];
    }
    // eslint-disable-next-line no-console
    console.log('controlledGroundArea groundRisk', groundRisk);
  }

  if (groundRisk === null) {
    throw new GroundRiskError(
      `Ground risk returned null. Controlled ground area: ${controlledGroundArea}. Population density: ${populationDensity},criticalArea: ${criticalArea}, cd: ${cd}, vO: ${vO}`,
    );
  }

  // eslint-disable-next-line no-console
  console.log(`%c   output iGRC: ${groundRisk}`, `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log('%c--------------------------------', `color: ${color}`);

  return groundRisk as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null;
};

const useGetIntrinsicGroundRisk = (params: {
  populationDensity: PopulationDensity | null;
  cd: number | null;
  vO: number | null;
  controlledGroundArea: boolean;
  criticalArea: number | null;
}) => {
  const [groundRisk, setGroundRisk] = useState<
    1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null
  >(null);

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

    const { populationDensity, cd, vO, controlledGroundArea, criticalArea } =
      currentParams;

    // Check if params are valid
    if (
      !populationDensity ||
      cd === undefined ||
      cd === null ||
      vO === undefined ||
      vO === null
    ) {
      setGroundRisk(null);
      return;
    }

    const risk = calculateGroundRisk(
      populationDensity.maxPopDensityOperationalGroundRisk,
      cd,
      vO,
      controlledGroundArea,
      criticalArea,
    );
    setGroundRisk(risk);
  }, []);

  return {
    groundRisk,
    calculateIntrinsicGroundRisk,
  };
};

export default useGetIntrinsicGroundRisk;
