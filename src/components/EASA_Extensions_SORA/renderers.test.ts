import {
  buildImpactedLandUse,
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

  it('labels 491122, whose base class is switched off Europe wide', () => {
    expect(landusePopDensityLookup[1122]).toBeUndefined();
    expect(getLanduseLabel(491122)).toBe('Low density urban fabric (Germany)');
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
    expect(landuseHistogramCodes).toContain(491122);
  });

  it('reads bin indices back as land use codes', () => {
    const counts = landuseHistogramCodes.map(() => 0);
    const firstCode = landuseHistogramCodes[0];
    const germanCode = 491122;
    counts[0] = 7;
    counts[landuseHistogramCodes.indexOf(germanCode)] = 3;

    expect(getLanduseCountsByCode(counts)).toEqual(
      new Map([
        [firstCode, 7],
        [germanCode, 3],
      ]),
    );
  });

  it('ignores empty bins and bins past the known codes', () => {
    const counts = landuseHistogramCodes.map(() => 0);
    counts.push(99);

    expect(getLanduseCountsByCode(counts).size).toBe(0);
    expect(getLanduseCountsByCode(undefined).size).toBe(0);
  });
});
