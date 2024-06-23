'use strict';

var eightBits = require('./creator');

/**
 * Count the number of true values in an array
 * @param {Array} arr
 * @return {number}
 */
function count(arr) {
    var c = 0;
    for (var i = 0; i < arr.length; i++) {
        c += eightBits[arr[i] & 0xff] + eightBits[(arr[i] >> 8) & 0xff] + eightBits[(arr[i] >> 16) & 0xff] + eightBits[(arr[i] >> 24) & 0xff];
    }
    return c;
}

/**
 * Logical AND operation
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
function and(arr1, arr2) {
    var ans = new Array(arr1.length);
    for (var i = 0; i < arr1.length; i++)
        ans[i] = arr1[i] & arr2[i];
    return ans;
}

/**
 * Logical OR operation
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
function or(arr1, arr2) {
    var ans = new Array(arr1.length);
    for (var i = 0; i < arr1.length; i++)
        ans[i] = arr1[i] | arr2[i];
    return ans;
}

/**
 * Logical XOR operation
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
function xor(arr1, arr2) {
    var ans = new Array(arr1.length);
    for (var i = 0; i < arr1.length; i++)
        ans[i] = arr1[i] ^ arr2[i];
    return ans;
}

/**
 * Logical NOT operation
 * @param {Array} arr
 * @return {Array}
 */
function not(arr) {
    var ans = new Array(arr.length);
    for (var i = 0; i < ans.length; i++)
        ans[i] = ~arr[i];
    return ans;
}

/**
 * Gets the n value of array arr
 * @param {Array} arr
 * @param {number} n
 * @return {boolean}
 */
function getBit(arr, n) {
    var index = n >> 5; // Same as Math.floor(n/32)
    var mask = 1 << (31 - n % 32);
    return Boolean(arr[index] & mask);
}

/**
 * Sets the n value of array arr to the value val
 * @param {Array} arr
 * @param {number} n
 * @param {boolean} val
 * @return {Array}
 */
function setBit(arr, n, val) {
    var index = n >> 5; // Same as Math.floor(n/32)
    var mask = 1 << (31 - n % 32);
    if (val)
        arr[index] = mask | arr[index];
    else
        arr[index] = ~mask & arr[index];
    return arr;
}

/**
 * Translates an array of numbers to a string of bits
 * @param {Array} arr
 * @returns {string}
 */
function toBinaryString(arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        var obj = (arr[i] >>> 0).toString(2);
        str += '00000000000000000000000000000000'.substr(obj.length) + obj;
    }
    return str;
}

/**
 * Creates an array of numbers based on a string of bits
 * @param {string} str
 * @returns {Array}
 */
function parseBinaryString(str) {
    var len = str.length / 32;
    var ans = new Array(len);
    for (var i = 0; i < len; i++) {
        ans[i] = parseInt(str.substr(i*32, 32), 2) | 0;
    }
    return ans;
}

/**
 * Translates an array of numbers to a hex string
 * @param {Array} arr
 * @returns {string}
 */
function toHexString(arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        var obj = (arr[i] >>> 0).toString(16);
        str += '00000000'.substr(obj.length) + obj;
    }
    return str;
}

/**
 * Creates an array of numbers based on a hex string
 * @param {string} str
 * @returns {Array}
 */
function parseHexString(str) {
    var len = str.length / 8;
    var ans = new Array(len);
    for (var i = 0; i < len; i++) {
        ans[i] = parseInt(str.substr(i*8, 8), 16) | 0;
    }
    return ans;
}

/**
 * Creates a human readable string of the array
 * @param {Array} arr
 * @returns {string}
 */
function toDebug(arr) {
    var binary = toBinaryString(arr);
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += '0000'.substr((i * 32).toString(16).length) + (i * 32).toString(16) + ':';
        for (var j = 0; j < 32; j += 4) {
            str += ' ' + binary.substr(i * 32 + j, 4);
        }
        if (i < arr.length - 1) str += '\n';
    }
    return str
}

module.exports = {
    count: count,
    and: and,
    or: or,
    xor: xor,
    not: not,
    getBit: getBit,
    setBit: setBit,
    toBinaryString: toBinaryString,
    parseBinaryString: parseBinaryString,
    toHexString: toHexString,
    parseHexString: parseHexString,
    toDebug: toDebug
};
