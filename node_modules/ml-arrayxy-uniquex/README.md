# arrayxy-uniquex

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

Function to sum the y values if the x values are equals. The x array has to be ordered.
It is an in place modification

## Installation

`npm i ml-arrayxy-uniquex`

```
const uniqueX=require('ml-arrayxy-uniquex');

  var x = [0, 0, 1, 2, 3, 3];
  var y = [1, 2, 3, 4, 5, 6];
  uniqueX({ x, y });

  // x = [0, 1, 2, 3]
  // y = [3, 3, 4, 11]
```

## [API Documentation](https://mljs.github.io/arrayxy-uniquex/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-arrayxy-uniquex.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-arrayxy-uniquex
[travis-image]: https://img.shields.io/travis/mljs/arrayxy-uniquex/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/arrayxy-uniquex
[david-image]: https://img.shields.io/david/mljs/arrayxy-uniquex.svg?style=flat-square
[david-url]: https://david-dm.org/mljs/arrayxy-uniquex
[download-image]: https://img.shields.io/npm/dm/ml-arrayxy-uniquex.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-arrayxy-uniquex
