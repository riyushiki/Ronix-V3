# cross-validation

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![npm download][download-image]][download-url]

Utility library to do cross validation with supervised classifiers.

Cross-validation methods: 
- [k-fold](https://en.wikipedia.org/wiki/Cross-validation_(statistics)#k-fold_cross-validation)
- [leave-p-out](https://en.wikipedia.org/wiki/Cross-validation_(statistics)#Leave-p-out_cross-validation)

[API documentation](https://mljs.github.io/cross-validation/).

A list of the mljs supervised classifiers is available [here](https://github.com/mljs/ml#tools) in the supervised learning section, but you could also use your own. Cross validations methods return a ConfusionMatrix ([https://github.com/mljs/confusion-matrix](https://github.com/mljs/confusion-matrix)) that can be used to calculate metrics on your classification result.

## Installation
```bash
npm i -s ml-cross-validation
```

## Example using a ml classification library
```js
const crossValidation = require('ml-cross-validation');
const KNN = require('ml-knn');
const dataset = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
const labels = [0, 0, 0, 1, 1, 1];
const confusionMatrix = crossValidation.leaveOneOut(KNN, dataSet, labels);
const accuracy = confusionMatrix.getAccuracy();
```

## Example using a classifier with its own specific API
If you have a library that does not comply with the ML Classifier conventions, you can use can use a callback to perform the classification.
The callback will take the train features and labels, and the test features. The callback shoud return the array of predicted labels.
```js
const crossValidation = require('ml-cross-validation');
const KNN = require('ml-knn');
const dataset = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
const labels = [0, 0, 0, 1, 1, 1];
const confusionMatrix = crossValidation.leaveOneOut(dataSet, labels, function(trainFeatures, trainLabels, testFeatures) {
  const knn = new KNN(trainFeatures, trainLabels);
  return knn.predict(testFeatures);
});
const accuracy = confusionMatrix.getAccuracy();
```

## ML classifier API conventions
You can write your classification library so that it can be used with ml-cross-validation as described in [here](#example-using-a-ml-classification-library)
For that, your classification library must implement
- A constructor. The constructor can be passed options as a single argument.
- A `train` method. The `train` method is passed the data as a first argument and the labels as a second.
- A `predict` method. The `predict` method is passed test data and should return a predicted label.

### Example
```js
class MyClassifier {
  constructor(options) {
    this.options = options;
  }
  train(data, labels) {
    // Create your model
  }
  predict(testData) {
    // Apply your model and return predicted label
    return prediction;
  }
}
```
### 

[npm-image]: https://img.shields.io/npm/v/ml-cross-validation.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-cross-validation
[travis-image]: https://img.shields.io/travis/mljs/cross-validation/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/cross-validation
[download-image]: https://img.shields.io/npm/dm/ml-cross-validation.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-cross-validation
