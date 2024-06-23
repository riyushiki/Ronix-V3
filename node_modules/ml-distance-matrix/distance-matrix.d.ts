declare module 'ml-distance-matrix' {
  function distanceMatrix<DataType = number[], DistanceType = number>(
    data: DataType[],
    distanceFunction: (valueA: DataType, valueB: DataType) => DistanceType,
  ): DistanceType[][];

  export = distanceMatrix;
}
