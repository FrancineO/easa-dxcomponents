import math
import os
import unittest

from nmplot_contour.grd import parse
from nmplot_contour.project import AnchorError, resolve_anchor, to_lonlat

FIX = os.path.join(os.path.dirname(__file__), 'fixtures')


class TestAnchor(unittest.TestCase):
    def setUp(self):
        self.cart = parse(os.path.join(FIX, 'small_truncated.grd'))
        self.geo = parse(os.path.join(FIX, 'scattered_geographic.grd'))

    def test_cartesian_refuses_without_explicit_anchor(self):
        with self.assertRaises(AnchorError):
            resolve_anchor(self.cart)

    def test_explicit_anchor_accepted(self):
        self.assertEqual(resolve_anchor(self.cart, anchor=(48.3539, 11.83)),
                         (48.3539, 11.83))

    def test_invalid_anchor_rejected(self):
        with self.assertRaises(AnchorError):
            resolve_anchor(self.cart, anchor=(120.0, 11.0))

    def test_anchor_and_site_are_exclusive(self):
        with self.assertRaises(AnchorError):
            resolve_anchor(self.cart, anchor=(48.0, 11.0), site='EDDM')

    def test_unknown_site_rejected(self):
        with self.assertRaises(AnchorError):
            resolve_anchor(self.cart, site='NOPE')

    def test_geographic_needs_no_anchor(self):
        self.assertIsNone(resolve_anchor(self.geo))

    def test_geographic_rejects_an_anchor(self):
        with self.assertRaises(AnchorError):
            resolve_anchor(self.geo, anchor=(48.0, 11.0))

    def test_null_island_rejected_even_when_trusted(self):
        p = os.path.join(FIX, 'null_anchor.grd')
        with open(p, 'w') as f:
            f.write('{TITL Grid Vers 2 3}\n{CART 0.000000 0.000000 0 0 FEET 0}\n'
                    '{MTRC "X" "dB"}\n{DPAL 1\n(0.0, 0.0) 1.0\n}\n{ENDF}\n')
        try:
            g = parse(p)
            with self.assertRaises(AnchorError):
                resolve_anchor(g, use_file_anchor=True)
        finally:
            os.remove(p)


class TestProjection(unittest.TestCase):
    def test_offsets_land_at_the_right_distance(self):
        lat0, lon0 = 48.3539, 11.83
        lon, lat = to_lonlat(lat0, lon0, [0.0, 1000.0, 0.0], [0.0, 0.0, 1000.0])
        self.assertAlmostEqual(lon[0], lon0, places=9)
        self.assertAlmostEqual(lat[0], lat0, places=9)
        # 1000 m east and 1000 m north, measured back on the ellipsoid
        mlat = 111132.92 - 559.82 * math.cos(2 * math.radians(lat0))
        mlon = (111412.84 * math.cos(math.radians(lat0))
                - 93.5 * math.cos(3 * math.radians(lat0)))
        self.assertAlmostEqual((lon[1] - lon0) * mlon, 1000.0, delta=2.0)
        self.assertAlmostEqual((lat[2] - lat0) * mlat, 1000.0, delta=2.0)

    def test_feet_scale_applied(self):
        lon, lat = to_lonlat(48.0, 11.0, [1000.0], [0.0], scale=0.3048)
        lon_m, _ = to_lonlat(48.0, 11.0, [304.8], [0.0], scale=1.0)
        self.assertAlmostEqual(lon[0], lon_m[0], places=9)


if __name__ == '__main__':
    unittest.main()
