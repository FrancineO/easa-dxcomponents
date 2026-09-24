import os
import unittest

import numpy as np

from nmplot_contour.grd import ParseError, parse

FIX = os.path.join(os.path.dirname(__file__), 'fixtures')


class TestParse(unittest.TestCase):
    def test_cartesian_variant(self):
        g = parse(os.path.join(FIX, 'small_truncated.grd'))
        self.assertEqual(g.variant, 'cartesian')
        self.assertEqual(g.metric, 'LAmax')
        self.assertEqual(g.unit, 'dB')
        self.assertEqual(len(g.points), 187)
        lat, lon, scale, units = g.cart_params()
        self.assertEqual(units, 'FEET')
        self.assertAlmostEqual(scale, 0.3048)

    def test_geographic_variant(self):
        g = parse(os.path.join(FIX, 'scattered_geographic.grd'))
        self.assertEqual(g.variant, 'geographic')
        self.assertEqual(g.metric, 'DNL')
        self.assertIsNone(g.cart)
        with self.assertRaises(ParseError):
            g.cart_params()

    def test_geographic_coords_are_lon_lat_not_feet(self):
        """The bug that puts a grid in Antarctica: field 0 is longitude."""
        g = parse(os.path.join(FIX, 'scattered_geographic.grd'))
        self.assertTrue(np.all(np.abs(g.x) <= 180))
        self.assertTrue(np.all(np.abs(g.y) <= 90))

    def test_cartesian_coords_are_not_degrees(self):
        """A cartesian grid read as geographic would be nonsense lat/lon."""
        g = parse(os.path.join(FIX, 'small_truncated.grd'))
        self.assertGreater(np.abs(g.x).max(), 180)

    def test_lattice_detection(self):
        self.assertIsNotNone(parse(os.path.join(FIX, 'small_truncated.grd')).lattice())
        # a projected grid does not stay a lattice in lon/lat
        self.assertIsNone(parse(os.path.join(FIX, 'scattered_geographic.grd')).lattice())

    def test_as_array_preserves_values(self):
        g = parse(os.path.join(FIX, 'small_truncated.grd'))
        arr, xs, ys = g.as_array()
        self.assertEqual(arr.shape, (len(ys), len(xs)))
        self.assertEqual(sorted(arr.ravel()), sorted(g.z))

    def test_dpal_mismatch_rejected(self):
        p = os.path.join(FIX, 'bad_count.grd')
        with open(p, 'w') as f:
            f.write('{TITL Grid Vers 2 3}\n{MTRC "X" "dB"}\n{DPAL 99\n'
                    '(0.0, 0.0) 1.0\n}\n{ENDF}\n')
        try:
            with self.assertRaises(ParseError):
                parse(p)
        finally:
            os.remove(p)

    def test_rotation_rejected(self):
        p = os.path.join(FIX, 'rotated.grd')
        with open(p, 'w') as f:
            f.write('{TITL Grid Vers 2 3}\n{CART 48.0 11.0 0 0 FEET 45}\n'
                    '{MTRC "X" "dB"}\n{DPAL 1\n(0.0, 0.0) 1.0\n}\n{ENDF}\n')
        try:
            with self.assertRaises(ParseError):
                parse(p).cart_params()
        finally:
            os.remove(p)

    def test_not_a_grid(self):
        p = os.path.join(FIX, 'junk.grd')
        with open(p, 'w') as f:
            f.write('hello\n')
        try:
            with self.assertRaises(ParseError):
                parse(p)
        finally:
            os.remove(p)


if __name__ == '__main__':
    unittest.main()
