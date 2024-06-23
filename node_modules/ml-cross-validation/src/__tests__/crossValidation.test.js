import { Dummy } from './DummyClassifier';
import { LOO_CV } from './data/LOO_CV';
import { LPO_CV } from './data/LPO_CV';
import { KF_CV } from './data/KF_CV';

import * as CV from '..';

describe('basic', () => {
  it('basic leave-one-out cross-validation', () => {
    for (let i = 0; i < LOO_CV.length; i++) {
      let CM = CV.leaveOneOut(
        Dummy,
        LOO_CV[i].features,
        LOO_CV[i].labels,
        LOO_CV[i].classifierOptions,
      );
      expect(CM.getMatrix()).toStrictEqual(LOO_CV[i].result.matrix);
      expect(CM.getLabels()).toStrictEqual(LOO_CV[i].result.labels);
    }
  });

  it('basic leave-p-out cross-validation', function() {
    for (let i = 0; i < LPO_CV.length; i++) {
      let CM = CV.leavePOut(
        Dummy,
        LPO_CV[i].features,
        LPO_CV[i].labels,
        LPO_CV[i].classifierOptions,
        LPO_CV[i].p,
      );
      expect(CM.getMatrix()).toStrictEqual(LPO_CV[i].result.matrix);
      expect(CM.getLabels()).toStrictEqual(LPO_CV[i].result.labels);
    }
  });

  it('basic k-fold cross-validation', function() {
    for (let i = 0; i < KF_CV.length; i++) {
      let CM = CV.kFold(
        Dummy,
        KF_CV[i].features,
        KF_CV[i].labels,
        KF_CV[i].classifierOptions,
        KF_CV[i].k,
      );
      expect(CM.getMatrix()).toStrictEqual(KF_CV[i].result.matrix);
      expect(CM.getLabels()).toStrictEqual(KF_CV[i].result.labels);
    }
  });
});

describe('with a callback', function() {
  it('basic leave-on-out cross-validation with callback', function() {
    for (let i = 0; i < LOO_CV.length; i++) {
      let CM = CV.leaveOneOut(LOO_CV[i].features, LOO_CV[i].labels, function(
        trainFeatures,
        trainLabels,
        testFeatures,
      ) {
        const classifier = new Dummy(LOO_CV[i].classifierOptions);
        classifier.train(trainFeatures, trainLabels);
        return classifier.predict(testFeatures);
      });
      expect(CM.getMatrix()).toStrictEqual(LOO_CV[i].result.matrix);
      expect(CM.getLabels()).toStrictEqual(LOO_CV[i].result.labels);
    }
  });

  it('basic leave-p-out cross-validation with callback', function() {
    for (let i = 0; i < LPO_CV.length; i++) {
      let CM = CV.leavePOut(
        LPO_CV[i].features,
        LPO_CV[i].labels,
        LPO_CV[i].p,
        function(trainFeatures, trainLabels, testFeatures) {
          const classifier = new Dummy(LPO_CV[i].classifierOptions);
          classifier.train(trainFeatures, trainLabels);
          return classifier.predict(testFeatures);
        },
      );
      expect(CM.getMatrix()).toStrictEqual(LPO_CV[i].result.matrix);
      expect(CM.getLabels()).toStrictEqual(LPO_CV[i].result.labels);
    }
  });

  it('basic k-fold cross-validation with callback', function() {
    for (let i = 0; i < KF_CV.length; i++) {
      let CM = CV.kFold(
        KF_CV[i].features,
        KF_CV[i].labels,
        KF_CV[i].k,
        function(trainFeatures, trainLabels, testFeatures) {
          const classifier = new Dummy(KF_CV[i].classifierOptions);
          classifier.train(trainFeatures, trainLabels);
          return classifier.predict(testFeatures);
        },
      );
      expect(CM.getMatrix()).toStrictEqual(KF_CV[i].result.matrix);
      expect(CM.getLabels()).toStrictEqual(KF_CV[i].result.labels);
    }
  });
});
