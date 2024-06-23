# bit-array

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![npm download][download-image]][download-url]

Bit-array operations in JavaScript.

## Installation

`npm install ml-bit-array`

## Methods

All exported methods are static and do not change the original array unless indicated otherwise.  
Numbers in array arguments are treated as 32-bit signed integers.  
The library is designed with speed in mind so argument type and length are not checked.

### count(arr)

Computes the amount of `1`s in the array. This is also known as [Hamming weight](https://en.wikipedia.org/wiki/Hamming_weight).

### and(arr1, arr2)

Computes the logical [AND](https://en.wikipedia.org/wiki/Logical_conjunction) operation and returns the result in a new array.

### or(arr1, arr2)

Computes the logical [OR](https://en.wikipedia.org/wiki/Logical_disjunction) operation and returns the result in a new array.

### xor(arr1, arr2)

Computes the logical [XOR](https://en.wikipedia.org/wiki/Logical_biconditional) operation and returns the result in a new array.

### not(arr)

Computes the logical [NOT](https://en.wikipedia.org/wiki/Negation) operation and returns the result in a new array.

### getBit(arr, n)

Returns `true` if the bit at position `n` is 1, `false` if it is 0.

Imagine that you have an array of 4-bit numbers like this `['0001', '1010']`, the 0th position will be `0` because it is the most significant bit of the 0th element of the array, and the 4th position will be `1`, because will be the most significant bit in the 1st element of the array (remember that the true number of bits for a number in this case is 32).

### setBit(arr, n, val)

Sets the bit at position `n` to 1 if `val` is a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value, otherwise sets it to 0.

### toBinaryString(arr)

Converts an array of numbers to a string representation of the bits, so `toBinaryString([1])` will return `'00000000000000000000000000000001'`.  
The length of the string will be `arr.length * 32`.

### parseBinaryString(str)

Converts a string representation of bits to an array, so `parseBinaryString('00000000000000000000000000000010')` will return `[2]`.  
This is the exact inverse of `toBinaryString`.

### toHexString(arr)

Converts an array of numbers to a hexadecimal representation of the bits, so `toHexString([-1])` will return `'ffffffff'`.  
The length of the string will be `arr.length * 8`.

### parseHexString(str)

Converts a hexadecimal representation of bits to an array, so `parseHexString('00000010ffff0000')` will return `[16, -65536]`.  
This is the exact inverse of `toHexString`.

### toDebug(arr)

Returns a human-readable string from the array in the format:

```shell
0000: 0000 1000 1111 1000 0011 1101 1111 0001
0020: 0000 1000 1111 1000 0011 1101 1111 0001
0040: 0000 1000 1111 1000 0011 1101 1111 0001
```

## Authors

  - [Miguel Asencio](https://github.com/maasencioh)
  - [Michaël Zasso](https://github.com/targos)

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-bit-array.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-bit-array
[travis-image]: https://img.shields.io/travis/mljs/bit-array/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/bit-array
[download-image]: https://img.shields.io/npm/dm/ml-bit-array.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-bit-array
