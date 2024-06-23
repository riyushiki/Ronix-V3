import { largestPrime, nextPrime } from './primeFinder';

const FREE = 0;
const FULL = 1;
const REMOVED = 2;

const defaultInitialCapacity = 150;
const defaultMinLoadFactor = 1 / 6;
const defaultMaxLoadFactor = 2 / 3;

export default class HashTable {
  constructor(options = {}) {
    if (options instanceof HashTable) {
      this.table = options.table.slice();
      this.values = options.values.slice();
      this.state = options.state.slice();
      this.minLoadFactor = options.minLoadFactor;
      this.maxLoadFactor = options.maxLoadFactor;
      this.distinct = options.distinct;
      this.freeEntries = options.freeEntries;
      this.lowWaterMark = options.lowWaterMark;
      this.highWaterMark = options.maxLoadFactor;
      return;
    }

    const initialCapacity =
      options.initialCapacity === undefined
        ? defaultInitialCapacity
        : options.initialCapacity;
    if (initialCapacity < 0) {
      throw new RangeError(
        `initial capacity must not be less than zero: ${initialCapacity}`
      );
    }

    const minLoadFactor =
      options.minLoadFactor === undefined
        ? defaultMinLoadFactor
        : options.minLoadFactor;
    const maxLoadFactor =
      options.maxLoadFactor === undefined
        ? defaultMaxLoadFactor
        : options.maxLoadFactor;
    if (minLoadFactor < 0 || minLoadFactor >= 1) {
      throw new RangeError(`invalid minLoadFactor: ${minLoadFactor}`);
    }
    if (maxLoadFactor <= 0 || maxLoadFactor >= 1) {
      throw new RangeError(`invalid maxLoadFactor: ${maxLoadFactor}`);
    }
    if (minLoadFactor >= maxLoadFactor) {
      throw new RangeError(
        `minLoadFactor (${minLoadFactor}) must be smaller than maxLoadFactor (${maxLoadFactor})`
      );
    }

    let capacity = initialCapacity;
    // User wants to put at least capacity elements. We need to choose the size based on the maxLoadFactor to
    // avoid the need to rehash before this capacity is reached.
    // actualCapacity * maxLoadFactor >= capacity
    capacity = (capacity / maxLoadFactor) | 0;
    capacity = nextPrime(capacity);
    if (capacity === 0) capacity = 1;

    this.table = newArray(capacity);
    this.values = newArray(capacity);
    this.state = newArray(capacity);

    this.minLoadFactor = minLoadFactor;
    if (capacity === largestPrime) {
      this.maxLoadFactor = 1;
    } else {
      this.maxLoadFactor = maxLoadFactor;
    }

    this.distinct = 0;
    this.freeEntries = capacity;

    this.lowWaterMark = 0;
    this.highWaterMark = chooseHighWaterMark(capacity, this.maxLoadFactor);
  }

  clone() {
    return new HashTable(this);
  }

  get size() {
    return this.distinct;
  }

  get(key) {
    const i = this.indexOfKey(key);
    if (i < 0) return 0;
    return this.values[i];
  }

  set(key, value) {
    let i = this.indexOfInsertion(key);
    if (i < 0) {
      i = -i - 1;
      this.values[i] = value;
      return false;
    }

    if (this.distinct > this.highWaterMark) {
      const newCapacity = chooseGrowCapacity(
        this.distinct + 1,
        this.minLoadFactor,
        this.maxLoadFactor
      );
      this.rehash(newCapacity);
      return this.set(key, value);
    }

    this.table[i] = key;
    this.values[i] = value;
    if (this.state[i] === FREE) this.freeEntries--;
    this.state[i] = FULL;
    this.distinct++;

    if (this.freeEntries < 1) {
      const newCapacity = chooseGrowCapacity(
        this.distinct + 1,
        this.minLoadFactor,
        this.maxLoadFactor
      );
      this.rehash(newCapacity);
    }

    return true;
  }

  remove(key, noRehash) {
    const i = this.indexOfKey(key);
    if (i < 0) return false;

    this.state[i] = REMOVED;
    this.distinct--;

    if (!noRehash) this.maybeShrinkCapacity();

    return true;
  }

  delete(key, noRehash) {
    const i = this.indexOfKey(key);
    if (i < 0) return false;

    this.state[i] = FREE;
    this.distinct--;

    if (!noRehash) this.maybeShrinkCapacity();

    return true;
  }

  maybeShrinkCapacity() {
    if (this.distinct < this.lowWaterMark) {
      const newCapacity = chooseShrinkCapacity(
        this.distinct,
        this.minLoadFactor,
        this.maxLoadFactor
      );
      this.rehash(newCapacity);
    }
  }

  containsKey(key) {
    return this.indexOfKey(key) >= 0;
  }

  indexOfKey(key) {
    const table = this.table;
    const state = this.state;
    const length = this.table.length;

    const hash = key & 0x7fffffff;
    let i = hash % length;
    let decrement = hash % (length - 2);
    if (decrement === 0) decrement = 1;

    while (state[i] !== FREE && (state[i] === REMOVED || table[i] !== key)) {
      i -= decrement;
      if (i < 0) i += length;
    }

    if (state[i] === FREE) return -1;
    return i;
  }

  containsValue(value) {
    return this.indexOfValue(value) >= 0;
  }

  indexOfValue(value) {
    const values = this.values;
    const state = this.state;

    for (var i = 0; i < state.length; i++) {
      if (state[i] === FULL && values[i] === value) {
        return i;
      }
    }

    return -1;
  }

  indexOfInsertion(key) {
    const table = this.table;
    const state = this.state;
    const length = table.length;

    const hash = key & 0x7fffffff;
    let i = hash % length;
    let decrement = hash % (length - 2);
    if (decrement === 0) decrement = 1;

    while (state[i] === FULL && table[i] !== key) {
      i -= decrement;
      if (i < 0) i += length;
    }

    if (state[i] === REMOVED) {
      const j = i;
      while (state[i] !== FREE && (state[i] === REMOVED || table[i] !== key)) {
        i -= decrement;
        if (i < 0) i += length;
      }
      if (state[i] === FREE) i = j;
    }

    if (state[i] === FULL) {
      return -i - 1;
    }

    return i;
  }

  ensureCapacity(minCapacity) {
    if (this.table.length < minCapacity) {
      const newCapacity = nextPrime(minCapacity);
      this.rehash(newCapacity);
    }
  }

  rehash(newCapacity) {
    const oldCapacity = this.table.length;

    if (newCapacity <= this.distinct) throw new Error('Unexpected');

    const oldTable = this.table;
    const oldValues = this.values;
    const oldState = this.state;

    const newTable = newArray(newCapacity);
    const newValues = newArray(newCapacity);
    const newState = newArray(newCapacity);

    this.lowWaterMark = chooseLowWaterMark(newCapacity, this.minLoadFactor);
    this.highWaterMark = chooseHighWaterMark(newCapacity, this.maxLoadFactor);

    this.table = newTable;
    this.values = newValues;
    this.state = newState;
    this.freeEntries = newCapacity - this.distinct;

    for (var i = 0; i < oldCapacity; i++) {
      if (oldState[i] === FULL) {
        var element = oldTable[i];
        var index = this.indexOfInsertion(element);
        newTable[index] = element;
        newValues[index] = oldValues[i];
        newState[index] = FULL;
      }
    }
  }

  forEachKey(callback) {
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] === FULL) {
        if (!callback(this.table[i])) return false;
      }
    }
    return true;
  }

  forEachValue(callback) {
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] === FULL) {
        if (!callback(this.values[i])) return false;
      }
    }
    return true;
  }

  forEachPair(callback) {
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] === FULL) {
        if (!callback(this.table[i], this.values[i])) return false;
      }
    }
    return true;
  }
}

function chooseLowWaterMark(capacity, minLoad) {
  return (capacity * minLoad) | 0;
}

function chooseHighWaterMark(capacity, maxLoad) {
  return Math.min(capacity - 2, (capacity * maxLoad) | 0);
}

function chooseGrowCapacity(size, minLoad, maxLoad) {
  return nextPrime(
    Math.max(size + 1, ((4 * size) / (3 * minLoad + maxLoad)) | 0)
  );
}

function chooseShrinkCapacity(size, minLoad, maxLoad) {
  return nextPrime(
    Math.max(size + 1, ((4 * size) / (minLoad + 3 * maxLoad)) | 0)
  );
}

function newArray(size) {
  return Array(size).fill(0);
}
