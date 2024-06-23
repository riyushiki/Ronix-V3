# array-xy-centroids-merge

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Merge abscissa values if the ordinate value is in a list of centroids.

## Installation

`$ npm install --save ml-array-xy-ranges-merge`

## Usage

```js
import mergeByCentroids from 'ml-array-xy-centroids-merge';

const originalPoints = {
  x: [0.01, 1.008, 1.01, 1.012, 1.02, 1.04],
  y: [1, 1, 1, 1, 1, 1]
};

mergeByCentroids(originalPoints, [1.01, 1.04]);

/* result -> {
    x: [1.01, 1.04],
    y: [3, 1]
} */
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/array-xy-ranges-merge.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/array-xy-ranges-merge
[download-image]: https://img.shields.io/npm/dm/array-xy-ranges-merge.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/array-xy-ranges-merge
