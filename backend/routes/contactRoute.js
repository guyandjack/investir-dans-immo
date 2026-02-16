/******************************************************************************** */
/**************  definission de toutes les routes "invest immo" **************/
/***************************************************************************** */

import express from "express";

import { checkDataUserForm } from "../middelware/checkDataUserForm.middelware.js";
import { handleContactForm } from "../controler/contactForm.controler.js";

const router = express.Router();

//import du controler qui gere les download


/************  ensemble des routes  ****************** */


//Routes "post"


/***** permet d'envoyer un mail   ******* */

router.post("/contact", checkDataUserForm, handleContactForm);




export default router;
