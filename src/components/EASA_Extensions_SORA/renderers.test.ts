import {
  buildImpactedLandUse,
  getLanduseHistogramRasterFunctionJson,
  getBaseLanduseCode,
  getLanduseCountry,
  getLanduseCountsByCode,
  getLanduseLabel,
  isLandusePeopleOutdoor,
  landuseHistogramCodes,
  landusePopDensityLookup,
} from './renderers';

describe('country prefixed land use codes', () => {
  it('recovers the base LUISA code', () => {
    expect(getBaseLanduseCode(1111)).toBe(1111);
    expect(getBaseLanduseCode(491111)).toBe(1111);
    expect(getBaseLanduseCode(493310)).toBe(3310);
    // three digit calling codes have to work too
    expect(getBaseLanduseCode(3511111)).toBe(1111);
  });

  it('names the country only for prefixed codes', () => {
    expect(getLanduseCountry(1111)).toBeNull();
    expect(getLanduseCountry(491111)).toBe('Germany');
  });

  it('labels prefixed codes from the base class', () => {
    expect(getLanduseLabel(1111)).toBe('High density urban fabric');
    expect(getLanduseLabel(491111)).toBe('High density urban fabric (Germany)');
  });

  it('excludes 491122, which LBA withdrew as outside the agreement', () => {
    expect(landusePopDensityLookup[1122]).toBeUndefined();
    expect(landusePopDensityLookup[491122]).toBeUndefined();
    // no label either, so it can only ever fall through as unknown
    expect(getLanduseLabel(491122)).toBe('Landuse 491122');
  });

  it('takes the outdoor classification from the base class', () => {
    // 1410 green urban areas is an outdoor class, 1111 is not
    expect(isLandusePeopleOutdoor(1410)).toBe(true);
    expect(isLandusePeopleOutdoor(491410)).toBe(true);
    expect(isLandusePeopleOutdoor(491111)).toBe(false);
  });

  it('uses the national density, not the base class density', () => {
    expect(landusePopDensityLookup[1111]).toBe(13400);
    expect(landusePopDensityLookup[491111]).toBe(49999);
    expect(landusePopDensityLookup[491121]).toBe(4999);
  });
});

describe('buildImpactedLandUse', () => {
  it('returns null without classes', () => {
    expect(buildImpactedLandUse(null)).toBeNull();
    expect(buildImpactedLandUse(undefined)).toBeNull();
  });

  it('builds a record from a prefixed code', () => {
    expect(buildImpactedLandUse([491410])).toEqual([
      {
        pyLabel: 'Green urban areas (Germany)',
        Code: '491410',
        PopulationDensity: 49999,
        PeopleOutdoor: true,
        AssemblyOfPeople: true,
        OverridePopulationDensity: null,
        OverrideReason: null,
      },
    ]);
  });

  it('carries an existing override across', () => {
    const overrides = [
      {
        pyLabel: 'Green urban areas (Germany)',
        Code: '491410',
        PopulationDensity: 49999,
        OverridePopulationDensity: 120,
        OverrideReason: 'surveyed',
        PeopleOutdoor: true,
        AssemblyOfPeople: true,
      },
    ];

    expect(buildImpactedLandUse([491410], overrides)?.[0]).toMatchObject({
      OverridePopulationDensity: 120,
      OverrideReason: 'surveyed',
    });
  });
});

describe('histogram remapping', () => {
  it('covers every code in the lookup, in ascending order', () => {
    expect(landuseHistogramCodes).toEqual(
      Object.keys(landusePopDensityLookup)
        .map(Number)
        .sort((a, b) => a - b),
    );
    expect(landuseHistogramCodes).toContain(491111);
    expect(landuseHistogramCodes).not.toContain(491122);
  });

  it('reads bin indices back as land use codes', () => {
    const counts = landuseHistogramCodes.map(() => 0);
    const firstCode = landuseHistogramCodes[0];
    const germanCode = 491410;
    counts[0] = 7;
    counts[landuseHistogramCodes.indexOf(germanCode)] = 3;

    expect(getLanduseCountsByCode(counts)).toEqual(
      new Map([
        [firstCode, 7],
        [germanCode, 3],
      ]),
    );
  });

  it('narrows the output pixel type, without which the service buckets bins', () => {
    const rf = getLanduseHistogramRasterFunctionJson();
    // the land use raster is S32, which the service histograms into 256 bins
    // regardless of value range. u8 is what restores one bin per class.
    expect(rf.outputPixelType).toBe('u8');
    expect(rf.functionName).toBe('Remap');
    expect(rf.functionArguments.AllowUnmatched).toBe(false);
    expect(rf.functionArguments.OutputValues).toEqual(
      landuseHistogramCodes.map((_, index) => index),
    );
    // indices must stay inside u8
    expect(landuseHistogramCodes.length).toBeLessThanOrEqual(256);
  });

  it('chains the clip inside the remap when a geometry is given', () => {
    const geometry = {} as __esri.Polygon;
    expect(
      getLanduseHistogramRasterFunctionJson().functionArguments.Raster,
    ).toBeUndefined();
    expect(
      getLanduseHistogramRasterFunctionJson(geometry).functionArguments.Raster,
    ).toMatchObject({ functionName: 'Clip' });
  });

  it('ignores empty bins and bins past the known codes', () => {
    const counts = landuseHistogramCodes.map(() => 0);
    counts.push(99);

    expect(getLanduseCountsByCode(counts).size).toBe(0);
    expect(getLanduseCountsByCode(undefined).size).toBe(0);
  });
});
