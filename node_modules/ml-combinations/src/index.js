'use strict';
const defaultOptions = {
  mode: 'index'
};

module.exports = function *(M, N, options) {
  options = Object.assign({}, defaultOptions, options);
  var a = new Array(N);
  var c = new Array(M);
  var b = new Array(N);
  var p = new Array(N + 2);
  var x, y, z;

  // init a and b
  for (var i = 0; i < N; i++) {
    a[i] = i;
    if (i < N - M) b[i] = 0;
    else b[i] = 1;
  }

  // init c
  for (i = 0; i < M; i++) {
    c[i] = N - M + i;
  }

  // init p
  for (i = 0; i < p.length; i++) {
    if (i === 0) p[i] = N + 1;
    else if (i <= N - M) p[i] = 0;
    else if (i <= N) p[i] = i - N + M;
    else p[i] = -2;
  }

  function twiddle() {
    var i, j, k;
    j = 1;
    while (p[j] <= 0) {
      j++;
    }
    if (p[j - 1] === 0) {
      for (i = j - 1; i !== 1; i--) {
        p[i] = -1;
      }
      p[j] = 0;
      x = z = 0;
      p[1] = 1;
      y = j - 1;
    } else {
      if (j > 1) {
        p[j - 1] = 0;
      }
      do {
        j++;
      }
      while (p[j] > 0);
      k = j - 1;
      i = j;
      while (p[i] === 0) {
        p[i++] = -1;
      }
      if (p[i] === -1) {
        p[i] = p[k];
        z = p[k] - 1;
        x = i - 1;
        y = k - 1;
        p[k] = -1;
      } else {
        if (i === p[0]) {
          return 0;
        } else {
          p[j] = p[i];
          z = p[i] - 1;
          p[i] = 0;
          x = j - 1;
          y = i - 1;
        }
      }
    }
    return 1;
  }

  if (options.mode === 'index') {
    yield c.slice();
    while (twiddle()) {
      c[z] = a[x];
      yield c.slice();
    }
  } else if (options.mode === 'mask') {
    yield b.slice();
    while (twiddle()) {
      b[x] = 1;
      b[y] = 0;
      yield b.slice();
    }
  } else {
    throw new Error('Invalid mode');
  }
};
