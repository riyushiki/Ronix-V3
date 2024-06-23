import mergeByCentroids from '..';

const originalPoints = {
  x: [0.01, 1.008, 1.01, 1.012, 1.02, 1.04],
  y: [1, 1, 1, 1, 1, 1],
};

describe('mergeByCentroids', () => {
  it('base case', () => {
    expect(mergeByCentroids(originalPoints, [1.01, 1.04])).toStrictEqual({
      x: [1.01, 1.04],
      y: [3, 1],
    });
  });

  it('specify options', () => {
    expect(
      mergeByCentroids(originalPoints, [1, 1.03], { window: 0.013 }),
    ).toStrictEqual({
      x: [1, 1.03],
      y: [3, 2],
    });
  });
});
