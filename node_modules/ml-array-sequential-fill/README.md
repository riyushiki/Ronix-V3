# ml-array-sequential-fill

  [![NPM version][npm-image]][npm-url]
  [![npm download][download-image]][download-url]

Fill an array with sequential numbers or create a new array containing sequential numbers.

## Installation

`$ npm install --save ml-array-sequential-fill`

## Usage

```js
import sequentialFill from 'ml-array-sequential-fill';

var array = sequentialFill({from:0, to:10, size: 6});

// array = [0,2,4,6,8,10]

// The following alternatives gives the same result
var array = sequentialFill(undefined, {from:0, to:10, size: 6});
var array = sequentialFill([], {from:0, to:10, size: 6});
var array = sequentialFill([1,2,3], {from:0, to:10, size: 6});
var array = sequentialFill({from:0, to:10, step: 2});
```

If you provide an array the array will be modified ! If you would like a 
new array you may provide as value 'undefined' or just skip this value.



## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-array-variance.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-array-variance
[download-image]: https://img.shields.io/npm/dm/ml-array-variance.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-array-variance
