import sequentialFill from '..';

describe('array-sequential fill', () => {
  it('default value', () => {
    expect(sequentialFill()).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(sequentialFill([])).toStrictEqual([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
    ]);
  });
  it('check options', () => {
    expect(sequentialFill([], { from: 0, to: 10, step: 2 })).toStrictEqual([
      0,
      2,
      4,
      6,
      8,
      10,
    ]);
    expect(sequentialFill([], { from: 0, to: 10, size: 6 })).toStrictEqual([
      0,
      2,
      4,
      6,
      8,
      10,
    ]);
    expect(
      sequentialFill([1, 2, 3, 4, 5, 6], { from: 0, to: 10 }),
    ).toStrictEqual([0, 2, 4, 6, 8, 10]);
    expect(sequentialFill([], { from: 0, to: 10, step: 2 })).toStrictEqual([
      0,
      2,
      4,
      6,
      8,
      10,
    ]);
    expect(
      sequentialFill(undefined, { from: 0, to: 10, step: 2 }),
    ).toStrictEqual([0, 2, 4, 6, 8, 10]);
    expect(sequentialFill({ from: 0, to: 10, step: 2 })).toStrictEqual([
      0,
      2,
      4,
      6,
      8,
      10,
    ]);
    expect(sequentialFill([], { from: -1, to: 1, size: 5 })).toStrictEqual([
      -1,
      -0.5,
      0,
      0.5,
      1,
    ]);
    expect(sequentialFill([], { from: 0, to: 0, size: 5 })).toStrictEqual([
      0,
      0,
      0,
      0,
      0,
    ]);
    expect(sequentialFill([], { from: 1, to: -1, size: 5 })).toStrictEqual([
      1,
      0.5,
      0,
      -0.5,
      -1,
    ]);
    expect(
      Array.from(sequentialFill(new Uint16Array(4), { from: 0, to: 3 })),
    ).toStrictEqual([0, 1, 2, 3]);
  });
});
