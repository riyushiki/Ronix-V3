# num-sort

> Sort an array of numbers

## Install

```
$ npm install num-sort
```

## Usage

```js
import {numberSortAscending} from 'num-sort';

[9, -3, -Infinity, 24, NaN].sort(numberSortAscending);
//=> [NaN, -Infinity, -3, 9, 24]
```

## API

### numberSortAscending

Ascending sort comparator.

### numberSortDescending

Descending sort comparator.

## Related

- [alpha-sort](https://github.com/sindresorhus/alpha-sort) - Alphabetically sort an array of strings

