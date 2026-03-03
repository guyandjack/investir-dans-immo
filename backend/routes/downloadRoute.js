/******************************************************************************** */
/**************  definission de toutes les routes "invest immo" **************/
/***************************************************************************** */
///import du controler qui gere les download
const { sendFile } = require("../controler/download.controler");
const express = require("express");

const router = express.Router();

/************  ensemble des routes  ****************** */

/***** permet de telecharger un fichier    ******* */

router.post("/download", sendFile);

module.exports = router;
