import Color from '@arcgis/core/Color';
import { SimpleFillSymbol } from '@arcgis/core/symbols';

export const flightPathColor = [80, 80, 80];
export const adjacentAreaColor = [98, 128, 177];
export const groundRiskVolumeColor = [181, 45, 62];
export const contingencyVolumeColor = [238, 191, 82];
export const flightGeographyColor = [146, 206, 90];

export const adjacentAreaSymbol = new SimpleFillSymbol({
  color: new Color([...adjacentAreaColor, 0.5]),
  outline: { color: new Color(adjacentAreaColor), width: 2 }
});

export const groundRiskVolumeSymbol = new SimpleFillSymbol({
  color: new Color([...groundRiskVolumeColor, 0.5]),
  outline: { color: new Color(groundRiskVolumeColor), width: 2 }
});

export const contingencyVolumeSymbol = new SimpleFillSymbol({
  color: new Color([...contingencyVolumeColor, 0.5]),
  outline: { color: new Color(contingencyVolumeColor), width: 2 }
});

export const flightGeographySymbol = (withOutline: boolean = true) => {
  return new SimpleFillSymbol({
    color: new Color([...flightGeographyColor, 0.5]),
    outline: withOutline
      ? { color: new Color([...flightGeographyColor]), width: 2, cap: 'round', join: 'round' }
      : undefined
  });
};
