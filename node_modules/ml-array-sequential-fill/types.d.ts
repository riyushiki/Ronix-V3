declare namespace arraySequentialFill {
  export interface ArraySequentialFillOptions {
    /**
     * First value in the array.
     * @default 0
     */
    from?: number;
    /**
     * Last value in the array.
     * @default 10
     */
    to?: number;
    /**
     * Size of the array. If not provided, calculated from step.
     */
    size?: number;
    /**
     * If not provided, calculated from size.
     */
    step?: number;
  }
}

/**
 * Fill an array with sequential numbers.
 */
declare function arraySequentialFill(
  options?: arraySequentialFill.ArraySequentialFillOptions,
): number[];
declare function arraySequentialFill<T extends ArrayLike<number>>(
  array: T,
  options?: arraySequentialFill.ArraySequentialFillOptions,
): T;

export = arraySequentialFill;
