import { toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { generateSpectrum } from 'spectrum-generator';

import { optimizePeaks } from '../optimizePeaks';

expect.extend({ toMatchCloseTo });

describe('optimizePeaks', () => {
  it('Should throw because execution time is over timeout', () => {
    const peaks = [{ x: 0, y: 1, width: 0.12 }];

    const data = generateSpectrum(peaks, {
      generator: {
        from: -0.5,
        to: 0.5,
        nbPoints: 101,
        shape: {
          kind: 'gaussian',
        },
      },
    });

    let result = optimizePeaks(data, [{ x: 0.01, y: 0.9, width: 0.11 }]);
    expect(result).toMatchCloseTo([
      {
        x: -3.419674049814014e-8,
        y: 0.999994064595118,
        width: 0.12000070163648587,
        group: 0,
      },
    ]);

    const options = {
      optimization: {
        kind: 'lm',
        options: {
          timeout: 0,
        },
      },
    };
    expect(() =>
      optimizePeaks(data, [{ x: 0.1, y: 0.9, width: 0.11 }], options),
    ).toThrow('The execution time is over to 0 seconds');
  });
});
