import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import * as geometryJsonUtils from '@arcgis/core/geometry/support/jsonUtils.js';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Color from '@arcgis/core/Color';
import { getView } from '../map/view';
import { otherOperatorColor } from '../flight-volume/flight-volume-symbols';

const LAYER_ID = 'other-operator-flight-paths';

const otherOperatorSymbol = new SimpleLineSymbol({
  color: new Color(otherOperatorColor),
  width: 2,
  cap: 'round',
  join: 'round',
});

const displayOtherOperatorFlightPaths = (
  otherOperatorFlightPathsJSON: string | null,
) => {
  let layer = getView().map?.findLayerById(LAYER_ID) as GraphicsLayer;
  if (!layer) {
    layer = new GraphicsLayer({ id: LAYER_ID });
    getView().map.add(layer);
  }

  layer.removeAll();

  if (!otherOperatorFlightPathsJSON) return;

  let geometries: any[];
  try {
    geometries = JSON.parse(otherOperatorFlightPathsJSON);
  } catch {
    return;
  }

  // Format: array of operators, each operator has an array of geometry objects
  if (!Array.isArray(geometries)) return;

  geometries.flat().forEach((geo) => {
    const geometry = geometryJsonUtils.fromJSON(geo);
    if (!geometry) return;
    layer.add(new Graphic({ geometry, symbol: otherOperatorSymbol }));
  });
};

const useDisplayOtherOperatorFlightPaths = () => {
  return { displayOtherOperatorFlightPaths };
};

export default useDisplayOtherOperatorFlightPaths;
