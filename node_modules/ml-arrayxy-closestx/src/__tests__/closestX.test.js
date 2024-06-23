import closestX from '..';

describe('closestX', () => {
  it('should yield the correct result with even element array', () => {
    const x = [-1, 0, 1, 2, 3, 4, 5, 6];
    const y = [10, 11, 12, 13, 14, 15, 16, 17];
    expect(closestX({ x, y }, { target: -2 })).toStrictEqual({ x: -1, y: 10 });
    expect(closestX({ x, y }, { target: 0.6 })).toStrictEqual({ x: 1, y: 12 });
    expect(closestX({ x, y }, { target: 4.3 })).toStrictEqual({ x: 4, y: 15 });
    expect(closestX({ x, y }, { target: 6 })).toStrictEqual({ x: 6, y: 17 });
    expect(closestX({ x, y }, { target: 7 })).toStrictEqual({ x: 6, y: 17 });
  });

  it('should yield the correct result with odd element array', () => {
    const x = [-1, 0, 1, 2, 3, 4, 5, 6, 7];
    const y = [10, 11, 12, 13, 14, 15, 16, 17, 18];
    expect(closestX({ x, y }, { target: -2 })).toStrictEqual({ x: -1, y: 10 });
    expect(closestX({ x, y }, { target: 0.6 })).toStrictEqual({ x: 1, y: 12 });
    expect(closestX({ x, y }, { target: 4.3 })).toStrictEqual({ x: 4, y: 15 });
    expect(closestX({ x, y }, { target: 6 })).toStrictEqual({ x: 6, y: 17 });
    expect(closestX({ x, y }, { target: 7 })).toStrictEqual({ x: 7, y: 18 });
    expect(closestX({ x, y }, { target: 8 })).toStrictEqual({ x: 7, y: 18 });
  });

  it('should yield the correct result with odd element array and descending order', () => {
    let x = [7, 6, 5, 4, 3, 2, 1, 0, -1];
    let y = [18, 17, 16, 15, 14, 13, 12, 11, 10];
    expect(closestX({ x, y }, { target: -2, reverse: true })).toStrictEqual({
      x: -1,
      y: 10,
    });
    expect(closestX({ x, y }, { target: 0.6, reverse: true })).toStrictEqual({
      x: 1,
      y: 12,
    });
    expect(closestX({ x, y }, { target: 4.3, reverse: true })).toStrictEqual({
      x: 4,
      y: 15,
    });
    expect(closestX({ x, y }, { target: 6, reverse: true })).toStrictEqual({
      x: 6,
      y: 17,
    });
    expect(closestX({ x, y }, { target: 7, reverse: true })).toStrictEqual({
      x: 7,
      y: 18,
    });
    expect(closestX({ x, y }, { target: 8, reverse: true })).toStrictEqual({
      x: 7,
      y: 18,
    });
  });
});
