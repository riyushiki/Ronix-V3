/** Value with units as https://schema.org/Value */
export interface Value {
  /** The value of the quantitative value or property value node.
   * @TJS-examples [0, 1000, 1345.24456, -10, -100]
   */
  value: number;
  /** */
  precision?: number;
  /**A string or text indicating the unit of measurement. The unit could be validated in the input form based on the UN/CEFACT Common Code list */
  units?: string;
}
