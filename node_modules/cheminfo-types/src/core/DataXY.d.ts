import { DoubleArray } from './DoubleArray';

export interface DataXY<DataType extends DoubleArray = DoubleArray> {
  /**
   * Array of numbers on x axis
   */
  x: DataType;
  /**
   * Array of numbers on y axis
   */
  y: DataType;
}
