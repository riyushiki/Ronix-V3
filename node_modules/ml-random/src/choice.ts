import { IChoiceOptions } from './Options';
import IRandomGenerator from './RandomGenerator';

const PROB_TOLERANCE = 0.00000001;

function randomChoice<T>(
  values: T[],
  options?: IChoiceOptions,
  random?: IRandomGenerator
): T[];
function randomChoice<T>(
  values: number,
  options?: IChoiceOptions,
  random?: IRandomGenerator
): number[];
function randomChoice<T>(
  values: T[] | number,
  options: IChoiceOptions = {},
  random: IRandomGenerator = Math.random
): Array<T | number> {
  const { size = 1, replace = false, probabilities } = options;

  let valuesArr;
  let cumSum;
  if (typeof values === 'number') {
    valuesArr = getArray(values);
  } else {
    valuesArr = values.slice();
  }

  if (probabilities) {
    if (!replace) {
      throw new Error(
        'choice with probabilities and no replacement is not implemented'
      );
    }
    // check input is sane
    if (probabilities.length !== valuesArr.length) {
      throw new Error(
        'the length of probabilities option should be equal to the number of choices'
      );
    }
    cumSum = [probabilities[0]];
    for (let i = 1; i < probabilities.length; i++) {
      cumSum[i] = cumSum[i - 1] + probabilities[i];
    }

    if (Math.abs(1 - cumSum[cumSum.length - 1]) > PROB_TOLERANCE) {
      throw new Error(
        `probabilities should sum to 1, but instead sums to ${
          cumSum[cumSum.length - 1]
        }`
      );
    }
  }

  if (replace === false && size > valuesArr.length) {
    throw new Error('size option is too large');
  }
  const result = [];
  for (let i = 0; i < size; i++) {
    const index = randomIndex(valuesArr.length, random, cumSum);
    result.push(valuesArr[index]);
    if (!replace) {
      valuesArr.splice(index, 1);
    }
  }
  return result;
}

function getArray(n: number) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}

function randomIndex(n: number, random: IRandomGenerator, cumSum?: number[]) {
  const rand = random();
  if (!cumSum) {
    return Math.floor(rand * n);
  } else {
    let idx = 0;
    while (rand > cumSum[idx]) {
      idx++;
    }
    return idx;
  }
}

export default randomChoice;
