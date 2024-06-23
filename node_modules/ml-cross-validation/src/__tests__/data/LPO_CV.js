export const LPO_CV = [
  {
    features: [-10, 0, 5],
    labels: [-1, 0, 1],
    p: 2,
    result: {
      matrix: [
        [2, 0, 0],
        [0, 2, 0],
        [0, 0, 2],
      ],
      labels: [-1, 0, 1],
    },
  },
  {
    features: [-3, -10, -2, 5],
    labels: [1, 1, -1, 1],
    p: 2,
    result: {
      matrix: [
        [3, 6],
        [0, 3],
      ],
      labels: [1, -1],
    },
  },
];
