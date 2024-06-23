# ml-zones

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Deal with zones.

## Installation

`$ npm i ml-zones`

## Usage

```js
import Zones from 'ml-zones';

let result = Zones.normalize([
  { from: 0, to: 2 },
  { from: 1, to: 5 },
]);

// result = [{from:0, to:5}]
```

## [API Documentation](https://mljs.github.io/ml-zones/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-zones.svg
[npm-url]: https://www.npmjs.com/package/ml-zones
[ci-image]: https://github.com/mljs/ml-zones/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/mljs/ml-zones/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/ml-zones.svg
[download-url]: https://www.npmjs.com/package/ml-zones
