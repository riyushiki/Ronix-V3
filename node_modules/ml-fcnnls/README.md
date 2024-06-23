cnnls

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Fast Combinatorial Non-negative Least Squares.

Fast algorithm for the solution of large‐scale non‐negativity‐constrained least squares problems from Van Benthem and Keenan ([10.1002/cem.889](http://doi.org/10.1002/cem.889)), based on the active-set method algorithm published by Lawson and Hanson.

It solves the following optimisation problem.
Given $\mathbf{X}$ an $n \times l$ matrix and $\mathbf{Y}$ an $n\times p$, find $$\mathrm{argmin}_K ||\mathbf{XK} -\mathbf{Y}||^2_F$$ subject to $\mathbf{K}\geq 0$, where $\mathbf{K}$ is an $l \times p$ matrix and $||\ldots||_F$ is the Frobenius norm. In fact, $\mathbf{K}$ is the best solution to the equation: $\mathbf{XK}=\mathbf{Y}$, where $\mathbf{K} \geq 0$, it performs the regular Non-negative Least Squares algorithm and finds a vector as a solution to the problem. Also, performing this algorithm when $\mathbf{Y}$ is a matrix is like running the algorithm on each column of $\mathbf{Y}$, it will give the same result but in a much more efficient way.

https://en.wikipedia.org/wiki/Non-negative_least_squares

## Installation

`$ npm i ml-fcnnls`

## [API Documentation](https://mljs.github.io/fcnnls/)

## Usage

```js
import { Matrix } from 'ml-matrix';
import { fcnnls } from 'ml-fcnnls';

// Example with multiple RHS

let X = new Matrix([
  [1, 1, 2],
  [10, 11, -9],
  [-1, 0, 0],
  [-5, 6, -7],
]);

// Y can either be a Matrix of an array of array
let Y = new Matrix([
  [-1, 0, 0, 9],
  [11, -20, 103, 5],
  [0, 0, 0, 0],
  [1, 2, 3, 4],
]);

let K = fcnnls(X, Y);

/*
K = Matrix([
  [0.461, 0, 4.9714, 0],
  [0.5611, 0, 4.7362, 2.2404],
  [0, 1.2388, 0, 1.9136],
    ])
*/

import { fcnnlsVector } from 'ml-fcnnls';

// Example with single RHS and same X
// Should be giving a vector with the element of the first column of K in the previous example, since y is the first column of Y

let X = new Matrix([
  [1, 1, 2],
  [10, 11, -9],
  [-1, 0, 0],
  [-5, 6, -7],
]);

let y = [-1, 11, 0, 1];

let k = fcnnlsVector(X, y);

/*
k = [0.461, 0.5611, 0]
*/
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-fcnnls.svg
[npm-url]: https://www.npmjs.com/package/ml-fcnnls
[ci-image]: https://github.com/mljs/fcnnls/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/mljs/fcnnls/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/fcnnls.svg
[codecov-url]: https://codecov.io/gh/mljs/fcnnls
[download-image]: https://img.shields.io/npm/dm/ml-fcnnls.svg
[download-url]: https://www.npmjs.com/package/ml-fcnnls
