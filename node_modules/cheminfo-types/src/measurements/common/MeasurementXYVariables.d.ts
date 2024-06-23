import { DoubleArray } from '../../core/DoubleArray';

import { MeasurementVariable } from './MeasurementVariable';

export interface MeasurementXYVariables<
  DataType extends DoubleArray = DoubleArray,
> {
  a?: MeasurementVariable<DataType>;
  b?: MeasurementVariable<DataType>;
  c?: MeasurementVariable<DataType>;
  d?: MeasurementVariable<DataType>;
  e?: MeasurementVariable<DataType>;
  f?: MeasurementVariable<DataType>;
  g?: MeasurementVariable<DataType>;
  h?: MeasurementVariable<DataType>;
  i?: MeasurementVariable<DataType>;
  j?: MeasurementVariable<DataType>;
  k?: MeasurementVariable<DataType>;
  l?: MeasurementVariable<DataType>;
  m?: MeasurementVariable<DataType>;
  n?: MeasurementVariable<DataType>;
  o?: MeasurementVariable<DataType>;
  p?: MeasurementVariable<DataType>;
  q?: MeasurementVariable<DataType>;
  r?: MeasurementVariable<DataType>;
  s?: MeasurementVariable<DataType>;
  t?: MeasurementVariable<DataType>;
  u?: MeasurementVariable<DataType>;
  v?: MeasurementVariable<DataType>;
  w?: MeasurementVariable<DataType>;
  x: MeasurementVariable<DataType>;
  y: MeasurementVariable<DataType>;
  z?: MeasurementVariable<DataType>;
}
