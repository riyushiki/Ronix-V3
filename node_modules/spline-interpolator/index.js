const {bisectRight} = require('d3-array')

const quincunx = (u, v, w, q) => {
  const n = u.length - 1

  u[0] = 0
  v[0] = 0
  w[0] = 0
  v[1] = v[1] / u[1]
  w[1] = w[1] / u[1]
  for (let i = 2; i < n; ++i) {
    u[i] = u[i] - u[i - 2] * w[i - 2] * w[i - 2] - u[i - 1] * v[i - 1] * v[i - 1]
    v[i] = (v[i] - u[i - 1] * v[i - 1] * w[i - 1]) / u[i]
    w[i] = w[i] / u[i]
  }

  for (let i = 2; i < n; ++i) {
    q[i] = q[i] - v[i - 1] * q[i - 1] - w[i - 2] * q[i - 2]
  }
  for (let i = 1; i < n; ++i) {
    q[i] = q[i] / u[i]
  }

  q[n - 2] = q[n - 2] - v[n - 2] * q[n - 1]
  for (let i = n - 3; i > 0; --i) {
    q[i] = q[i] - v[i] * q[i + 1] - w[i] * q[i + 2]
  }
}

const smoothingSpline = (x, y, sigma, lambda) => {
  const n = x.length - 1
  const h = new Array(n + 1)
  const r = new Array(n + 1)
  const f = new Array(n + 1)
  const p = new Array(n + 1)
  const q = new Array(n + 1)
  const u = new Array(n + 1)
  const v = new Array(n + 1)
  const w = new Array(n + 1)
  const params = x.map(() => [0, 0, 0, 0])
  params.pop()

  const mu = 2 * (1 - lambda) / (3 * lambda)
  for (let i = 0; i < n; ++i) {
    h[i] = x[i + 1] - x[i]
    r[i] = 3 / h[i]
  }
  q[0] = 0
  for (let i = 1; i < n; ++i) {
    f[i] = -(r[i - 1] + r[i])
    p[i] = 2 * (x[i + 1] - x[i - 1])
    q[i] = 3 * (y[i + 1] - y[i]) / h[i] - 3 * (y[i] - y[i - 1]) / h[i - 1]
  }
  q[n] = 0

  for (let i = 1; i < n; ++i) {
    u[i] = r[i - 1] * r[i - 1] * sigma[i - 1] + f[i] * f[i] * sigma[i] + r[i] * r[i] * sigma[i + 1]
    u[i] = mu * u[i] + p[i]
  }
  for (let i = 1; i < n - 1; ++i) {
    v[i] = f[i] * r[i] * sigma[i] + r[i] * f[i + 1] * sigma[i + 1]
    v[i] = mu * v[i] + h[i]
  }
  for (let i = 1; i < n - 2; ++i) {
    w[i] = mu * r[i] * r[i + 1] * sigma[i + 1]
  }

  quincunx(u, v, w, q)

  params[0][3] = y[0] - mu * r[0] * q[1] * sigma[0]
  params[1][3] = y[1] - mu * (f[1] * q[1] + r[1] * q[2]) * sigma[0]
  params[0][0] = q[1] / (3 * h[0])
  params[0][1] = 0
  params[0][2] = (params[1][3] - params[0][3]) / h[0] - q[1] * h[0] / 3
  r[0] = 0
  for (let i = 1; i < n; ++i) {
    params[i][0] = (q[i + 1] - q[i]) / (3 * h[i])
    params[i][1] = q[i]
    params[i][2] = (q[i] + q[i - 1]) * h[i - 1] + params[i - 1][2]
    params[i][3] = r[i - 1] * q[i - 1] + f[i] * q[i] + r[i] * q[i + 1]
    params[i][3] = y[i] - mu * params[i][3] * sigma[i]
  }
  return params
}

class SplineInterpolator {
  constructor (xIn, yIn, lambda = 1) {
    const indices = xIn.map((_, i) => i)
    indices.sort((i, j) => xIn[i] - xIn[j])
    const x = indices.map((i) => xIn[i])
    const y = indices.map((i) => yIn[i])
    const n = indices.length
    const sigma = indices.map(() => 1)
    this.n = n
    this.x = x
    this.y = y
    this.params = smoothingSpline(x, y, sigma, lambda)
  }

  interpolate (v) {
    if (v === this.x[this.n - 1]) {
      return this.y[this.n - 1]
    }
    const i = Math.min(Math.max(0, bisectRight(this.x, v) - 1), this.n - 2)
    const [a, b, c, d] = this.params[i]
    v = v - this.x[i]
    return a * v * v * v + b * v * v + c * v + d
  }

  max (step = 100) {
    const xStart = this.x[0]
    const xStop = this.x[this.n - 1]
    const delta = (xStop - xStart) / step
    let maxValue = -Infinity
    for (let i = 0, x = xStart; i < step; ++i, x += delta) {
      const y = this.interpolate(x)
      if (y > maxValue) {
        maxValue = y
      }
    }
    return maxValue
  }

  min (step = 100) {
    const xStart = this.x[0]
    const xStop = this.x[this.n - 1]
    const delta = (xStop - xStart) / step
    let minValue = Infinity
    for (let i = 0, x = xStart; i < step; ++i, x += delta) {
      const y = this.interpolate(x)
      if (y < minValue) {
        minValue = y
      }
    }
    return minValue
  }

  domain () {
    return [this.x[0], this.x[this.x.length - 1]]
  }

  range () {
    return [this.min(), this.max()]
  }

  curve (nInterval, domain = null) {
    domain = domain || this.domain()
    const delta = (domain[1] - domain[0]) / (nInterval - 1)
    const vals = new Array(nInterval)
    for (let i = 0; i < nInterval; ++i) {
      const x = delta * i + domain[0]
      vals[i] = [x, this.interpolate(x)]
    }
    return vals
  }
}

module.exports = SplineInterpolator
