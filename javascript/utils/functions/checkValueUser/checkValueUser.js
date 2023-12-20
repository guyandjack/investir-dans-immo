/****************************************************************************
 * Ensemble des fonctions de controle des données utilisateur       ******
 * *************************************************************************/


/**
 *Determine si l'expression' entrée en parametre est un nombre.
 *
 * @param {number} expression
 * @return {boolean}
 */

function testIfNumber(expression) {
  if (Number.isNaN(expression)) {
    return false;
  }
  return true;
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
  let isNumber = testIfNumber(evt.target.value);
  console.log("etat de testIfNnumber: " + isNumber);
  if (!isNumber) {
    containerResultat.classList.add("error");
    resultat.innerHTML = "Veuillez entrer une valeur valide !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  //test sur le montant du credit

  if (
    inputNumberPrix.value == "undefined" ||
    inputNumberPrix.value == "" ||
    inputNumberPrix.value == null
  ) {
    containerResultat.classList.add("error"); //backgcolor orange
    resultat.classList.add("resultat-error"); //color white
    resultat.innerHTML = "Veuillez entrer un prix valide !"; //error message
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberPrix.value, 10) < 0) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Le montant de l'emprunt doit etre positif !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (
    parseInt(inputNumberPrix.value, 10) < parseInt(inputNumberApport.value, 10)
  ) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Le prix du bien doit etre superieur à l'apport !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  //test sur le montant de l' apport
  if (
    inputNumberApport.value == "undefined" ||
    inputNumberApport.value == "" ||
    inputNumberApport.value == null
  ) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Veuillez entrer une valeur d'apport valide !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }
  if (
    parseInt(inputNumberApport.value, 10) > parseInt(inputNumberPrix.value, 10)
  ) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre apport est supérieur au prix du bien !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberApport.value, 10) < 0) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre apport ne peut pas être negatif !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  //test sur le taux du dredit

  if (
    inputNumberTaeg.value == "undefined" ||
    inputNumberTaeg.value == "" ||
    inputNumberTaeg.value == null
  ) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Veuillez entrer un taux valide !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseFloat(inputNumberTaeg.value, 10) <= 0) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre taux d'emprunt ne peut pas être égal ou inférieur à zero !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseFloat(inputNumberTaeg.value, 10) > 8) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre taux d'emprunt ne peut pas superieur à 8% !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  //test sur la durée de l' emprunt

  if (
    inputNumberDuree.value == "undefined" ||
    inputNumberDuree.value == "" ||
    inputNumberDuree.value == null
  ) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "veuillez entrer une durée valide!";
    interestCredit.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberDuree.value, 10) < 0) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre duré d'emprunt ne peut pas être negative!";
    interestCredit.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberDuree.value, 10) > 30) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre durée d'emprunt ne peut pas superieur à 30ans!";
    interestCredit.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }
  containerResultat.classList.remove("error");
  resultat.classList.remove("resultat-error");
  interestCredit.classList.remove("hide");
  containerInterest.classList.remove("hide");
  mensualiteTextStart.classList.remove("hide");
  mensualiteTextEnd.classList.remove("hide");
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
  incomeOnYear.innerHTML = parseInt(inputNumberRevenu.value * 12, 10) +  " €/an";
  incomeOnYear.style.color = "black";
  return true;
}

//check les inputs de charges et taxes
function checkValueUserDuty() {
  let errorMessages = [
    "charges de coproprietés",
    "charges locative",
    "primes d'assurance (PNO)",
    "primes d' assurance loyer impayé",
    "taxe fonciére",
    "taxe d'habitation",
  ];

  let inputs = document.querySelectorAll("#charge-taxe input[type='number]");

  inputs.forEach((input, index) => {
    //Test si la valeur est un nombre
    let isNumber = testIfNumber(input.value);
    if (!isNumber) {
      containerResultatBalance.classList.remove("error");
      containerResultatBalance.classList.add("error");
      equilibreTextStart.innerHTML =
        "Veuillez entrer un montant dans le champ " + errorMessages[index];

      return false;
    }

    //test si la valeur est non null
    if (
      inputNumber.value == "undefined" ||
      inputNumber.value == "" ||
      inputNumber.value == null
    ) {
      containerResultatBalance.classList.remove("error");
      containerResultatBalance.classList.add("error");
      equilibreTextStart.innerHTML =
        "Veuillez entrer une valeur valide dans le champ " +
        errorMessages[index];
      errorMessages[index];
      return false;
    }

    //test si la valeur est positive
    if (parseInt(input.value) < 0) {
      containerResultatBalance.classList.remove("error");
      containerResultatBalance.classList.add("error");
      equilibreTextStart.innerHTML =
        "Votre valeur " + errorMessages[index] + " est negative!";
      return false;
    }

    //test si la valeur n'est pas supérieur à 10000
    if (parseInt(input.value) > 10000) {
      containerResultatBalance.classList.remove("error");
      containerResultatBalance.classList.add("error");
      equilibreTextStart.innerHTML =
        "Votre valeur" + errorMessages[index] + " est supérireur à 10000 ";
      return false;
    }
  });

  containerResultatBalance.classList.remove("error");
  return true;
}



/**
 * test si le user à cocher un "type de location", "tranche d' imposition" et un "regime d' imposition"
 * 
 * @return {} boolean 
 */
function checkValueUserRadioFiscal() {
    
    //condition 1: un type de location doit etre choisi
    let inputRadioTypeLocation = document.querySelectorAll(
      "#location-type-container-radio input[name='type-location']:checked"
    );
    if (inputRadioTypeLocation.length < 1) {
      bilanResultat.innerHTML =
        "Veuillez sélectionner un type de location.";
      return false;
    }


    //condition 2: une tranche d'imposition doit etre choisi
    let inputRadioChoiceImpot = document.querySelectorAll(
        "#fiscal input[name='taux-impot']:checked"
    );

    if (inputRadioChoiceImpot.length < 1) {
        bilanResultat.innerHTML = "Veuillez sélectionner une tranche d'imposition.";
        return false
    }

    //condition 3: un regime d' imposition sur revenu foncier doit etre choisi
    let inputRadioChoiceFiscal = document.querySelectorAll(
        "#fiscal input[name='regime-fiscal']:checked"
    );

    if (inputRadioChoiceFiscal.length < 1) {
        bilanResultat.innerHTML =
            "Veuillez sélectionner un régime fiscal réel ou forfaitaire";
        return false
    }

    return true
}







export {
    testIfNumber,
    checkValueUserMonthly,
    checkValueUserDuty,
    checkValueUserIncome,
    checkValueUserRadioFiscal,
    
};
