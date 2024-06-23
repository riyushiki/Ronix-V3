import ConfusionMatrix from '..';

// Tests are based on wikipedia page
// https://en.wikipedia.org/wiki/Confusion_matrix
const matrix = [
  [5, 3, 0],
  [2, 3, 1],
  [0, 2, 11],
];
const labels = ['cat', 'dog', 'rabbit'];
const CM = new ConfusionMatrix(matrix, labels);

describe('Test metrics on the wikipedia example', () => {
  it('positive count', () => {
    expect(CM.getTrueCount()).toStrictEqual(5 + 3 + 11);
  });

  it('negative count', () => {
    expect(CM.getFalseCount()).toStrictEqual(3 + 2 + 1 + 2);
  });

  it('positive count simple', () => {
    expect(CM.getPositiveCount('cat')).toStrictEqual(5 + 3);
  });

  it('negative count complex', () => {
    expect(CM.getNegativeCount('cat')).toStrictEqual(2 + 3 + 1 + 2 + 11);
  });

  it('true positive count', () => {
    expect(CM.getTruePositiveCount('cat')).toStrictEqual(5);
  });

  it('true negative count', () => {
    expect(CM.getTrueNegativeCount('cat')).toStrictEqual(17);
  });

  it('false positive count', () => {
    expect(CM.getFalsePositiveCount('cat')).toStrictEqual(2);
  });

  it('false negative count', () => {
    expect(CM.getFalseNegativeCount('cat')).toStrictEqual(3);
  });

  it('confusion table', () => {
    expect(CM.getConfusionTable('cat')).toStrictEqual([
      [5, 3],
      [2, 17],
    ]);
  });
});
