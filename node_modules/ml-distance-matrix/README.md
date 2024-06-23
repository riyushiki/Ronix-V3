# distance-matrix

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Compute a distance/similarity matrix.

## Installation

`npm i ml-distance-matrix`

## [API Documentation](https://mljs.github.io/distance-matrix/)

## Example

```js
const distanceMatrix = require('ml-distance-matrix');
const { euclidean } = require('ml-distance-euclidean');

// Computes euclidan distance for each pair of possible vectors
const matrix = distanceMatrix([[8, -1, 2], [-4, 0, 3], [-3, -1, 6]], euclidean);
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-distance-matrix.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-distance-matrix
[travis-image]: https://img.shields.io/travis/mljs/distance-matrix/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/distance-matrix
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/distance-matrix.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/mljs/distance-matrix
[download-image]: https://img.shields.io/npm/dm/ml-distance-matrix.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-distance-matrix
