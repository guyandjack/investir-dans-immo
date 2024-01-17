//Import du package "express"
const express = require("express");
const path = require("path");

//Clefs du corp de requete normalement attendues
let refOfKeys = {
  download: "tableauResume",
};

//objet contenent le resultat des fonctions de controle
let valueControl = {
  //requestOrigin
  cors: false,
  //bodyrequest
  bodyKey: false,
};





/****** check 1:  *********/
//Controle si la requete utilisateur provient du site 'electravaux.com'
async function isSameOrigin(req) {
  if (req.headers.origin !== "http://127.0.0.1:5500/html/index.html") {
    valueControl.cors = false;
    return false;
  }

  valueControl.cors = true;
  return true;
}

/****** check 2: *********/
//Controle si le corps de la requete contient les bonne clefs et valeur'
async function checkBody(req) {
  if (
    req.body.download == "" ||
    req.body.download == "undefined" ||
    req.body.download == null
  ) {
    valueControl.bodyKey = false;
    return false;
  }
  if (req.body.download == refOfKeys.download) {
    valueControl.bodyKey = true;
    return true;
  }
}

exports.downloader = (req, res, next) => {
  /*isSameOrigin(req)
    .then((result1) => {
      if (!result1) {
        res.status(500).json({ error: "error:1" });
      } else {
        return checkBody(req);
      }
    })
    .then((result2) => {
      if (!result2) {
        res.status(500).json({ error: "error:2" });
      } else {
        res.status(200).json({ message: "telechargement en cours" });
      }
    })

    .catch((error) => {
      console.log("erreur: " + error);
    });*/
  //Url du dossiers contenant les fichiers à telecharger
  const dossierFichier = path.dirname(__dirname);
  const absolutepath = dossierFichier + "/documents/" + req.params.fichier;
  const pathNormelize = path.normalize(absolutepath);
  const fileName = req.params.fichier;
  console.log(pathNormelize)

  res.download(pathNormelize, fileName, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "une errreur est survenue" });
    }
  });

  //res.status(200).json({ message: "telechargement en cours" });
};
