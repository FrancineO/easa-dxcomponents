import Graphic from '@arcgis/core/Graphic';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import type { FlightVolumeParams } from '../types';
import {
  adjacentAreaSymbol,
  groundRiskVolumeSymbol,
  contingencyVolumeSymbol,
} from './flight-volume-symbols';

const g = 9.81;

export interface ContingencyVolumeResults {
  contingencyVolume: __esri.Graphic;
  contingencyVolumeHeight: number;
  contingencyVolumeWidth: number;
}

export interface GroundRiskVolumeResults {
  groundRiskVolume: __esri.Graphic;
  groundRiskBufferWidth: number;
}

export interface AdjacentAreaResults {
  adjacentArea: __esri.Graphic;
  adjacentAreaWidth: number;
}

export const getContingencyVolume = ({
  flightGeography,
  sGPS,
  sPos,
  sK,
  vO,
  tR,
  tP,
  terminateWithParachute,
  maxRollAngle,
  maxPitchAngle,
  multirotor,
  hFG,
  hAM,
}: FlightVolumeParams): ContingencyVolumeResults | null => {
  if (!flightGeography)
    throw new Error(
      'Error calculating contingency volume. Flight geography is undefined. Please check the console for more information.',
    );

  // console log the input params in a readable format in rgb(238, 191, 82)
  const color = 'rgb(238, 191, 82)';
  // eslint-disable-next-line no-console
  console.log('%c--------------------------------', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log('%cContingency Volume Params:', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log(
    `%c${`${JSON.stringify(
      {
        sGPS,
        sPos,
        sK,
        vO,
        tR,
        tP,
        terminateWithParachute,
        maxRollAngle,
        maxPitchAngle,
        multirotor,
        hFG,
        hAM,
      },
      null,
      2,
    )}`}`,
    `color: ${color}`,
  );

  const hR = vO * 0.7 * tR;
  let hCM = 0;

  // eslint-disable-next-line no-console
  console.log('%cContingency Volume Calculations:', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log(`%c hR: ${hR}`, `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log('%c   vO * 0.7 * tR ', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log(`%c   ${vO} * 0.7 * ${tR}`, `color: ${color}`);

  if (multirotor) {
    hCM = vO ** 2 / (2 * g);
    // eslint-disable-next-line no-console
    console.log(`%c hCM: ${hCM}`, `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log('%c   multirotor === true', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log('%c   vO ** 2 / (2 * g)', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log(`%c   ${vO} ** 2 / (2 * ${g})`, `color: ${color}`);
  } else {
    hCM = (vO ** 2 / g) * 0.3;
    // eslint-disable-next-line no-console
    console.log(`%c hCM: ${hCM}`, `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log('%c   multirotor === false', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log('%c   (vO ** 2 / g) * 0.3', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log(`%c   (${vO} ** 2 / ${g}) * 0.3`, `color: ${color}`);
  }

  if (terminateWithParachute) {
    if (tP === '') {
      throw new Error(
        'tP is an empty string.\n Expected a number, but got an empty string.\n Please check the console for more information.',
      );
    }
    hCM = vO * tP * 0.7;

    // eslint-disable-next-line no-console
    console.log(
      `%c hCM: ${hCM} (recalculated due to terminateWithParachute === true)`,
      `color: ${color}`,
    );
    // eslint-disable-next-line no-console
    console.log('%c   vO * tP * 0.7', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log(`%c   ${vO} * ${tP} * 0.7`, `color: ${color}`);
  }

  const hCV = hFG + hAM + hR + hCM;
  // eslint-disable-next-line no-console
  console.log(`%c hCV: ${hCV}`, `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log('%c   hFG + hAM + hR + hCM', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log(`%c   ${hFG} + ${hAM} + ${hR} + ${hCM}`, `color: ${color}`);

  const sR = vO * tR;
  // eslint-disable-next-line no-console
  console.log(`%c sR: ${sR}`, `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log('%c   vO * tR', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log(`%c   ${vO} * ${tR}`, `color: ${color}`);

  const sCM = multirotor
    ? vO ** 2 / (2 * g * Math.tan((maxPitchAngle * Math.PI) / 180))
    : vO ** 2 / (g * Math.tan((maxRollAngle * Math.PI) / 180));
  // eslint-disable-next-line no-console
  console.log(
    `%c sCM: ${sCM} (multirotor === ${multirotor})`,
    `color: ${color}`,
  );
  if (multirotor) {
    // eslint-disable-next-line no-console
    console.log(
      '%c   vO ** 2 / (2 * g * Math.tan((maxRollAngle * Math.PI) / 180)) ',
      `color: ${color}`,
    );
    // eslint-disable-next-line no-console
    console.log(
      `%c   ${vO} ** 2 / (2 * ${g} * Math.tan((${maxRollAngle} * Math.PI) / 180))`,
      `color: ${color}`,
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(
      '%c   vO ** 2 / (g * Math.tan((maxRollAngle * Math.PI) / 180)) ',
      `color: ${color}`,
    );
    // eslint-disable-next-line no-console
    console.log(
      `%c   ${vO} ** 2 / (${g} * Math.tan((${maxRollAngle} * Math.PI) / 180))`,
      `color: ${color}`,
    );
  }

  if (tP === '') {
    // eslint-disable-next-line no-console
    console.log(
      '%c tP is an empty string. tP must be a number.',
      `color: ${color}`,
    );
  }

  const sCV =
    sGPS +
    sPos +
    sK +
    sR +
    (terminateWithParachute && tP !== '' ? vO * tP : sCM);
  // eslint-disable-next-line no-console
  console.log(
    `%c sCV: ${sCV} (terminateWithParachute === ${terminateWithParachute})`,
    `color: ${color}`,
  );
  if (terminateWithParachute) {
    // eslint-disable-next-line no-console
    console.log('%c   sGPS + sPos + sK + sR + vO * tP ', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log(
      `%c   ${sGPS} + ${sPos} + ${sK} + ${sR} + ${vO} * ${tP}`,
      `color: ${color}`,
    );
  } else {
    // eslint-disable-next-line no-console
    console.log('%c   sGPS + sPos + sK + sR + sCM ', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log(
      `%c   ${sGPS} + ${sPos} + ${sK} + ${sR} + ${sCM}`,
      `color: ${color}`,
    );
  }

  if (sCV === Infinity) {
    throw new Error(
      'sCV is Infinity. Please check the console for more information.',
    );
  }

  const buffer = geometryEngine.buffer(flightGeography.geometry, sCV);

  if (!buffer) {
    throw new Error(
      'Error calculating buffer. Please check the console for more information.',
    );
  }

  const sCVPolygon = geometryEngine.difference(
    buffer,
    flightGeography.geometry,
  ) as __esri.Polygon;

  // eslint-disable-next-line no-console
  console.log('%c--------------------------------', `color: ${color}`);

  return {
    contingencyVolume: new Graphic({
      geometry: sCVPolygon,
      symbol: contingencyVolumeSymbol,
    }),
    contingencyVolumeHeight: hCV,
    contingencyVolumeWidth: sCV,
  };
};

export const getGroundRiskVolume = (
  {
    flightGeography,
    vO,
    tP,
    terminateWithParachute,
    multirotor,
    simplified,
    ballisticApproach,
    cd,
    vWind,
    vZ,
    power,
    cL,
    gliding,
    E,
  }: FlightVolumeParams,
  cv: ContingencyVolumeResults,
): GroundRiskVolumeResults | null => {
  if (!flightGeography)
    throw new Error(
      'Error calculating ground risk volume. Flight geography is undefined. Please check the console for more information.',
    );

  const color = 'rgb(181, 45, 62)';
  // eslint-disable-next-line no-console
  console.log('%c--------------------------------', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log('%cGround Risk Volume Params:', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log(
    `%c${JSON.stringify({ vO, tP, terminateWithParachute, multirotor, simplified, ballisticApproach, cd, vWind, vZ, power, cL, gliding, E }, null, 2)}`,
    `color: ${color}`,
  );

  // eslint-disable-next-line no-console
  console.log('%cGround Risk Volume Calculations:', `color: ${color}`);
  const hCV = cv.contingencyVolumeHeight;
  // eslint-disable-next-line no-console
  console.log(
    `%c hCV: ${hCV} (input contingency volume height from Contingency Volume Calculations)`,
    `color: ${color}`,
  );

  let sGRB = -1;
  if (simplified) {
    sGRB = hCV + cd / 2;
  }

  if (ballisticApproach) {
    sGRB = vO * Math.sqrt((2 * hCV) / g) + cd / 2;
  }

  // let sGRB = simplified ? hCV + cd / 2 : vO * Math.sqrt((2 * hCV) / g) + cd / 2;
  // eslint-disable-next-line no-console
  console.log(
    `%c sGRB: ${sGRB} (simplified === ${simplified})`,
    `color: ${color}`,
  );
  if (simplified) {
    // eslint-disable-next-line no-console
    console.log('%c   hCV + cd / 2', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log(`%c   ${hCV} + ${cd} / 2`, `color: ${color}`);
  } else if (ballisticApproach) {
    // eslint-disable-next-line no-console
    console.log(
      '%c   (vO * Math.sqrt(2 * hCV / g)) + cd / 2',
      `color: ${color}`,
    );
    // eslint-disable-next-line no-console
    console.log(
      `%c   (${vO} * Math.sqrt(2 * ${hCV} / ${g})) + ${cd} / 2`,
      `color: ${color}`,
    );
  }

  if (terminateWithParachute) {
    if (tP === '') {
      throw new Error(
        'tP is an empty string.\n Expected a number, but got an empty string.\n Please check the console for more information.',
      );
    }
    sGRB = vO * tP + vWind * (hCV / vZ);
    // eslint-disable-next-line no-console
    console.log(
      `%c sGRB: ${sGRB} (recalculated due to terminateWithParachute === true)`,
      `color: ${color}`,
    );
    // eslint-disable-next-line no-console
    console.log('%c   vO * tP + vWind * (hCV / vZ)', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log(
      `%c   ${vO} * ${tP} + ${vWind} * (${hCV} / ${vZ})`,
      `color: ${color}`,
    );
  }

  if (E === '') {
    // eslint-disable-next-line no-console
    console.log(
      '%c E is an empty string. E must be a number greater than 0.',
      `color: ${color}`,
    );
  }

  if (E !== '' && E > 0) {
    sGRB = E * hCV;
    // eslint-disable-next-line no-console
    console.log(
      `%c sGRB: ${sGRB} (recalculated due to E > 0)`,
      `color: ${color}`,
    );
    // eslint-disable-next-line no-console
    console.log('%c   E * hCV', `color: ${color}`);
    // eslint-disable-next-line no-console
    console.log(`%c   ${E} * ${hCV}`, `color: ${color}`);
  }

  if (!power) {
    sGRB = gliding ? (cL / cd) * hCV : hCV + cd / 2;
    // eslint-disable-next-line no-console
    console.log(
      `%c sGRB: ${sGRB} (recalculated due to multirotor === false and power === false and gliding === ${gliding})`,
      `color: ${color}`,
    );
    if (gliding) {
      // eslint-disable-next-line no-console
      console.log('%c   (cL / cd) * hCV', `color: ${color}`);
      // eslint-disable-next-line no-console
      console.log(`%c   (${cL} / ${cd}) * ${hCV}`, `color: ${color}`);
    } else {
      // eslint-disable-next-line no-console
      console.log('%c   hCV + cd / 2', `color: ${color}`);
      // eslint-disable-next-line no-console
      console.log(`%c   ${hCV} + ${cd} / 2`, `color: ${color}`);
    }
  }
  // eslint-disable-next-line no-console
  console.log('%c--------------------------------', `color: ${color}`);

  const flightPlusCVBuffer = geometryEngine.union([
    flightGeography.geometry,
    cv.contingencyVolume.geometry,
  ]);
  const grBuffer = geometryEngine.buffer(flightPlusCVBuffer, sGRB);
  const grPolygon = geometryEngine.difference(
    grBuffer,
    flightPlusCVBuffer,
  ) as __esri.Polygon;

  return {
    groundRiskVolume: new Graphic({
      geometry: grPolygon,
      symbol: groundRiskVolumeSymbol,
    }),
    groundRiskBufferWidth: sGRB,
  };
};

export const getAdjacentArea = (
  { flightGeography, vO }: FlightVolumeParams,
  cv: __esri.Geometry,
  grVolume: __esri.Geometry,
): AdjacentAreaResults | null => {
  if (!flightGeography)
    throw new Error(
      'Error calculating adjacent area. Flight geography is undefined. Please check the console for more information.',
    );

  const color = 'rgb(98, 128, 177)';
  // eslint-disable-next-line no-console
  console.log('%c--------------------------------', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log('%cAdjacent Area Params:', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log(`%c${JSON.stringify({ vO }, null, 2)}`, `color: ${color}`);

  // eslint-disable-next-line no-console
  console.log('%cAdjacent Area Calculations:', `color: ${color}`);
  let adjacentBufferDistance = 5000;
  const threeMinRange = (vO * 3) / 60;
  // eslint-disable-next-line no-console
  console.log(
    `%c adjacentBufferDistance: ${adjacentBufferDistance} (hardcoded)`,
    `color: ${color}`,
  );
  // eslint-disable-next-line no-console
  console.log(`%c threeMinRange: ${threeMinRange}`, `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log('%c   (vO * 3) / 60', `color: ${color}`);
  // eslint-disable-next-line no-console
  console.log(`%c   ${vO} * 3 / 60`, `color: ${color}`);

  if (threeMinRange > 5000) {
    adjacentBufferDistance = threeMinRange > 35000 ? 35000 : threeMinRange;
    // eslint-disable-next-line no-console
    console.log(
      `%c adjacentBufferDistance: ${adjacentBufferDistance} (recalculated due to threeMinRange > 5000)`,
      `color: ${color}`,
    );
    if (threeMinRange > 35000) {
      // eslint-disable-next-line no-console
      console.log('%c   threeMinRange > 35000', `color: ${color}`);
      // eslint-disable-next-line no-console
      console.log(`%c   ${threeMinRange} > 35000`, `color: ${color}`);
    } else {
      // eslint-disable-next-line no-console
      console.log('%c   threeMinRange <= 35000', `color: ${color}`);
      // eslint-disable-next-line no-console
      console.log(`%c   ${threeMinRange} <= 35000`, `color: ${color}`);
    }
  } else {
    // eslint-disable-next-line no-console
    console.log(
      `%c adjacentBufferDistance: ${adjacentBufferDistance} (not recalculated due to threeMinRange <= 5000)`,
      `color: ${color}`,
    );
  }

  // eslint-disable-next-line no-console
  console.log('%c--------------------------------', `color: ${color}`);

  const flightPlusGroundRisk = geometryEngine.union([
    flightGeography.geometry,
    cv,
    grVolume,
  ]);

  const adjacentBuffer = geometryEngine.buffer(
    flightPlusGroundRisk,
    adjacentBufferDistance,
  );
  const aa = geometryEngine.difference(
    adjacentBuffer,
    flightPlusGroundRisk,
  ) as __esri.Polygon;

  return {
    adjacentArea: new Graphic({
      geometry: aa,
      symbol: adjacentAreaSymbol,
    }),
    adjacentAreaWidth: adjacentBufferDistance,
  };
};
