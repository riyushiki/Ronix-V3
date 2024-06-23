/**
 * The options object for random.choice
 */
export interface IChoiceOptions {
    /**
     * number of element to choose
     */
    size?: number;
    /**
     * Weather to replace the chosen element in the pool after each draw
     */
    replace?: boolean;
    /**
     * The probabilities associated with each element. Probabilities should sum to 1 and be the same length as the values. If not specified a uniform distribution is assumed.
     */
    probabilities?: number[];
}
