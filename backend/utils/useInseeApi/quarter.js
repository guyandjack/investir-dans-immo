function parseQuarter(period) {
  const match = /^(\d{4})-Q([1-4])$/.exec(period);

  if (!match) return null;

  return {
    year: Number(match[1]),
    quarter: Number(match[2]),
  };
}

function sortQuarterAsc(a, b) {
  const qa = parseQuarter(a.period);
  const qb = parseQuarter(b.period);

  if (!qa || !qb) return 0;
  if (qa.year !== qb.year) return qa.year - qb.year;
  return qa.quarter - qb.quarter;
}

module.exports = {
  parseQuarter,
  sortQuarterAsc,
};
