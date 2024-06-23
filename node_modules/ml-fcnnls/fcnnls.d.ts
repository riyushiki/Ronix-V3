import Matrix, { AbstractMatrix } from 'ml-matrix';

type MaybeMatrix = AbstractMatrix | number[][];

export interface IFcnnlsOptions {
  maxIterations?: number;
}

export declare function fcnnls(
  X: MaybeMatrix,
  Y: MaybeMatrix,
  options?: IFcnnlsOptions,
): Matrix;

export declare function fcnnlsVector(
  X: MaybeMatrix,
  y: number[],
  options?: IFcnnlsOptions,
): number[];
