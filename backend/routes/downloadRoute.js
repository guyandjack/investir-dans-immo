/******************************************************************************** */
/**************  definission de toutes les routes "invest immo" **************/
/***************************************************************************** */

//Import du package "express"
const express = require("express");

//Instance de l'objet "Router"
const router = express.Router();

//import du controler qui gere les download
const checkDownload = require("../controler/checkDownloader.js");

/************  ensemble des routes  ****************** */

//Routes "get"

/***** permet de telecharger un fichier    ******* */

router.get("/download/:fichier", checkDownload.downloader);

module.exports = router;
