'use strict';

// Accuracy
exports.acc = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = (pred.tn[i] + pred.tp[i]) / (l - 1);
    }
    return result;
};

// Error rate
exports.err = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = (pred.fn[i] + pred.fp[i] / (l - 1));
    }
    return result;
};

// False positive rate
exports.fpr = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = pred.fp[i] / pred.nNeg;
    }
    return result;
};

// True positive rate
exports.tpr = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = pred.tp[i] / pred.nPos;
    }
    return result;
};

// False negative rate
exports.fnr = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = pred.fn[i] / pred.nPos;
    }
    return result;
};

// True negative rate
exports.tnr = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = pred.tn[i] / pred.nNeg;
    }
    return result;
};

// Positive predictive value
exports.ppv = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = (pred.fp[i] + pred.tp[i] !== 0) ? (pred.tp[i] / (pred.fp[i] + pred.tp[i])) : 0;
    }
    return result;
};

// Negative predictive value
exports.npv = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = (pred.fn[i] + pred.tn[i] !== 0) ? (pred.tn[i] / (pred.fn[i] + pred.tn[i])) : 0;
    }
    return result;
};

// Prediction conditioned fallout
exports.pcfall = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = (pred.fp[i] + pred.tp[i] !== 0) ? 1 - (pred.tp[i] / (pred.fp[i] + pred.tp[i])) : 1;
    }
    return result;
};

// Prediction conditioned miss
exports.pcmiss = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = (pred.fn[i] + pred.tn[i] !== 0) ? 1 - (pred.tn[i] / (pred.fn[i] + pred.tn[i])) : 1;
    }
    return result;
};

// Lift value
exports.lift = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = (pred.nPosPred[i] !== 0) ? ((pred.tp[i] / pred.nPos) / (pred.nPosPred[i] / pred.nSamples)) : 0;
    }
    return result;
};

// Rate of positive predictions
exports.rpp = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = pred.nPosPred[i] / pred.nSamples;
    }
    return result;
};

// Rate of negative predictions
exports.rnp = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);
    for (var i = 0; i < l; i++) {
        result[i] = pred.nNegPred[i] / pred.nSamples;
    }
    return result;
};

// Threshold
exports.threshold = pred => {
    const clone = pred.cutoffs.slice();
    clone[0] = clone[1]; // Remove the infinite value
    return clone;
};
