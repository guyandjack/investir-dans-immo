const axios = require("axios");
const { INSEE_URL, REQUEST_TIMEOUT_MS } = require("./config.js");

/**
 *
 *
 * @param {*} startPeriod
 * @return {*} 
 */
async function fetchIrlRawXml(startPeriod) {
  const response = await axios.get(INSEE_URL, {
    params: { startPeriod },
    headers: {
      Accept: "application/vnd.sdmx.structurespecificdata+xml;version=2.1",
      "User-Agent": "irl-cache-service/1.0",
    },
    timeout: REQUEST_TIMEOUT_MS,
  });

  return response.data;
}

module.exports = {
  fetchIrlRawXml,
};
