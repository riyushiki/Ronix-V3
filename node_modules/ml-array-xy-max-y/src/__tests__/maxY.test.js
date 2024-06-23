import maxY from '..';

describe('maxY', () => {
  it('default values', () => {
    const points = {
      x: [1, 2, 3],
      y: [4, 8, 6],
    };
    expect(maxY(points)).toStrictEqual({
      index: 1,
      value: 8,
    });
  });

  it('given two indexes', () => {
    const points = {
      x: [1, 2, 3, 4, 5, 6],
      y: [10, 2, 8, 4, 5, 20],
    };
    const options = {
      from: { index: 1 },
      to: { index: 4 },
    };
    expect(maxY(points, options)).toStrictEqual({
      index: 2,
      value: 8,
    });
  });

  it('given one index and one value', () => {
    const points = {
      x: [1, 2, 3, 4, 5, 6],
      y: [10, 2, 8, 4, 5, 20],
    };
    const options = {
      from: { index: 1 },
      to: { value: 5 },
    };
    expect(maxY(points, options)).toStrictEqual({
      index: 2,
      value: 8,
    });
  });

  it('given two values', () => {
    const points = {
      x: [1, 2, 3, 4, 5, 6],
      y: [10, 2, 8, 4, 5, 20],
    };
    const options = {
      from: { value: 2 },
      to: { value: 5 },
    };
    expect(maxY(points, options)).toStrictEqual({
      index: 2,
      value: 8,
    });
  });

  it('reverse array', () => {
    const points = {
      x: [6, 5, 4, 3, 2, 1],
      y: [10, 2, 8, 4, 5, 20],
    };
    const options = {
      from: { value: 5 },
      to: { value: 2 },
      reverse: true,
    };
    expect(maxY(points, options)).toStrictEqual({
      index: 2,
      value: 8,
    });
  });
});
