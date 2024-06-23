# array-xy-weighted-merge

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Merge abscissa values on similar ordinates and weight the group of abscissa.

## Installation

`$ npm install --save ml-array-xy-weighted-merge`

## Usage

```js
import weightedMerge from 'ml-array-xy-weighted-merge';

const points = {
  x: [100.001, 100.002, 200.01, 200.02, 300.0001, 300.0002],
  y: [10, 11, 20, 21, 30, 31]
};

const merged = weightedMerge(points, { groupWidth: 0.010001 });
/*
merged.x -> [
    (100.002 * 10 + 100.001 * 11) / 21,
    (200.01 * 20 + 200.02 * 21) / 41,
    (300.0002 * 30 + 300.0001 * 31) / 61
];
merged.y -> [21, 41, 61];
*/
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/array-xy-weighted-merge.svg?style=flat-square
[npm-url]: https://npmjs.org/package/array-xy-weighted-merge
[download-image]: https://img.shields.io/npm/dm/array-xy-weighted-merge.svg?style=flat-square
[download-url]: https://npmjs.org/package/array-xy-weighted-merge
