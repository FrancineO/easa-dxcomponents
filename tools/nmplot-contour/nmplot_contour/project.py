"""Placing a local cartesian grid on the ellipsoid.

The {CART} anchor in the files seen so far has always been a placeholder --
0,0 (Null Island) or a coordinate in empty desert -- and an unnoticed placeholder
produces output that looks perfectly valid but sits thousands of km from the
site. So a cartesian grid requires an anchor stated on the command line; the
file's own is used only when explicitly asked for, and never when it is 0,0.
"""
from __future__ import annotations

import json
import os

import numpy as np
from pyproj import CRS, Transformer


class AnchorError(ValueError):
    """The geographic anchor is missing, unusable, or not trusted."""


def is_null_anchor(lat: float, lon: float) -> bool:
    """True for 0,0 -- an unset anchor rather than a real position."""
    return abs(lat) < 1e-9 and abs(lon) < 1e-9


def load_sites(path: str | None) -> dict:
    """Optional {"EDDM": [48.35389, 11.78611], ...} registry of named anchors."""
    if not path:
        default = os.path.join(os.path.dirname(__file__), 'sites.json')
        path = default if os.path.exists(default) else None
    if not path:
        return {}
    with open(path) as f:
        return {k.upper(): tuple(v) for k, v in json.load(f).items()}


def resolve_anchor(grid, anchor=None, site=None, use_file_anchor=False,
                   sites_path=None) -> tuple[float, float] | None:
    """-> (lat, lon) for a cartesian grid, or None for a geographic one."""
    if grid.variant == 'geographic':
        if anchor or site:
            raise AnchorError(
                f'{grid.source}: geographic grid (no {{CART}}); its coordinates are '
                'already lon/lat, so an anchor makes no sense here')
        return None

    if anchor and site:
        raise AnchorError('pass --anchor or --site, not both')
    if anchor:
        lat, lon = float(anchor[0]), float(anchor[1])
        if not (-90 <= lat <= 90 and -180 <= lon <= 180):
            raise AnchorError(f'--anchor {lat},{lon} is not a valid lat/lon')
        return lat, lon
    if site:
        sites = load_sites(sites_path)
        if site.upper() not in sites:
            known = ', '.join(sorted(sites)) or '(registry empty)'
            raise AnchorError(f'unknown --site {site!r}; known sites: {known}')
        return sites[site.upper()]

    file_lat, file_lon, _, _ = grid.cart_params()
    if not use_file_anchor:
        raise AnchorError(
            f"{grid.source}: cartesian grid whose {{CART}} anchor is "
            f"{file_lat},{file_lon}. Anchors in these files are routinely "
            f"placeholders, so it is not trusted by default.\n"
            f"  Pass --anchor LAT LON, or --site CODE, or --use-file-anchor "
            f"to accept {file_lat},{file_lon} as given.")
    if is_null_anchor(file_lat, file_lon):
        raise AnchorError(
            f'{grid.source}: {{CART}} anchor is 0,0 -- an unset placeholder, not a '
            f'position. Pass --anchor LAT LON or --site CODE.')
    return file_lat, file_lon


def to_lonlat(lat: float, lon: float, x, y, scale: float = 1.0):
    """Local cartesian coords -> WGS84 lon/lat.

    Uses an azimuthal-equidistant projection centred on the anchor, which is
    distortion-free at the centre and holds distance and bearing outward from
    it -- exactly the meaning of a local noise grid's x/y offsets.
    """
    aeqd = CRS.from_proj4(
        f'+proj=aeqd +lat_0={lat} +lon_0={lon} +x_0=0 +y_0=0 '
        '+datum=WGS84 +units=m +no_defs')
    tf = Transformer.from_crs(aeqd, CRS.from_epsg(4326), always_xy=True)
    lon_out, lat_out = tf.transform(np.asarray(x, float) * scale,
                                    np.asarray(y, float) * scale)
    return np.asarray(lon_out), np.asarray(lat_out)
