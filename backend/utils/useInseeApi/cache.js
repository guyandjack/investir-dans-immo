const { IRL_IDBANK } = require("./config.js");

const state = {
  idbank: IRL_IDBANK,
  label: "Indice de référence des loyers (IRL)",
  currentYear: null,
  previousYear: null,
  currentYearData: [],
  previousYearData: [],
  latest: null,
  previousSameQuarter: null,
  updatedAt: null,
  source: "INSEE BDM SDMX",
  lastFetchStatus: "never",
  lastFetchError: null,
};

function getCache() {
  return state;
}

function updateCache(data) {
  Object.assign(state, data);
}

function updateFetchMeta({ status, error = null }) {
  state.lastFetchStatus = status;
  state.lastFetchError = error;
}

module.exports = {
  getCache,
  updateCache,
  updateFetchMeta,
};
