export default function getZones(from, to, exclusions = []) {
  if (from > to) {
    [from, to] = [to, from];
  }

  // in exclusions from and to have to be defined
  exclusions = exclusions.filter(
    (exclusion) => exclusion.from !== undefined && exclusion.to !== undefined,
  );

  exclusions = JSON.parse(JSON.stringify(exclusions));
  // we ensure that from before to
  exclusions.forEach((exclusion) => {
    if (exclusion.from > exclusion.to) {
      [exclusion.to, exclusion.from] = [exclusion.from, exclusion.to];
    }
  });

  exclusions.sort((a, b) => a.from - b.from);

  // we will rework the exclusions in order to remove overlap and outside range (from / to)
  exclusions.forEach((exclusion) => {
    if (exclusion.from < from) exclusion.from = from;
    if (exclusion.to > to) exclusion.to = to;
  });
  for (let i = 0; i < exclusions.length - 1; i++) {
    if (exclusions[i].to > exclusions[i + 1].from) {
      exclusions[i].to = exclusions[i + 1].from;
    }
  }
  exclusions = exclusions.filter((exclusion) => exclusion.from < exclusion.to);

  if (!exclusions || exclusions.length === 0) {
    return [{ from, to }];
  }

  let zones = [];
  let currentFrom = from;
  for (let exclusion of exclusions) {
    if (currentFrom < exclusion.from) {
      zones.push({
        from: currentFrom,
        to: exclusion.from,
      });
    }

    currentFrom = exclusion.to;
  }
  if (currentFrom < to) {
    zones.push({
      from: currentFrom,
      to: to,
    });
  }

  return zones;
}
