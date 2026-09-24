import contextlib
import io
import json
import os
import tempfile
import unittest

from nmplot_contour.cli import main

FIX = os.path.join(os.path.dirname(__file__), 'fixtures')
CART = os.path.join(FIX, 'small_truncated.grd')   # Case1_LAmax
BIG = os.path.join(FIX, 'large_null_anchor.grd')  # sample.grd, {CART 0 0}
GEO = os.path.join(FIX, 'scattered_geographic.grd')


class CliCase(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.prefix = os.path.join(self.tmp.name, 'out')

    def tearDown(self):
        self.tmp.cleanup()

    def run_cli(self, *args):
        return main([*args, '-o', self.prefix, '-q'])

    def bands(self):
        with open(f'{self.prefix}_bands.geojson') as f:
            return json.load(f)


class TestAnchorPolicy(CliCase):
    def test_cartesian_without_anchor_exits_nonzero(self):
        err = io.StringIO()
        with contextlib.redirect_stderr(err):          # the refusal is the point
            self.assertEqual(self.run_cli(CART), 2)
        self.assertIn('placeholder', err.getvalue())
        self.assertFalse(os.path.exists(f'{self.prefix}_bands.geojson'))

    def test_cartesian_with_anchor_succeeds(self):
        self.assertEqual(self.run_cli(CART, '--anchor', '48.3539', '11.83'), 0)
        self.assertTrue(os.path.exists(f'{self.prefix}_bands.geojson'))

    def test_geographic_needs_no_anchor(self):
        self.assertEqual(self.run_cli(GEO), 0)
        self.assertTrue(self.bands()['features'])


class TestBandOutput(CliCase):
    def setUp(self):
        super().setUp()
        self.assertEqual(self.run_cli(CART, '--anchor', '48.3539', '11.83'), 0)

    def test_is_crs84_featurecollection(self):
        d = self.bands()
        self.assertEqual(d['type'], 'FeatureCollection')
        self.assertIn('CRS84', d['crs']['properties']['name'])

    def test_coordinates_land_near_the_anchor(self):
        from shapely.geometry import shape
        for f in self.bands()['features']:
            lo, la, hi, ha = shape(f['geometry']).bounds
            self.assertTrue(11.5 < lo < 12.2 and 11.5 < hi < 12.2)
            self.assertTrue(48.1 < la < 48.6 and 48.1 < ha < 48.6)

    def test_every_feature_carries_style_and_metadata(self):
        for f in self.bands()['features']:
            p = f['properties']
            for k in ('metric', 'unit', 'lo', 'hi', 'label', 'closed',
                      'fill', 'fill-opacity', 'stroke'):
                self.assertIn(k, p)
            self.assertTrue(p['fill'].startswith('#'))
            self.assertLess(p['lo'], p['hi'])

    def test_bands_do_not_overlap(self):
        from shapely.geometry import shape
        from shapely.ops import unary_union
        gs = [shape(f['geometry']) for f in self.bands()['features']]
        self.assertAlmostEqual(sum(g.area for g in gs),
                               unary_union(gs).area, places=12)

    def test_open_features_are_dashed_end_to_end(self):
        for f in self.bands()['features']:
            p = f['properties']
            self.assertEqual('stroke-dasharray' in p, not p['closed'],
                             f"{p['label']}: dash must track 'closed'")

    def test_truncation_is_flagged(self):
        flags = {f['properties']['lo']: f['properties']['closed']
                 for f in self.bands()['features']}
        self.assertIn(False, flags.values(), 'fixture should have truncated bands')


class TestOptions(CliCase):
    def test_closed_only_drops_truncated_bands(self):
        self.run_cli(CART, '--anchor', '48.3539', '11.83')
        every = len(self.bands()['features'])
        self.run_cli(CART, '--anchor', '48.3539', '11.83', '--closed-only')
        kept = self.bands()['features']
        self.assertLess(len(kept), every)
        self.assertTrue(all(f['properties']['closed'] for f in kept))

    def test_explicit_levels_are_honoured(self):
        self.run_cli(CART, '--anchor', '48.3539', '11.83',
                     '--levels', '90,100,110')
        los = [f['properties']['lo'] for f in self.bands()['features']]
        self.assertEqual(los, [90.0, 100.0])

    def test_lines_flag_writes_contours(self):
        self.run_cli(CART, '--anchor', '48.3539', '11.83', '--lines')
        with open(f'{self.prefix}_contours.geojson') as f:
            d = json.load(f)
        self.assertTrue(d['features'])
        for feat in d['features']:
            self.assertIn(feat['geometry']['type'], ('LineString', 'MultiLineString'))
            self.assertIn('stroke', feat['properties'])

    def test_points_flag_preserves_source_values(self):
        import re
        self.run_cli(CART, '--anchor', '48.3539', '11.83', '--points')
        with open(f'{self.prefix}_points.geojson') as f:
            got = [x['properties']['LAmax'] for x in json.load(f)['features']]
        with open(CART, newline='') as f:
            text = f.read().replace('\r\n', '\n')
        want = [float(c) for _, _, c in
                re.findall(r'\(\s*([-\d.]+),\s*([-\d.]+)\)\s+([-\d.]+)', text)]
        self.assertEqual(got, want)

    def test_colour_is_stable_for_a_level_across_runs(self):
        """A different band count must not repaint a level that both share."""
        self.run_cli(CART, '--anchor', '48.3539', '11.83', '--levels', '90,100,110')
        a = {f['properties']['lo']: f['properties']['fill']
             for f in self.bands()['features']}
        self.run_cli(CART, '--anchor', '48.3539', '11.83', '--levels', '90,100,110',
                     '--closed-only')
        b = {f['properties']['lo']: f['properties']['fill']
             for f in self.bands()['features']}
        for lo in set(a) & set(b):
            self.assertEqual(a[lo], b[lo])


if __name__ == '__main__':
    unittest.main()
