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

export const landuseRenderer = {
  type: 'uniqueValue',
  field: 'value',
  defaultSymbol: {
    type: 'esriSFS',
    color: [255, 0, 0, 0],
    style: 'esriSFSSolid'
  },
  uniqueValueInfos: [
    {
      value: 1130,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 1210,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 1222,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 1230,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 1241,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 1242,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 1310,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 1320,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 1330,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 1410,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 1421,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 1422,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    },
    {
      value: 3310,
      symbol: {
        type: 'esriSFS',
        color: [80, 80, 80, 255],
        style: 'esriSFSSolid'
      }
    }
  ]
};
