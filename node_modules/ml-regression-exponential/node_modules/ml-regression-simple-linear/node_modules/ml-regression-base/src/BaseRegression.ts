import { type NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

import { checkArrayLength } from './checkArrayLength';

export interface RegressionScore {
  r: number;
  r2: number;
  chi2: number;
  rmsd: number;
}
export class BaseRegression {
  constructor() {
    if (new.target === BaseRegression) {
      throw new Error('BaseRegression must be subclassed');
    }
  }

  predict(x: number): number;
  predict(x: NumberArray): number[];
  predict(x: number | NumberArray) {
    if (typeof x === 'number') {
      return this._predict(x);
    } else if (isAnyArray(x)) {
      const y = [];
      for (const xVal of x) {
        y.push(this._predict(xVal));
      }
      return y;
    } else {
      throw new TypeError('x must be a number or array');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _predict(x: number): number {
    throw new Error('_predict must be implemented');
  }

  train() {
    // Do nothing for this package
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toString(precision?: number) {
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toLaTeX(precision?: number) {
    return '';
  }

  /**
   * Return the correlation coefficient of determination (r) and chi-square.
   * @param x - explanatory variable
   * @param y - response variable
   * @return - Object with further statistics.
   */
  score(x: NumberArray, y: NumberArray): RegressionScore {
    checkArrayLength(x, y);

    const n = x.length;
    const y2: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
      y2[i] = this._predict(x[i]);
    }

    let xSum = 0;
    let ySum = 0;
    let chi2 = 0;
    let rmsd = 0;
    let xSquared = 0;
    let ySquared = 0;
    let xY = 0;
    for (let i = 0; i < n; i++) {
      xSum += y2[i];
      ySum += y[i];
      xSquared += y2[i] * y2[i];
      ySquared += y[i] * y[i];
      xY += y2[i] * y[i];
      if (y[i] !== 0) {
        chi2 += ((y[i] - y2[i]) * (y[i] - y2[i])) / y[i];
      }
      rmsd += (y[i] - y2[i]) * (y[i] - y2[i]);
    }

    const r =
      (n * xY - xSum * ySum) /
      Math.sqrt((n * xSquared - xSum * xSum) * (n * ySquared - ySum * ySum));

    return {
      r,
      r2: r * r,
      chi2,
      rmsd: Math.sqrt(rmsd / n),
    };
  }
}
