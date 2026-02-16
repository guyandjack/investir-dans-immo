/******************************************************************************** */
/**************  definission de toutes les routes "invest immo" **************/
/***************************************************************************** */
///import du controler qui gere les download
import { sendFile } from "../controler/download.controler.js";
import express from "express";

const router = express.Router();

/************  ensemble des routes  ****************** */

/***** permet de telecharger un fichier    ******* */

router.post("/download", sendFile);


export default router;
