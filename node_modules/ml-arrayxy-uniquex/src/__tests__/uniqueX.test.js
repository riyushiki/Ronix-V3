import uniqueX from '..';

describe('uniqueX', function () {
  it('should yield the right array 1', function () {
    let x = [0, 0, 1, 2, 3, 3];
    let y = [1, 2, 3, 4, 5, 6];
    uniqueX({ x, y });

    expect(x).toStrictEqual([0, 1, 2, 3]);
    expect(y).toStrictEqual([3, 3, 4, 11]);
  });

  it('should yield the right array 2', function () {
    let x = [0, 1, 2, 3];
    let y = [1, 2, 3, 4];
    uniqueX({ x, y });

    expect(x).toStrictEqual([0, 1, 2, 3]);
    expect(y).toStrictEqual([1, 2, 3, 4]);
  });

  it('should yield the right array 3', function () {
    let x = [0, 0, 0, 0];
    let y = [1, 2, 3, 4];
    uniqueX({ x, y });

    expect(x).toStrictEqual([0]);
    expect(y).toStrictEqual([10]);
  });
});
