import { Gaussian } from '../shapes/1d/gaussian/Gaussian';
import { Lorentzian } from '../shapes/1d/lorentzian/Lorentzian';
import { PseudoVoigt } from '../shapes/1d/pseudoVoigt/PseudoVoigt';

/**
 * kind of shape
 */
export type ShapeKind = 'gaussian' | 'lorentzian' | 'pseudoVoigt';

/**
 * Generate a instance of a specific kind of shape.
 */
export function getShape1D(kind: ShapeKind, shapeOptions = {}) {
  switch (kind) {
    case 'gaussian':
      return new Gaussian(shapeOptions);
    case 'lorentzian':
      return new Lorentzian(shapeOptions);
    case 'pseudoVoigt':
      return new PseudoVoigt(shapeOptions);
    default: {
      const unHandled: never = kind;
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw Error(`Unknown distribution ${unHandled}`);
    }
  }
}
