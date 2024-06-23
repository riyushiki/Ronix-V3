# array-xy-equally-spaced

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Get the closest point for a specific abscissa value.

## Installation

`$ npm install --save ml-array-xy-equally-spaced`

## Usage

```js
import closestX from 'ml-array-xy-equally-spaced';

const regularCase = {
  x: [-1, 0, 1, 2, 3, 4, 5, 6, 7],
  y: [10, 11, 12, 13, 14, 15, 16, 17, 18]
};
const result = closestX({ x, y }, { target: 4.3 });
// {x: 4, y: 15};

const reverseCase = {
  x: [7, 6, 5, 4, 3, 2, 1, 0, -1],
  y: [18, 17, 16, 15, 14, 13, 12, 11, 10]
};
const reverseResult = closestX(reverseCase, { target: -2, reverse: true });
// {x: -1, y: 10};
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/array-xy-equally-spaced.svg?style=flat-square
[npm-url]: https://npmjs.org/package/array-xy-equally-spaced
[download-image]: https://img.shields.io/npm/dm/array-xy-equally-spaced.svg?style=flat-square
[download-url]: https://npmjs.org/package/array-xy-equally-spaced
