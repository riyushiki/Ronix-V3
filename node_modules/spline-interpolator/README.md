# spline-interpolator
Library for smoothing spline interpolation.

# Usage

```
// initialization

const SplineInterpolator = require('spline-interpolator')
const x = [1, 2, 3, 4, 5]
const y = [9, 3, 6, 2, 4]
const interpolator = new SplineInterpolator(x, y)

// interpolate single point
console.log(interpolator.interpolate(4.2))
// >> 1.7468571428571422

// print curve in the range [0.0, 6.0]
for (const [xi, yi] of interpolator.curve(100, [0.0, 6.0])) {
  console.log(xi, yi)
}
```
