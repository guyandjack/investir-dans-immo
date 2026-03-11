const path = require("path");

const IRL_IDBANK = "001515333";
const INSEE_URL = `https://bdm.insee.fr/series/sdmx/data/SERIES_BDM/${IRL_IDBANK}`;

module.exports = {
  IRL_IDBANK,
  INSEE_URL,
  REQUEST_TIMEOUT_MS: 15000,
  CRON_SCHEDULE: "0 * * * *", // toutes les heures
  JSON_FILE_PATH: path.join(__dirname, "..", "..", "store", "irl-cache.json"),
};
