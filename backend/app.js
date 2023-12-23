//Import des packages

const express = require("express");
const bodyparser = require("body-parser");

//Import des functions
const securityCORS = require("./middelware/cors.js");

//Import des routes
const routeApiContact = require("./routes/contactRoute.js");

//Appli express
const appli = express();

//parametrage du header de réponse pour annuler la sécurité "CORS"
appli.use(securityCORS.setHeaderSecurityCORS);

//permet d'exploiter le contenu json du corps des requettes
appli.use(express.json());

//permet d'acceder au contenu du corps de la requette
appli.use(bodyparser.urlencoded({ extended: true }));

//Routes principales
appli.use("/", routeApiContact);

/*appli.use((req,res)=>{
    res.status(250).json({"message: ": "Server listen on port 5000"});
});*/

module.exports = appli;
