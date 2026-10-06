import {
  getTileSizeMeters,
  insetSharedTileEdges,
  listTileBounds,
  mergeStatistics,
  SAFE_IMAGE_DIMENSION,
  sumHistogramCounts,
} from './image-service-tiles';

describe('image-service-tiles', () => {
  it('sizes tiles so a request stays under the image dimension limit', () => {
    expect(getTileSizeMeters(50)).toBe(50 * SAFE_IMAGE_DIMENSION);
    expect(getTileSizeMeters(200)).toBe(200 * SAFE_IMAGE_DIMENSION);
  });

  it('returns a single tile when the extent already fits', () => {
    expect(listTileBounds(0, 0, 1000, 1000, 5000, 5000)).toEqual([
      { xmin: 0, ymin: 0, xmax: 1000, ymax: 1000 },
    ]);
  });

  it('splits a long corridor into tiles along the long axis', () => {
    // 1,000 km by 40 km at 200 km tile size → 5 tiles along x
    const tiles = listTileBounds(0, 0, 1_000_000, 40_000, 200_000, 200_000);
    expect(tiles).toHaveLength(5);
    expect(tiles[0]).toEqual({
      xmin: 0,
      ymin: 0,
      xmax: 200_000,
      ymax: 40_000,
    });
    expect(tiles[4]).toEqual({
      xmin: 800_000,
      ymin: 0,
      xmax: 1_000_000,
      ymax: 40_000,
    });
  });

  it('covers a 2d grid without gaps or overlap past the extent', () => {
    const tiles = listTileBounds(0, 0, 500, 500, 200, 200);
    expect(tiles).toHaveLength(9);
    expect(tiles.map((t) => [t.xmin, t.ymin, t.xmax, t.ymax])).toEqual([
      [0, 0, 200, 200],
      [0, 200, 200, 400],
      [0, 400, 200, 500],
      [200, 0, 400, 200],
      [200, 200, 400, 400],
      [200, 400, 400, 500],
      [400, 0, 500, 200],
      [400, 200, 500, 400],
      [400, 400, 500, 500],
    ]);
  });

  it('insets shared max edges by half a pixel and leaves the outer edges', () => {
    const full = { xmin: 0, ymin: 0, xmax: 500, ymax: 500 };
    expect(
      insetSharedTileEdges(
        { xmin: 0, ymin: 0, xmax: 200, ymax: 200 },
        full,
        50,
        50,
      ),
    ).toEqual({ xmin: 0, ymin: 0, xmax: 175, ymax: 175 });
    expect(
      insetSharedTileEdges(
        { xmin: 400, ymin: 400, xmax: 500, ymax: 500 },
        full,
        50,
        50,
      ),
    ).toEqual({ xmin: 400, ymin: 400, xmax: 500, ymax: 500 });
  });

  it('drops tiles that collapse after the shared-edge inset', () => {
    const full = { xmin: 0, ymin: 0, xmax: 100, ymax: 100 };
    expect(
      insetSharedTileEdges(
        { xmin: 0, ymin: 0, xmax: 10, ymax: 100 },
        full,
        50,
        50,
      ),
    ).toBeNull();
  });

  it('sums histogram bins across tiles', () => {
    expect(
      sumHistogramCounts([[1, 2, 3], [4, 5], undefined, [0, 0, 0, 7]]),
    ).toEqual([5, 7, 3, 7]);
  });

  it('merges statistics with a count-weighted average and overall max', () => {
    const merged = mergeStatistics([
      { min: 1, max: 10, avg: 4, count: 2 },
      { min: 0, max: 40, avg: 20, count: 2 },
      { min: 5, max: 5, avg: 5, count: 0 },
    ]);
    expect(merged).toEqual({
      min: 0,
      max: 40,
      avg: 12,
      count: 4,
    });
  });

  it('returns null when every tile is empty', () => {
    expect(mergeStatistics([{ count: 0 }, { count: 0 }])).toBeNull();
  });
});
