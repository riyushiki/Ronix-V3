# xsadd

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![npm download][download-image]][download-url]

JavaScript implementation of the XORSHIFT-ADD (XSadd) pseudo random number generator.

Based on the C code from https://github.com/MersenneTwister-Lab/XSadd.

## Installation

`$ npm install ml-xsadd`

## API

### new XSadd([seed])

Creates a new XSadd instance. Seed is an optional integer that defaults to `Date.now()`.

### getUint32()

Returns a 32-bit integer r (0 <= r < 2^32).

### getFloat()

Returns a floating point number r (0.0 <= r < 1.0).

### random()

Like `getFloat()` but dynamically bound to the `XSadd` instance.  
You can use this function externally, like `Math.random`:

```js
var XSadd = new XSadd();
var random = xsadd.random;
var number = random();
```

### init(seed)

Reinitialize the generator with a new seed.

## LICENSE

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-xsadd.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-xsadd
[travis-image]: https://img.shields.io/travis/mljs/xsadd/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/xsadd
[download-image]: https://img.shields.io/npm/dm/ml-xsadd.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-xsadd
