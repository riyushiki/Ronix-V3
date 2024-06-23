import { IChoiceOptions } from './Options';
import IRandomGenerator from './RandomGenerator';
/**
 * @classdesc Random class
 */
export default class Random {
    private randomGenerator;
    /**
     * @param [seedOrRandom=Math.random] - Control the random number generator used by the Random class instance. Pass a random number generator function with a uniform distribution over the half-open interval [0, 1[. If seed will pass it to ml-xsadd to create a seeded random number generator. If undefined will use Math.random.
     */
    constructor(seedOrRandom?: IRandomGenerator | number);
    /**
     * Returns an array of elements choosen from a list
     * @param values  - The values to choose from. If a number, the list will be a range of integer from 0 to that number.
     * @param options - option object
     * @return The choosen values
     */
    choice<T>(values: T[], options?: IChoiceOptions): T[];
    choice(values: number, options?: IChoiceOptions): number[];
    /**
     * Draw a random number from a uniform distribution on [0,1)
     * @return The random number
     */
    random(): number;
    /**
     * Draw a random integer from a uniform distribution on [low, high). If only low is specified, the number is drawn on [0, low)
     * @param low - The lower bound of the uniform distribution interval.
     * @param high - The higher bound of the uniform distribution interval.
     */
    randInt(low: number, high?: number): number;
    /**
     * Draw several random number from a uniform distribution on [0, 1)
     * @param size - The number of number to draw
     * @return - The list of drawn numbers.
     */
    randomSample(size: number): number[];
}
