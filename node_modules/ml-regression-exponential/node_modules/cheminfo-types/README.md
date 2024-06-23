# cheminfo-types

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Types for cheminfo packages and cheminfo data schema.

__Key principles:__ 
- One type should correspond to one React component 
- The schema should not be so complicated that it becomes unusable 
- Use `@tjs-examples` to give examples that will show in the JSON schema and documentation

## Installation

`$ npm i cheminfo-types`

## Usage

<details>

<summary>See example</summary>

```
import type { MeasurementXY } from 'cheminfo-types';

const measurements: MeasurementXY[] = [];
const xAxis = {
  label: 'time',
  units: 's',
  isDependent: false,
  data: [1, 2, 3],
};
const yAxis = {
  label: 'current',
  units: 'mA',
  isDependent: true,
  data: [0.1, 8, 13],
};
const firstMeasurement: MeasurementXY = {
  title: 'Current Monitoring',
  variables: { x: xAxis, y: yAxis },
};
measurements.push(firstMeasurement);
```

</details>

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/cheminfo-types.svg
[npm-url]: https://www.npmjs.com/package/cheminfo-types
[ci-image]: https://github.com/cheminfo/cheminfo-types/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/cheminfo/cheminfo-types/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/cheminfo-types.svg
[download-url]: https://www.npmjs.com/package/cheminfo-types
