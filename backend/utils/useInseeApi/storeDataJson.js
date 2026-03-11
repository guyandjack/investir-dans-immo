const fs = require("fs/promises");
const path = require("path");
const { JSON_FILE_PATH, IRL_IDBANK } = require("./config.js");

const DEFAULT_DATA = {
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

async function ensureJsonFile() {
  const dir = path.dirname(JSON_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(JSON_FILE_PATH);
  } catch {
    await fs.writeFile(
      JSON_FILE_PATH,
      JSON.stringify(DEFAULT_DATA, null, 2),
      "utf-8",
    );
  }
}

async function readIrlData() {
  await ensureJsonFile();

  const fileContent = await fs.readFile(JSON_FILE_PATH, "utf-8");
  return JSON.parse(fileContent);
}

async function writeIrlData(data) {
  await ensureJsonFile();

  await fs.writeFile(JSON_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = {
  ensureJsonFile,
  readIrlData,
  writeIrlData,
  DEFAULT_DATA,
};
