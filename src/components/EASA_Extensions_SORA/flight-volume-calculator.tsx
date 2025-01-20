import { useEffect, type FC } from 'react';
import View from './View';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import Graphic from '@arcgis/core/Graphic';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';

/**
 * Interface for flight volume calculation parameters
 * @param flightGeography - The flight geography graphic drawn on the map
 * @param sGPS - GPS position error in meters
 * @param sPos - Position holding error in meters
 * @param sK - Map error in meters
 * @param vO - Operating speed in meters per second
 * @param tR - Reaction time in seconds
 * @param tP - Parachute deployment time in seconds
 * @param parachute - Whether flight is terminated with parachute
 * @param multirotor - Whether drone is multirotor
 * @param rollAngle - Roll angle in degrees
 * @param hFG - Flight geography height in meters
 * @param hAM - Airspace management height in meters
 * @param simplified - Whether to use simplified calculation
 * @param cd - Drone diameter in meters
 * @param vWind - Wind speed in meters per second
 * @param vZ - Rate of decent with parachute open in meters per second
 * @param power - Whether drone has power
 * @param cL - Lift coefficient
 * @param gliding - Whether gliding
 */
interface Props {
  flightGeography: __esri.Graphic | null;
  sGPS: number; // GPS position error
  sPos: number; // position holding error
  sK: number; // map error
  vO: number; // operating speed m/s
  tR: number; // reaction time
  tP: number; // parachute deployment time
  parachute: boolean; // terminated with parachute
  multirotor: boolean; // multirotor
  rollAngle: number; // roll angle
  hFG: number; // flight geography height
  hAM: number; // airspace management height
  simplified: boolean; // whether to use simplified calculation
  cd: number; // drone diameter
  vWind: number; // wind speed
  vZ: number; // rate of decent with parachute open
  power: boolean; // has power
  cL: number; // lift coefficient
  gliding: boolean; // gliding
}
// gravity
const g = 9.81;

const FlightVolumeCalculator: FC<Props> = props => {
  const {
    flightGeography,
    sGPS,
    sPos,
    sK,
    vO,
    tR,
    tP,
    parachute,
    rollAngle,
    hFG,
    hAM,
    multirotor,
    simplified,
    cd,
    vWind,
    vZ,
    power,
    cL,
    gliding
  } = props;

  const getContingencyVolume = () => {
    if (!flightGeography) return null;

    // reaction distance
    const sR = vO * tR;
    // contingency manoeuvres
    let sCM = 0;
    // multirotor
    if (multirotor) {
      sCM = vO ** 2 / (2 * g * Math.tan((rollAngle * Math.PI) / 180));
    } else {
      // fixed wing
      sCM = vO ** 2 / (g * Math.tan((rollAngle * Math.PI) / 180));
    }
    // parachute
    if (parachute) {
      sCM = vO * tP;
    }

    const sCV = sGPS + sPos + sK + sR + sCM;

    const buffer = geometryEngine.buffer(flightGeography.geometry, sCV);
    const sCVPolygon = geometryEngine.difference(
      buffer,
      flightGeography.geometry
    ) as __esri.Polygon;
    return new Graphic({
      geometry: sCVPolygon,
      symbol: new SimpleFillSymbol({
        color: 'rgba(238, 191, 82, 0.5)',
        outline: { color: 'rgb(238, 191, 82)', width: 2 }
      })
    });
  };

  const getGroundRiskVolume = (contingencyVolume: __esri.Geometry) => {
    if (!flightGeography) return null;
    const hR = vO * 0.7 * tR;
    let hCM = 0;
    // multirotor
    if (multirotor) {
      hCM = vO ** 2 / (2 * g);
    } else {
      // fixed wing
      hCM = vO ** 2 / g;
    }

    // parachute
    if (parachute) {
      hCM = vO * tP * 0.7;
    }

    const hCV = hFG + hAM + hR + hCM;

    let sGRB = 0;
    // simplified
    if (simplified) {
      sGRB = hCV + cd / 2;
    } else {
      // ballistic
      // sGRB equals (VO times the square root of (2 times hCV) divided by g) plus 1/2 of the drone diameter
      sGRB = (vO * Math.sqrt(2 * hCV)) / g + cd / 2;
    }

    // parachute
    if (parachute) {
      sGRB = vO * tP + vWind * (hCV / vZ);
    }

    // fixed wing
    if (!multirotor && !power) {
      if (gliding) {
        sGRB = (cL / cd) * hCV;
      } else {
        // use simplified calculation
        sGRB = hCV + cd / 2;
      }
    }

    const flightPlusCVBuffer = geometryEngine.union([flightGeography.geometry, contingencyVolume]);

    const grBuffer = geometryEngine.buffer(flightPlusCVBuffer, sGRB);
    const grPolygon = geometryEngine.difference(grBuffer, flightPlusCVBuffer) as __esri.Polygon;
    return new Graphic({
      geometry: grPolygon,
      symbol: new SimpleFillSymbol({
        color: 'rgba(181, 45, 62, 0.5)',
        outline: { color: 'rgb(181, 45, 62)', width: 2 }
      })
    });
  };

  const getAdjacentArea = (
    contingencyVolume: __esri.Geometry,
    groundRiskVolume: __esri.Geometry
  ) => {
    if (!flightGeography) return null;
    let adjacentBufferDistance = 5000;
    const threeMinRange = (vO * 3) / 60;

    if (threeMinRange > 5000) {
      if (threeMinRange > 35000) {
        adjacentBufferDistance = 35000;
      } else {
        adjacentBufferDistance = threeMinRange;
      }
    }

    const flightPlusGroundRisk = geometryEngine.union([
      flightGeography.geometry,
      contingencyVolume,
      groundRiskVolume
    ]);

    const adjacentBuffer = geometryEngine.buffer(flightPlusGroundRisk, adjacentBufferDistance);

    const adjacentArea = geometryEngine.difference(
      adjacentBuffer,
      flightPlusGroundRisk
    ) as __esri.Polygon;
    return new Graphic({
      geometry: adjacentArea,
      symbol: new SimpleFillSymbol({
        color: 'rgba(98,128,177, 0.5)',
        outline: { color: 'rgb(98,128,177)', width: 2 }
      })
    });
  };

  useEffect(() => {
    let layer: GraphicsLayer = View.map?.findLayerById('flight-volumes') as GraphicsLayer;
    if (!layer) {
      layer = new GraphicsLayer({ id: 'flight-volumes' });
      View.map?.add(layer);
    }

    if (flightGeography) {
      layer.removeAll();

      // add contingency volume
      const contingencyVolume = getContingencyVolume();
      if (!contingencyVolume) return;
      layer.add(contingencyVolume);

      // add ground risk volume
      const grVolume = getGroundRiskVolume(contingencyVolume.geometry);
      if (!grVolume) return;
      layer.add(grVolume);

      // add adjacent area volume
      const adjacentArea = getAdjacentArea(contingencyVolume.geometry, grVolume.geometry);
      if (!adjacentArea) return;
      layer.add(adjacentArea);
    } else {
      layer.removeAll();
    }
  }, [flightGeography, vO, tR, tP, parachute, rollAngle, sGPS, sPos, sK, hFG, hAM]);

  return <div />;
};

export default FlightVolumeCalculator;
