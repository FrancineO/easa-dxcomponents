import unittest

import numpy as np
from shapely.ops import unary_union

from nmplot_contour import contour, palette


def radial_grid(n=61, peak=100.0):
    """A radially symmetric peak -- its middle bands are true annuli."""
    ax = np.linspace(-1.0, 1.0, n)
    X, Y = np.meshgrid(ax, ax)
    Z = peak - 40.0 * np.hypot(X, Y)
    return X, Y, Z


class TestBands(unittest.TestCase):
    def test_bands_tile_without_overlap(self):
        X, Y, Z = radial_grid()
        levels = contour.default_levels(Z.min(), Z.max(), 10.0)
        bands, _, _ = contour.build(X, Y, Z, levels, lattice=True)
        geoms = [g for _, g in bands]
        total = sum(g.area for g in geoms)
        self.assertAlmostEqual(total, unary_union(geoms).area, places=9)

    def test_annular_band_survives_with_its_hole(self):
        """Regression: testing nesting by representative point dropped these."""
        X, Y, Z = radial_grid()
        levels = contour.default_levels(Z.min(), Z.max(), 10.0)
        bands, _, _ = contour.build(X, Y, Z, levels, lattice=True)
        self.assertEqual(len(bands), len(levels) - 1,
                         'a band was dropped entirely')
        ringed = []
        for _, g in bands:
            for p in getattr(g, 'geoms', [g]):
                if len(p.interiors):
                    ringed.append(p)
        self.assertTrue(ringed, 'no band came out as an annulus')
        for p in ringed:
            self.assertTrue(p.is_valid)
            self.assertGreater(p.area, 0)

    def test_every_band_geometry_is_valid(self):
        X, Y, Z = radial_grid()
        levels = contour.default_levels(Z.min(), Z.max(), 5.0)
        bands, _, _ = contour.build(X, Y, Z, levels, lattice=True)
        for _, g in bands:
            self.assertTrue(g.is_valid)


class TestLines(unittest.TestCase):
    def test_long_open_contour_keeps_its_vertices(self):
        """Regression: Path.to_polygons() simplifies, collapsing a 600-vertex
        open contour to 2 points. Lines must be read from the path codes."""
        n = 240
        ax = np.linspace(-1.0, 1.0, n)
        X, Y = np.meshgrid(ax, ax)
        Z = 100.0 - 40.0 * np.hypot(X, Y)
        # a level low enough to run off the domain, so the contour is open
        edge = contour.edge_maximum(Z, lattice_shape=Z.shape)
        levels = np.array([edge - 2.0, edge + 2.0, Z.max()])
        _, lines, _ = contour.build(X, Y, Z, levels, lattice=True)
        opened = [g for _, lv, g, closed in lines if not closed]
        self.assertTrue(opened, 'expected an open contour')
        for g in opened:
            total = sum(len(p.coords) for p in getattr(g, 'geoms', [g]))
            self.assertGreater(total, 50,
                               'open contour was simplified away')

    def test_closed_contour_is_a_ring(self):
        X, Y, Z = radial_grid()
        levels = np.array([70.0, 80.0, Z.max()])
        _, lines, _ = contour.build(X, Y, Z, levels, lattice=True)
        closed = [g for _, lv, g, c in lines if c]
        self.assertTrue(closed)
        for g in closed:
            for part in getattr(g, 'geoms', [g]):
                c = np.asarray(part.coords)
                self.assertTrue(np.allclose(c[0], c[-1]), 'ring is not closed')


class TestTruncation(unittest.TestCase):
    def test_edge_maximum_on_a_lattice(self):
        Z = np.array([[1.0, 2.0, 3.0], [4.0, 99.0, 5.0], [6.0, 7.0, 8.0]])
        self.assertEqual(contour.edge_maximum(Z, lattice_shape=Z.shape), 8.0)

    def test_level_below_edge_max_is_truncated(self):
        X, Y, Z = radial_grid()
        edge = contour.edge_maximum(Z, lattice_shape=Z.shape)
        levels = np.array([edge - 5, edge + 5, Z.max()])
        _, lines, edge_max = contour.build(X, Y, Z, levels, lattice=True)
        self.assertAlmostEqual(edge_max, edge, places=6)
        closed = {round(lv, 3): c for _, lv, _, c in lines}
        self.assertFalse(closed[round(edge - 5, 3)])
        self.assertTrue(closed[round(edge + 5, 3)])


class TestScattered(unittest.TestCase):
    def test_scattered_points_contour_without_a_raster(self):
        rng = np.random.default_rng(0)
        x = rng.uniform(-1, 1, 900)
        y = rng.uniform(-1, 1, 900)
        z = 100.0 - 40.0 * np.hypot(x, y)
        levels = contour.default_levels(z.min(), z.max(), 10.0)
        bands, lines, edge_max = contour.build(x, y, z, levels, lattice=False)
        self.assertTrue(bands)
        self.assertTrue(all(g.is_valid for _, g in bands))
        self.assertGreater(edge_max, z.min())


class TestPalette(unittest.TestCase):
    def test_ramp_is_light_to_dark_and_from_documented_steps(self):
        for n in range(1, 13):
            r = palette.ramp(n)
            self.assertEqual(len(r), n)
            self.assertEqual(len(set(r)), n, 'a step was reused')
            for c in r:
                self.assertIn(c, palette.SEQ, 'step was interpolated, not documented')
            Ls = [palette._oklab_lightness(c) for c in r]
            self.assertEqual(Ls, sorted(Ls, reverse=True), 'not monotone light->dark')

    def test_more_bands_than_documented_steps(self):
        """Regression: a 5 dB step over a wide metric asks for >13 bands."""
        for n in (13, 14, 16, 25):
            r = palette.ramp(n)
            self.assertEqual(len(r), n)
            for c in r:
                self.assertIn(c, palette.SEQ, 'step was interpolated')
            Ls = [palette._oklab_lightness(c) for c in r]
            self.assertEqual(Ls, sorted(Ls, reverse=True), 'not monotone')
        self.assertFalse(palette.repeats(13))
        self.assertTrue(palette.repeats(14))

    def test_empty_and_single_band(self):
        self.assertEqual(palette.ramp(0), [])
        self.assertEqual(len(palette.ramp(1)), 1)

    def test_colour_follows_the_level_not_the_position(self):
        """Same level must get the same colour whatever else is present."""
        a = palette.ramp(9)
        self.assertEqual(palette.style(a, 0)['fill'], a[0])
        self.assertEqual(palette.style(a, 8)['fill'], a[8])

    def test_open_bands_are_dashed_and_closed_ones_are_not(self):
        r = palette.ramp(5)
        closed, open_ = palette.style(r, 2, True), palette.style(r, 2, False)
        self.assertNotIn('stroke-dasharray', closed)
        self.assertEqual(open_['stroke-dasharray'], palette.DASH_OPEN)
        # an open band is outline-only: its true extent is unknown
        self.assertEqual(open_['fill-opacity'], 0)
        self.assertEqual(closed['fill-opacity'], 0.8)
        self.assertEqual(closed['fill'], open_['fill'],
                         'the level colour itself must not change')
        self.assertEqual(open_['stroke'], palette.INK)

    def test_open_lines_are_dashed(self):
        r = palette.ramp(5)
        self.assertNotIn('stroke-dasharray', palette.line_style(r, 1, True))
        self.assertEqual(palette.line_style(r, 1, False)['stroke-dasharray'],
                         palette.DASH_OPEN)

    def test_style_carries_simplestyle_keys(self):
        s = palette.style(palette.ramp(3), 1)
        for k in ('fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity'):
            self.assertIn(k, s)


if __name__ == '__main__':
    unittest.main()
