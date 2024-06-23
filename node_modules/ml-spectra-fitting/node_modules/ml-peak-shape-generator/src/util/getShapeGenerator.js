import { Gaussian } from '../classes/Gaussian';
import { Gaussian2D } from '../classes/Gaussian2D';
import { Lorentzian } from '../classes/Lorentzian';
import { PseudoVoigt } from '../classes/PseudoVoigt';

export function getShapeGenerator(options) {
  let { kind = 'Gaussian', options: shapeOptions } = options;
  switch (kind.toLowerCase().replace(/[^a-z^0-9]/g, '')) {
    case 'gaussian':
      return new Gaussian(shapeOptions);
    case 'lorentzian':
      return new Lorentzian(shapeOptions);
    case 'pseudovoigt':
      return new PseudoVoigt(shapeOptions);
    case 'gaussian2d':
      return new Gaussian2D(shapeOptions);
    default:
      throw new Error(`Unknown kind: ${kind}`);
  }
}
