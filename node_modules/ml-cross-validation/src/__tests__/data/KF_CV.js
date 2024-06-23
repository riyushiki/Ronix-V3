export const KF_CV = [
  {
    features: [-10, 0, 5],
    labels: [-1, 0, 1],
    k: 3,
    result: {
      matrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
      labels: [-1, 0, 1],
    },
  },
  {
    features: [-3, -10, -2, 5],
    labels: [1, 1, -1, 1],
    k: 2,
    result: {
      matrix: [
        [1, 2],
        [0, 1],
      ],
      labels: [1, -1],
    },
  },
];
