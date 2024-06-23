declare namespace mlArrayNormed {
  export interface ArrayNormedOptions<T extends ArrayLike<number>> {
    /**
     * @default 'absolute'
     */
    algorithm?: 'absolute' | 'max' | 'sum';
    /**
     * New max value for algo 'max'.
     * @default 1
     */
    maxValue?: number;
    /**
     * New max value for algo 'absolute' and 'sum'.
     * @default 1
     */
    sumValue?: number;
    /**
     * Specify the output array. Can be the input array for in place modification.
     */
    output?: T;
  }
}

/**
 * Normalize the values of the given array.
 */
declare function mlArrayNormed<T extends ArrayLike<number>>(
  array: T,
  options?: mlArrayNormed.ArrayNormedOptions<T>,
): number[];

export = mlArrayNormed;
