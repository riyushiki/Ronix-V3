# pad-array

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![npm download][download-image]][download-url]

Function to fill an array in JavaScript.

This code is based in the MATLAB's code [padarray](http://www.mathworks.com/help/images/ref/padarray.html)

## Installation

`npm i ml-pad-array`

## pad-array(data, [options])

Pads the `data` array given the current `options` (returns a new array).

**Options**:

- **size**: Defines the number of fields that will be expanded. The default value is 1. The possible type values are:
  - Number: If the value is just a number it will expand in all directions with that value.
  - Array of numbers: It will expand in each direction given the values, for the array case the two values are `left and right` and for the matrix case are `left, up, right, down`
- **value**: Determine how to fill the values, if the value don't match with the next strings, the new values are going to be filled with that value. The default value is 0. The special strings are:
  - `'circular'`: Pad with circular repetition of elements within the dimension.
  - `'replicate'`: Pad by repeating border elements of array.
  - `'symmetric'`: Pad array with mirror reflections of itself. In this case the `size` shouldn't be bigger than the dimensions.
- **output**: Instead of creating a new array, the returned value should be in this variable.

## Examples

```js
var data = [1, 2, 3, 4];

// default case
var default_case = padArray(data);
default_case === [0, 1, 2, 3, 4, 0];

// circular case
var circular_case = padArray(data, { size: 5, value: 'circular' });
circular_case === [4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1];

// replicate case
var replicate_case = padArray(data, { size: 3, value: 'replicate' });
replicate_case === [1, 1, 1, 1, 2, 3, 4, 4, 4, 4];

// symmetric case
var symmetric_case = padArray(data, { size: 3, value: 'symmetric' });
symmetric_case === [3, 2, 1, 1, 2, 3, 4, 4, 3, 2];
```

## Authors

- [Miguel Asencio](https://github.com/maasencioh)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-pad-array.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-pad-array
[travis-image]: https://img.shields.io/travis/mljs/pad-array/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/pad-array
[download-image]: https://img.shields.io/npm/dm/ml-pad-array.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-pad-array
