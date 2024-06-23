# array-xy-filter-x

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Sort a set of point based on the abscissas values.

## Installation

`$ npm install --save ml-array-xy-filter-x`

## Usage

```js
import filterX from 'ml-array-xy-filter-x';

  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const points = { x, y };

let result = filterX(points, {
    from: 2.5,
    to: 8.5,
    exclusions: [{ from: 2, to: 4.5 }, { from: 5.5, to: 8 }]
});

/* result -> {
    x: [5, 8],
    y: [6, 9]
} */
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/array-xy-filter-x.svg?style=flat-square
[npm-url]: https://npmjs.org/package/array-xy-filter-x
[download-image]: https://img.shields.io/npm/dm/array-xy-filter-x.svg?style=flat-square
[download-url]: https://npmjs.org/package/array-xy-filter-x
