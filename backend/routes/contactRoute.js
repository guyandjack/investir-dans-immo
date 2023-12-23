/******************************************************************************** */
/**************  definission de toutes les routes "electravaux" **************/
/***************************************************************************** */

//Import du package "express"
const express = require("express");

//Instance de l' objet "Router"
const router = express.Router();

//Import du controler qui gere les données issues du formulaire des commentaires
//const checkFieldForm = require("../controler/controlerForm.js");

//Import du controler qui recupere les commentaires issus de la bdd, pour la page consultée
//const getAllComments = require("../controler/getAllComments.js");

//Import du controler qui gere les donnés du formulaire de la page "contact"
const checkFieldFormContact = require("../controler/controlerFormContact.js");

/************  ensemble des routes  ****************** */


//Routes "post"


/***** permet d'envoyer un mail   ******* */

router.post("/contact", checkFieldFormContact.testForm);

module.exports = router;
