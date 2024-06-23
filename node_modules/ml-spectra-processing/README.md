# ml-spectra-processing

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Various functions to process spectra. Those are `pure` functions.

They are sorted in various categories:

- matrix: functions on ml-matrix instances (or array or array)
- x: functions that apply on a 1D array
- xy: functions that apply on an object `{x: [], y:[]}`
- xyArray: functions that apply on an array of objects `{x: [], y:[]}`
- xyObject: functions that apply on an array of point `[{x,y}]`
- xreim: functions that apply on an object `{x: [], re:[], im:[]}`
- reim: functions that apply on an object `{re: [], im:[]}`
- zone: functions that apply on a zone `{from,to}`
- zones: functions that apply on an array of zone `[{from,to}]`

The name of the functions start with the first argument on which they apply.

## Installation

`$ npm i ml-spectra-processing`

## Usage

```js
import { xAdd } from 'ml-spectra-processing';

const array = [1, 2, 3];
const result = xAdd(array, 5);
console.log(result);
```

## [API Documentation](https://mljs.github.io/spectra-processing/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-spectra-processing.svg
[npm-url]: https://www.npmjs.com/package/ml-spectra-processing
[ci-image]: https://github.com/mljs/spectra-processing/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/mljs/spectra-processing/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/spectra-processing.svg
[codecov-url]: https://codecov.io/gh/mljs/spectra-processing
[download-image]: https://img.shields.io/npm/dm/ml-spectra-processing.svg
[download-url]: https://www.npmjs.com/package/ml-spectra-processing
