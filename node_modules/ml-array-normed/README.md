# array-normed

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Norme the vector (sum to 1 by default)

## Installation

`$ npm install --save ml-array-normed`

## Usage

```js
import normed from 'ml-array-normed';

const result = normed([1, 2, 3, 4]);
// [0.1, 0.2, 0.3, 0.4]
```

```js
import normed from 'ml-array-normed';

const result = normed([1, 2, 3, 4], {algorithm:'max'});
// [0.25, 0.5, 0.75, 1]
```

```js
import normed from 'ml-array-normed';

const result = normed([1, 2, 3, 4], {algorithm:'max', maxValue: 100});
// [25, 50, 75, 100]
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-array-normed.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-array-normed
[download-image]: https://img.shields.io/npm/dm/ml-array-normed.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-array-normed
