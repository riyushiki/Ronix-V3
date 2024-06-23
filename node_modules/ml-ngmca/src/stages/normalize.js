import { Matrix } from 'ml-matrix';

import { normBy } from '../util/normBy';

export function normalize(data, options) {
  const { normOnA } = options;
  let DS = normBy(data.S.transpose(), 'column');
  let DA = normBy(data.A, 'column');
  let D = Matrix.mul(DS, DA);
  let onS, onA;
  if (normOnA) {
    onS = (index, c) =>
      (data.S.get(index, c) * D.get(0, index)) / DS.get(0, index);
    onA = (index, r) => data.A.get(r, index) / DA.get(0, index);
  } else {
    onS = (index, c) => data.S.get(index, c) / DS.get(0, index);
    onA = (index, r) =>
      (data.A.get(r, index) * D.get(0, index)) / DA.get(0, index);
  }
  const sColumns = data.S.columns;
  const aRows = data.A.rows;
  for (let index = 0; index < D.columns; index++) {
    let valueForS, valueForA;
    if (D.get(0, index) > 0) {
      valueForS = onS;
      valueForA = onA;
    } else {
      valueForA = () => 0;
      valueForS = () => 0;
    }
    for (let c = 0; c < sColumns; c++) {
      data.S.set(index, c, valueForS(index, c));
    }
    for (let r = 0; r < aRows; r++) {
      data.A.set(r, index, valueForA(index, r));
    }
  }
  return data;
}
