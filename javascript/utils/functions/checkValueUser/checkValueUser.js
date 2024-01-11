/****************************************************************************
 ***** Ensemble des fonctions de controle des données utilisateur       ******
 * *************************************************************************/

//Import des regEx
import { masqueNumberFloat, masqueNumberInt } from "../../regEx/regEx.js";

/**
 *Determine si l'expression' entrée en parametre est un nombre.
 *
 * @param {number} expression
 * @return {boolean}
 */

function testIfNumberInt(expression) {
  if (masqueNumberInt.test(expression) == true) {
    return true;
  }
  return false;
}

function testIfNumberFloat(expression) {
  if (masqueNumberFloat.test(expression) == true) {
    return true;
  }
  return false;
}

/**
 * fonction qui controle l'input user "financement"
 *
 * @param {event} evt
 * @return {boolean}
 */
function checkFinancement() {}

/**
 * Réalise une série de test pour valider les données inserées par l'utilisateur
 * sur le fieldset #calculette-mensualite
 *
 * @param {event} evt
 * @return {boolean}
 */
function checkValueUserMonthly(evt) {
  let elementInputUser = evt.target;
  let elemntInputType = evt.target.type;
  let elementInputValue = evt.target.value;
  let elementInputName = evt.target.name;

  console.log("value input user used: " + elementInputValue);
  console.log("type of value input user used: " + typeof elementInputValue);

  //reference des erreurs
  let errorObject = {
    financement: {
      nan: "Veuillez entrer une valeur valide !",
      stateNan: false,
      fourchette:
        "Le montant à financer doit être compris entre 1 et 1 000 000 !",
      stateFourchette: false,
      condition: "Le montant à financer doit etre supérieur à l'apport !",
      stateCondition: false,
    },
    apport: {
      nan: "Veuillez entrer une valeur valide !",
      stateNan: false,
      fourchette: "L'apport doit être compris entre 1 et 1 000 000 !",
      stateFourchette: false,
      condition: "L'apport doit être inférieur au montant à financer !",
      stateCondition: false,
    },
    taeg: {
      nan: "Veuillez entrer une valeur valide !",
      stateNan: false,
      fourchette: "Le TAEG doit être compris entre 0.1% et 10% !",
      stateFourchette: false,
    },
    duree: {
      nan: "Veuillez entrer une valeur valide !",
      stateNan: false,
      fourchette:
        "La durée de l'emprunt doit être comprise entre 1 et 35 ans !",
      stateFourchette: false,
    },
  };

  //container input ou sera appliqué un style error
  let containerInput;

  //definit le container input si l'înput number est modifié
  if (elemntInputType == "number") {
    containerInput = elementInputUser.parentElement;
  }

  //definit le container input si l'înput range est modifié
  if (elemntInputType == "range") {
    let mainParent = elementInputUser.parentElement.parentElement;
    containerInput = mainParent.querySelector(".container-input-number");
  }

  /*** test sur l'input user "financement" ***/
  /*** start ***/

  if (elementInputName == "number-prix" || elementInputName == "range-prix") {
    if (
      !testIfNumberInt(elementInputValue) 
    ) {
      console.log("boucle erreur input prix test number lancée");
      // -1- test si la valeur est un nombre
      //Validation de l'erreur ds l'objet
      errorObject.financement.stateNan = true;
      console.log(
        "flag error financemenent stateNan: " + errorObject.financement.stateNan
      );

      // affichage du div error
      if (resultatError.classList.contains("hide")) {
        resultatError.classList.replace("hide", "display-error");
      }

      //affichage du message d'erreur correspondant
      resultatError.innerHTML = errorObject.financement.nan;

      //applique le style "error" de l'input
      if (containerInput.classList.contains("input-valid")) {
        containerInput.classList.replace("input-valid", "input-error");
      }
    } else {
      console.log("boucle valide input prix test number lancéé");
      //Validation de l'erreur ds l'objet
      errorObject.financement.stateNan = false;

      // cache le div error
      if (resultatError.classList.contains("display-error")) {
        resultatError.classList.replace("display-error", "hide");
      }

      //suppression du message d' erreur correspondant
      resultatError.innerHTML = "";

      //applique le style "valid" de l'input
      if (containerInput.classList.contains("input-error")) {
        containerInput.classList.replace("input-error", "input-valid");
      }
    }

    //  -2- test si la valeur est comprise dans la fourchette

    //test 2 est lancé si le resultat du test 1 est validé
    if (!errorObject.financement.stateNan) {
      

      if (
        parseInt(elementInputValue, 10) < 1 ||
        parseInt(elementInputValue, 10) > 1000000
      ) {
        console.log("boucle error input prix test fourchette lancéé");
        //Validation de l'erreur ds l'objet
        errorObject.financement.stateFourchette = true;

        // affichage du div error
        if (resultatError.classList.contains("hide")) {
          resultatError.classList.replace("hide", "display-error");
        }

        //affichage du message d'erreur correspondant
        resultatError.innerHTML = errorObject.financement.fourchette;

        //applique le style "error" de l'input
        if (containerInput.classList.contains("input-valid")) {
          containerInput.classList.replace("input-valid", "input-error");
        }
      } else {
        console.log("boucle valide input prix test fourchette lancéé");
        //Validation de l'erreur ds l'objet
        errorObject.financement.stateFourchette = false;

        // cache le div error
        if (resultatError.classList.contains("display-error")) {
          resultatError.classList.replace("display-error", "hide");
        }

        //suppression du message d' erreur correspondant
        resultatError.innerHTML = "";

        //applique le style "valid" de l'input
        if (containerInput.classList.contains("input-error")) {
          containerInput.classList.replace("input-error", "input-valid");
        }
      }
    }
    
    
    //  -3- test si le financement est superieur à l' apport

    //test 3 est lancé si les test 1 et 2 sont validés
    if (
      !errorObject.financement.stateNan &&
      !errorObject.financement.stateFourchette
    ) {
      if (
        parseInt(elementInputValue, 10) < parseInt(inputNumberApport.value, 10)
      ) {
        console.log("boucle error input prix test condition lancéé");
        //Validation de l'erreur ds l'objet
        errorObject.financement.stateCondition = true;

        // affichage du div error
        if (resultatError.classList.contains("hide")) {
          resultatError.classList.replace("hide", "display-error");
        }

        //affichage du message d' erreur correspondant
        resultatError.innerHTML = errorObject.financement.condition;

        //applique le style "error" de l'input
        if (containerInput.classList.contains("input-valid")) {
          containerInput.classList.replace("input-valid", "input-error");
        }
      } else {
        console.log("boucle valide input prix test condition lancéé");
        //Validation de l'erreur ds l'objet
        errorObject.financement.stateCondition = false;

        // cache le div error
        if (resultatError.classList.contains("display-error")) {
          resultatError.classList.replace("display-error", "hide");
        }

        //suppression du message d'erreur correspondant
        resultatError.innerHTML = "";

        //applique le style "valid" de l'input
        if (containerInput.classList.contains("input-error")) {
          containerInput.classList.replace("input-error", "input-valid");
        }
      }
    }
  }

  /*** test sur l'input user "financement" ***/
  /*** end ***/





  /*** test sur l'input user "apport" ***/
  /*** start ***/

  if (
    elementInputName == "number-apport" ||
    elementInputName == "range-apport"
  ) {
    if (!testIfNumberInt(elementInputValue)) {
      console.log("boucle erreur input apport test nan lancéé");
      // -1- test si la valeur est un nombre
      //Validation de l'erreur ds l'objet
      errorObject.apport.stateNan = true;

      // affichage du div error
      if (resultatError.classList.contains("hide")) {
        resultatError.classList.replace("hide", "display-error");
      }

      //affichage du message d' erreur correspondant
      resultatError.innerHTML = errorObject.apport.nan;

      //applique le style "error" de l'input
      if (containerInput.classList.contains("input-valid")) {
        containerInput.classList.replace("input-valid", "input-error");
      }
    } else {
      //Validation de l'erreur ds l'objet
      errorObject.apport.stateNan = false;

      // cache le div error
      if (resultatError.classList.contains("display-error")) {
        resultatError.classList.replace("display-error", "hide");
      }

      //suppression du message d' erreur correspondant
      resultatError.innerHTML = "";

      //applique le style "valid" de l'input
      if (containerInput.classList.contains("input-error")) {
        containerInput.classList.replace("input-error", "input-valid");
      }
    }

    //  -2- test si la valeur est comprise ds la fourchette

    // Le test 2 est lancé si le test un est validé
    if (!errorObject.apport.stateNan) {
      
    
      if (
        parseInt(elementInputValue, 10) < 1 ||
        parseInt(elementInputValue, 10) > 1000000
      ) {
        //Validation de l'erreur ds l'objet
        errorObject.apport.stateFourchette = true;

        // affichage du div error
        if (resultatError.classList.contains("hide")) {
          resultatError.classList.replace("hide", "display-error");
        }

        //affichage du message d' erreur correspondant
        resultatError.innerHTML = errorObject.apport.fourchette;

        //applique le style "error" de l'input
        if (containerInput.classList.contains("input-valid")) {
          containerInput.classList.replace("input-valid", "input-error");
        }
      } else {
        //Validation de l'erreur ds l'objet
        errorObject.apport.stateFourchette = false;

        // cache le div error
        if (resultatError.classList.contains("display-error")) {
          resultatError.classList.replace("display-error", "hide");
        }

        //suppression du message d' erreur correspondant
        resultatError.innerHTML = "";

        //applique le style "valid" de l'input
        if (containerInput.classList.contains("input-error")) {
          containerInput.classList.replace("input-error", "input-valid");
        }
      }
    }

    //  -3- test si l'apport est inferirur au financement
    // le test 3 est lancé si le test 1 et le test 2 sont validés
    if (
      !errorObject.apport.stateNan &&
      !errorObject.apport.stateFourchette
    ) {

      if (parseInt(elementInputValue, 10) > parseInt(inputNumberPrix.value, 10)) {
        //Validation de l'erreur ds l'objet
        errorObject.apport.stateCondition = true;

        // affichage du div error
        if (resultatError.classList.contains("hide")) {
          resultatError.classList.replace("hide", "display-error");
        }

        //affichage du message d' erreur correspondant
        resultatError.innerHTML = errorObject.apport.condition;

        //applique le style "error" de l'input
        if (containerInput.classList.contains("input-valid")) {
          containerInput.classList.replace("input-valid", "input-error");
        }
      } else {
        //Validation de l'erreur ds l'objet
        errorObject.apport.stateCondition = false;

        // cache le div error
        if (resultatError.classList.contains("display-error")) {
          resultatError.classList.replace("display-error", "hide");
        }

        //suppression du message d'erreur correspondant
        resultatError.innerHTML = "";

        //applique le style "valid" de l'input
        if (containerInput.classList.contains("input-error")) {
          containerInput.classList.replace("input-error", "input-valid");
        }
      }
    }
  }

  /*** test sur l'input user "apport" ***/
  /*** end ***/






  /*** test sur l'input user "TAEG" ***/
  /*** start ***/

  if (
    elementInputName == "number-taeg" ||
    elementInputName == "range-taeg"
  ) {
    if (!testIfNumberFloat(elementInputValue)) {
      // -1- test si la valeur est un nombre
      //Validation de l'erreur ds l'objet
      errorObject.taeg.stateNan = true;

      // affichage du div error
      if (resultatError.classList.contains("hide")) {
        resultatError.classList.replace("hide", "display-error");
      }

      //affichage du message d' erreur correspondant
      resultatError.innerHTML = errorObject.taeg.nan;

      //applique le style "error" de l'input
      if (containerInput.classList.contains("input-valid")) {
        containerInput.classList.replace("input-valid", "input-error");
      }
    } else {
      //Validation de l'erreur ds l'objet
      errorObject.taeg.stateNan = false;

      // cache le div error
      if (resultatError.classList.contains("display-error")) {
        resultatError.classList.replace("display-error", "hide");
      }

      //suppression du message d' erreur correspondant
      resultatError.innerHTML = "";

      //applique le style "valid" de l'input
      if (containerInput.classList.contains("input-error")) {
        containerInput.classList.replace("input-error", "input-valid");
      }
    }

    //  -2- test si la valeur est comprise dans la fourchette
    // le test 2 est lancé si le test 1 est validé

    if (!errorObject.taeg.stateNan) {
      if (
        parseInt(elementInputValue, 10) < 0.01 ||
        parseInt(elementInputValue, 10) > 10
      ) {
        //Validation de l'erreur ds l'objet
        errorObject.taeg.stateFourchette = true;

        // affichage du div error
        if (resultatError.classList.contains("hide")) {
          resultatError.classList.replace("hide", "display-error");
        }

        //affichage du message d' erreur correspondant
        resultatError.innerHTML = errorObject.taeg.fourchette;

        //applique le style "error" de l'input
        if (containerInput.classList.contains("input-valid")) {
          containerInput.classList.replace("input-valid", "input-error");
        }
      } else {
        //Validation de l'erreur ds l'objet
        errorObject.taeg.stateFourchette = false;

        // cache le div error
        if (resultatError.classList.contains("display-error")) {
          resultatError.classList.replace("display-error", "hide");
        }

        //suppression du message d' erreur correspondant
        resultatError.innerHTML = "";

        //applique le style "valid" de l'input
        if (containerInput.classList.contains("input-error")) {
          containerInput.classList.replace("input-error", "input-valid");
        }
      }
    }
  }

  /*** test sur l'input user "TAEG" ***/
  /*** end ***/






  /*** test sur l'input user "Durée" ***/
  /*** start ***/

  if (
    elementInputName == "number-duree" ||
    elementInputName == "range-duree"
  ) {
    // -1- test si la valeur est un nombre
    if (!testIfNumberInt(elementInputValue)) {
      //Validation de l'erreur ds l'objet
      errorObject.duree.stateNan = true;

      // affichage du div error
      if (resultatError.classList.contains("hide")) {
        resultatError.classList.replace("hide", "display-error");
      }

      //affichage du message d' erreur correspondant
      resultatError.innerHTML = errorObject.duree.nan;

      //applique le style "error" de l'input
      if (containerInput.classList.contains("input-valid")) {
        containerInput.classList.replace("input-valid", "input-error");
      }
    } else {
      //Validation de l'erreur ds l'objet
      errorObject.duree.stateNan = false;

      // cache le div error
      if (resultatError.classList.contains("display-error")) {
        resultatError.classList.replace("display-error", "hide");
      }

      //suppression du message d' erreur correspondant
      resultatError.innerHTML = "";

      //applique le style "valid" de l'input
      if (containerInput.classList.contains("input-error")) {
        containerInput.classList.replace("input-error", "input-valid");
      }
    }

    //  -2- test si la valeur est comprise dans la fourchette
    // le test 2 est lancé si le test 1 est valide
    if (!errorObject.duree.stateNan) {
      if (
        parseInt(elementInputValue, 10) < 1 ||
        parseInt(elementInputValue, 10) > 35
      ) {
        //Validation de l'erreur ds l'objet
        errorObject.duree.stateFourchette = true;

        // affichage du div error
        if (resultatError.classList.contains("hide")) {
          resultatError.classList.replace("hide", "display-error");
        }

        //affichage du message d' erreur correspondant
        resultatError.innerHTML = errorObject.duree.fourchette;

        //applique le style "error" de l'input
        if (containerInput.classList.contains("input-valid")) {
          containerInput.classList.replace("input-valid", "input-error");
        }
      } else {
        //Validation de l'erreur ds l'objet
        errorObject.duree.stateFourchette = false;

        // cache le div error
        if (resultatError.classList.contains("display-error")) {
          resultatError.classList.replace("display-error", "hide");
        }

        //suppression du message d' erreur correspondant
        resultatError.innerHTML = "";

        //applique le style "valid" de l'input
        if (containerInput.classList.contains("input-error")) {
          containerInput.classList.replace("input-error", "input-valid");
        }
      }
    }
  }

  if (
    errorObject.financement.stateNan ||
    errorObject.financement.stateFourchette ||
    errorObject.financement.stateCondition ||
    errorObject.apport.stateNan ||
    errorObject.apport.stateFourchette ||
    errorObject.apport.stateCondition ||
    errorObject.taeg.stateNan ||
    errorObject.taeg.stateFourchette ||
    errorObject.duree.stateNan ||
    errorObject.duree.stateFourchette
  ) {
    return false;
  } else {
    return true;
  }
}

//Check l'input user revenu foncier;
function checkValueUserIncome(evt) {
  //Test si la valeurs de l'input user est un nombre
  let isNumber = testIfNumberInt(evt.target.value);

  if (!isNumber) {
    incomeOnYear.innerHTML = "Veuillez entrer un nombre !";
    incomeOnYear.style.color = "red";
    return false;
  }

  //test si la valeur est non null
  if (
    inputNumberRevenu.value == "undefined" ||
    inputNumberRevenu.value == "" ||
    inputNumberRevenu.value == null
  ) {
    incomeOnYear.innerHTML = "Veuillez entrer une valeur valide !";
    incomeOnYear.style.color = "red";
    return false;
  }

  //test si la valeur est positive
  if (parseInt(inputNumberRevenu.value) < 0) {
    incomeOnYear.innerHTML = "Veuillez entrer une valeur positive !";
    incomeOnYear.style.color = "red";
    return false;
  }
  incomeOnYear.innerHTML = parseInt(inputNumberRevenu.value * 12, 10) + " €/an";
  incomeOnYear.style.color = "inherit";
  return true;
}

//check les inputs de charges et taxes
function checkValueUserDuty() {
  let errorMessages = [
    "charges de coproprietés",
    "gestion locative",
    "primes d'assurance (PNO)",
    "primes d'assurance loyer impayé",
    "taxe foncière",
    "taxe d'habitation",
    "cfe",
    "charges non déductibles",
    "charges deductibles",
  ];

  for (let i = 0; i < inputsNumberTaxe.length; i++) {
    let inputValue = inputsNumberTaxe[i].value;

    console.log("input value: " + inputValue);

    //Test si la valeur est un nombre
    let isNumber = testIfNumberInt(inputValue);
    console.log("isnumber: " + isNumber);

    if (!isNumber) {
      if (resultatErrorEquilibre.classList.contains("hide")) {
        resultatErrorEquilibre.classList.replace("hide", "display-error");
      }

      resultatErrorEquilibre.innerHTML =
        "Veuillez entrer un nombre dans le champ<br/> « " +
        errorMessages[i] +
        " »";

      return false;
    }

    //test si la valeur est negative
    if (parseInt(inputValue) < 0) {
      if (resultatErrorEquilibre.classList.contains("hide")) {
        resultatErrorEquilibre.classList.replace("hide", "display-error");
      }

      resultatErrorEquilibre.innerHTML =
        "Le champ <br/>« " + errorMessages[i] + " » <br/>est négatif !";
      return false;
    }
  }
  if (resultatErrorEquilibre.classList.contains("display-error")) {
    resultatErrorEquilibre.innerHTML = "";
    resultatErrorEquilibre.classList.replace("display-error", "hide");
  }
  return true;
}

/**
 * test si le user à cocher un "type de location", "tranche d'imposition" et un "regime d'imposition"
 *
 * @return {} boolean
 */
function checkValueUserRadioFiscal() {
  //condition 1: un type de location doit etre choisi
  let inputRadioTypeLocation = document.querySelectorAll(
    "#location-type-container-radio input[name='type-location']:checked"
  );
  if (inputRadioTypeLocation.length < 1) {
    bilanResultat.innerHTML = "Veuillez sélectionner un type de location.";
    return false;
  }

  //condition 2: une tranche d'imposition doit etre choisi
  let inputRadioChoiceImpot = document.querySelectorAll(
    "#fiscal input[name='taux-impot']:checked"
  );

  if (inputRadioChoiceImpot.length < 1) {
    bilanResultat.innerHTML = "Veuillez sélectionner une tranche d'imposition.";
    return false;
  }

  //condition 3: un regime d' imposition sur revenu foncier doit etre choisi
  let inputRadioChoiceFiscal = document.querySelectorAll(
    "#fiscal input[name='regime-fiscal']:checked"
  );

  if (inputRadioChoiceFiscal.length < 1) {
    bilanResultat.innerHTML =
      "Veuillez sélectionner un régime fiscal réel ou forfaitaire";
    return false;
  }

  return true;
}

export {
  testIfNumberInt,
  testIfNumberFloat,
  checkValueUserMonthly,
  checkValueUserDuty,
  checkValueUserIncome,
  checkValueUserRadioFiscal,
};
