export default class XSadd {
    random: () => number;
    private state;
    constructor(seed?: number);
    /**
     * Returns a 32-bit integer r (0 <= r < 2^32)
     */
    getUint32(): number;
    /**
     * Returns a floating point number r (0.0 <= r < 1.0)
     */
    getFloat(): number;
    init(seed: number): void;
    private periodCertification;
    private nextState;
}
