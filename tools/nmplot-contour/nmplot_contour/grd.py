"""Reader for NMPlot grid (.grd) files.

NMPlot writes two variants and telling them apart is the whole ballgame:

  cartesian   a {CART} record is present. Point coordinates are x/y in the units
              {CART} names (typically FEET) and {CART} carries the geographic tie.

  geographic  no {CART}. Point coordinates are already lon/lat degrees. Note a
              regular cartesian grid does not stay regular once projected, so
              these points are usually NOT a lattice.

Reading a cartesian file as if it were geographic -- which is what the common
parsers do, since they assume the geographic form -- treats feet as degrees and
lands the grid at the south pole.
"""
from __future__ import annotations

import re
from dataclasses import dataclass

import numpy as np

FT_TO_M = 0.3048  # international feet
UNIT_SCALE = {'FEET': FT_TO_M, 'FT': FT_TO_M, 'METERS': 1.0, 'METRES': 1.0, 'M': 1.0}

_POINT = re.compile(r'\(\s*([-\d.eE+]+)\s*,\s*([-\d.eE+]+)\s*\)\s+([-\d.eE+]+)')


class ParseError(ValueError):
    """The file is not a grid this reader can handle."""


@dataclass(frozen=True)
class Grid:
    metric: str
    unit: str
    points: np.ndarray        # (N, 3) of x, y, value
    cart: tuple | None        # raw {CART} fields, or None for the geographic variant
    source: str

    @property
    def variant(self) -> str:
        return 'cartesian' if self.cart else 'geographic'

    @property
    def x(self) -> np.ndarray:
        return self.points[:, 0]

    @property
    def y(self) -> np.ndarray:
        return self.points[:, 1]

    @property
    def z(self) -> np.ndarray:
        return self.points[:, 2]

    def cart_params(self) -> tuple[float, float, float, str]:
        """(lat, lon, scale to metres, unit name) from {CART}. Cartesian only."""
        if not self.cart:
            raise ParseError(f'{self.source}: no {{CART}} record')
        lat, lon = float(self.cart[0]), float(self.cart[1])
        units, rotation = self.cart[4].upper(), float(self.cart[5])
        if rotation != 0:
            raise ParseError(
                f'{self.source}: grid is rotated by {rotation}; only rotation 0 is handled')
        if units not in UNIT_SCALE:
            raise ParseError(f'{self.source}: unhandled {{CART}} distance unit {units!r}')
        return lat, lon, UNIT_SCALE[units], units

    def lattice(self) -> tuple[np.ndarray, np.ndarray] | None:
        """(xs, ys) if the points form a complete regular lattice, else None."""
        xs, ys = np.unique(self.x), np.unique(self.y)
        if len(xs) * len(ys) != len(self.points) or len(xs) < 2 or len(ys) < 2:
            return None
        dx, dy = np.diff(xs), np.diff(ys)
        if not (np.allclose(dx, dx[0]) and np.allclose(dy, dy[0])):
            return None
        return xs, ys

    def as_array(self) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
        """(values, xs, ys) with values indexed [row, col], rows south -> north.

        Raises if the points are not a complete lattice.
        """
        lat = self.lattice()
        if lat is None:
            raise ParseError(f'{self.source}: points are not a regular lattice')
        xs, ys = lat
        grid = np.full((len(ys), len(xs)), np.nan)
        xi = {v: i for i, v in enumerate(xs)}
        yi = {v: i for i, v in enumerate(ys)}
        for px, py, v in self.points:
            grid[yi[py], xi[px]] = v
        if np.isnan(grid).any():
            raise ParseError(f'{self.source}: lattice has gaps')
        return grid, xs, ys


def parse(path: str) -> Grid:
    """Read a .grd file. Raises ParseError on anything unrecognised."""
    with open(path, newline='') as f:
        text = f.read().replace('\r\n', '\n')

    if '{TITL' not in text:
        raise ParseError(f'{path}: no {{TITL}} record -- not an NMPlot grid')

    cart = re.search(r'\{CART\s+([^}]*)\}', text)
    mtrc = re.search(r'\{MTRC\s+"([^"]*)"\s+"([^"]*)"\}', text)
    dpal = re.search(r'\{DPAL\s+(\d+)', text)

    pts = np.array([(float(a), float(b), float(c)) for a, b, c in _POINT.findall(text)])
    if not len(pts):
        raise ParseError(f'{path}: no data points found')
    if dpal and len(pts) != int(dpal.group(1)):
        raise ParseError(
            f'{path}: {len(pts)} points parsed but {{DPAL}} declares {dpal.group(1)}')

    cart_fields = tuple(cart.group(1).split()) if cart else None
    if cart_fields and len(cart_fields) < 6:
        raise ParseError(f'{path}: {{CART}} has {len(cart_fields)} fields, expected 6')

    metric, unit = mtrc.groups() if mtrc else ('value', '')
    return Grid(metric=metric, unit=unit, points=pts, cart=cart_fields, source=path)
