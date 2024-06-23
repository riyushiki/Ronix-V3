# Partial Least Squares (PLS), Kernel-based Orthogonal Projections to Latent Structures (K-OPLS) and NIPALS based OPLS

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

PLS regression algorithm based on the Yi Cao implementation:

[PLS Matlab code](http://www.mathworks.com/matlabcentral/fileexchange/18760-partial-least-squares-and-discriminant-analysis)

K-OPLS regression algorithm based on [this paper](http://onlinelibrary.wiley.com/doi/10.1002/cem.1071/abstract).

[K-OPLS Matlab code](http://kopls.sourceforge.net/download.shtml)

OPLS implementation based on the R package [Metabomate](https://github.com/kimsche/MetaboMate) using NIPALS factorization loop.

## installation

`$ npm i ml-pls`

## Usage

### [PLS](./src/PLS.js)

```js
import PLS from 'ml-pls';

var X = [
  [0.1, 0.02],
  [0.25, 1.01],
  [0.95, 0.01],
  [1.01, 0.96],
];
var Y = [
  [1, 0],
  [1, 0],
  [1, 0],
  [0, 1],
];
var options = {
  latentVectors: 10,
  tolerance: 1e-4,
};

var pls = new PLS(options);
pls.train(X, Y);
```

### [K-OPLS](./src/KOPLS.js)

```js
// assuming that you created Xtrain, Xtest, Ytrain, Ytest

import Kernel from 'ml-kernel';
import KOPLS from 'ml-pls';

var kernel = new Kernel('gaussian', {
  sigma: 25,
});

var cls = new KOPLS({
  orthogonalComponents: 10,
  predictiveComponents: 1,
  kernel: kernel,
});

cls.train(Xtrain, Ytrain);
var {
  prediction, // prediction
  predScoreMat, // Score matrix over prediction
  predYOrthVectors, // Y-Orthogonal vectors over prediction
} = cls.predict(Xtest);
```

### [OPLS](./src/OPLS.js)

```js
// get the famous iris dataset
import {
  getNumbers,
  getClasses,
  getCrossValidationSets,
} from 'ml-dataset-iris'; 

// get dataset-metadata
import { METADATA } from 'ml-dataset-metadata';

// get frozen folds for testing purposes
let cvFolds = getCrossValidationSets(7, { idx: 0, by: 'trainTest' });

let x = new Matrix(iris);

let oplsOptions = { cvFolds, nComp: 1 };

// get labels as factor (for regression)
let labels = new METADATA([metadata], { headers: ['iris'] });
let y = labels.get('iris', { format: 'factor' }).values;

// get model
let model = new OPLS(x, y, oplsOptions);
```
The OPLS class is intended for exploratory modeling, that is not for the creation of predictors. Therefore there is a built-in k-fold cross-validation loop and Q2y is an average over the folds. 

```js 
console.log(model.model[0].Q2y);
``` 
should give 0.9209227614652857

If for some reason a predictor is necessary the following code may serve as an example

```js
let testIndex = getCrossValidationSets(7, { idx: 0, by: 'trainTest' })[0]
  .testIndex;
let trainIndex = getCrossValidationSets(7, { idx: 0, by: 'trainTest' })[0]
  .trainIndex;

// get data
let data = getNumbers();
// set test and training set
let testX = data.filter((el, idx) => testIndex.includes(idx));
let trainingX = data.filter((el, idx) => trainIndex.includes(idx));

// convert to matrix
trainingX = new Matrix(trainingX);
testX = new Matrix(testX);

// get metadata
let labels = getClasses();
let testLabels = labels.filter((el, idx) => testIndex.includes(idx));
let trainingLabels = labels.filter((el, idx) => trainIndex.includes(idx));
let trainingY = new METADATA([trainingLabels], { headers: ['iris'] });
let testY = new METADATA([testLabels], { headers: ['iris'] }).get('iris', {
  format: 'factor',
}).values;

let model = new OPLS(
  trainingX,
  trainingY.get('iris', { format: 'factor' }).values,
);
let prediction = model.predict(testX, { trueLabels: testY });
console.log(model.model[0].Q2y);
```


## [API Documentation](http://mljs.github.io/pls/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-pls.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-pls
[ci-image]: https://github.com/mljs/pls/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/mljs/pls/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/ml-pls.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-pls
