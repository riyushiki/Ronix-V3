// tslint:disable-next-line
import XSAdd from 'ml-xsadd';
import choice from './choice';
/**
 * @classdesc Random class
 */
export default class Random {
    /**
     * @param [seedOrRandom=Math.random] - Control the random number generator used by the Random class instance. Pass a random number generator function with a uniform distribution over the half-open interval [0, 1[. If seed will pass it to ml-xsadd to create a seeded random number generator. If undefined will use Math.random.
     */
    constructor(seedOrRandom = Math.random) {
        if (typeof seedOrRandom === 'number') {
            const xsadd = new XSAdd(seedOrRandom);
            this.randomGenerator = xsadd.random;
        }
        else {
            this.randomGenerator = seedOrRandom;
        }
    }
    choice(values, options) {
        if (typeof values === 'number') {
            return choice(values, options, this.randomGenerator);
        }
        return choice(values, options, this.randomGenerator);
    }
    /**
     * Draw a random number from a uniform distribution on [0,1)
     * @return The random number
     */
    random() {
        return this.randomGenerator();
    }
    /**
     * Draw a random integer from a uniform distribution on [low, high). If only low is specified, the number is drawn on [0, low)
     * @param low - The lower bound of the uniform distribution interval.
     * @param high - The higher bound of the uniform distribution interval.
     */
    randInt(low, high) {
        if (high === undefined) {
            high = low;
            low = 0;
        }
        return low + Math.floor(this.randomGenerator() * (high - low));
    }
    /**
     * Draw several random number from a uniform distribution on [0, 1)
     * @param size - The number of number to draw
     * @return - The list of drawn numbers.
     */
    randomSample(size) {
        const result = [];
        for (let i = 0; i < size; i++) {
            result.push(this.random());
        }
        return result;
    }
}
