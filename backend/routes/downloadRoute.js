/******************************************************************************** */
/**************  definission de toutes les routes "invest immo" **************/
/***************************************************************************** */
///import du controler qui gere les download
const checkDownload = require("../controler/checkDownloader.js");

//Import du package "express"
const express = require("express");

//Instance de l'objet "Router"
const router = express.Router();

/************  ensemble des routes  ****************** */

//Routes "get"

/***** permet de telecharger un fichier    ******* */

router.get("/download/:fichier", checkDownload.downloader);

module.exports = router;
