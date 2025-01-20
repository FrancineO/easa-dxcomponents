import { useEffect, type FC } from 'react';
import View from './View';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import Graphic from '@arcgis/core/Graphic';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';

interface Props {
  flightGeography: __esri.Graphic | null;
  sGPS: number;
  sPos: number; // position holding error
  sK: number; // map error
  vO: number; // operating speed
  tR: number; // reaction time
  tP: number; // parachute deployment time
  parachute: boolean; // terminated with parachute
  thetaMax: number; // maximum maximum pitch angle
  hFG: number; // flight geography height
  hAM: number; // airspace management height
}

const FlightVolumeCalculator: FC<Props> = props => {
  const { flightGeography, sGPS, sPos, sK, vO, tR, tP, parachute, thetaMax, hFG, hAM } = props;

  useEffect(() => {
    let layer: GraphicsLayer = View.map?.findLayerById('flight-volumes') as GraphicsLayer;
    if (!layer) {
      layer = new GraphicsLayer({ id: 'flight-volumes' });
      View.map?.add(layer);
    }

    if (flightGeography) {
      layer.removeAll();

      const g = 9.81;
      const sCM = parachute ? vO * tP : vO ** 2 / (2 * g * Math.tan((thetaMax * Math.PI) / 180));
      const sR = vO * tR;
      const sCV = sGPS + sPos + sK + sR + sCM;

      const buffer = geometryEngine.buffer(flightGeography.geometry, sCV);
      const sCVPolygon = geometryEngine.difference(
        buffer,
        flightGeography.geometry
      ) as __esri.Polygon;
      const sCVPolygonGraphic = new Graphic({
        geometry: sCVPolygon,
        symbol: new SimpleFillSymbol({
          color: 'rgba(238, 191, 82, 0.5)',
          outline: { color: 'rgb(238, 191, 82)', width: 2 }
        })
      });
      layer.add(sCVPolygonGraphic);

      const hR = vO * 0.7 * tR;
      const hCM = (0.5 * vO ** 2) / g;
      const hCV = hFG + hAM + hR + hCM;
      const flightPlusCVBuffer = geometryEngine.union([flightGeography.geometry, sCVPolygon]);

      const grBuffer = geometryEngine.buffer(flightPlusCVBuffer, hCV);
      const grPolygon = geometryEngine.difference(grBuffer, flightPlusCVBuffer) as __esri.Polygon;
      const grPolygonGraphic = new Graphic({
        geometry: grPolygon,
        symbol: new SimpleFillSymbol({
          color: 'rgba(181, 45, 62, 0.5)',
          outline: { color: 'rgb(181, 45, 62)', width: 2 }
        })
      });
      layer.add(grPolygonGraphic);
    } else {
      layer.removeAll();
    }
  }, [flightGeography, vO, tR, tP, parachute, thetaMax, sGPS, sPos, sK, hFG, hAM]);

  return <div />;
};

export default FlightVolumeCalculator;
