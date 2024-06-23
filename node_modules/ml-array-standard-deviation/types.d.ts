declare namespace arrayStandardDeviation {
  export interface ArrayStandardDeviationOptions {
    /**
     * If true, divide by (n-1). If false, divide by n.
     * @default true
     */
    unbiased?: boolean;
    /**
     * Precalculated mean.
     */
    mean?: number;
  }
}

/**
 * Computes the standard deviation of the given values.
 */
declare function arrayStandardDeviation(
  array: ArrayLike<number>,
  options?: arrayStandardDeviation.ArrayStandardDeviationOptions,
): number;

export = arrayStandardDeviation;
