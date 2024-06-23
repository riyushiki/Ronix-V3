import LM from 'ml-levenberg-marquardt';

const LEVENBERG_MARQUARDT = 1;

export function selectMethod(optimizationOptions = {}) {
  let { kind, options } = optimizationOptions;
  kind = getKind(kind);
  switch (kind) {
    case LEVENBERG_MARQUARDT:
      return {
        algorithm: LM,
        optimizationOptions: checkOptions(kind, options),
      };
    default:
      throw new Error(`Unknown kind algorithm`);
  }
}

function checkOptions(kind, options = {}) {
  // eslint-disable-next-line default-case
  switch (kind) {
    case LEVENBERG_MARQUARDT:
      return Object.assign({}, lmOptions, options);
  }
}

function getKind(kind) {
  if (typeof kind !== 'string') return kind;
  switch (kind.toLowerCase().replace(/[^a-z]/g, '')) {
    case 'lm':
    case 'levenbergmarquardt':
      return LEVENBERG_MARQUARDT;
    default:
      throw new Error(`Unknown kind algorithm`);
  }
}

const lmOptions = {
  damping: 1.5,
  maxIterations: 100,
  errorTolerance: 1e-8,
};
