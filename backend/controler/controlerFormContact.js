/**************************************************************************
 * ******************* controle du formulaire contact *********************
 * ************************************************************************/
const regEx = require("../utils/regEx.js");


//Clefs du corp de requete normalement attendues
let tabRefOfKeys = [
  "civilite",
  "lastname",
  "firstname",
  "email",
  "message",
  "sujet",
];

//objet contenent le resultat des fonctions de controle
let valueControl = {
  //requestOrigin
  cors: false,
  //bodyrequest
  bodyempty: false,
  bodylength: false,
  //honeyBucket
  honey: false,
  //input user
  civilite: false,
  lastname: false,
  firstname: false,
  email: false,
  message: false,
};

/****** check 1:  *********/
//Controle si la requete utilisateur provient du site 'electravaux.com'
/*async function isSameOrigin(req) {
  if (req.headers.origin !== "http://localhost:5000") {
    valueControl.cors = false;
    return false;
  }
  valueControl.cors = true;
  return true;
}*/

/****** check 2:  *********/
// controle si le corps de la requete n'est pas vide
async function isBodyRequestNotEmpty(req) {
  console.log("test1 lancé");
  //Recuperation des clefs du corps de la requete
  let listOfKeys = Object.keys(req.body);
  console.log("liste des clefs: " + listOfKeys);
  //Si le tableau des clefs vide
  if (listOfKeys.length < 1) {
    valueControl.body = false;
    return false;
  }
  valueControl.bodyempty = true;
  return true;
}

/****** check 3:  *********/
// controle si le corps de la requete contient toutes les clefs attendues
async function checkReqBodyKeys(req, tabRefOfKeys) {
  console.log("test2 lancé");

  let listOfKeys = Object.keys(req.body);
  console.log("liste  (2) des clefs: " + listOfKeys);
  //Si les tableaux n' ont pas la meme longeur, c'est qu' ils sont differents
  if (listOfKeys.length !== tabRefOfKeys.length) {
    valueControl.bodylength = false;
    return false;
  }

  //tableau qui contient les references communes aux deux tableux
  let tabMatchingValue = tabRefOfKeys.map((key) => {
    listOfKeys.includes(key);
  });

  //Si le tableau des valeurs trouvées a la même longeur que le tableau de référence
  //alors tous les champs attendus sont présent dans le corps de la requette
  if (tabMatchingValue.length !== tabRefOfKeys.length) {
    valueControl.bodylength = false;
    return false;
  }

  valueControl.bodylength = true;
  console.log("value control.bodylength dans test 2: " + valueControl.bodylength);
  return true;
}

// fonction de test unitaire sur le corps de la requette

/**
 * test la validite de l'input "civilite"
 *
 * @param {*} e
 */
async function checkUserValueCivilite(req) {
  console.log("test4 lancé");
let civilite = req.body.civilite;
  if (regEx.masqueCivilite.test(civilite)) {
    valueControl.civilite = true;
    return true;
  } else {
    valueControl.civilite = false;
    return false;
  }
}
/**
 * test la validite de l'input "Nom"
 *
 * @param {*} e
 */
async function checkUserValueLastname(req) {
  console.log("test5 lancé");
let lastname = req.body.lastname;
  if (regEx.masqueText.test(lastname)) {
    return true;
  } else {
    valueControl.lastname = false;
    return false;
  }
}
/**
 * test la validite de l'input "prenom"
 *
 * @param {*} e
 */
async function checkUserValueFirstname(req) {
  console.log("test6 lancé");
  let firstname = req.body.firstname;
  if (regEx.masqueText.test(firstname)) {
    return true;
  } else {
    let message = selectErrorMessage(id);

    return false;
  }
}
/**
 * test la validite de l'input "email"
 *
 * @param {*} e
 */
async function checkUserValueEmail(req) {
  console.log("test7 lancé");
let email = req.body.email;
  if (regEx.masqueMail.test(email)) {
    return true;
  } else {
    valueControl.email = false;
    return false;
  }
}
/**
 * test la validite de l'input "message"
 *
 * @param {*} e
 */
async function checkUserValueMessage(req) {
  console.log("test8 lancé");
  let message = req.body.message;
  if (regEx.masqueMessage.test(message)) {

    valueControl.message = true;
    return true;
  } else {
    valueControl.message = false;
    return false;
  }
}

/**
 * test la validite de l'input "honey bucket" (sujet)
 *
 * @param {*} e
 */
async function checkUserValueSujet(req) {
  console.log("test3 lancé");
  let sujet = req.body.sujet;
  console.log("sujet: " + sujet);
  if (sujet.length > 0) {
    //Si la valeur de la clef sujet n' est pas nulle
    valueControl.honey = false;
    console.log("value control.sujet dans test 3: " + valueControl.honey);
    return false;
  }
  valueControl.honey = true;
  console.log("value control.sujet dans test 3: " + valueControl.honey);
  return true;
}

/**
 *
 *
 */

function checkAllUserInput() {
  if (
    !valueControl.civilite ||
    !valueControl.lastname ||
    !valueControl.firstname ||
    !valueControl.email ||
    !valueControl.message
  ) {
    return false;
  } else {
    return true;
  }
}

/*async function test(req) {
  let test1 = await isSameOrigin(req);
  let test2 = await isBodyRequestNotEmpty(req);
  //let test3 = await checkReqBodyKeys(listOfKeys, tabRefOfKeys);
  let test9 = await checkUserValueSujet(sujet);
  let test4 = await checkUserValueCivilite(civilite);
  let test5 = await checkUserValueLastname(lastname);
  let test6 = await checkUserValueFirstname(firstname);
  let test7 = await checkUserValueEmail(email);
  let test8 = await checkUserValueMessage(message);
}*/

exports.testForm = (req, res) => {
  
  
  //enchainement des fonction de test
  
    
      isBodyRequestNotEmpty(req)
        .then((test1) => {
          if (!test1) {
            res.status(450).json({ error: "corp de requete vide" });
            
          } else {
            return checkReqBodyKeys(req, tabRefOfKeys);
          }
        })
        
        .then((test2) => {
          console.log("test 2: " + test2)
          if (!test2) {
            res.status(450).json({ error: "clefs du corps requet manquante" });
            
          } else {
            return checkUserValueSujet(req);
          }
        })
       
        .then((test3) => {
          if (!test3) {
            
            res.status(450).json({ error: "pot de miel" });
          }
          return checkUserValueCivilite(req);
        })
        .then((test4) => {
          if (!test4) {
            res.status(450).json({ error: "prb civilite" });
            
          }
          return checkUserValueLastname(req);
        })
        .then((test5) => {
          if (!test5) {
            res.status(450).json({ error: "prb lastname" });
            
          }
          return checkUserValueFirstname(req);
        })
        .then((test6) => {
          if (!test6) {
            res.status(450).json({ error: "prb firstname" });
            
          }
          return checkUserValueEmail(req);
        })
        .then((test7) => {
          if (!test7) {
            res.status(450).json({ error: "prb email" });
            
          }
          return checkUserValueMessage(req);
        })

        .then((test8) => {
          if (!test8) {
            res.status(450).json({ error: "prb message" });
          }
          res.status(250).json({ "message": "valide" });
          console.log("valeurs de control: " + valueControl.civilite);
        })

        .catch((error) => {
          console.log("error: " + error);
        });
  
};
