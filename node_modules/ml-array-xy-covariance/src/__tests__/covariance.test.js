import covariance from '..';

// compare result with wolfram alpha
// covariance([1, 2, 3, 4, 5, 6],[1, 4, 2, 5, 3, 6])

describe('covariance', () => {
  it('should yield the correct result', () => {
    const x = [1, 2, 3, 4, 5, 6];
    const y = [1, 4, 2, 5, 3, 6];
    expect(covariance({ x, y })).toBe(2.5);
  });
});
