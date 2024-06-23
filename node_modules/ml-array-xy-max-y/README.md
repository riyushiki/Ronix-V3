# array-xy-max-y

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Find the maximum ordinate value in a range of abscissas.

## Installation

`$ npm install --save ml-array-xy-max-y`

## Usage

```js
import maxY from 'ml-array-xy-max-y';

const points = {
  x: [1, 2, 3, 4, 5, 6],
  y: [10, 2, 8, 4, 5, 20]
};
const options = {
  from: { index: 1 },
  to: { value: 5 }
};
const result = maxY(points, options);

/* result -> {
    index: 2,
    value: 8
} */
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/array-xy-max-y.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/array-xy-max-y
[download-image]: https://img.shields.io/npm/dm/array-xy-max-y.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/array-xy-max-y
