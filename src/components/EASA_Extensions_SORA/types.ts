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
  heading: string;
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
  parachute: boolean;
  rollAngle: number;
  multirotor: boolean;
  hFG: number;
  hAM: number;
  simplified: boolean;
  cd: number;
  vWind: number;
  vZ: number;
  power: boolean;
  cL: number;
  gliding: boolean;
  controlledGroundArea: boolean;
  criticalArea: number | null;
} & MapProps;

export type FlightVolumeParams = {
  flightGeography: __esri.Graphic | null;
} & ComponentProps;

export type FlightVolume = {
  contingencyVolumeHeight: number | null;
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
