"""Contour bands and lines, straight from the grid's own points.

There is no intermediate raster. A lattice grid is contoured on the actual
lon/lat of every cell centre (2-D coordinate arrays), and scattered points are
contoured on a Delaunay triangulation of them. Both avoid resampling the data
onto a regular lon/lat raster first, which would smooth peaks and shift edges.
"""
from __future__ import annotations

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402
from matplotlib.path import Path  # noqa: E402
from matplotlib.tri import Triangulation  # noqa: E402
from shapely import make_valid  # noqa: E402
from shapely.geometry import LineString, MultiLineString, Polygon  # noqa: E402
from shapely.ops import unary_union  # noqa: E402


def default_levels(lo: float, hi: float, step: float = 5.0) -> np.ndarray:
    """Levels at `step` spacing spanning the data."""
    return np.arange(np.floor(lo / step) * step,
                     np.ceil(hi / step) * step + step, step)


def _polylines(path) -> list[np.ndarray]:
    """Split a Path into polylines.

    Not `Path.to_polygons()`: that applies path simplification, and on a long
    open contour (`should_simplify` is True above ~128 vertices) it collapses a
    643-vertex line to 2 points. Walk the codes instead.
    """
    verts, codes = path.vertices, path.codes
    if codes is None:
        return [verts] if len(verts) >= 2 else []
    out: list[np.ndarray] = []
    cur: list = []
    for v, c in zip(verts, codes):
        if c == Path.MOVETO:
            if len(cur) >= 2:
                out.append(np.array(cur))
            cur = [v]
        elif c == Path.LINETO:
            cur.append(v)
        elif c == Path.CLOSEPOLY and cur:
            cur.append(cur[0])
    if len(cur) >= 2:
        out.append(np.array(cur))
    return out


def _rings(path) -> list:
    """Closed rings of a filled path, with simplification disabled."""
    was = path.should_simplify
    path.should_simplify = False
    try:
        return path.to_polygons(closed_only=True)
    finally:
        path.should_simplify = was


def rings_to_polygons(rings) -> list[Polygon]:
    """Assemble contourf rings into polygons, resolving holes by even-odd nesting.

    Nesting is tested ring-against-ring. Testing a representative point instead
    is wrong: the representative point of an outer ring can land inside that
    ring's own hole, which misclassifies the ring as a hole and silently drops
    every annular band.
    """
    def polygonal(geom):
        """Valid polygon parts of a geometry, repairing it if need be."""
        if geom.is_empty:
            return []
        if not geom.is_valid:
            geom = make_valid(geom)
        parts = getattr(geom, 'geoms', [geom])
        return [p for p in parts if isinstance(p, Polygon) and not p.is_empty
                and p.area > 0]

    polys = [Polygon(r) for r in rings if len(r) >= 4]
    polys = [p if p.is_valid else p.buffer(0) for p in polys]
    polys = [p for p in polys if not p.is_empty and p.area > 0]
    depth = [sum(1 for j, q in enumerate(polys) if j != i and q.contains(p))
             for i, p in enumerate(polys)]
    shells = [i for i in range(len(polys)) if depth[i] % 2 == 0]
    out = []
    for i in shells:
        holes = [polys[j].exterior.coords
                 for j in range(len(polys))
                 if depth[j] == depth[i] + 1 and polys[i].contains(polys[j])
                 and min((polys[s].area, s) for s in shells
                         if polys[s].contains(polys[j]))[1] == i]
        # A band clipped at the domain corner can end up with a hole touching
        # its shell, which disconnects the interior; repair rather than emit it.
        out.extend(polygonal(Polygon(polys[i].exterior.coords, holes)))
    return out


def _contour_sets(lon, lat, z, levels, lattice: bool):
    """-> (filled set, line set) from either a lattice or scattered points."""
    fig, ax = plt.subplots()
    try:
        if lattice:
            filled = ax.contourf(lon, lat, z, levels=levels)
            lines = ax.contour(lon, lat, z, levels=levels)
        else:
            tri = Triangulation(lon, lat)
            filled = ax.tricontourf(tri, z, levels=levels)
            lines = ax.tricontour(tri, z, levels=levels)
        return filled, lines
    finally:
        plt.close(fig)


def edge_maximum(z, lattice_shape=None, tri: Triangulation | None = None) -> float:
    """Highest value on the domain boundary.

    A contour only closes inside the grid if its level exceeds this. Anything at
    or below it is cut off by the edge of the modelled domain rather than by the
    noise, and understates the area it encloses.
    """
    if lattice_shape is not None:
        g = z.reshape(lattice_shape)
        return float(np.concatenate([g[0], g[-1], g[:, 0], g[:, -1]]).max())
    if tri is None:
        raise ValueError('need either a lattice shape or a triangulation')
    boundary = set()
    for t, nbrs in zip(tri.triangles, tri.neighbors):
        for j, nb in enumerate(nbrs):
            if nb == -1:
                boundary.update((t[(j + 1) % 3], t[(j + 2) % 3]))
    return float(np.asarray(z)[sorted(boundary)].max())


def build(lon, lat, z, levels, lattice: bool):
    """-> (bands, lines, edge_max).

    bands: list of (band_index, geometry)
    lines: list of (level_index, level, geometry, closed)
    """
    filled, line_set = _contour_sets(lon, lat, z, levels, lattice)

    if lattice:
        edge_max = edge_maximum(np.asarray(z), lattice_shape=np.asarray(z).shape)
    else:
        edge_max = edge_maximum(np.asarray(z), tri=Triangulation(lon, lat))

    bands = []
    for i, path in enumerate(filled.get_paths()):
        polys = rings_to_polygons(_rings(path))
        if polys:
            bands.append((i, unary_union(polys)))

    lines = []
    for i, (lv, path) in enumerate(zip(line_set.levels, line_set.get_paths())):
        segs = [LineString(p) for p in _polylines(path) if len(p) >= 2]
        if not segs:
            continue
        geom = segs[0] if len(segs) == 1 else MultiLineString(segs)
        lines.append((i, float(lv), geom, bool(lv > edge_max)))

    return bands, lines, edge_max
