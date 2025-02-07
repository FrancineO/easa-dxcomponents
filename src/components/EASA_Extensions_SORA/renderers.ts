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
      label: 'Urban vegetation',
      classMaxValue: 1130,
      symbol: {
        type: 'esriSFS',
        color: [0, 117, 22, 255],
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
      label: 'Industrial or commercial units',
      classMaxValue: 1210,
      symbol: {
        type: 'esriSFS',
        color: [207, 205, 204, 255],
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
      label: 'Major stations',
      classMaxValue: 1222,
      symbol: {
        type: 'esriSFS',
        color: [105, 105, 105, 255],
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
      label: 'Port areas',
      classMaxValue: 1230,
      symbol: {
        type: 'esriSFS',
        color: [127, 215, 250, 255],
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
      label: 'Airport terminals',
      classMaxValue: 1242,
      symbol: {
        type: 'esriSFS',
        color: [150, 150, 150, 255],
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
      label: 'Construction sites',
      classMaxValue: 1330,
      symbol: {
        type: 'esriSFS',
        color: [249, 139, 0, 255],
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
      label: 'Green urban areas',
      classMaxValue: 1410,
      symbol: {
        type: 'esriSFS',
        color: [101, 224, 111, 255],
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
      label: 'Sport and leisure green',
      classMaxValue: 1421,
      symbol: {
        type: 'esriSFS',
        color: [56, 255, 66, 255],
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
      label: 'Sport and leisure built-up',
      classMaxValue: 1422,
      symbol: {
        type: 'esriSFS',
        color: [168, 168, 168, 255],
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
      label: 'Beaches, dunes and sand plains',
      classMaxValue: 3310,
      symbol: {
        type: 'esriSFS',
        color: [176, 150, 65, 255],
        outline: {
          type: 'esriSLS',
          color: [0, 0, 0, 0],
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
