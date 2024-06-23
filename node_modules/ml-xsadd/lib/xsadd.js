"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LOOP = 8;
const FLOAT_MUL = 1 / 16777216;
const sh1 = 15;
const sh2 = 18;
const sh3 = 11;
function multiply_uint32(n, m) {
    n >>>= 0;
    m >>>= 0;
    const nlo = n & 0xffff;
    const nhi = n - nlo;
    return (((nhi * m) >>> 0) + nlo * m) >>> 0;
}
class XSadd {
    constructor(seed = Date.now()) {
        this.state = new Uint32Array(4);
        this.init(seed);
        this.random = this.getFloat.bind(this);
    }
    /**
     * Returns a 32-bit integer r (0 <= r < 2^32)
     */
    getUint32() {
        this.nextState();
        return (this.state[3] + this.state[2]) >>> 0;
    }
    /**
     * Returns a floating point number r (0.0 <= r < 1.0)
     */
    getFloat() {
        return (this.getUint32() >>> 8) * FLOAT_MUL;
    }
    init(seed) {
        if (!Number.isInteger(seed)) {
            throw new TypeError('seed must be an integer');
        }
        this.state[0] = seed;
        this.state[1] = 0;
        this.state[2] = 0;
        this.state[3] = 0;
        for (let i = 1; i < LOOP; i++) {
            this.state[i & 3] ^=
                (i +
                    multiply_uint32(1812433253, this.state[(i - 1) & 3] ^ ((this.state[(i - 1) & 3] >>> 30) >>> 0))) >>>
                    0;
        }
        this.periodCertification();
        for (let i = 0; i < LOOP; i++) {
            this.nextState();
        }
    }
    periodCertification() {
        if (this.state[0] === 0 &&
            this.state[1] === 0 &&
            this.state[2] === 0 &&
            this.state[3] === 0) {
            this.state[0] = 88; // X
            this.state[1] = 83; // S
            this.state[2] = 65; // A
            this.state[3] = 68; // D
        }
    }
    nextState() {
        let t = this.state[0];
        t ^= t << sh1;
        t ^= t >>> sh2;
        t ^= this.state[3] << sh3;
        this.state[0] = this.state[1];
        this.state[1] = this.state[2];
        this.state[2] = this.state[3];
        this.state[3] = t;
    }
}
exports.default = XSadd;
