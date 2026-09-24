"""Command line entry point."""
from __future__ import annotations

import argparse
import json
import os
import sys

import numpy as np

from . import contour, palette
from .grd import ParseError, parse
from .project import AnchorError, resolve_anchor, to_lonlat

CRS84 = {'type': 'name', 'properties': {'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'}}


def _write(path, features, quiet=False):
    with open(path, 'w') as f:
        json.dump({'type': 'FeatureCollection', 'crs': CRS84, 'features': features}, f)
    if not quiet:
        print(f'  {os.path.basename(path)}  {len(features)} features')


def _feature(props, geom):
    from shapely.geometry import mapping
    return {'type': 'Feature', 'properties': props, 'geometry': mapping(geom)}


def build_parser():
    p = argparse.ArgumentParser(
        prog='nmplot-contour',
        description='Convert an NMPlot noise grid (.grd) to contour-band GeoJSON.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""examples:
  nmplot-contour sample.grd --anchor 48.3539 11.83
  nmplot-contour sample.grd --site EDDM --levels 80,85,90,95 --lines
  nmplot-contour sfo.grd                      # geographic grid, no anchor needed
""")
    p.add_argument('grd', help='input .grd file')
    p.add_argument('-o', '--out-prefix',
                   help='output prefix (default: the input path without .grd)')

    a = p.add_argument_group('anchor (cartesian grids only)')
    a.add_argument('--anchor', nargs=2, metavar=('LAT', 'LON'), type=float,
                   help='geographic anchor for the grid origin')
    a.add_argument('--site', help='named anchor from the site registry')
    a.add_argument('--sites', help='path to a site registry JSON file')
    a.add_argument('--use-file-anchor', action='store_true',
                   help="accept the file's own {CART} anchor (never 0,0)")

    lv = p.add_argument_group('levels')
    lv.add_argument('--levels', help='explicit levels, e.g. 55,60,65,70')
    lv.add_argument('--step', type=float, default=5.0,
                    help='level spacing when --levels is absent (default: 5)')
    lv.add_argument('--closed-only', action='store_true',
                    help='drop levels that are truncated by the grid edge')

    ex = p.add_argument_group('extra outputs (bands are always written)')
    ex.add_argument('--lines', action='store_true', help='also write _contours.geojson')
    ex.add_argument('--points', action='store_true', help='also write _points.geojson')
    ex.add_argument('--cells', action='store_true',
                    help='also write _center_polygons and _polygons GeoJSON')
    ex.add_argument('--domain', action='store_true',
                    help='also write _domain.geojson -- the model boundary, so a '
                         'truncated band can be told from a real contour')
    ex.add_argument('--tif', action='store_true',
                    help='also write a GeoTIFF (needs the "tif" extra)')

    p.add_argument('-q', '--quiet', action='store_true')
    return p


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    try:
        grid = parse(args.grd)
        anchor = resolve_anchor(grid, anchor=args.anchor, site=args.site,
                                use_file_anchor=args.use_file_anchor,
                                sites_path=args.sites)
    except (ParseError, AnchorError) as e:
        print(f'error: {e}', file=sys.stderr)
        return 2

    prefix = args.out_prefix or os.path.splitext(args.grd)[0]
    lat_grid = grid.lattice()

    # project the receptor coordinates to lon/lat
    if anchor:
        lat0, lon0, scale, units = grid.cart_params()
        lon_pt, lat_pt = to_lonlat(anchor[0], anchor[1], grid.x, grid.y, scale)
        where = f'anchor {anchor[0]},{anchor[1]} ({units})'
    else:
        lon_pt, lat_pt = grid.x, grid.y
        where = 'geographic, coordinates used as-is'

    if not args.quiet:
        print(f'{os.path.basename(args.grd)}  [{grid.variant}]  '
              f'{grid.metric} {grid.unit}  {len(grid.points)} points')
        print(f'  {where}')

    # contour on the lattice where there is one, else on the points themselves
    if lat_grid is not None:
        xs, ys = lat_grid
        shape = (len(ys), len(xs))
        order = np.lexsort((grid.x, grid.y))       # row-major, south -> north
        lon2d = lon_pt[order].reshape(shape)
        lat2d = lat_pt[order].reshape(shape)
        z = grid.z[order].reshape(shape)
        lon_c, lat_c, zc, is_lattice = lon2d, lat2d, z, True
    else:
        lon_c, lat_c, zc, is_lattice = lon_pt, lat_pt, grid.z, False

    lo, hi = float(grid.z.min()), float(grid.z.max())
    levels = (np.array([float(v) for v in args.levels.split(',')])
              if args.levels else contour.default_levels(lo, hi, args.step))
    if len(levels) < 2:
        print('error: need at least two levels to form a band', file=sys.stderr)
        return 2

    bands, lines, edge_max = contour.build(lon_c, lat_c, zc, levels, is_lattice)
    n_bands = len(levels) - 1
    colors = palette.ramp(n_bands)
    if not args.quiet and n_bands > palette.MAX_DISTINCT_BANDS:
        detail = ('colours repeat' if palette.repeats(n_bands)
                  else 'adjacent fills are hard to tell apart')
        print(f'  note: {n_bands} bands -- {detail}; '
              f'use --step or --levels for fewer', file=sys.stderr)

    if args.closed_only:
        bands = [(i, g) for i, g in bands if levels[i] > edge_max]
        lines = [t for t in lines if t[3]]

    base = {'metric': grid.metric, 'unit': grid.unit}
    _write(f'{prefix}_bands.geojson', [
        _feature({**base,
                  'lo': float(levels[i]), 'hi': float(levels[i + 1]),
                  'label': f'{levels[i]:g}-{levels[i + 1]:g} {grid.unit}'.strip(),
                  'closed': bool(levels[i] > edge_max),
                  **palette.style(colors, i, bool(levels[i] > edge_max))}, g)
        for i, g in bands], args.quiet)

    if args.lines:
        _write(f'{prefix}_contours.geojson', [
            _feature({**base, 'level': lv,
                      'label': f'{lv:g} {grid.unit}'.strip(), 'closed': closed,
                      **palette.line_style(colors, i, closed)}, g)
            for i, lv, g, closed in lines], args.quiet)

    if args.points:
        from shapely.geometry import Point
        _write(f'{prefix}_points.geojson', [
            _feature({grid.metric: float(v)}, Point(round(float(a), 7), round(float(b), 7)))
            for a, b, v in zip(lon_pt, lat_pt, grid.z)], args.quiet)

    if args.domain:
        from shapely.geometry import LineString, MultiPoint
        if lat_grid is not None:
            n_rows, n_cols = lon_c.shape
            ring = ([(lon_c[0, c], lat_c[0, c]) for c in range(n_cols)]
                    + [(lon_c[r, -1], lat_c[r, -1]) for r in range(1, n_rows)]
                    + [(lon_c[-1, c], lat_c[-1, c]) for c in range(n_cols - 2, -1, -1)]
                    + [(lon_c[r, 0], lat_c[r, 0]) for r in range(n_rows - 2, -1, -1)])
            boundary = LineString(ring)
        else:
            boundary = MultiPoint(list(zip(lon_pt, lat_pt))).convex_hull.exterior
        _write(f'{prefix}_domain.geojson', [
            _feature({**base, 'role': 'model domain',
                      'note': 'contours are cut off here, not by the noise',
                      'edge_max': round(edge_max, 2),
                      'stroke': palette.INK, 'stroke-width': 1,
                      'stroke-opacity': 0.7, 'fill-opacity': 0}, boundary)],
            args.quiet)

    if args.cells:
        rc = _cells(grid, lat_grid, anchor, prefix, args.quiet)
        if rc:
            return rc

    if args.tif:
        rc = _geotiff(grid, lat_grid, lon_pt, lat_pt, prefix, args.quiet)
        if rc:
            return rc

    if not args.quiet:
        print(f'  {grid.metric} {lo:.2f}-{hi:.2f} {grid.unit}; '
              f'max on grid edge {edge_max:.2f}')
        for i, lv, _, closed in lines or [(i, float(levels[i]), None,
                                           bool(levels[i] > edge_max))
                                          for i in range(len(levels))]:
            print(f'    {lv:6g} {grid.unit}  '
                  f'{"closed" if closed else "TRUNCATED at grid edge"}')
    return 0


def _cells(grid, lat_grid, anchor, prefix, quiet):
    """Per-receptor cell polygons, in the two flavours the earlier pipeline used."""
    from shapely.geometry import Polygon
    if lat_grid is None:
        print('error: --cells needs a regular lattice; this grid is scattered',
              file=sys.stderr)
        return 2
    xs, ys = lat_grid
    dx, dy = xs[1] - xs[0], ys[1] - ys[0]
    lat0, lon0, scale, _ = grid.cart_params() if anchor else (0, 0, 1.0, '')
    if anchor:
        lat0, lon0 = anchor

    def ring(cx, cy):
        px = np.array([c[0] for c in zip(cx)]).ravel()
        return px

    def project(ax, ay):
        if anchor:
            return to_lonlat(lat0, lon0, ax, ay, scale)
        return np.asarray(ax, float), np.asarray(ay, float)

    def rects(corner_x, corner_y, vals, key):
        lon, lat = project(corner_x.ravel(), corner_y.ravel())
        lon = lon.reshape(corner_x.shape); lat = lat.reshape(corner_y.shape)
        feats = []
        for i, v in enumerate(vals):
            r = [(round(float(lon[i, k]), 7), round(float(lat[i, k]), 7)) for k in range(4)]
            feats.append(_feature({key: float(v)}, Polygon(r + [r[0]])))
        return feats

    cx = np.array([[a - dx / 2, a + dx / 2, a + dx / 2, a - dx / 2] for a in grid.x])
    cy = np.array([[b - dy / 2, b - dy / 2, b + dy / 2, b + dy / 2] for b in grid.y])
    _write(f'{prefix}_center_polygons.geojson',
           rects(cx, cy, grid.z, grid.metric), quiet)

    val = {(a, b): v for a, b, v in grid.points}
    gx, gy, means = [], [], []
    for i in range(len(xs) - 1):
        for j in range(len(ys) - 1):
            x0, x1, y0, y1 = xs[i], xs[i + 1], ys[j], ys[j + 1]
            gx.append((x0, x1, x1, x0)); gy.append((y0, y0, y1, y1))
            means.append(np.mean([val[(x0, y0)], val[(x1, y0)],
                                  val[(x0, y1)], val[(x1, y1)]]))
    _write(f'{prefix}_polygons.geojson',
           rects(np.array(gx), np.array(gy), means, grid.metric), quiet)
    return 0


def _geotiff(grid, lat_grid, lon_pt, lat_pt, prefix, quiet):
    try:
        import rasterio
        from rasterio.transform import from_origin
    except ImportError:
        print('error: --tif needs rasterio: pip install "nmplot-contour[tif]"',
              file=sys.stderr)
        return 2
    if lat_grid is None:
        print('error: --tif needs a regular lattice; this grid is scattered',
              file=sys.stderr)
        return 2
    xs, ys = lat_grid
    shape = (len(ys), len(xs))
    order = np.lexsort((grid.x, grid.y))
    z = grid.z[order].reshape(shape)[::-1].astype('float32')
    lon2d = lon_pt[order].reshape(shape)
    lat2d = lat_pt[order].reshape(shape)
    px = (lon2d.max() - lon2d.min()) / (len(xs) - 1)
    py = (lat2d.max() - lat2d.min()) / (len(ys) - 1)
    tr = from_origin(lon2d.min() - px / 2, lat2d.max() + py / 2, px, py)
    path = f'{prefix}.tif'
    with rasterio.open(path, 'w', driver='GTiff', height=shape[0], width=shape[1],
                       count=1, dtype='float32', crs='EPSG:4326', transform=tr,
                       nodata=-9999.0, compress='deflate', predictor=3) as out:
        out.write(z, 1)
        out.set_band_description(1, f'{grid.metric} ({grid.unit})'.strip())
        out.update_tags(METRIC=grid.metric, UNITS=grid.unit,
                        NMPLOT_VARIANT=grid.variant)
    if not quiet:
        print(f'  {os.path.basename(path)}  {shape[1]}x{shape[0]} cells')
    return 0


if __name__ == '__main__':
    sys.exit(main())
