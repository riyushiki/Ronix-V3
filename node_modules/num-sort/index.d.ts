/**
Ascending sort comparator.

@example
```
import {numberSortAscending} from 'num-sort';

[9, -3, -Infinity, 24, NaN].sort(numberSortAscending);
//=> [NaN, -Infinity, -3, 9, 24]
```
*/
export function numberSortAscending(left: number, right: number): number;

/**
Descending sort comparator.

@example
```
import {numberSortDescending} from 'num-sort';

[9, -3, -Infinity, 24, NaN].sort(numberSortDescending);
//=> [24, 9, -3, -Infinity, NaN]
```
*/
export function numberSortDescending(left: number, right: number): number;
