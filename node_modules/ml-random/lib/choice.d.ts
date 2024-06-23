import { IChoiceOptions } from './Options';
import IRandomGenerator from './RandomGenerator';
declare function randomChoice<T>(values: T[], options?: IChoiceOptions, random?: IRandomGenerator): T[];
declare function randomChoice<T>(values: number, options?: IChoiceOptions, random?: IRandomGenerator): number[];
export default randomChoice;
