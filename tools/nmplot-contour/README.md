# nmplot-contour

Converts an **NMPlot noise grid (`.grd`)** into a **contour-band GeoJSON** ready to
drop on a map.

```bash
nmplot-contour sample.grd --anchor 48.3539 11.83
#   sample_bands.geojson   9 features
```

The band GeoJSON is the point of the tool. Everything else is opt-in.

## Why this exists

NMPlot is Windows-only and its vendor is gone, so grids have to be converted
elsewhere. Three things make that harder than it looks, and this tool handles
all three.

**1. There are two `.grd` variants, and confusing them is silent.**

| | `{CART}` record | point coordinates |
|---|---|---|
| **cartesian** | present | x/y in the units `{CART}` names, usually FEET |
| **geographic** | absent | already lon/lat degrees |

Parsers written for the geographic form — including the reference one on
GitHub — read a cartesian file's feet as degrees and render the grid as a line
near the south pole. The variant is detected from the file; you never specify it.

**2. The geographic anchor is usually a placeholder.** Every file seen so far
carried one: `0,0` (Null Island) or a coordinate in empty desert. A wrong anchor
produces output that is perfectly valid and thousands of km from the site, so a
cartesian grid **refuses to convert without an explicit anchor**:

```bash
nmplot-contour sample.grd                      # error: anchor not trusted
nmplot-contour sample.grd --anchor 48.35 11.83 # explicit
nmplot-contour sample.grd --site EDDM          # from sites.json
nmplot-contour sample.grd --use-file-anchor    # accept the file's own (never 0,0)
```

**3. A contour can be cut off by the edge of the model, not by the noise.** A
level only closes inside the grid if it exceeds the highest value on the grid
boundary; below that it runs off the edge and understates the area it encloses.
Every level is checked, each feature carries `"closed": true|false`, and the
report prints it:

```
  EPNL 52.02-128.65 dB; max on grid edge 84.95
      80 dB  TRUNCATED at grid edge
      85 dB  closed
```

Use `--closed-only` to drop truncated levels rather than ship them. If you keep
them, they are drawn **dashed** -- open bands get an ink `stroke-dasharray`
outline instead of the usual white hairline, and open contour lines dash too:

```json
{ "label": "80-85 dB", "closed": false, "fill": "#cde2fb",
  "stroke": "#0b0b0b", "stroke-width": 1.5, "stroke-dasharray": "6 4" }
```

Note the dash marks the whole *feature*. In truth only the part of the outline
lying on the grid boundary is artificial; the rest is a real contour. Marking the
feature is the most a per-feature style can say -- to show exactly where the
model stops, draw the grid's own extent as a separate layer.

`stroke-dasharray` is an extension to simplestyle-spec, not part of it. Renderers
that ignore it fall back to a solid stroke, which is harmless.

## Output

`PREFIX_bands.geojson` — filled bands between consecutive levels, WGS84 lon/lat
(CRS84), one feature per band, carrying
[simplestyle-spec](https://github.com/mapbox/simplestyle-spec) properties so a
map can render them without its own classification step:

```json
{ "metric": "EPNL", "unit": "dB", "lo": 90, "hi": 95, "label": "90-95 dB",
  "closed": true, "fill": "#86b6ef", "fill-opacity": 0.8,
  "stroke": "#ffffff", "stroke-width": 0.5, "stroke-opacity": 0.6 }
```

Fills are a sequential single-hue ramp, light (quiet) to dark (loud), taken from
documented palette steps and never interpolated. **Colour follows the level, not
the feature's position**, so a band missing from one file does not shift the
colours in another. The ramp's steps sit ~0.047 apart in OKLab lightness; if the
bands must read as discrete tiers rather than a continuous surface, that caps you
at about **7 bands** (`palette.MAX_DISTINCT_BANDS`).

| flag | also writes |
|---|---|
| `--lines` | `_contours.geojson` — contour lines, one feature per level |
| `--points` | `_points.geojson` — one point per receptor |
| `--cells` | `_center_polygons.geojson`, `_polygons.geojson` |
| `--tif` | `PREFIX.tif` — GeoTIFF (needs the `tif` extra) |

## Levels

Default is 5 dB steps spanning the data. Override with `--levels 55,60,65,70`
(END thresholds for Lden, say) or change the spacing with `--step 10`.

## Install

```bash
pip install -e tools/nmplot-contour          # numpy, pyproj, matplotlib, shapely
pip install -e "tools/nmplot-contour[tif]"   # adds rasterio, only needed for --tif
```

## Notes on accuracy

There is no intermediate raster. A lattice grid is contoured on the actual
lon/lat of every cell centre; scattered points (the usual geographic case) are
contoured on a Delaunay triangulation of the points themselves. Neither path
resamples onto a regular lon/lat raster first, which would smooth peaks and
shift edges — measured against an earlier raster-based implementation, band
areas agree to 0.035% and centroids sit within 7-9 m on a 50 m grid.

Local x/y offsets are placed on the ellipsoid with an azimuthal-equidistant
projection centred on the anchor, which is distortion-free at the centre and
preserves distance and bearing outward from it.

Grids with a non-zero `{CART}` rotation are rejected rather than silently
mishandled.

## Tests

```bash
cd tools/nmplot-contour && python3 -m unittest discover -s tests
```

Stdlib `unittest`, no test dependencies, about a second to run. The suite covers
the failure modes that actually occurred while building this: variant
misdetection, placeholder anchors, annular bands dropped by a bad hole test,
bands invalid where a hole meets the shell, an open contour collapsed from 643
vertices to 2 by path simplification, and colour drifting when the band count
changes.

### Fixtures

Named for what they exercise rather than where they came from.

| file | origin | what it covers |
|---|---|---|
| `large_null_anchor.grd` | `sample.grd` | 401 x 81 EPNL receptors at 50 m over 20 x 4 km. `{CART 0 0}`, so it must be refused without an explicit anchor. Its 80 dB contour leaves the eastern edge (33 of 81 boundary cells above 80 dB, peak 84.95) while everything from 85 dB up closes -- the reference case for truncation. |
| `small_truncated.grd` | `Case1_LAmax.grd` | 11 x 17 LAmax receptors over ~1.1 x 0.85 km, with a non-zero placeholder anchor (34.124, 3.3) that `--use-file-anchor` may accept. The domain is far smaller than the footprint, so 6 of 11 levels are truncated. |
| `scattered_geographic.grd` | generated | The geographic variant: a regular cartesian grid projected to lon/lat, which is deliberately *not* a lattice afterwards. Written by the projection code itself, so nothing third-party is redistributed. |

A grid's own `{CART}` anchor is a placeholder in both real fixtures, which is why
the anchor rules exist. Use them as sample input:

```bash
nmplot-contour tests/fixtures/large_null_anchor.grd --site EDDM --lines
nmplot-contour tests/fixtures/small_truncated.grd --use-file-anchor --closed-only
```
