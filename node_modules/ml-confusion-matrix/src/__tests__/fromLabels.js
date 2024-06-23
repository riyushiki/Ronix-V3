import ConfusionMatrix from '..';

describe('fromLabels', () => {
  it('identity', () => {
    const CM = ConfusionMatrix.fromLabels(['A', 'B', 'C'], ['A', 'B', 'C']);
    expect(CM.getLabels()).toStrictEqual(['A', 'B', 'C']);
    expect(CM.getMatrix()).toStrictEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  it('actual classes are in rows, predicted in columns', () => {
    const CM = ConfusionMatrix.fromLabels(['A', 'B'], ['B', 'C']);
    expect(CM.getLabels()).toStrictEqual(['A', 'B', 'C']);
    expect(CM.getMatrix()).toStrictEqual([
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0],
    ]);
  });

  it('when classes are given, ignore other classes', () => {
    const CM = ConfusionMatrix.fromLabels(['A', 'B', 'B'], ['A', 'A', 'C'], {
      labels: ['A', 'B', 'D'],
    });
    expect(CM.getLabels()).toStrictEqual(['A', 'B', 'D']);
    expect(CM.getMatrix()).toStrictEqual([
      [1, 0, 0],
      [1, 0, 0],
      [0, 0, 0],
    ]);
  });

  it('should sort labels alphabetically', () => {
    const CM = ConfusionMatrix.fromLabels([1, 3, 2], [1, 1, 1], {
      sort: (a, b) => {
        return a - b;
      },
    });
    expect(CM.getLabels()).toStrictEqual([1, 2, 3]);
    expect(CM.getMatrix()).toStrictEqual([
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
    ]);
  });

  it('should throw if actual and predicted are not of same length', () => {
    expect(() => {
      ConfusionMatrix.fromLabels([1, 2], [1, 2, 3]);
    }).toThrow(/must have the same length/);
  });
});
