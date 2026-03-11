const {
  getFullIrlData,
  getLatestIrlData,
  getIrlMeta,
} = require("../utils/useInseeApi/irlService.js");


async function getIrl(req, res, next) {
  try {
    const data = await getFullIrlData();
    const hasData = !!data.latest;

    return res.status(hasData ? 200 : 503).json({
      success: hasData,
      data,
      meta: await getIrlMeta(),
    });
  } catch (error) {
    next(error);
  }
}

async function getLatestIrl(req, res, next) {
  try {
    const data = await getLatestIrlData();

    if (!data) {
      return res.status(503).json({
        success: false,
        message: "Aucune donnée IRL disponible pour le moment.",
        meta: await getIrlMeta(),
      });
    }

    return res.json({
      success: true,
      data,
      meta: await getIrlMeta(),
    });
  } catch (error) {
    next(error);
  }
}

async function healthCheck(req, res, next) {
  try {
    const meta = await getIrlMeta();

    return res.json({
      ok: true,
      service: "irl-api",
      ...meta,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getIrl,
  getLatestIrl,
  healthCheck,
};
