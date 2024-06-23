import { Gaussian2D } from '../shapes/2d/gaussian2D/Gaussian2D';

/**
 * kind of shape
 */
export type Shape2DKind = 'gaussian';

/**
 * Generate a instance of a specific kind of shape.
 */
export function getShape2D(kind: Shape2DKind, shapeOptions = {}) {
  switch (kind) {
    case 'gaussian':
      return new Gaussian2D(shapeOptions);
    default: {
      const unHandled: never = kind;
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw Error(`Unknown distribution ${unHandled}`);
    }
  }
}
