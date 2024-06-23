/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

const toString = Object.prototype.toString;
const isEnumerable = Object.prototype.propertyIsEnumerable;
const getSymbols = Object.getOwnPropertySymbols;

module.exports = (target, ...args) => {
  if (!isObject(target)) {
    throw new TypeError('expected the first argument to be an object');
  }

  if (args.length === 0 || typeof Symbol !== 'function' || typeof getSymbols !== 'function') {
    return target;
  }

  for (let arg of args) {
    let names = getSymbols(arg);

    for (let key of names) {
      if (isEnumerable.call(arg, key)) {
        target[key] = arg[key];
      }
    }
  }
  return target;
};

function isObject(val) {
  return typeof val === 'function' || toString.call(val) === '[object Object]' || Array.isArray(val);
}
