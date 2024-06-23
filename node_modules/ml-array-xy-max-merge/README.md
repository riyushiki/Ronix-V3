# array-xy-max-merge

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Merge abscissa values on similar ordinates and keeps the abscissa with bigger ordinate value.

## Installation

`$ npm install --save ml-array-xy-max-merge`

## Usage

```js
import maxMerge from 'ml-array-xy-max-merge';

const points = {
  x: [100.001, 100.002, 200.01, 200.02, 300.0001, 300.0002],
  y: [10, 11, 20, 21, 30, 31]
};

const merged = maxMerge(points, { groupWidth: 0.010001 });
/*
merged.x -> [100.002, 200.02, 300.0002];
merged.y -> [21, 41, 61];
*/
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/array-xy-max-merge.svg?style=flat-square
[npm-url]: https://npmjs.org/package/array-xy-max-merge
[download-image]: https://img.shields.io/npm/dm/array-xy-max-merge.svg?style=flat-square
[download-url]: https://npmjs.org/package/array-xy-max-merge
