import { gsd } from '..';

test('Simple test cases', () => {
  let x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  let y = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
  let peaks = gsd(
    { x, y },
    {
      noiseLevel: 0,
      minMaxRatio: 0.00025, // Threshold to determine if a given peak should be considered as a noise
      realTopDetection: true,
      maxCriteria: true, // inverted:false
      smoothY: false,
      sgOptions: { windowSize: 7, polynomial: 3 },
    },
  );
  expect(peaks[0].x).toBe(8);
});
