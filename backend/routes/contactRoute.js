/******************************************************************************** */
/**************  definission de toutes les routes "invest immo" **************/
/***************************************************************************** */

const express = require("express");

const {
  checkDataUserForm,
} = require("../middelware/checkDataUserForm.middelware");
const { handleContactForm } = require("../controler/contactForm.controler");

const router = express.Router();

//import du controler qui gere les download


/************  ensemble des routes  ****************** */


//Routes "post"


/***** permet d'envoyer un mail   ******* */

router.post("/contact", checkDataUserForm, handleContactForm);

module.exports = router;
