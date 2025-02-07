export type MapProps = {
  latitude: number;
  longitude: number;
  zoom: number;
  agolUrl: string;
  agolToken: string;
  popDensityPortalItemId: string;
  basemapPortalItemId: string;
  landusePortalItemId: string;
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
} & MapProps;

export type FlightVolumeParams = {
  flightGeography: __esri.Graphic | null;
} & ComponentProps;

export type FlightVolume = {
  contingencyVolume: __esri.Graphic | null;
  groundRiskVolume: __esri.Graphic | null;
  adjacentArea: __esri.Graphic | null;
  flightGeography: __esri.Graphic | null;
};

export type PopulationDensity = {
  maxPopDensityAdjacentArea: number | null;
  avgOperationalGroundRiskPopDensity: number | null;
};
