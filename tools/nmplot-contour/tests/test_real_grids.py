"""Tests against the real EASA grids in tests/fixtures.

These cover what the small synthetic fixtures cannot: a large grid, a `{CART}`
anchor of 0,0, and contour truncation with known values.
"""
import contextlib
import io
import json
import os
import tempfile
import unittest

from nmplot_contour.cli import main
from nmplot_contour.grd import parse
from nmplot_contour.project import AnchorError, resolve_anchor

FIX = os.path.join(os.path.dirname(__file__), 'fixtures')
BIG = os.path.join(FIX, 'large_null_anchor.grd')    # was sample.grd
SMALL = os.path.join(FIX, 'small_truncated.grd')    # was Case1_LAmax.grd


class TestLargeGrid(unittest.TestCase):
    """sample.grd: 401 x 81 EPNL receptors, {CART 0 0}, open on the east."""

    @classmethod
    def setUpClass(cls):
        cls.g = parse(BIG)

    def test_shape_and_metric(self):
        self.assertEqual(self.g.variant, 'cartesian')
        self.assertEqual(self.g.metric, 'EPNL')
        self.assertEqual(len(self.g.points), 32481)
        xs, ys = self.g.lattice()
        self.assertEqual((len(xs), len(ys)), (401, 81))

    def test_cells_are_50_m_square(self):
        xs, ys = self.g.lattice()
        _, _, scale, units = self.g.cart_params()
        self.assertEqual(units, 'FEET')
        self.assertAlmostEqual((xs[1] - xs[0]) * scale, 50.0, places=3)
        self.assertAlmostEqual((ys[1] - ys[0]) * scale, 50.0, places=3)

    def test_null_anchor_is_refused_even_when_trusted(self):
        """{CART 0 0} is an unset field, not a position."""
        with self.assertRaises(AnchorError):
            resolve_anchor(self.g, use_file_anchor=True)
        with self.assertRaises(AnchorError):
            resolve_anchor(self.g)

    def test_east_edge_is_above_80_db(self):
        """The 80 dB contour leaves the domain; everything above 85 closes."""
        arr, xs, ys = self.g.as_array()
        east = arr[:, -1]
        self.assertGreater(east.max(), 84.0)
        self.assertEqual(int((east > 80).sum()), 33)
        for edge in (arr[0], arr[-1]):        # north and south barely graze it
            self.assertEqual(int((edge > 80).sum()), 1)


class TestSmallGrid(unittest.TestCase):
    """Case1_LAmax.grd: 11 x 17, a non-zero placeholder anchor, mostly truncated."""

    @classmethod
    def setUpClass(cls):
        cls.g = parse(SMALL)

    def test_shape_and_metric(self):
        self.assertEqual(self.g.metric, 'LAmax')
        self.assertEqual(len(self.g.points), 187)
        xs, ys = self.g.lattice()
        self.assertEqual((len(xs), len(ys)), (11, 17))

    def test_file_anchor_is_usable_when_explicitly_trusted(self):
        """Unlike 0,0, a non-zero anchor may be accepted on request."""
        with self.assertRaises(AnchorError):
            resolve_anchor(self.g)
        self.assertEqual(resolve_anchor(self.g, use_file_anchor=True),
                         (34.124, 3.3))


class TestEndToEnd(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.prefix = os.path.join(self.tmp.name, 'out')

    def tearDown(self):
        self.tmp.cleanup()

    def bands(self):
        with open(f'{self.prefix}_bands.geojson') as f:
            return json.load(f)['features']

    def test_large_grid_converts_with_an_explicit_anchor(self):
        rc = main([BIG, '--anchor', '48.3539', '11.83',
                   '--levels', '80,85,90,95,100', '-o', self.prefix, '-q'])
        self.assertEqual(rc, 0)
        flags = {f['properties']['lo']: f['properties']['closed']
                 for f in self.bands()}
        self.assertFalse(flags[80.0], '80 dB must be truncated')
        for lo in (85.0, 90.0, 95.0):
            self.assertTrue(flags[lo], f'{lo:g} dB must close')

    def test_large_grid_refuses_its_own_anchor(self):
        err = io.StringIO()
        with contextlib.redirect_stderr(err):
            rc = main([BIG, '--use-file-anchor', '-o', self.prefix, '-q'])
        self.assertEqual(rc, 2)
        self.assertIn('0,0', err.getvalue())

    def test_truncated_bands_are_outline_only(self):
        main([BIG, '--anchor', '48.3539', '11.83',
              '--levels', '80,85,90,95,100', '-o', self.prefix, '-q'])
        for f in self.bands():
            p = f['properties']
            if p['closed']:
                self.assertEqual(p['fill-opacity'], 0.8)
                self.assertNotIn('stroke-dasharray', p)
            else:
                self.assertEqual(p['fill-opacity'], 0)
                self.assertIn('stroke-dasharray', p)

    def test_closed_only_on_the_small_grid(self):
        main([SMALL, '--use-file-anchor', '--closed-only', '-o', self.prefix, '-q'])
        kept = self.bands()
        self.assertTrue(kept)
        self.assertTrue(all(f['properties']['closed'] for f in kept))
        self.assertTrue(all(f['properties']['lo'] >= 80 for f in kept))


if __name__ == '__main__':
    unittest.main()
