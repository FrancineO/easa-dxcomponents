import Graphic from '@arcgis/core/Graphic';
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import type MapView from '@arcgis/core/views/MapView';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Color from '@arcgis/core/Color';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import * as geometryJsonUtils from '@arcgis/core/geometry/support/jsonUtils';

import {
  adjacentAreaColor,
  flightGeographyColor,
  flightPathColor
} from './flight-volume/flight-volume-symbols';

export const getPolylineSymbol = () => {
  return new SimpleLineSymbol({
    color: new Color(flightPathColor),
    width: 2,
    cap: 'round',
    join: 'round'
  });
};

export const getFillSymbol = (withOutline: boolean = true) => {
  const color = new Color(flightGeographyColor);
  color.a = 0.5;
  return new SimpleFillSymbol({
    color,
    style: 'solid',
    outline: withOutline
      ? {
          color: new Color(adjacentAreaColor),
          width: 2,
          cap: 'round',
          join: 'round'
        }
      : undefined
  });
};

export const getPointSymbol = () => {
  return new SimpleMarkerSymbol({
    color: new Color('rgba(0, 0, 0, 0)'),
    size: 10,
    style: 'circle',
    outline: {
      color: new Color(adjacentAreaColor),
      width: 2
    }
  });
};

export const getSymbol = (geometryType: 'polyline' | 'polygon' | 'point') => {
  if (geometryType === 'polyline') {
    return getPolylineSymbol();
  }
  if (geometryType === 'point') {
    return getPointSymbol();
  }
  return getFillSymbol();
};

export const getAllFields = (pConnect: any) => {
  const metadata = pConnect().getRawMetadata();
  if (!metadata.children) {
    return [];
  }

  let allFields = [];

  const makeField = (f: any) => {
    let category = 0;
    if (f.type === 'Group') {
      category = f.children && f.children.length > 0 ? 2 : 1;
    }
    return {
      ...pConnect().resolveConfigProps(f.config),
      type: f.type,
      path: f.config.value,
      category
    };
  };

  const hasRegions = !!metadata.children[0]?.children;
  if (hasRegions) {
    metadata.children.forEach((region: any) =>
      region.children.forEach((field: any) => {
        allFields.push(makeField(field));
        if (field.type === 'Group' && field.children) {
          field.children.forEach((gf: any) => allFields.push(makeField(gf)));
        }
      })
    );
  } else {
    allFields = metadata.children.map(makeField);
  }
  return allFields;
};

// create a new graphic presenting the polyline that is being drawn on the view
export const createGraphic = (ptLayer: GraphicsLayer, geometry: any) => {
  const graphic = new Graphic({
    geometry,
    symbol: getSymbol(geometry.type)
  });
  ptLayer.add(graphic);
};

export const deletePoints = (
  getPConnect: any,
  props: any,
  embedDataRef: string,
  numPoints: number
) => {
  const messageConfig = {
    meta: props,
    options: {
      context: getPConnect().getContextName(),
      pageReference: `caseInfo.content${embedDataRef}`,
      target: getPConnect().getTarget()
    }
  };
  const c11nEnv = (window as any).PCore.createPConnect(messageConfig);
  for (let index = numPoints; index > 0; index -= 1) {
    c11nEnv
      .getPConnect()
      .getListActions()
      .deleteEntry(index - 1);
  }
};

export const addPoint = (
  getPConnect: any,
  props: any,
  embedDataRef: string,
  longitudePropRef: string,
  latitudePropRef: string,
  index: number,
  x: any
) => {
  const messageConfig = {
    meta: props,
    options: {
      context: getPConnect().getContextName(),
      pageReference: `caseInfo.content${embedDataRef}[${index}]`,
      target: getPConnect().getTarget()
    }
  };
  const c11nEnv = (window as any).PCore.createPConnect(messageConfig);
  const actionsApi = c11nEnv.getPConnect().getActionsApi();
  const ll = webMercatorUtils.xyToLngLat(x[0], x[1]);
  actionsApi?.updateFieldValue(longitudePropRef, ll[0]);
  actionsApi?.updateFieldValue(latitudePropRef, ll[1]);
};

export const addScreenShot = (getPConnect: any, view: MapView, imageMapRef: string) => {
  if (imageMapRef) {
    view
      .takeScreenshot({
        format: 'jpg',
        quality: 70,
        width: 500,
        height: (view.height * 500) / view.width
      })
      .then((screenshot: any) => {
        const actionsApi = getPConnect().getActionsApi();
        actionsApi?.updateFieldValue(imageMapRef, screenshot.dataUrl);
      });
  }
};

export const getFlightGeography = (flightGeometryString: string | null) => {
  if (!flightGeometryString) {
    return null;
  }

  const flightGeometry = JSON.parse(flightGeometryString);

  if (!flightGeometry) {
    return null;
  }

  return new Graphic({
    geometry: geometryJsonUtils.fromJSON(flightGeometry),
    symbol: getSymbol(flightGeometry.type)
  });
};
