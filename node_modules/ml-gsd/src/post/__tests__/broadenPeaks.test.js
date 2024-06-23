import { broadenPeaks } from '../broadenPeaks';

describe('broadenPeaks', () => {
  it('should prevent overlap', () => {
    let result = broadenPeaks([
      { x: 5, y: 10, width: 5, left: { x: 2.5 }, right: { x: 7.5 } },
      { x: 10, y: 10, width: 5, left: { x: 7.5 }, right: { x: 12.5 } },
      { x: 30, y: 10, width: 5, left: { x: 27.5 }, right: { x: 32.5 } },
    ]);
    expect(result).toStrictEqual([
      {
        x: 5,
        y: 10,
        width: 7.5,
        left: { x: 2.5 },
        right: { x: 7.5 },
        from: 0,
        to: 7.5,
      },
      {
        x: 10,
        y: 10,
        width: 7.5,
        left: { x: 7.5 },
        right: { x: 12.5 },
        from: 7.5,
        to: 15,
      },
      {
        x: 30,
        y: 10,
        width: 10,
        left: { x: 27.5 },
        right: { x: 32.5 },
        from: 25,
        to: 35,
      },
    ]);
  });

  it('should prevent overlap with factor=1', () => {
    let result = broadenPeaks(
      [
        { x: 5, y: 10, width: 10 },
        { x: 10, y: 10, width: 10 },
        { x: 30, y: 10, width: 10 },
      ],
      { factor: 1 },
    );
    expect(result).toStrictEqual([
      { from: 0, to: 7.5, width: 7.5, x: 5, y: 10 },
      { from: 7.5, to: 15, width: 7.5, x: 10, y: 10 },
      { from: 25, to: 35, width: 10, x: 30, y: 10 },
    ]);
  });

  it('should prevent overlap with factor=3', () => {
    let result = broadenPeaks(
      [
        { x: 5, y: 10, width: 10 },
        { x: 10, y: 10, width: 10 },
        { x: 30, y: 10, width: 10 },
      ],
      { factor: 3 },
    );
    expect(result).toStrictEqual([
      { from: -10, to: 7.5, width: 17.5, x: 5, y: 10 },
      { from: 7.5, to: 20, width: 12.5, x: 10, y: 10 },
      { from: 20, to: 45, width: 25, x: 30, y: 10 },
    ]);
  });

  it('should prevent overlap but small factor', () => {
    let result = broadenPeaks(
      [
        { x: 5, y: 10, width: 5 },
        { x: 10, y: 10, width: 5 },
        { x: 30, y: 10, width: 5 },
      ],
      { factor: 0.5 },
    );
    expect(result).toStrictEqual([
      { from: 3.75, to: 6.25, width: 2.5, x: 5, y: 10 },
      { from: 8.75, to: 11.25, width: 2.5, x: 10, y: 10 },
      { from: 28.75, to: 31.25, width: 2.5, x: 30, y: 10 },
    ]);
  });

  it('should allow overlap', () => {
    let result = broadenPeaks(
      [
        { x: 5, y: 10, width: 5 },
        { x: 10, y: 10, width: 5 },
        { x: 30, y: 10, width: 5 },
      ],
      { overlap: true },
    );
    expect(result).toStrictEqual([
      { from: 0, to: 10, width: 10, x: 5, y: 10 },
      { from: 5, to: 15, width: 10, x: 10, y: 10 },
      { from: 25, to: 35, width: 10, x: 30, y: 10 },
    ]);
  });
});
