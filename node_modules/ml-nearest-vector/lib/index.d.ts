declare type Vector = number[];
declare type Matrix = number[][];
interface IOptions {
    distanceFunction?: (vector1: Vector, vector2: Vector) => number;
    similarityFunction?: (vector1: Vector, vector2: Vector) => number;
}
export default function nearestVector(listVectors: Matrix, vector: number[], options?: IOptions): number;
export declare function findNearestVector(vectorList: Matrix, vector: Vector, options?: IOptions): number[];
export {};
