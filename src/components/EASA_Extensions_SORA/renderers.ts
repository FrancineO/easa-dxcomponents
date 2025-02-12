export const populationDensityRenderer = {
  authoringInfo: {
    classificationMethod: 'esriClassifyNaturalBreaks',
    colorRamp: {
      type: 'algorithmic',
      algorithm: 'esriHSVAlgorithm',
      fromColor: [245, 245, 0, 255],
      toColor: [255, 0, 0, 255]
    }
  },
  type: 'classBreaks',
  classBreakInfos: [
    {
      label: '0 - 0',
      classMaxValue: 0,
      symbol: {
        type: 'esriSFS',
        color: [0, 0, 0, 0],
        outline: {
          type: 'esriSLS',
          color: [0, 0, 0, 0],
          width: 0,
          style: 'esriSLSSolid'
        },
        style: 'esriSFSSolid'
      }
    },
    {
      label: '0 - 98.971',
      classMaxValue: 98.970703,
      symbol: {
        type: 'esriSFS',
        color: [248, 186, 0, 255],
        outline: {
          type: 'esriSLS',
          color: [0, 0, 0, 255],
          width: 0,
          style: 'esriSLSSolid'
        },
        style: 'esriSFSSolid'
      }
    },
    {
      label: '98.971 - 240.357',
      classMaxValue: 240.357422,
      symbol: {
        type: 'esriSFS',
        color: [250, 125, 0, 255],
        outline: {
          type: 'esriSLS',
          color: [0, 0, 0, 255],
          width: 0,
          style: 'esriSLSSolid'
        },
        style: 'esriSFSSolid'
      }
    }
  ]
};

export default {
  authoringInfo: {
    classificationMethod: 'esriClassifyNaturalBreaks',
    colorRamp: {
      type: 'algorithmic',
      algorithm: 'esriHSVAlgorithm',
      fromColor: [245, 245, 0, 255],
      toColor: [255, 0, 0, 255]
    }
  },
  type: 'classBreaks',
  classBreakInfos: [
    {
      label: '0 - 0',
      classMaxValue: 0,
      symbol: {
        type: 'esriSFS',
        color: [0, 0, 0, 0],
        outline: {
          type: 'esriSLS',
          color: [0, 0, 0, 0],
          width: 0,
          style: 'esriSLSSolid'
        },
        style: 'esriSFSSolid'
      }
    },
    {
      label: '0 - 98.971',
      classMaxValue: 98.970703,
      symbol: {
        type: 'esriSFS',
        color: [248, 186, 0, 255],
        outline: {
          type: 'esriSLS',
          color: [0, 0, 0, 255],
          width: 0,
          style: 'esriSLSSolid'
        },
        style: 'esriSFSSolid'
      }
    },
    {
      label: '98.971 - 240.357',
      classMaxValue: 240.357422,
      symbol: {
        type: 'esriSFS',
        color: [250, 125, 0, 255],
        outline: {
          type: 'esriSLS',
          color: [0, 0, 0, 255],
          width: 0,
          style: 'esriSLSSolid'
        },
        style: 'esriSFSSolid'
      }
    },
    {
      label: '240.357 - 466.576',
      classMaxValue: 466.576172,
      symbol: {
        type: 'esriSFS',
        color: [253, 63, 0, 255],
        outline: {
          type: 'esriSLS',
          color: [0, 0, 0, 255],
          width: 0,
          style: 'esriSLSSolid'
        },
        style: 'esriSFSSolid'
      }
    },
    {
      label: '466.576 - 7,239',
      classMaxValue: 7239,
      symbol: {
        type: 'esriSFS',
        color: [255, 0, 0, 255],
        outline: {
          type: 'esriSLS',
          color: [0, 0, 0, 255],
          width: 0,
          style: 'esriSLSSolid'
        },
        style: 'esriSFSSolid'
      }
    }
  ],
  field: 'value',
  minValue: 0
};

// Class code

// Class label

// Density potentially higher than shown on the map

// 1130

// Urban vegetation

// Yes

// 1210

// Industrial or commercial units

// Yes

// 1222

// Major stations

// Yes

// 1230

// Port areas

// Yes

// 1241

// Airport areas

// Yes

// 1242

// Airport terminals

// Yes

// 1310

// Mineral extraction sites

// Yes

// 1320

// Dump sites

// Yes

// 1330

// Construction sites

// Yes

// 1410

// Green urban areas

// Yes

// 1421

// Sport and leisure green

// Yes

// 1422

// Sport and leisure built-up

// Yes

// 3310

// Beaches, dunes and sand plains

// Yes

export const landuseColors: Record<number, Array<number>> = {
  1130: [200, 157, 236, 255],
  1210: [200, 157, 236, 255],
  1222: [200, 157, 236, 255],
  1230: [200, 157, 236, 255],
  1242: [152, 118, 198, 255],
  1330: [152, 118, 198, 255],
  1410: [200, 157, 236, 255],
  1421: [224, 176, 255, 255],
  1422: [75, 0, 130, 255],
  3310: [75, 0, 130, 255]
};

export const landusePopDensityLookup: Record<number, number> = {
  1130: 10000,
  1210: 10000,
  1222: 10000,
  1230: 10000,
  1242: 20000,
  1330: 20000,
  1410: 10000,
  1421: 5000,
  1422: 50000,
  3310: 50000
};

export const landUseLabels: Record<number, string> = {
  1130: 'Urban vegetation',
  1210: 'Industrial or commercial units',
  1222: 'Major stations',
  1230: 'Port areas',
  1242: 'Airport terminals',
  1330: 'Construction sites',
  1410: 'Green urban areas',
  1421: 'Sport and leisure green',
  1422: 'Sport and leisure built-up',
  3310: 'Beaches, dunes and sand plains'
};

export const landuseRenderer = {
  authoringInfo: {
    classificationMethod: 'esriClassifyManual',
    colorRamp: {
      type: 'algorithmic',
      algorithm: 'esriHSVAlgorithm',
      fromColor: [245, 245, 0, 255],
      toColor: [255, 0, 0, 255]
    }
  },
  type: 'classBreaks',
  classBreakInfos: [
    {
      label: `${landUseLabels[1130]} - ${landusePopDensityLookup[1130]}`,
      classMaxValue: 1130,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1130],
        style: 'esriSFSSolid'
      }
    },
    {
      label: `${landUseLabels[1210]} - ${landusePopDensityLookup[1210]}`,
      classMaxValue: 1210,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1210],
        style: 'esriSFSSolid'
      }
    },
    {
      label: `${landUseLabels[1222]} - ${landusePopDensityLookup[1222]}`,
      classMaxValue: 1222,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1222],
        style: 'esriSFSSolid'
      }
    },
    {
      label: `${landUseLabels[1230]} - ${landusePopDensityLookup[1230]}`,
      classMaxValue: 1230,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1230],
        style: 'esriSFSSolid'
      }
    },
    {
      label: `${landUseLabels[1242]} - ${landusePopDensityLookup[1242]}`,
      classMaxValue: 1242,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1242],
        style: 'esriSFSSolid'
      }
    },
    {
      label: `${landUseLabels[1330]} - ${landusePopDensityLookup[1330]}`,
      classMaxValue: 1330,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1330],
        style: 'esriSFSSolid'
      }
    },
    {
      label: `${landUseLabels[1410]} - ${landusePopDensityLookup[1410]}`,
      classMaxValue: 1410,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1410],
        style: 'esriSFSSolid'
      }
    },
    {
      label: `${landUseLabels[1421]} - ${landusePopDensityLookup[1421]}`,
      classMaxValue: 1421,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1421],
        style: 'esriSFSSolid'
      }
    },
    {
      label: `${landUseLabels[1422]} - ${landusePopDensityLookup[1422]}`,
      classMaxValue: 1422,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[1422],
        style: 'esriSFSSolid'
      }
    },
    {
      label: `${landUseLabels[3310]} - ${landusePopDensityLookup[3310]}`,
      classMaxValue: 3310,
      symbol: {
        type: 'esriSFS',
        color: landuseColors[3310],
        style: 'esriSFSSolid'
      }
    }
  ],
  field: 'value',
  minValue: 0
};

export const geozones = [
  {
    value: 'restricted',
    label: 'Restricted',
    color: [239, 210, 140, 255]
  },
  {
    value: 'open',
    label: 'Open',
    color: [151, 225, 150, 255]
  },
  {
    value: 'U-space',
    label: 'U-space',
    color: [149, 203, 233, 255]
  },
  {
    value: 'prohibited',
    label: 'Prohibited',
    color: [233, 149, 144, 255]
  }
];

export const geozoneRenderer = {
  type: 'uniqueValue',
  field1: 'Restriction',
  uniqueValueInfos: geozones.map(zone => ({
    symbol: {
      type: 'esriSFS',
      color: zone.color,
      style: 'esriSFSSolid'
    },
    value: zone.value,
    label: zone.label
  })),
  fieldDelimiter: ','
};

// export const getLanduseHighlightRendererJson = () => {
//   const landuseHighlightRendererCopy = { ...landuseRenderer };
//   landuseHighlightRendererCopy.classBreakInfos.forEach(info => {
//     info.symbol.color = [0, 255, 255, 255];
//   });
//   return landuseHighlightRendererCopy;
// };
