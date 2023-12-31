/****************************************************************************
 * Ensemble des fonctions de controle des données utilisateur       ******
 * *************************************************************************/

//Import des regEx
import { masqueNumber } from "../../regEx/regEx.js";

/**
 *Determine si l'expression' entrée en parametre est un nombre.
 *
 * @param {number} expression
 * @return {boolean}
 */

function testIfNumber(expression) {
  if (masqueNumber.test(expression) == true) {
    return true;
  }
  return false;
}

/**
 * Réalise une série de test pour valider les données inserées par l'utilisateur
 * sur le fieldset #calculette-mensualite
 *
 * @param {event} evt
 * @return {boolean}
 */
function checkValueUserMonthly(evt) {
  //Test si la valeurs de l'input user est un nombre
  let stringToTest = evt.target.value;
  let isNumber = testIfNumber(stringToTest);

  if (!isNumber) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }
    resultatError.innerHTML = "Veuillez entrer une valeur valide !";
    return false;
  }

  //test sur le montant du credit

  if (
    inputNumberPrix.value == "undefined" ||
    inputNumberPrix.value == "" ||
    inputNumberPrix.value == null
  ) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML = "Veuillez entrer un montant à financer valide !";

    return false;
  }

  if (parseInt(inputNumberPrix.value, 10) < 0) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML = "Le montant de l'emprunt doit etre positif !";

    return false;
  }

  if (
    parseInt(inputNumberPrix.value, 10) < parseInt(inputNumberApport.value, 10)
  ) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML =
      "Le prix du bien doit etre superieur à l'apport !";

    return false;
  }

  //test sur le montant de l' apport
  if (
    inputNumberApport.value == "undefined" ||
    inputNumberApport.value == "" ||
    inputNumberApport.value == null
  ) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML = "Veuillez entrer une valeur d'apport valide !";

    return false;
  }
  if (
    parseInt(inputNumberApport.value, 10) > parseInt(inputNumberPrix.value, 10)
  ) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML = "Votre apport est supérieur au prix du bien !";

    return false;
  }

  if (parseInt(inputNumberApport.value, 10) < 0) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML = "Votre apport doit être positif !";

    return false;
  }

  //test sur le taux du dredit

  if (
    inputNumberTaeg.value == "undefined" ||
    inputNumberTaeg.value == "" ||
    inputNumberTaeg.value == null
  ) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML = "Veuillez entrer un taux valide !";

    return false;
  }

  if (parseFloat(inputNumberTaeg.value, 10) <= 0) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML =
      "Votre taux d'emprunt ne peut pas être égal ou inférieur à zero !";

    return false;
  }

  if (parseFloat(inputNumberTaeg.value, 10) > 8) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML =
      "Votre taux d'emprunt ne peut pas superieur à 8% !";

    return false;
  }

  //test sur la durée de l' emprunt

  if (
    inputNumberDuree.value == "undefined" ||
    inputNumberDuree.value == "" ||
    inputNumberDuree.value == null
  ) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML = "veuillez entrer une durée valide!";

    return false;
  }

  if (parseInt(inputNumberDuree.value, 10) < 0) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML = "Votre duré d'emprunt ne peut pas être negative!";

    return false;
  }

  if (parseInt(inputNumberDuree.value, 10) > 35) {
    if (resultatError.classList.contains("hide")) {
      resultatError.classList.replace("hide", "display-error");
    }

    resultatError.innerHTML =
      "Votre durée d'emprunt ne peut pas superieur à 35ans!";

    return false;
  }

  //suprime del div resultat-error
  if (resultatError.classList.contains("display-error")) {
    resultatError.innerHTML = "";
    resultatError.classList.replace("display-error", "hide");
  }
  return true;
}

//Check l'input user revenu foncier;
function checkValueUserIncome(evt) {
  //Test si la valeurs de l'input user est un nombre
  let isNumber = testIfNumber(evt.target.value);

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
  ];

  for (let i = 0; i < inputsNumberTaxe.length; i++){

    let inputValue = inputsNumberTaxe[i].value;
    
    console.log("input value: " + inputValue)

    //Test si la valeur est un nombre
    let isNumber = testIfNumber(inputValue);
    console.log("isnumber: " + isNumber)

    if (!isNumber) {
      if (resultatErrorEquilibre.classList.contains("hide")) {
        resultatErrorEquilibre.classList.replace("hide", "display-error");
      }
  
      resultatErrorEquilibre.innerHTML =
        "Veuillez entrer un nombre dans le champ " + errorMessages[i];
      
      return false;
    }

    //test si la valeur est  null, vide ou undefined
    if (
      inputValue === "undefined" ||
      inputValue === "" ||
      inputValue === null
    ) {
      if (resultatErrorEquilibre.classList.contains("hide")) {
        resultatErrorEquilibre.classList.replace("hide", "display-error");
      }
  
      resultatErrorEquilibre.innerHTML =
        "Veuillez entrer une valeur valide dans le champ " +
        errorMessages[i];
  
      return false;
    }
    //test si la valeur est negative
    if (parseInt(inputValue) < 0) {
      if (resultatErrorEquilibre.classList.contains("hide")) {
        resultatErrorEquilibre.classList.replace("hide", "display-error");
      }
  
      resultatErrorEquilibre.innerHTML =
        "Votre valeur " + errorMessages[i] + " est négative!";
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
  testIfNumber,
  checkValueUserMonthly,
  checkValueUserDuty,
  checkValueUserIncome,
  checkValueUserRadioFiscal,
};
