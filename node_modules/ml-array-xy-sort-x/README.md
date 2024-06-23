# array-xy-sort-x

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Sort a set of point based on the abscissas values.

## Installation

`$ npm install --save ml-array-xy-sort-x`

## Usage

```js
import sortX from 'ml-array-xy-sort-x';

const x = [6, 5, 4, 3, 2, 1, 0, -1];
const y = [17, 16, 15, 14, 13, 12, 11, 10];
sortX({ x, y });

/* result -> {
    x: [-1, 0, 1, 2, 3, 4, 5, 6],
    y: [10, 11, 12, 13, 14, 15, 16, 17]
} */
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/array-xy-sort-x.svg?style=flat-square
[npm-url]: https://npmjs.org/package/array-xy-sort-x
[download-image]: https://img.shields.io/npm/dm/array-xy-sort-x.svg?style=flat-square
[download-url]: https://npmjs.org/package/array-xy-sort-x
