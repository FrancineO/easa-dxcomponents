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

export const landuseColors: Record<number, Array<number>> = {
  1111: [200, 157, 236, 255], // New, using Urban vegetation color
  1121: [200, 157, 236, 255], // New, using Urban vegetation color
  1130: [200, 157, 236, 255],
  1210: [200, 157, 236, 255],
  1221: [200, 157, 236, 255], // New, using Urban vegetation color
  1222: [200, 157, 236, 255],
  1230: [200, 157, 236, 255],
  1242: [152, 118, 198, 255],
  1330: [152, 118, 198, 255],
  1410: [200, 157, 236, 255],
  1421: [224, 176, 255, 255],
  1422: [75, 0, 130, 255],
  3310: [75, 0, 130, 255],
  3311: [75, 0, 130, 255], // New, using Beaches color
  3312: [75, 0, 130, 255], // New
  3313: [75, 0, 130, 255], // New
  3314: [75, 0, 130, 255], // New
  3315: [75, 0, 130, 255], // New
  3316: [75, 0, 130, 255], // New
  3317: [75, 0, 130, 255], // New
  3318: [75, 0, 130, 255], // New
};

export const landusePopDensityLookup: Record<number, number> = {
  1111: 10000,
  1121: 5000,
  1130: 10000,
  1210: 10000,
  1221: 10000,
  1222: 10000,
  1230: 10000,
  1242: 20000,
  1330: 20000,
  1410: 10000,
  1421: 5000,
  1422: 50000,
  3310: 50000,
  3311: 50000,
  3312: 50000,
  3313: 50000,
  3314: 50000,
  3315: 50000,
  3316: 50000,
  3317: 50000,
  3318: 50000,
};

// comes from the pdf in email the email (ExtMsg: RE: Proposal for SFSTRY0002297 M1(A) Sheltering: operating over area where people not sheltered)
// from emiliano page 9, last column (Potential recurrent presence of assemblies of people outdoor)
// used in type ImpactedLandUse: PeopleOutdoor: boolean; (component/types.ts)
// use the same value for AssemblyOfPeople: boolean;
export const landusePeopleOutdoor: Array<number> = [
  1210, 1222, 1241, 1410, 1421, 1422, 3310,
];

export const landUseLabels: Record<number, string> = {
  1111: 'Urban fabric', // New, generic label
  1121: 'Urban fabric', // New, generic label
  1130: 'Urban vegetation',
  1210: 'Industrial or commercial units',
  1221: 'Transport infrastructure', // New, generic label
  1222: 'Major stations',
  1230: 'Port areas',
  1242: 'Airport terminals',
  1330: 'Construction sites',
  1410: 'Green urban areas',
  1421: 'Sport and leisure green',
  1422: 'Sport and leisure built-up',
  3310: 'Beaches, dunes and sand plains',
  3311: 'Beaches, dunes and sand plains', // New, generic label
  3312: 'Beaches, dunes and sand plains', // New
  3313: 'Beaches, dunes and sand plains', // New
  3314: 'Beaches, dunes and sand plains', // New
  3315: 'Beaches, dunes and sand plains', // New
  3316: 'Beaches, dunes and sand plains', // New
  3317: 'Beaches, dunes and sand plains', // New
  3318: 'Beaches, dunes and sand plains', // New
};

export const landuseRenderer = {
  authoringInfo: {
    classificationMethod: 'esriClassifyManual',
    colorRamp: {
      type: 'algorithmic',
      algorithm: 'esriHSVAlgorithm',
      fromColor: [245, 245, 0, 255],
      toColor: [255, 0, 0, 255],
    },
  },
  type: 'classBreaks',
  classBreakInfos: [
    {
      label: `${landUseLabels[1130]} - ${landusePopDensityLookup[1130]}`,
      classMaxValue: 1130,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1130],
        style: 'esriSFSSolid',
      },
    },
    {
      label: `${landUseLabels[1210]} - ${landusePopDensityLookup[1210]}`,
      classMaxValue: 1210,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1210],
        style: 'esriSFSSolid',
      },
    },
    {
      label: `${landUseLabels[1222]} - ${landusePopDensityLookup[1222]}`,
      classMaxValue: 1222,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1222],
        style: 'esriSFSSolid',
      },
    },
    {
      label: `${landUseLabels[1230]} - ${landusePopDensityLookup[1230]}`,
      classMaxValue: 1230,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1230],
        style: 'esriSFSSolid',
      },
    },
    {
      label: `${landUseLabels[1242]} - ${landusePopDensityLookup[1242]}`,
      classMaxValue: 1242,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1242],
        style: 'esriSFSSolid',
      },
    },
    {
      label: `${landUseLabels[1330]} - ${landusePopDensityLookup[1330]}`,
      classMaxValue: 1330,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1330],
        style: 'esriSFSSolid',
      },
    },
    {
      label: `${landUseLabels[1410]} - ${landusePopDensityLookup[1410]}`,
      classMaxValue: 1410,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1410],
        style: 'esriSFSSolid',
      },
    },
    {
      label: `${landUseLabels[1421]} - ${landusePopDensityLookup[1421]}`,
      classMaxValue: 1421,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1421],
        style: 'esriSFSSolid',
      },
    },
    {
      label: `${landUseLabels[1422]} - ${landusePopDensityLookup[1422]}`,
      classMaxValue: 1422,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1422],
        style: 'esriSFSSolid',
      },
    },
    {
      label: `${landUseLabels[3310]} - ${landusePopDensityLookup[3310]}`,
      classMaxValue: 3310,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[3310],
        style: 'esriSFSSolid',
      },
    },
  ],
  field: 'value',
  minValue: 0,
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
