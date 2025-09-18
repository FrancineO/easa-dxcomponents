export const populationDensityColors = {
  noValue: [0, 0, 0, 0], // Transparent
  veryLow: [224, 240, 255, 255], // Very Light Blue
  low: [173, 216, 230, 255], // Light Blue
  medium: [100, 149, 237, 255], // Medium Blue
  high: [40, 90, 200, 255], // Dark Blue
  extreme: [0, 35, 102, 255], // Deepest Blue
};

export const populationDensityClassbreaks = [
  { value: 0, color: populationDensityColors.noValue, label: 'No data' },
  { value: 0.01, color: populationDensityColors.noValue, label: 'No data' },
  { value: 5, color: populationDensityColors.veryLow, label: '< 5' },
  { value: 50, color: populationDensityColors.low, label: '< 50' },
  { value: 500, color: populationDensityColors.medium, label: '< 500' },
  { value: 5000, color: populationDensityColors.high, label: '< 5,000' },
  { value: 50000, color: populationDensityColors.extreme, label: '< 50,000' },
];

export const populationDensityRenderer = {
  type: 'classBreaks',
  classBreakInfos: populationDensityClassbreaks.map((breakInfo) => ({
    classMaxValue: breakInfo.value,
    symbol: {
      type: 'esriSFS',
      color: breakInfo.color,
      style: 'esriSFSSolid',
    },
    label: breakInfo.label,
  })),
};

export const landusePopDensityLookup: Record<number, number | null> = {
  1111: 13400,
  1121: 8500,
  1130: 4000,
  1210: 6500,
  1221: null,
  1222: 49900,
  1230: 7300,
  1242: 49900,
  1330: 3500,
  1410: 10000,
  1421: 4500,
  1422: 8200,
  3310: 49900,
  3311: 49900,
  3312: 49900,
  3313: 49900,
  3314: 49900,
  3315: 49900,
  3316: 49900,
  3317: 49900,
  3318: 49900,
};

// Color definitions for population density groups
const LOW_DENSITY_COLOR = [200, 157, 236, 255]; // Light purple
const HIGH_DENSITY_COLOR = [75, 0, 130, 255]; // Dark purple

// Function to get landuse color based on population density
export const getLanduseColor = (landuseCode: number): number[] => {
  const density = landusePopDensityLookup[landuseCode];
  if (!density || density === undefined) {
    // Default color for unknown landuse codes
    return [128, 128, 128, 255]; // Gray
  }

  // Return color based on density threshold
  return density !== null && density < 5000
    ? LOW_DENSITY_COLOR
    : HIGH_DENSITY_COLOR;
};

// Legacy export for backward compatibility (if needed elsewhere)
export const landuseColors: Record<number, Array<number>> = new Proxy(
  {} as Record<number, Array<number>>,
  {
    get(target, prop) {
      const landuseCode = Number(prop);
      return getLanduseColor(landuseCode);
    },
  },
);

// comes from the pdf in email the email (ExtMsg: RE: Proposal for SFSTRY0002297 M1(A) Sheltering: operating over area where people not sheltered)
// from emiliano page 9, last column (Potential recurrent presence of assemblies of people outdoor)
// used in type ImpactedLandUse: PeopleOutdoor: boolean; (component/types.ts)
// use the same value for AssemblyOfPeople: boolean;
export const landusePeopleOutdoor: Array<number> = [
  1210, 1222, 1241, 1410, 1421, 1422, 3310,
];

// TODO: 1122 and 1123 should be excluded from the map
export const landUseLabels: Record<number, string> = {
  1111: 'Urban fabric',
  1121: 'Urban fabric',
  1130: 'Urban vegetation',
  1210: 'Industrial or commercial units',
  1221: 'Transport infrastructure',
  1222: 'Major stations',
  1230: 'Port areas',
  1242: 'Airport terminals',
  1330: 'Construction sites',
  1410: 'Green urban areas',
  1421: 'Sport and leisure green',
  1422: 'Sport and leisure built-up',
  3310: 'Beaches, dunes and sand plains',
  3311: 'Beaches, dunes and sand plains',
  3312: 'Beaches, dunes and sand plains',
  3313: 'Beaches, dunes and sand plains',
  3314: 'Beaches, dunes and sand plains',
  3315: 'Beaches, dunes and sand plains',
  3316: 'Beaches, dunes and sand plains',
  3317: 'Beaches, dunes and sand plains',
  3318: 'Beaches, dunes and sand plains',
};

export const landuseRenderer = {
  type: 'classBreaks',
  field: 'value',
  classBreakInfos: Object.keys(landusePopDensityLookup).map((landuseCode) => {
    const code = Number(landuseCode);
    const density = landusePopDensityLookup[code];
    const label = landUseLabels[code] || `Landuse ${code}`;
    const densityLabel = density !== null ? density : 'No data';

    return {
      classMinValue: code,
      classMaxValue: code,
      label: `${label} - ${densityLabel}`,
      symbol: {
        type: 'esriSFS',
        color: getLanduseColor(code),
        style: 'esriSFSSolid',
      },
    };
  }),
};

// export const geozoneRenderer = {
//   type: 'uniqueValue',
//   field1: 'Restriction',
//   uniqueValueInfos: geozones.map(zone => ({
//     symbol: {
//       type: 'esriSFS',
//       color: zone.color,
//       style: 'esriSFSSolid'
//     },
//     value: zone.value,
//     label: zone.label
//   })),
//   fieldDelimiter: ','
// };

// export const getLanduseHighlightRendererJson = () => {
//   const landuseHighlightRendererCopy = { ...landuseRenderer };
//   landuseHighlightRendererCopy.classBreakInfos.forEach(info => {
//     info.symbol.color = [0, 255, 255, 255];
//   });
//   return landuseHighlightRendererCopy;
// };
