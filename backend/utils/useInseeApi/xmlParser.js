const { XMLParser } = require("fast-xml-parser");

function parseXml(xmlString) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    parseTagValue: false,
    trimValues: true,
  });

  
  return parser.parse(xmlString);
}

function collectObs(node, out = []) {
  if (!node || typeof node !== "object") return out;

  if (Array.isArray(node)) {
    for (const item of node) {
      collectObs(item, out);
    }
    return out;
  }

  if (node.Obs) {
    const obsList = Array.isArray(node.Obs) ? node.Obs : [node.Obs];

    for (const obs of obsList) {
      const period =
        obs.TIME_PERIOD || obs.timePeriod || obs.TIME || obs.time || null;

      const valueRaw = obs.OBS_VALUE || obs.obsValue || obs.value || null;

      if (period && valueRaw != null) {
        const value = Number(String(valueRaw).replace(",", "."));

        if (!Number.isNaN(value)) {
          out.push({ period, value });
        }
      }
    }
  }

  for (const key of Object.keys(node)) {
    collectObs(node[key], out);
  }

  return out;
}

module.exports = {
  parseXml,
  collectObs,
};
