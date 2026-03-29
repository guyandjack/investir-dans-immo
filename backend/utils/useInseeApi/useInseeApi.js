const { IRL_IDBANK } = require("./config.js");
const { fetchIrlRawXml } = require("./requestInsee.js");
const { parseXml, collectObs } = require("./xmlParser.js");
const { parseQuarter, sortQuarterAsc } = require("./quarter.js");
const {
  getCache,
  updateCache,
  updateFetchMeta,
} = require("./cache.js");

async function fetchAndBuildIrlData() {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;
  const startPeriod = `${previousYear}-Q1`;

  const xml = await fetchIrlRawXml(startPeriod);
  const xmlObject = parseXml(xml);

  const observations = collectObs(xmlObject)
    .filter((obs) => /^\d{4}-Q[1-4]$/.test(obs.period))
    .filter((obs) => {
      const info = parseQuarter(obs.period);
      return info && (info.year === currentYear || info.year === previousYear);
    })
    .sort(sortQuarterAsc);

  const currentYearData = observations.filter(
    (obs) => parseQuarter(obs.period)?.year === currentYear,
  );

  const previousYearData = observations.filter(
    (obs) => parseQuarter(obs.period)?.year === previousYear,
  );

  const latest = observations.at(-1) || null;

  let previousSameQuarter = null;

  if (latest) {
    const latestInfo = parseQuarter(latest.period);

    previousSameQuarter =
      observations.find((obs) => {
        const info = parseQuarter(obs.period);
        return (
          info &&
          info.year === latestInfo.year - 1 &&
          info.quarter === latestInfo.quarter
        );
      }) || null;
  }

  return {
    idbank: IRL_IDBANK,
    label: "Indice de référence des loyers (IRL)",
    currentYear,
    previousYear,
    currentYearData,
    previousYearData,
    latest,
    previousSameQuarter,
    updatedAt: new Date().toISOString(),
    source: "INSEE BDM SDMX",
  };
}

async function refreshIrlCache() {
  try {
    const freshData = await fetchAndBuildIrlData();

    updateCache(freshData);
    updateFetchMeta({ status: "success", error: null });

    return getCache();
  } catch (error) {
    updateFetchMeta({
      status: "error",
      error: error.response?.status
        ? `HTTP ${error.response.status}`
        : error.message || "Unknown error",
    });

    return getCache();
  }
}

function getFullIrlData() {
  return getCache();
}

function getLatestIrlData() {
  const cache = getCache();

  if (!cache.latest) return null;

  const latest = cache.latest;
  const prev = cache.previousSameQuarter;

  let annualChangePercent = null;

  if (prev && prev.value !== 0) {
    annualChangePercent = Number(
      (((latest.value - prev.value) / prev.value) * 100).toFixed(2),
    );
  }

  return {
    currentIrl: latest.value,
    currentPeriod: latest.period,
    previousYearSameQuarterIrl: prev ? prev.value : null,
    previousYearSameQuarterPeriod: prev ? prev.period : null,
    annualChangePercent,
    updatedAt: cache.updatedAt,
  };
}

function getIrlMeta() {
  const cache = getCache();

  return {
    lastFetchStatus: cache.lastFetchStatus,
    lastFetchError: cache.lastFetchError,
  };
}

module.exports = {
  refreshIrlCache,
  getFullIrlData,
  getLatestIrlData,
  getIrlMeta,
};
