"""Fill colours for contour bands.

Noise level is continuous magnitude drawn as a choropleth, so the encoding is
sequential: a single hue, light -> dark, with the quietest band allowed to
recede toward the map surface. Steps are taken from a validated palette and are
never interpolated between.

The ramp's 13 steps sit ~0.047 apart in OKLab lightness. If bands must be read
as discrete tiers rather than as a continuous surface, adjacent steps need a
gap of ~0.05, which caps you at 7 bands -- see `max_distinct_bands`.
"""
from __future__ import annotations

SEQ = ['#cde2fb', '#b7d3f6', '#9ec5f4', '#86b6ef', '#6da7ec', '#5598e7', '#3987e5',
       '#2a78d6', '#256abf', '#1c5cab', '#184f95', '#104281', '#0d366b']

MAX_DISTINCT_BANDS = 7


def _oklab_lightness(hex_color: str) -> float:
    def lin(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (lin(int(hex_color[i:i + 2], 16) / 255) for i in (1, 3, 5))
    l = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3)
    m = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3)
    s = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)
    return 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s


_L = [_oklab_lightness(h) for h in SEQ]


def ramp(n: int) -> list[str]:
    """n steps spaced evenly by lightness, lightest (quietest) first.

    Beyond `len(SEQ)` bands there are not enough documented steps to give each
    band its own, so steps repeat. They are never interpolated between -- see
    `repeats_at` for warning about it.
    """
    if n < 1:
        return []
    if n == 1:
        return [SEQ[6]]
    if n > len(SEQ):
        return [SEQ[min(len(SEQ) - 1, round(k * (len(SEQ) - 1) / (n - 1)))]
                for k in range(n)]
    chosen: list[int] = []
    step = (_L[-1] - _L[0]) / (n - 1)
    for k in range(n):
        target = _L[0] + step * k
        cand = [i for i in range(len(SEQ)) if i not in chosen]
        chosen.append(min(cand, key=lambda i: abs(_L[i] - target)))
    return [SEQ[i] for i in sorted(chosen, key=lambda i: -_L[i])]


def repeats(n: int) -> bool:
    """True when `n` bands cannot each get a distinct documented step."""
    return n > len(SEQ)


# A level truncated by the grid edge is drawn dashed: the band continues past
# where the model stops, so its outline is not entirely a real contour.
# `stroke-dasharray` is an extension to simplestyle-spec, not part of it;
# renderers that do not know it fall back to a solid stroke, which is harmless.
DASH_OPEN = '6 4'
INK = '#0b0b0b'


def style(colors: list[str], index: int, closed: bool = True) -> dict:
    """simplestyle-spec properties for band `index` (0 = quietest).

    Colour follows the level, never the position in the emitted list, so an
    empty band in one file does not shift the colours in another.
    """
    s = {
        'fill': colors[index],
        'fill-opacity': 0.8,
        'stroke': '#ffffff',
        'stroke-width': 0.5,
        'stroke-opacity': 0.6,
    }
    if not closed:
        # A truncated band runs past the edge of the model, so its real extent
        # is unknown: filling it would assert an area the model does not
        # support. Draw the outline only. `fill` is left in place for renderers
        # that want the level's colour, but `fill-opacity` is 0.
        #
        # The dash is the intended look; several renderers ignore
        # `stroke-dasharray` and fall back to a solid outline, which still reads
        # clearly as "not a filled band".
        s.update({'fill-opacity': 0,
                  'stroke': INK, 'stroke-width': 1.5, 'stroke-opacity': 0.7,
                  'stroke-dasharray': DASH_OPEN})
    return s


def line_style(colors: list[str], index: int, closed: bool = True) -> dict:
    """simplestyle-spec properties for a contour line at level `index`."""
    s = {'stroke': colors[min(index, len(colors) - 1)],
         'stroke-width': 2, 'stroke-opacity': 1.0}
    if not closed:
        s['stroke-dasharray'] = DASH_OPEN
    return s
