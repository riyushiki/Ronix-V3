# global-spectral-deconvolution

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Global Spectra Deconvolution + Peak optimizer

`gsd`is using an algorithm that is searching for inflection points to determine the position of peaks and the width of the peaks are between the 2 inflection points. The result of GSD yield to an array of object containing {x, y and width}. However this width is based on the inflection point and may be different from the 'fwhm' (Full Width Half Maximum).

The second algorithm (`optimizePeaks`) will optimize the width as a FWHM to match the original peak. After optimization the width with therefore be always FWHM whichever is the function used.

## [API documentation](http://mljs.github.io/global-spectral-deconvolution/)

## Parameters

#### minMaxRatio=0.00025 (0-1)

Threshold to determine if a given peak should be considered as a noise, bases on its relative height compared to the highest peak.

#### broadRatio=0.00 (0-1)

If `broadRatio` is higher than 0, then all the peaks which second derivative smaller than `broadRatio * maxAbsSecondDerivative` will be marked with the soft mask equal to true.

#### noiseLevel=0 (-inf, inf)

Noise threshold in spectrum units

#### maxCriteria=true [true||false]

Peaks are local maximum(true) or minimum(false)

#### smoothY=true [true||false]

Select the peak intensities from a smoothed version of the independent variables?

#### realTopDetection=false [true||false]

Use a quadratic optimizations with the peak and its 3 closest neighbors to determine the true x,y values of the peak?

#### sgOptions={windowSize: 5, polynomial: 3}

Savitzky-Golay parameters. windowSize should be odd; polynomial is the degree of the polynomial to use in the approximations. It should be bigger than 2.

#### heightFactor=0

Factor to multiply the calculated height (usually 2).

#### derivativeThreshold=0

Filters based on the amplitude of the first derivative

## Post methods

### GSD.broadenPeaks(peakList, {factor=2, overlap=false})

We enlarge the peaks and add the properties from and to.
By default we enlarge of a factor 2 and we don't allow overlap.

### GSD.joinBroadPeaks

### GSD.optimizePeaks

## Example

```js
import { IsotopicDistribution } from 'mf-global';
import { gsd, optimizePeaks } from '../src';

// generate a sample spectrum of the form {x:[], y:[]}
const data = new IsotopicDistribution('C').getGaussian();

let peaks = gsd(data, {
  noiseLevel: 0,
  minMaxRatio: 0.00025, // Threshold to determine if a given peak should be considered as a noise
  realTopDetection: true,
  maxCriteria: true, // inverted:false
  smoothY: false,
  sgOptions: { windowSize: 7, polynomial: 3 },
});
console.log(peaks); // array of peaks {x,y,width}, width = distance between inflection points
// GSD

let optimized = optimizePeaks(data, peaks);
console.log(optimized); // array of peaks {x,y,width}, width = FWHM
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-gsd.svg
[npm-url]: https://npmjs.org/package/ml-gsd
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/global-spectral-deconvolution.svg
[codecov-url]: https://codecov.io/gh/mljs/global-spectral-deconvolution
[ci-image]: https://github.com/mljs/global-spectral-deconvolution/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/mljs/global-spectral-deconvolution/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/ml-gsd.svg
[download-url]: https://npmjs.org/package/ml-gsd
