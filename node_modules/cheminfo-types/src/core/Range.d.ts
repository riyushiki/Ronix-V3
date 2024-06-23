/**
 *  Quantity that is defined as range, e.g., melting point
 */
export interface Range {
  /** The lower value of some  characteristic or property.*/
  min: number;
  /** The upper value of some characteristic or property.*/
  max: number;
  /** */
  precision?: number;
  /**A string or text indicating the unit of measurement. Useful if you cannot provide a standard unit code for unitCode. */
  units?: string;
}
