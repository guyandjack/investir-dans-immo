const cron = require("node-cron");
const { CRON_SCHEDULE } = require("./config.js");
const { refreshIrlJsonStore } = require("./irlService");

async function runIrlJob() {
  await refreshIrlJsonStore();
}

function startIrlCronJob() {
  cron.schedule(CRON_SCHEDULE, async () => {
    console.log("[CRON] Lancement mise à jour IRL...");
    await runIrlJob();
  });

  console.log(`[CRON] Job IRL planifié avec l'expression "${CRON_SCHEDULE}"`);
}

module.exports = {
  runIrlJob,
  startIrlCronJob,
};
