# savitzky-golay-generalized

General Least-Squares Smoothing and Differentiation by the Convolution (Savitzky-Golay) Method Peter A. Gorry

Pretty much the same as the savitzky-golay method, but without border problems, and without inventing points.
It can be maybe merged into the savitzky-golay project but by the now this is the version used in the last GSD project.

I'll try an automatic parameter tunning based on the SNR or in the entropy of the signal.

# Usage

```js
npm i ml-savitzky-golay-generalized
const SG = require("ml-savitzky-golay-generalized");
SG(dataY, deltaX|X, options)
```

## Parameters

### dataY

The data to be filtered.

### deltaX | X

deltaX specifies the difference between 2 consecutive points of the independent: deltaX = X[i+1] - X[i]. Specficiying a deltaX suppose that all your points are equally spaced on the independent variable.
If your points are not equally spaced in the ordinate variable, then you have to provide explicitly your X values. The algorithm will use the average deltaX within each bin of 'windowSize' points to approximate the derivatives. This fast approximation only works if the X is almost locally equally spaced.

### options

#### windowSize:

The odd number of points to approximate the regression polynomial. Default 9

#### derivative:

The grade of the derivative. 0 by default (Smoothing)

#### polynomial:

The order of the regression polynomial. Default 3

## Examples

```js
var SG = require('ml-savitzky-golay-generalized');
```

### Smoothing example

```js
var options = {
  windowSize: 15,
  derivative: 0,
  polynomial: 3,
};

var noiseLevel = 0.1;
var data = new Array(200);
for (var i = 0; i < data.length; i++)
  data[i] =
    Math.sin((i * Math.PI * 2) / data.length) +
    (Math.random() - 0.5) * noiseLevel;
var ans = SG(data, (Math.PI * 2) / data.length, options);
console.log(ans);
```

### First derivative test (Equally spaced x)

```js
var options = {
  windowSize: 45,
  derivative: 1,
  polynomial: 3,
};

var noiseLevel = 0.1;
var data = new Array(200);
for (var i = 0; i < data.length; i++)
  data[i] =
    Math.sin((i * Math.PI * 2) / data.length) +
    (Math.random() - 0.5) * noiseLevel;
var ans = SG(data, (Math.PI * 2) / data.length, options);
console.log(ans);
```

### First derivative test x as vector(It could be non-equally spaced!!)

```js
var options = {
  windowSize: 47,
  derivative: 1,
  polynomial: 3,
};

var noiseLevel = 0.1;
var data = new Array(200);
var x = new Array(200);
for (var i = 0; i < data.length; i++) {
  data[i] =
    Math.sin((i * Math.PI * 2) / data.length) +
    (Math.random() - 0.5) * noiseLevel;
  x[i] = (i * Math.PI * 2) / data.length;
}

var ans = SG(data, (Math.PI * 2) / data.length, options);
var ans2 = SG(data, x, options);

/*for (var j = 0; j < data.length; j++){
      console.log(ans[j]+" "+ans2[j]);
 }*/
/* The result should be the approximately the same
for (var j = Math.round(options.windowSize/2); j < data.length-Math.round(options.windowSize/2); j++){
    ans[j].should.be.approximately(ans2[j], 10e-10);
 }
*/
```
