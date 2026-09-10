import type { ImpactedLandUse } from './types';

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

  // Germany (LBA). Member states may deviate from the LUISA defaults above;
  // their values are carried in the raster as the LUISA code prefixed with the
  // country calling code, so 491111 is 1111 in Germany. Only the classes where
  // the state deviates are prefixed, everything else keeps the plain code and
  // the value above. Supplied by LBA via JRC, September 2026.
  491111: 49999,
  491121: 4999,
  491122: 4999,
  491130: 4999,
  491210: 4999,
  491222: 49999,
  491230: 4999,
  491242: 49999,
  491330: 4999,
  491410: 49999,
  491421: 4999,
  491422: 4999,
  493310: 49999,
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

// landusePopDensityLookup is the single source of truth for which classes are
// active: a class absent from it is not drawn, not legended, not reported as
// intersecting and contributes nothing to the maximum. 1122 (low density urban
// fabric) and 1123 (very low density urban fabric) are excluded that way.
// Labels are kept separate so a class can be named without being switched on.
export const landUseLabels: Record<number, string> = {
  1111: 'High density urban fabric',
  1121: 'Medium density urban fabric',
  // Named but deliberately absent from landusePopDensityLookup, so it stays
  // switched off Europe wide. Germany's 491122 resolves its label through here.
  1122: 'Low density urban fabric',
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

// Country specific codes are the LUISA code prefixed with the country calling
// code: 491111 is 1111 in Germany, and a three digit calling code such as 351
// gives 3511111. Dividing by the modulus recovers the calling code, the
// remainder is always the plain LUISA code.
const LUISA_CODE_MODULUS = 10000;

const countryByCallingCode: Record<number, string> = {
  49: 'Germany',
};

export const getBaseLanduseCode = (landuseCode: number) =>
  landuseCode % LUISA_CODE_MODULUS;

export const getLanduseCountry = (landuseCode: number): string | null =>
  countryByCallingCode[Math.floor(landuseCode / LUISA_CODE_MODULUS)] ?? null;

// Labels, and the outdoor/assembly classification, always come from the base
// class. Member states deviate on density only, so a country specific code
// must not need its own entry in every table.
export const getLanduseLabel = (landuseCode: number) => {
  const label = landUseLabels[getBaseLanduseCode(landuseCode)];
  if (!label) return `Landuse ${landuseCode}`;

  const country = getLanduseCountry(landuseCode);
  return country ? `${label} (${country})` : label;
};

export const isLandusePeopleOutdoor = (landuseCode: number) =>
  landusePeopleOutdoor.includes(getBaseLanduseCode(landuseCode));

// Build the ImpactedLandUse records reported to Pega and shown in the override
// modal. Kept in one place so that label, density and outdoor/assembly
// derivation cannot drift between the three callers.
export const buildImpactedLandUse = (
  landuseClasses: number[] | null | undefined,
  overrides?: ImpactedLandUse[] | null,
): ImpactedLandUse[] | null => {
  if (!landuseClasses) return null;

  return landuseClasses.map((landuse) => {
    const existingOverride = overrides?.find(
      (override) => override.Code === `${landuse}`,
    );

    return {
      pyLabel: getLanduseLabel(landuse),
      Code: `${landuse}`,
      PopulationDensity: landusePopDensityLookup[landuse] ?? 0,
      PeopleOutdoor: isLandusePeopleOutdoor(landuse),
      AssemblyOfPeople: isLandusePeopleOutdoor(landuse),
      OverridePopulationDensity:
        existingOverride?.OverridePopulationDensity ?? null,
      OverrideReason: existingOverride?.OverrideReason ?? null,
    };
  });
};

export const landuseRenderer = {
  type: 'classBreaks',
  field: 'value',
  classBreakInfos: Object.keys(landusePopDensityLookup).map((landuseCode) => {
    const code = Number(landuseCode);
    const density = landusePopDensityLookup[code];
    const label = getLanduseLabel(code);
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

// Generate the proper raster function for ImageryLayers
// This creates the Remap → Colormap chain that ArcGIS expects
export const getLanduseRasterFunction = () => {
  const landuseCodes = Object.keys(landusePopDensityLookup).map(Number);

  // Build InputRanges and OutputValues for Remap function
  const inputRanges: number[] = [];
  const outputValues: number[] = [];
  const colormap: number[][] = [];

  landuseCodes.forEach((code, index) => {
    // For Remap: map each landuse code to a sequential index
    inputRanges.push(code, code + 0.0001);
    outputValues.push(index);

    // For Colormap: map each index to its color
    const color = getLanduseColor(code);
    colormap.push([index, color[0], color[1], color[2]]);
  });

  // Add NoData values to colormap
  colormap.push([-1, 0, 0, 0]);
  colormap.push([65536, 0, 0, 0]);

  return {
    rasterFunction: 'Colormap',
    rasterFunctionArguments: {
      Colormap: colormap,
      Raster: {
        rasterFunction: 'Remap',
        rasterFunctionArguments: {
          InputRanges: inputRanges,
          OutputValues: outputValues,
          NoDataRanges: [],
        },
        variableName: 'Raster',
      },
    },
  };
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

// computeHistograms returns one bin per integer pixel value only while the
// value range is small. Country prefixed codes push the range past 490,000, at
// which point the service buckets the bins and the bin index silently stops
// being the pixel value. Remapping the known codes to sequential indices
// server side keeps the histogram at one bin per class whatever the codes look
// like. Unmatched values become NoData, so classes with no lookup entry drop
// out here rather than being filtered downstream.
export const landuseHistogramCodes = Object.keys(landusePopDensityLookup)
  .map(Number)
  .sort((a, b) => a - b);

// Returned as plain JSON rather than a RasterFunction so that this module
// stays free of runtime esri imports and can be unit tested. Nested raster
// functions are converted by RasterFunction's own constructor.
export const getLanduseHistogramRasterFunctionJson = (
  clippingGeometry?: __esri.Polygon,
) => {
  const inputRanges: number[] = [];
  const outputValues: number[] = [];

  landuseHistogramCodes.forEach((code, index) => {
    // Ranges are half open, and the codes are integers
    inputRanges.push(code, code + 1);
    outputValues.push(index);
  });

  const functionArguments: Record<string, unknown> = {
    InputRanges: inputRanges,
    OutputValues: outputValues,
    AllowUnmatched: false,
    NoDataRanges: [],
  };

  if (clippingGeometry) {
    functionArguments.Raster = {
      functionName: 'Clip',
      functionArguments: {
        ClippingGeometry: clippingGeometry,
        ClippingType: 1, // 1 = keep inside, set outside to NoData
      },
    };
  }

  return { functionName: 'Remap', functionArguments };
};

// Translate a histogram produced by getLanduseHistogramRasterFunction back to
// land use codes. Bin index is the position in landuseHistogramCodes, so this
// is the only place that knows how to read one of those histograms.
export const getLanduseCountsByCode = (counts?: number[]) => {
  const countsByCode = new Map<number, number>();

  counts?.forEach((count, index) => {
    const code = landuseHistogramCodes[index];
    if (code !== undefined && count > 0) {
      countsByCode.set(code, count);
    }
  });

  return countsByCode;
};
