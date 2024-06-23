'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ConfusionMatrix = _interopDefault(require('ml-confusion-matrix'));
var combinations = _interopDefault(require('ml-combinations'));

/**
 * get folds indexes
 * @param {Array} features
 * @param {Number} k - number of folds, a
 */
function getFolds(features, k = 5) {
  let N = features.length;
  let allIdx = new Array(N);
  for (let i = 0; i < N; i++) {
    allIdx[i] = i;
  }

  let l = Math.floor(N / k);
  // create random k-folds
  let current = [];
  let folds = [];
  while (allIdx.length) {
    let randi = Math.floor(Math.random() * allIdx.length);
    current.push(allIdx[randi]);
    allIdx.splice(randi, 1);
    if (current.length === l) {
      folds.push(current);
      current = [];
    }
  }
  // we push the remaining to the last fold so that the total length is
  // preserved. Otherwise the Q2 will fail.
  if (current.length) current.forEach((e) => folds[k - 1].push(e));
  folds = folds.slice(0, k);

  let foldsIndex = folds.map((x, idx) => ({
    testIndex: x,
    trainIndex: [].concat(...folds.filter((el, idx2) => idx2 !== idx)),
  }));
  return foldsIndex;
}

/**
 * A function to sample a dataset maintaining classes equilibrated
 * @param {Array} classVector - an array containing class or group information
 * @param {Number} fraction - a fraction of the class to sample
 * @return {Object} - an object with indexes
 */

function sampleAClass(classVector, fraction) {
  // sort the vector
  let classVectorSorted = JSON.parse(JSON.stringify(classVector));
  let result = Array.from(Array(classVectorSorted.length).keys()).sort((a, b) =>
    classVectorSorted[a] < classVectorSorted[b]
      ? -1
      : (classVectorSorted[b] < classVectorSorted[a]) | 0,
  );
  classVectorSorted.sort((a, b) => (a < b ? -1 : (b < a) | 0));

  // counts the class elements
  let counts = {};
  classVectorSorted.forEach((x) => (counts[x] = (counts[x] || 0) + 1));

  // pick a few per class
  let indexOfSelected = [];

  Object.keys(counts).forEach((e, i) => {
    let shift = [];
    Object.values(counts).reduce((a, c, item) => (shift[item] = a + c), 0);

    let arr = [...Array(counts[e]).keys()];

    let r = [];
    for (let j = 0; j < Math.floor(counts[e] * fraction); j++) {
      let n = arr[Math.floor(Math.random() * arr.length)];
      r.push(n);
      let ind = arr.indexOf(n);
      arr.splice(ind, 1);
    }

    if (i === 0) {
      indexOfSelected = indexOfSelected.concat(r);
    } else {
      indexOfSelected = indexOfSelected.concat(r.map((x) => x + shift[i - 1]));
    }
  });

  // sort back the index
  let trainIndex = [];
  indexOfSelected.forEach((e) => trainIndex.push(result[e]));

  let testIndex = [];
  let mask = [];
  classVector.forEach((el, idx) => {
    if (trainIndex.includes(idx)) {
      mask.push(true);
    } else {
      mask.push(false);
      testIndex.push(idx);
    }
  });
  return { trainIndex, testIndex, mask };
}

/**
 * Performs a leave-one-out cross-validation (LOO-CV) of the given samples. In LOO-CV, 1 observation is used as the
 * validation set while the rest is used as the training set. This is repeated once for each observation. LOO-CV is a
 * special case of LPO-CV. @see leavePout
 * @param {function} Classifier - The classifier's constructor to use for the cross validation. Expect ml-classifier
 *     api.
 * @param {Array} features - The features for all samples of the data-set
 * @param {Array} labels - The classification class of all samples of the data-set
 * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
 * @return {ConfusionMatrix} - The cross-validation confusion matrix
 */

function leaveOneOut(Classifier, features, labels, classifierOptions) {
  if (typeof labels === 'function') {
    let callback = labels;
    labels = features;
    features = Classifier;
    return leavePOut(features, labels, 1, callback);
  }
  return leavePOut(Classifier, features, labels, classifierOptions, 1);
}

/**
 * Performs a leave-p-out cross-validation (LPO-CV) of the given samples. In LPO-CV, p observations are used as the
 * validation set while the rest is used as the training set. This is repeated as many times as there are possible
 * ways to combine p observations from the set (unordered without replacement). Be aware that for relatively small
 * data-set size this can require a very large number of training and testing to do!
 * @param {function} Classifier - The classifier's constructor to use for the cross validation. Expect ml-classifier
 *     api.
 * @param {Array} features - The features for all samples of the data-set
 * @param {Array} labels - The classification class of all samples of the data-set
 * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
 * @param {number} p - The size of the validation sub-samples' set
 * @return {ConfusionMatrix} - The cross-validation confusion matrix
 */
function leavePOut(Classifier, features, labels, classifierOptions, p) {
  let callback;
  if (typeof classifierOptions === 'function') {
    callback = classifierOptions;
    p = labels;
    labels = features;
    features = Classifier;
  }
  check(features, labels);
  const distinct = getDistinct(labels);
  const confusionMatrix = initMatrix(distinct.length, distinct.length);

  let N = features.length;
  let gen = combinations(p, N);
  let allIdx = new Array(N);
  for (let i = 0; i < N; i++) {
    allIdx[i] = i;
  }
  for (const testIdx of gen) {
    let trainIdx = allIdx.slice();

    for (let i = testIdx.length - 1; i >= 0; i--) {
      trainIdx.splice(testIdx[i], 1);
    }

    if (callback) {
      validateWithCallback(
        features,
        labels,
        testIdx,
        trainIdx,
        confusionMatrix,
        distinct,
        callback,
      );
    } else {
      validate(
        Classifier,
        features,
        labels,
        classifierOptions,
        testIdx,
        trainIdx,
        confusionMatrix,
        distinct,
      );
    }
  }

  return new ConfusionMatrix(confusionMatrix, distinct);
}

/**
 * Performs k-fold cross-validation (KF-CV). KF-CV separates the data-set into k random equally sized partitions, and
 * uses each as a validation set, with all other partitions used in the training set. Observations left over from if k
 * does not divide the number of observations are left out of the cross-validation process.
 * @param {function} Classifier - The classifier's to use for the cross validation. Expect ml-classifier api.
 * @param {Array} features - The features for all samples of the data-set
 * @param {Array} labels - The classification class of all samples of the data-set
 * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
 * @param {number} k - The number of partitions to create
 * @return {ConfusionMatrix} - The cross-validation confusion matrix
 */
function kFold(Classifier, features, labels, classifierOptions, k) {
  let callback;
  if (typeof classifierOptions === 'function') {
    callback = classifierOptions;
    k = labels;
    labels = features;
    features = Classifier;
  }
  check(features, labels);
  const distinct = getDistinct(labels);
  const confusionMatrix = initMatrix(distinct.length, distinct.length);

  let folds = getFolds(features, k);

  for (let i = 0; i < folds.length; i++) {
    let testIdx = folds[i].testIndex;
    let trainIdx = folds[i].trainIndex;

    if (callback) {
      validateWithCallback(
        features,
        labels,
        testIdx,
        trainIdx,
        confusionMatrix,
        distinct,
        callback,
      );
    } else {
      validate(
        Classifier,
        features,
        labels,
        classifierOptions,
        testIdx,
        trainIdx,
        confusionMatrix,
        distinct,
      );
    }
  }

  return new ConfusionMatrix(confusionMatrix, distinct);
}

function check(features, labels) {
  if (features.length !== labels.length) {
    throw new Error('features and labels should have the same length');
  }
}

function initMatrix(rows, columns) {
  return new Array(rows).fill(0).map(() => new Array(columns).fill(0));
}

function getDistinct(arr) {
  let s = new Set();
  for (let i = 0; i < arr.length; i++) {
    s.add(arr[i]);
  }
  return Array.from(s);
}

function validate(
  Classifier,
  features,
  labels,
  classifierOptions,
  testIdx,
  trainIdx,
  confusionMatrix,
  distinct,
) {
  const { testFeatures, trainFeatures, testLabels, trainLabels } = getTrainTest(
    features,
    labels,
    testIdx,
    trainIdx,
  );

  let classifier;
  if (Classifier.prototype.train) {
    classifier = new Classifier(classifierOptions);
    classifier.train(trainFeatures, trainLabels);
  } else {
    classifier = new Classifier(trainFeatures, trainLabels, classifierOptions);
  }

  let predictedLabels = classifier.predict(testFeatures);
  updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct);
}

function validateWithCallback(
  features,
  labels,
  testIdx,
  trainIdx,
  confusionMatrix,
  distinct,
  callback,
) {
  const { testFeatures, trainFeatures, testLabels, trainLabels } = getTrainTest(
    features,
    labels,
    testIdx,
    trainIdx,
  );
  const predictedLabels = callback(trainFeatures, trainLabels, testFeatures);
  updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct);
}

function updateConfusionMatrix(
  confusionMatrix,
  testLabels,
  predictedLabels,
  distinct,
) {
  for (let i = 0; i < predictedLabels.length; i++) {
    const actualIdx = distinct.indexOf(testLabels[i]);
    const predictedIdx = distinct.indexOf(predictedLabels[i]);
    if (actualIdx < 0 || predictedIdx < 0) {
      // eslint-disable-next-line no-console
      console.warn(`ignore unknown predicted label ${predictedLabels[i]}`);
    }
    confusionMatrix[actualIdx][predictedIdx]++;
  }
}

function getTrainTest(features, labels, testIdx, trainIdx) {
  return {
    testFeatures: testIdx.map(function(index) {
      return features[index];
    }),
    trainFeatures: trainIdx.map(function(index) {
      return features[index];
    }),
    testLabels: testIdx.map(function(index) {
      return labels[index];
    }),
    trainLabels: trainIdx.map(function(index) {
      return labels[index];
    }),
  };
}

exports.getFolds = getFolds;
exports.getTrainTest = getTrainTest;
exports.kFold = kFold;
exports.leaveOneOut = leaveOneOut;
exports.leavePOut = leavePOut;
exports.sampleAClass = sampleAClass;
