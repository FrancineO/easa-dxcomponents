export type MapProps = {
  flightPathJSON: string | null;
  mapStateJSON: string | null;
  agolUrl: string;
  agolToken: string;
  popDensityPortalItemId: string;
  basemapPortalItemIds: string;
  landusePortalItemId: string;
  geozonePortalItemId: string;
};

export type MapState = {
  center?: {
    latitude: number;
    longitude: number;
  };
  zoom?: number;
  basemap?: string;
  layerVisibility?: LayerVisibility;
};

export type LayerVisibility = {
  [key in LayerGroupType]?: boolean | undefined;
};

export type ComponentProps = {
  getPConnect?: any;
  heading?: string;
  height: string;
  printServiceUrl: string;
  printWidth: number;
  printHeight: number;
  printFormat: string;
  printDpi: number;
  sGPS: number;
  sPos: number;
  sK: number;
  vO: number;
  tR: number;
  tP: number;
  terminateWithParachute: boolean;
  maxRollAngle: number;
  maxPitchAngle: number;
  multirotor: boolean;
  hFG: number;
  hAM: number;
  simplified: boolean;
  ballisticApproach: boolean;
  cd: number;
  vWind: number;
  vZ: number;
  power: boolean;
  cL: number;
  gliding: boolean;
  E: number;
  controlledGroundArea: boolean;
  criticalArea: number | null;
} & MapProps;

export type FlightVolumeParams = {
  flightGeography: __esri.Graphic | null;
} & ComponentProps;

export type FlightVolume = {
  contingencyVolumeHeight: number | null;
  adjacentVolumeWidth: number | null;
  contingencyVolumeWidth: number | null;
  groundRiskBufferWidth: number | null;
  contingencyVolume: __esri.Graphic | null;
  groundRiskVolume: __esri.Graphic | null;
  adjacentArea: __esri.Graphic | null;
  flightGeography: __esri.Graphic | null;
};

export type PopulationDensity = {
  maxPopDensityOperationalGroundRisk: number | null;
  avgPopDensityAdjacentArea: number | null;
};

export enum LayerGroupType {
  populationDensity = 'PopulationDensity',
  geozones = 'Geozones'
}

export type LayerGroup = {
  type: LayerGroupType;
  ids: LayerId[];
  label: string;
};

export enum LayerId {
  populationDensity = 'PopulationDensity',
  geozones = 'Geozones',
  landuse = 'Landuse',
  landuseHighlight = 'LanduseHighlight'
}

export const layerGroups: LayerGroup[] = [
  {
    type: LayerGroupType.populationDensity,
    label: 'Population Density',
    ids: [LayerId.populationDensity, LayerId.landuse]
  },
  {
    type: LayerGroupType.geozones,
    label: 'Geozones',
    ids: [LayerId.geozones]
  }
];

function getActualType(actual: any): string {
  if (actual === undefined) return 'undefined (missing)';
  if (actual === null) return 'null';
  return typeof actual;
}

function assertType(condition: boolean, key: string, expected: string, actual: any) {
  if (!condition) {
    const actualType = getActualType(actual);
    throw new Error(`Invalid type for "${key}". Expected "${expected}", but got "${actualType}".`);
  }
}

function validateMapProps(obj: any): asserts obj is MapProps {
  const requiredKeys: (keyof MapProps)[] = [
    'agolUrl',
    'agolToken',
    'popDensityPortalItemId',
    'basemapPortalItemIds',
    'landusePortalItemId',
    'geozonePortalItemId',
    'flightPathJSON',
    'mapStateJSON'
  ];

  for (const key of requiredKeys) {
    assertType(key in obj, key, 'present', undefined);
  }

  assertType(typeof obj.agolUrl === 'string', 'agolUrl', 'string', obj.agolUrl);
  assertType(typeof obj.agolToken === 'string', 'agolToken', 'string', obj.agolToken);
  assertType(
    typeof obj.popDensityPortalItemId === 'string',
    'popDensityPortalItemId',
    'string',
    obj.popDensityPortalItemId
  );
  assertType(
    typeof obj.basemapPortalItemIds === 'string',
    'basemapPortalItemIds',
    'string',
    obj.basemapPortalItemIds
  );
  assertType(
    typeof obj.landusePortalItemId === 'string',
    'landusePortalItemId',
    'string',
    obj.landusePortalItemId
  );
  assertType(
    typeof obj.geozonePortalItemId === 'string',
    'geozonePortalItemId',
    'string',
    obj.geozonePortalItemId
  );
  assertType(
    typeof obj.flightPathJSON === 'string' || obj.flightPathJSON === null,
    'flightPathJSON',
    'string | null',
    obj.flightPathJSON
  );
  assertType(
    typeof obj.mapStateJSON === 'string' || obj.mapStateJSON === null,
    'mapStateJSON',
    'string | null',
    obj.mapStateJSON
  );
}

export function validateComponentProps(obj: any): asserts obj is ComponentProps {
  if (typeof obj !== 'object' || obj === null) throw new Error('Input is not a valid object.');

  const requiredKeys: (keyof ComponentProps)[] = [
    'height',
    'printServiceUrl',
    'printWidth',
    'printHeight',
    'printFormat',
    'printDpi',
    'sGPS',
    'sPos',
    'sK',
    'vO',
    'tR',
    'tP',
    'terminateWithParachute',
    'maxRollAngle',
    'maxPitchAngle',
    'multirotor',
    'hFG',
    'hAM',
    'simplified',
    'ballisticApproach',
    'cd',
    'vWind',
    'vZ',
    'power',
    'cL',
    'gliding',
    'E',
    'controlledGroundArea',
    'criticalArea',
    // MapProps keys:
    'agolUrl',
    'agolToken',
    'popDensityPortalItemId',
    'basemapPortalItemIds',
    'landusePortalItemId',
    'geozonePortalItemId',
    'flightPathJSON',
    'mapStateJSON'
  ];

  for (const key of requiredKeys) {
    assertType(key in obj, key, 'present', undefined);
  }

  // Individual field checks
  assertType(typeof obj.height === 'string', 'height', 'string', obj.height);
  assertType(
    typeof obj.printServiceUrl === 'string',
    'printServiceUrl',
    'string',
    obj.printServiceUrl
  );
  assertType(typeof obj.printWidth === 'number', 'printWidth', 'number', obj.printWidth);
  assertType(typeof obj.printHeight === 'number', 'printHeight', 'number', obj.printHeight);
  assertType(typeof obj.printFormat === 'string', 'printFormat', 'string', obj.printFormat);
  assertType(typeof obj.printDpi === 'number', 'printDpi', 'number', obj.printDpi);
  assertType(typeof obj.sGPS === 'number', 'sGPS', 'number', obj.sGPS);
  assertType(typeof obj.sPos === 'number', 'sPos', 'number', obj.sPos);
  assertType(typeof obj.sK === 'number', 'sK', 'number', obj.sK);
  assertType(typeof obj.vO === 'number', 'vO', 'number', obj.vO);
  assertType(typeof obj.tR === 'number', 'tR', 'number', obj.tR);
  assertType(typeof obj.tP === 'number' || obj.tP === '', 'tP', 'number', obj.tP);
  assertType(
    typeof obj.terminateWithParachute === 'boolean',
    'terminateWithParachute',
    'boolean',
    obj.terminateWithParachute
  );
  assertType(typeof obj.maxRollAngle === 'number', 'maxRollAngle', 'number', obj.maxRollAngle);
  assertType(typeof obj.maxPitchAngle === 'number', 'maxPitchAngle', 'number', obj.maxPitchAngle);
  assertType(typeof obj.multirotor === 'boolean', 'multirotor', 'boolean', obj.multirotor);
  assertType(typeof obj.hFG === 'number', 'hFG', 'number', obj.hFG);
  assertType(typeof obj.hAM === 'number', 'hAM', 'number', obj.hAM);
  assertType(typeof obj.simplified === 'boolean', 'simplified', 'boolean', obj.simplified);
  assertType(
    typeof obj.ballisticApproach === 'boolean',
    'ballisticApproach',
    'boolean',
    obj.ballisticApproach
  );
  assertType(typeof obj.cd === 'number', 'cd', 'number', obj.cd);
  assertType(typeof obj.vWind === 'number', 'vWind', 'number', obj.vWind);
  assertType(typeof obj.vZ === 'number', 'vZ', 'number', obj.vZ);
  assertType(typeof obj.power === 'boolean', 'power', 'boolean', obj.power);
  assertType(typeof obj.cL === 'number', 'cL', 'number', obj.cL);
  assertType(typeof obj.gliding === 'boolean', 'gliding', 'boolean', obj.gliding);
  assertType(typeof obj.E === 'number' || obj.E === '', 'E', 'number', obj.E);
  assertType(
    typeof obj.controlledGroundArea === 'boolean',
    'controlledGroundArea',
    'boolean',
    obj.controlledGroundArea
  );
  assertType(
    typeof obj.criticalArea === 'number' || obj.criticalArea === null,
    'criticalArea',
    'number | null',
    obj.criticalArea
  );

  // Optional fields
  if ('getPConnect' in obj) {
    assertType(
      typeof obj.getPConnect === 'function' || typeof obj.getPConnect === 'object',
      'getPConnect',
      'function | object',
      obj.getPConnect
    );
  }
  if ('heading' in obj) {
    assertType(typeof obj.heading === 'string', 'heading', 'string', obj.heading);
  }

  // MapProps
  validateMapProps(obj);
}
