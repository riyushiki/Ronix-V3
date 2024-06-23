import sortX from '..';

const x = [-1, 0, 1, 2, 3, 4, 5, 6];
const y = [10, 11, 12, 13, 14, 15, 16, 17];

describe('sortX', () => {
  it('already sorted array', () => {
    expect(sortX({ x, y })).toStrictEqual({ x, y });
  });

  it('inverse sorted array', () => {
    const xUnsorted = [6, 5, 4, 3, 2, 1, 0, -1];
    const yUnsorted = [17, 16, 15, 14, 13, 12, 11, 10];
    expect(sortX({ x: xUnsorted, y: yUnsorted })).toStrictEqual({ x, y });
  });

  it('unsorted array', () => {
    const xUnsorted = [6, 5, 4, 3, -1, 0, 1, 2];
    const yUnsorted = [17, 16, 15, 14, 10, 11, 12, 13];
    expect(sortX({ x: xUnsorted, y: yUnsorted })).toStrictEqual({ x, y });
  });
});
