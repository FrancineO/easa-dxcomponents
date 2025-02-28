import Graphic from '@arcgis/core/Graphic';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import type { FlightVolumeParams } from '../types';
import {
  adjacentAreaSymbol,
  groundRiskVolumeSymbol,
  contingencyVolumeSymbol
} from './flight-volume-symbols';

const g = 9.81;

export interface ContingencyVolumeResults {
  contingencyVolume: __esri.Graphic;
  contingencyVolumeHeight: number;
}

export const getContingencyVolume = ({
  flightGeography,
  sGPS,
  sPos,
  sK,
  vO,
  tR,
  tP,
  parachute,
  rollAngle,
  multirotor,
  hFG,
  hAM
}: FlightVolumeParams): ContingencyVolumeResults | null => {
  if (!flightGeography) return null;

  const hR = vO * 0.7 * tR;
  let hCM = 0;

  if (multirotor) {
    hCM = vO ** 2 / (2 * g);
  } else {
    hCM = vO ** 2 / g;
  }

  if (parachute) {
    hCM = vO * tP * 0.7;
  }

  const hCV = hFG + hAM + hR + hCM;

  const sR = vO * tR;
  const sCM = multirotor
    ? vO ** 2 / (2 * g * Math.tan((rollAngle * Math.PI) / 180))
    : vO ** 2 / (g * Math.tan((rollAngle * Math.PI) / 180));

  const sCV = sGPS + sPos + sK + sR + (parachute ? vO * tP : sCM);

  const buffer = geometryEngine.buffer(flightGeography.geometry, sCV);
  const sCVPolygon = geometryEngine.difference(buffer, flightGeography.geometry) as __esri.Polygon;

  return {
    contingencyVolume: new Graphic({
      geometry: sCVPolygon,
      symbol: contingencyVolumeSymbol
    }),
    contingencyVolumeHeight: hCV
  };
};

export const getGroundRiskVolume = (
  {
    flightGeography,
    vO,
    tP,
    parachute,
    multirotor,
    simplified,
    cd,
    vWind,
    vZ,
    power,
    cL,
    gliding
  }: FlightVolumeParams,
  cv: ContingencyVolumeResults
) => {
  if (!flightGeography) return null;
  const hCV = cv.contingencyVolumeHeight;
  let sGRB = simplified ? hCV + cd / 2 : (vO * Math.sqrt(2 * hCV)) / g + cd / 2;

  if (parachute) {
    sGRB = vO * tP + vWind * (hCV / vZ);
  }

  if (!multirotor && !power) {
    sGRB = gliding ? (cL / cd) * hCV : hCV + cd / 2;
  }

  const flightPlusCVBuffer = geometryEngine.union([
    flightGeography.geometry,
    cv.contingencyVolume.geometry
  ]);
  const grBuffer = geometryEngine.buffer(flightPlusCVBuffer, sGRB);
  const grPolygon = geometryEngine.difference(grBuffer, flightPlusCVBuffer) as __esri.Polygon;

  return new Graphic({
    geometry: grPolygon,
    symbol: groundRiskVolumeSymbol
  });
};

export const getAdjacentArea = (
  { flightGeography, vO }: FlightVolumeParams,
  cv: __esri.Geometry,
  grVolume: __esri.Geometry
) => {
  if (!flightGeography) return null;
  let adjacentBufferDistance = 5000;
  const threeMinRange = (vO * 3) / 60;

  if (threeMinRange > 5000) {
    adjacentBufferDistance = threeMinRange > 35000 ? 35000 : threeMinRange;
  }

  const flightPlusGroundRisk = geometryEngine.union([flightGeography.geometry, cv, grVolume]);

  const adjacentBuffer = geometryEngine.buffer(flightPlusGroundRisk, adjacentBufferDistance);
  const aa = geometryEngine.difference(adjacentBuffer, flightPlusGroundRisk) as __esri.Polygon;

  return new Graphic({
    geometry: aa,
    symbol: adjacentAreaSymbol
  });
};
