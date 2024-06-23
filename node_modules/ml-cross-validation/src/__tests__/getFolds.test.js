import { getClasses } from 'ml-dataset-iris';

import { getFolds } from '../getFolds.js';

const metadata = getClasses();

describe('utils', () => {
  it('test getFolds with defaults k', () => {
    let folds = getFolds(metadata);
    expect(folds).toHaveLength(5);
    expect(folds[0].testIndex).toHaveLength(30);
    expect(folds[0].trainIndex).toHaveLength(120);
  });

  it('test getFolds', () => {
    let folds = getFolds(metadata, 3);
    expect(folds).toHaveLength(3);
    expect(folds[0].testIndex).toHaveLength(50);
    expect(folds[0].trainIndex).toHaveLength(100);
  });

  it('test getFolds with N not a manifold of k', () => {
    let folds = getFolds(metadata, 7);
    expect(folds).toHaveLength(7);
    expect(folds[0].testIndex).toHaveLength(21);
    expect(folds[0].trainIndex).toHaveLength(129);
    expect(folds[6].testIndex).toHaveLength(24);
  });
});
