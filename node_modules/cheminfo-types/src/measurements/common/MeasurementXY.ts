import { DoubleArray } from '../../core/DoubleArray';

import { MeasurementXYVariables } from './MeasurementXYVariables';

export interface MeasurementXY<DataType extends DoubleArray = DoubleArray> {
  variables: MeasurementXYVariables<DataType>;
  description?: string;
  settings?: Record<string, any>;
  meta?: Record<string, any>;
  derived?: Record<string, any>;
}
