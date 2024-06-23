/* eslint-disable no-eval */
import HashTable from 'ml-hash-table';

export class SparseMatrix {
  constructor(rows, columns, options = {}) {
    if (rows instanceof SparseMatrix) {
      // clone
      const other = rows;
      this._init(
        other.rows,
        other.columns,
        other.elements.clone(),
        other.threshold,
      );
      return;
    }

    if (Array.isArray(rows)) {
      const matrix = rows;
      rows = matrix.length;
      options = columns || {};
      columns = matrix[0].length;
      this._init(rows, columns, new HashTable(options), options.threshold);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let value = matrix[i][j];
          if (this.threshold && Math.abs(value) < this.threshold) value = 0;
          if (value !== 0) {
            this.elements.set(i * columns + j, matrix[i][j]);
          }
        }
      }
    } else {
      this._init(rows, columns, new HashTable(options), options.threshold);
    }
  }

  _init(rows, columns, elements, threshold) {
    this.rows = rows;
    this.columns = columns;
    this.elements = elements;
    this.threshold = threshold || 0;
  }

  static eye(rows = 1, columns = rows) {
    const min = Math.min(rows, columns);
    const matrix = new SparseMatrix(rows, columns, { initialCapacity: min });
    for (let i = 0; i < min; i++) {
      matrix.set(i, i, 1);
    }
    return matrix;
  }

  clone() {
    return new SparseMatrix(this);
  }

  to2DArray() {
    const copy = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      copy[i] = new Array(this.columns);
      for (let j = 0; j < this.columns; j++) {
        copy[i][j] = this.get(i, j);
      }
    }
    return copy;
  }

  isSquare() {
    return this.rows === this.columns;
  }

  isSymmetric() {
    if (!this.isSquare()) return false;

    let symmetric = true;
    this.forEachNonZero((i, j, v) => {
      if (this.get(j, i) !== v) {
        symmetric = false;
        return false;
      }
      return v;
    });
    return symmetric;
  }

  /**
   * Search for the wither band in the main diagonals
   * @return {number}
   */
  bandWidth() {
    let min = this.columns;
    let max = -1;
    this.forEachNonZero((i, j, v) => {
      let diff = i - j;
      min = Math.min(min, diff);
      max = Math.max(max, diff);
      return v;
    });
    return max - min;
  }

  /**
   * Test if a matrix is consider banded using a threshold
   * @param {number} width
   * @return {boolean}
   */
  isBanded(width) {
    let bandWidth = this.bandWidth();
    return bandWidth <= width;
  }

  get cardinality() {
    return this.elements.size;
  }

  get size() {
    return this.rows * this.columns;
  }

  get(row, column) {
    return this.elements.get(row * this.columns + column);
  }

  set(row, column, value) {
    if (this.threshold && Math.abs(value) < this.threshold) value = 0;
    if (value === 0) {
      this.elements.remove(row * this.columns + column);
    } else {
      this.elements.set(row * this.columns + column, value);
    }
    return this;
  }

  mmul(other) {
    if (this.columns !== other.rows) {
      // eslint-disable-next-line no-console
      console.warn(
        'Number of columns of left matrix are not equal to number of rows of right matrix.',
      );
    }

    const m = this.rows;
    const p = other.columns;

    const result = new SparseMatrix(m, p);
    this.forEachNonZero((i, j, v1) => {
      other.forEachNonZero((k, l, v2) => {
        if (j === k) {
          result.set(i, l, result.get(i, l) + v1 * v2);
        }
        return v2;
      });
      return v1;
    });
    return result;
  }

  kroneckerProduct(other) {
    const m = this.rows;
    const n = this.columns;
    const p = other.rows;
    const q = other.columns;

    const result = new SparseMatrix(m * p, n * q, {
      initialCapacity: this.cardinality * other.cardinality,
    });
    this.forEachNonZero((i, j, v1) => {
      other.forEachNonZero((k, l, v2) => {
        result.set(p * i + k, q * j + l, v1 * v2);
        return v2;
      });
      return v1;
    });
    return result;
  }

  forEachNonZero(callback) {
    this.elements.forEachPair((key, value) => {
      const i = (key / this.columns) | 0;
      const j = key % this.columns;
      let r = callback(i, j, value);
      if (r === false) return false; // stop iteration
      if (this.threshold && Math.abs(r) < this.threshold) r = 0;
      if (r !== value) {
        if (r === 0) {
          this.elements.remove(key, true);
        } else {
          this.elements.set(key, r);
        }
      }
      return true;
    });
    this.elements.maybeShrinkCapacity();
    return this;
  }

  getNonZeros() {
    const cardinality = this.cardinality;
    const rows = new Array(cardinality);
    const columns = new Array(cardinality);
    const values = new Array(cardinality);
    let idx = 0;
    this.forEachNonZero((i, j, value) => {
      rows[idx] = i;
      columns[idx] = j;
      values[idx] = value;
      idx++;
      return value;
    });
    return { rows, columns, values };
  }

  setThreshold(newThreshold) {
    if (newThreshold !== 0 && newThreshold !== this.threshold) {
      this.threshold = newThreshold;
      this.forEachNonZero((i, j, v) => v);
    }
    return this;
  }

  /**
   * @return {SparseMatrix} - New transposed sparse matrix
   */
  transpose() {
    let trans = new SparseMatrix(this.columns, this.rows, {
      initialCapacity: this.cardinality,
    });
    this.forEachNonZero((i, j, value) => {
      trans.set(j, i, value);
      return value;
    });
    return trans;
  }

  isEmpty() {
    return this.rows === 0 || this.columns === 0;
  }
}

SparseMatrix.prototype.klass = 'Matrix';

SparseMatrix.identity = SparseMatrix.eye;
SparseMatrix.prototype.tensorProduct = SparseMatrix.prototype.kroneckerProduct;

/*
 Add dynamically instance and static methods for mathematical operations
 */

let inplaceOperator = `
(function %name%(value) {
    if (typeof value === 'number') return this.%name%S(value);
    return this.%name%M(value);
})
`;

let inplaceOperatorScalar = `
(function %name%S(value) {
    this.forEachNonZero((i, j, v) => v %op% value);
    return this;
})
`;

let inplaceOperatorMatrix = `
(function %name%M(matrix) {
    matrix.forEachNonZero((i, j, v) => {
        this.set(i, j, this.get(i, j) %op% v);
        return v;
    });
    return this;
})
`;

let staticOperator = `
(function %name%(matrix, value) {
    var newMatrix = new SparseMatrix(matrix);
    return newMatrix.%name%(value);
})
`;

let inplaceMethod = `
(function %name%() {
    this.forEachNonZero((i, j, v) => %method%(v));
    return this;
})
`;

let staticMethod = `
(function %name%(matrix) {
    var newMatrix = new SparseMatrix(matrix);
    return newMatrix.%name%();
})
`;

const operators = [
  // Arithmetic operators
  ['+', 'add'],
  ['-', 'sub', 'subtract'],
  ['*', 'mul', 'multiply'],
  ['/', 'div', 'divide'],
  ['%', 'mod', 'modulus'],
  // Bitwise operators
  ['&', 'and'],
  ['|', 'or'],
  ['^', 'xor'],
  ['<<', 'leftShift'],
  ['>>', 'signPropagatingRightShift'],
  ['>>>', 'rightShift', 'zeroFillRightShift'],
];

for (const operator of operators) {
  for (let i = 1; i < operator.length; i++) {
    SparseMatrix.prototype[operator[i]] = eval(
      fillTemplateFunction(inplaceOperator, {
        name: operator[i],
        op: operator[0],
      }),
    );
    SparseMatrix.prototype[`${operator[i]}S`] = eval(
      fillTemplateFunction(inplaceOperatorScalar, {
        name: `${operator[i]}S`,
        op: operator[0],
      }),
    );
    SparseMatrix.prototype[`${operator[i]}M`] = eval(
      fillTemplateFunction(inplaceOperatorMatrix, {
        name: `${operator[i]}M`,
        op: operator[0],
      }),
    );

    SparseMatrix[operator[i]] = eval(
      fillTemplateFunction(staticOperator, { name: operator[i] }),
    );
  }
}

let methods = [['~', 'not']];

[
  'abs',
  'acos',
  'acosh',
  'asin',
  'asinh',
  'atan',
  'atanh',
  'cbrt',
  'ceil',
  'clz32',
  'cos',
  'cosh',
  'exp',
  'expm1',
  'floor',
  'fround',
  'log',
  'log1p',
  'log10',
  'log2',
  'round',
  'sign',
  'sin',
  'sinh',
  'sqrt',
  'tan',
  'tanh',
  'trunc',
].forEach(function (mathMethod) {
  methods.push([`Math.${mathMethod}`, mathMethod]);
});

for (const method of methods) {
  for (let i = 1; i < method.length; i++) {
    SparseMatrix.prototype[method[i]] = eval(
      fillTemplateFunction(inplaceMethod, {
        name: method[i],
        method: method[0],
      }),
    );
    SparseMatrix[method[i]] = eval(
      fillTemplateFunction(staticMethod, { name: method[i] }),
    );
  }
}

function fillTemplateFunction(template, values) {
  for (const i in values) {
    template = template.replace(new RegExp(`%${i}%`, 'g'), values[i]);
  }
  return template;
}
