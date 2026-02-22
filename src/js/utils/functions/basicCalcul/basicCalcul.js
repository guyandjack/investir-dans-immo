/****************************************************************************
 * *********              fonction de calul   ******
 * mensualite,
 * cout du cdredit
 * initialisation des inputs
 * *************************************************************************/

//import des fonctions
import {
  hideInputRadioRegimeFiscal,
  displayInputRadioRegimeFiscal,
  hideChargeReel,
  displayChargeReel,
  hideChargeForfaitaire,
  displayChargeForfaitaire,
  getLocationType,
  getTauxMarginalImposition,
  InsertTextInAElement,
} from "../other/other.js";

/**
 *  Fonction permettant de calculer les mensualites d'un credit immo

 * @param {number, number, number, number} montant, apport, taeg, periode
 * @return {} void
 */

// Fonction permettant de calculer les mensualites d'un credit immo
function mensualite(montant, apport, taeg, periode) {
  let capitalEmprunte = montant - apport;
  calculatedValue.capital = parseInt(capitalEmprunte, 10);
  let result =
    (capitalEmprunte * taeg) /
    100 /
    12 /
    (1 - Math.pow(1 + taeg / 100 / 12, -periode * 12));

  //Insertion dans l'objet calculated Value
  calculatedValue.mensualite = parseFloat(result).toFixed(2);

  //Insertion dans le DOM
  mensualiteTextStart.innerHTML = "Vos mensualités: ";
  resultat.innerHTML = result.toFixed(2);
  mensualiteTextEnd.innerHTML = " €";
}

/**
 *  fonction qui calcule le cout des interrest sur la periode d' emprunt
 * @param {}
 * @return {} void
 */

//
function coutDuCredit() {
  let capital = calculatedValue.capital;
  let mensualite = calculatedValue.mensualite;
  let duree = parseInt(inputNumberDuree.value, 10);

  let interest = mensualite * (duree * 12) - capital;
  let result = parseFloat(interest).toFixed(2);

  //Insertion dans l'objet globalresult
  calculatedValue.interet = result;

  //Insertion dans elemnt du DOM
  interestTextStart.innerHTML = "Coût de l'emprunt: ";
  interestCredit.innerHTML = result;
  interestTextEnd.innerHTML = " €";
}

/**
 *  Initialise les value des inputs number et range
 * @param {}
 * @return {} void
 */

function initInputValue() {
  /*******Input number ******/
  //mensualite
  inputNumberPrix.value = parseInt(dataValueInit.price, 10);
  inputNumberApport.value = parseInt(
    (dataValueInit.price * dataValueInit.rateAdvice) / 100,
    10,
  );
  inputNumberTaeg.value = parseInt(dataValueInit.taeg, 10);
  inputNumberDuree.value = parseInt(dataValueInit.periode, 10);

  //revenu immobilier
  inputNumberRevenuHorsCharge.value = parseInt(dataValueInit.income, 10);
  calculatedValue.income = parseInt(dataValueInit.income, 10);

  inputNumberRevenuChargeComprise.value = parseInt(dataValueInit.incomeCc, 10);
  calculatedValue.incomeCc = parseInt(dataValueInit.incomeCc, 10);

  //charges et taxes
  inputNumberCopro.value = parseInt(dataValueInit.copro, 10);
  inputNumberGestion.value = parseInt(
    (dataValueInit.rateGestion / 100) * dataValueInit.income * 12,
    10,
  );
  inputNumberApno.value = parseInt(dataValueInit.apno, 10);
  inputNumberAli.value = parseInt(dataValueInit.ali, 10);
  inputNumberFoncier.value = parseInt(dataValueInit.foncier, 10);
  inputNumberHabitation.value = parseInt(dataValueInit.habitation, 10);
  inputNumberCfe.value = parseInt(dataValueInit.cfe, 10);
  inputNumberChargeNondeductible.value = parseInt(
    dataValueInit.nondeductible,
    10,
  );
  inputNumberChargeDeductible.value = parseInt(dataValueInit.deductible, 10);
  calculatedValue.dutyDeductible = parseInt(dataValueInit.deductible, 10);

  /****Input range *******/
  //mesualite
  inputRangePrix.value = inputNumberPrix.value;
  inputRangeApport.value = inputNumberApport.value;
  inputRangeTaeg.value = inputNumberTaeg.value;
  inputRangeDuree.value = inputNumberDuree.value;

  //revenu immobilier
  inputRangeRevenuHorsCharge.value = inputNumberRevenuHorsCharge.value;
  inputRangeRevenuChargeComprise.value = inputNumberRevenuChargeComprise.value;

  //charges et taxes
  inputRangeCopro.value = inputNumberCopro.value;
  inputRangeGestion.value = inputNumberGestion.value;
  inputRangeApno.value = inputNumberApno.value;
  inputRangeAli.value = inputNumberAli.value;
  inputRangeFoncier.value = inputNumberFoncier.value;
  inputRangeHabitation.value = inputNumberHabitation.value;
  inputRangeCfe.value = inputNumberCfe.value;
  inputRangeChargeNondeductible.value = inputNumberChargeNondeductible.value;
  inputRangeChargeDeductible.value = inputNumberChargeDeductible.value;

  //input radio "type de location"
  inputRadioLocationNue.checked = true;
  calculatedValue.locationType = "nue";

  //input radio "taux de marge imposition"
  inputRadioTauxMarginalDefault.checked = true;
  calculatedValue.rateIncome = 30;

  //input radio "regime d'imposition"
  inputRadioRegimeForfaitaire.checked = true;
  calculatedValue.fiscalChoice = "forfaitaire";
  calculatedValue.fiscalChoiceMemo = "forfaitaire";

  //fieldset simulation

  //revenu locatif de reference

  if (dataValueInit.locationtype == "nue") {
    totalRevenuReferenceValue.innerHTML = parseInt(
      dataValueInit.income * 12,
      10,
    );
  } else {
    totalRevenuReferenceValue.innerHTML = parseInt(
      dataValueInit.incomeCc * 12,
      10,
    );
  }
}

//initialisation du div resultat impot foncier
function initResultatFiscal() {
  //Modifie le titre
  titreRegimeImposition.innerHTML = "Choix du regime d'imposition";
}

//fonction qui calcule les revenus locatif sur un an
function incomeByYear() {
  let income = parseInt(inputNumberRevenuHorsCharge.value, 10);
  let incomeCc = parseInt(inputNumberRevenuChargeComprise.value, 10);

  //insertion dans l'objet
  calculatedValue.income = income;
  calculatedValue.incomeCc = incomeCc;

  //insertion dans le DOM sous l'input revenu
  incomeOnYear.innerHTML = income * 12 + " €/an";
  incomeOnYearCc.innerHTML = incomeCc * 12 + " €/an";

  //insertion dans le DOM fielset "simulation"

  totalRevenuLocatifValue.innerHTML = incomeCc * 12;

  if (calculatedValue.locationType == "nue") {
    totalRevenuReferenceValue.innerHTML = income * 12;
  } else {
    totalRevenuReferenceValue.innerHTML = incomeCc * 12;
  }
}

/**
 * affiche ou cache des elemnts en fonction de la valeur de "incomeUser"
 *
 */

function controlValueOfIncome() {
  //En fonction du type de location nue ou meublé le seuil regime réel obligatoir diffère
  let income = parseInt(calculatedValue.income * 12, 10);
  let incomeCC = parseInt(calculatedValue.incomeCc * 12, 10);
  let incomeReference = 0;
  let seuil = 0;
  let typeLocation = calculatedValue.locationType;
  let fiscalChoiceSave = calculatedValue.fiscalChoiceMemo;
  console.log("fiscal choice user memo: " + fiscalChoiceSave);

  switch (typeLocation) {
    case "nue":
      seuil = 15300;
      incomeReference = income;
      break;

    case "meuble":
      seuil = 77700;
      incomeReference = incomeCC;
      break;

    default:
      break;
  }

  if (incomeReference > seuil) {
    //Modification du choix fiscal
    inputRadioRegimeReel.checked = true;
    calculatedValue.fiscalChoice = "reel";

    //Modification du titre
    titreRegimeImposition.innerHTML = "Regime réel obligatoire";

    //Affiche les charges de type "reel"
    hideChargeForfaitaire();
    displayChargeReel();

    //cache les inputs de type radio "choix du regime fiscal"
    hideInputRadioRegimeFiscal();

    return "no-choice";
  }

  if (incomeReference <= seuil) {
    //Modifie le titre
    titreRegimeImposition.innerHTML = "Choix du regime d'imposition";

    //Affiche les inputs de type radio
    displayInputRadioRegimeFiscal();

    switch (fiscalChoiceSave) {
      case "reel":
        //Modification du choix fiscal
        calculatedValue.fiscalChoice == "reel";
        calculatedValue.fiscalChoiceMemo == "reel";
        inputRadioRegimeForfaitaire.checked = false;
        inputRadioRegimeReel.checked = true;

        //Affiche les charges de type "reel"
        hideChargeForfaitaire();
        displayChargeReel();
        break;

      case "forfaitaire":
        //Modification du choix fiscal
        calculatedValue.fiscalChoice == "forfaitaire";
        calculatedValue.fiscalChoiceMemo == "forfaitaire";
        inputRadioRegimeReel.checked = false;
        inputRadioRegimeForfaitaire.checked = true;
        //Affiche les charges de type "forfaitaire"
        hideChargeReel();
        displayChargeForfaitaire();
        break;

      default:
        break;
    }

    return "choice";
  }
}

function getTotalDuty() {
  let dutyTotal;
  if (
    calculatedValue.locationType == "nue" &&
    calculatedValue.fiscalChoice == "forfaitaire"
  ) {
    dutyTotal =
      //mensualite emprunt
      parseInt(calculatedValue.mensualite * 12) +
      //charges
      parseInt(inputNumberCopro.value, 10) +
      parseInt(inputNumberGestion.value, 10) +
      parseInt(inputNumberApno.value, 10) +
      parseInt(inputNumberAli.value, 10) +
      parseInt(inputNumberFoncier.value, 10) +
      parseInt(inputNumberHabitation.value, 10);
  } else if (
    calculatedValue.locationType == "nue" &&
    calculatedValue.fiscalChoice == "reel"
  ) {
    dutyTotal =
      //mensualite emprunt
      parseInt(calculatedValue.mensualite * 12) +
      //charges
      parseInt(inputNumberHabitation.value, 10) +
      parseInt(inputNumberChargeNondeductible.value, 10) +
      parseInt(inputNumberChargeDeductible.value, 10);
  } else if (
    calculatedValue.locationType == "meuble" &&
    calculatedValue.fiscalChoice == "forfaitaire"
  ) {
    dutyTotal =
      //mensualite emprunt
      parseInt(calculatedValue.mensualite * 12) +
      //charges
      parseInt(inputNumberCopro.value, 10) +
      parseInt(inputNumberGestion.value, 10) +
      parseInt(inputNumberApno.value, 10) +
      parseInt(inputNumberAli.value, 10) +
      parseInt(inputNumberFoncier.value, 10) +
      parseInt(inputNumberHabitation.value, 10) +
      parseInt(inputNumberCfe.value, 10);
  } else if (
    calculatedValue.locationType == "meuble" &&
    calculatedValue.fiscalChoice == "reel"
  ) {
    dutyTotal =
      //mensualite emprunt
      parseInt(calculatedValue.mensualite * 12) +
      //charges
      parseInt(inputNumberHabitation.value, 10) +
      parseInt(inputNumberChargeNondeductible.value, 10) +
      parseInt(inputNumberChargeDeductible.value, 10) +
      parseInt(inputNumberCfe.value, 10);
  } else {
    console.log("total des charges:" + dutyTotal);
    return false;
  }
  console.log("total des charges:" + dutyTotal);
  calculatedValue.duty = dutyTotal;
  //insertion dans le DOM fielset simulation
  toltalChargeValue.innerHTML = calculatedValue.duty;
  return dutyTotal;
}

//fonction qui etabli un bilan entre revenu locatif auquel on soustrait  "charge" et "mensualite*12"
//bilan avant imposition
function balance() {
  getTotalDuty();

  console.log("calculated value incomeCC: " + calculatedValue.incomeCc);
  let balance = parseInt(
    calculatedValue.incomeCc * 12 - calculatedValue.duty,
    10,
  );

  console.log("bilan avant impot: " + balance);
  calculatedValue.balance = balance;
  bilanAvantImpotValue.innerHTML = calculatedValue.balance;
}

//détermination de l'assiette imposable en fonction du "type de location" et du "regime d'imposition"
function getAssietteImposable() {
  //-1- location "nue" regime imposition forfaitaire
  if (
    calculatedValue.locationType == "nue" &&
    calculatedValue.fiscalChoice == "forfaitaire"
  ) {
    //abattement 30% sur loyer hors charge
    let assietteImposable = parseInt(
      (calculatedValue.income * 12 * 7) / 10,
      10,
    );
    calculatedValue.assietteimposable = assietteImposable;
    assietteImposableDefinition.innerHTML =
      "Revenu de reférence - abattement forfaitaire de 30%";

    assietteImposableTitre.innerHTML = "Assiette imposable";
    assietteImposableValue.innerHTML = assietteImposable;

    return assietteImposable;
  }

  //-2- location "meublée" regime imposition forfaitaire
  else if (
    calculatedValue.locationType == "meuble" &&
    calculatedValue.fiscalChoice == "forfaitaire"
  ) {
    //abattement 50% sur loyer charges comprises
    let assietteImposable = parseInt(
      (calculatedValue.incomeCc * 12 * 5) / 10,
      10,
    );
    calculatedValue.assietteimposable = assietteImposable;
    assietteImposableDefinition.innerHTML =
      "Revenu de reférence - abattement forfaitaire de 50%";
    assietteImposableValue.innerHTML = assietteImposable;
    return assietteImposable;
  }

  //-3- location "nue"  regime imposition "réel"
  else if (
    calculatedValue.locationType == "nue" &&
    calculatedValue.fiscalChoice == "reel"
  ) {
    //loyer hors charge - charges deductibles
    console.log("charge deductible : " + calculatedValue.dutyDeductible);
    let assietteImposable = parseInt(
      calculatedValue.income * 12 - calculatedValue.dutyDeductible,
      10,
    );
    calculatedValue.assietteimposable = assietteImposable;
    assietteImposableDefinition.innerHTML =
      "Revenu de reférence - charges déductibles";
    assietteImposableValue.innerHTML = assietteImposable;

    if (assietteImposable > 0) {
      assietteImposableTitre.innerHTML = "Assiette imposable";
    }
    if (assietteImposable <= 0) {
      assietteImposableTitre.innerHTML = "Déficite foncier";
    }
    return assietteImposable;
  }

  //-4- location "meuble"  regime imposition "réel"
  else if (
    calculatedValue.locationType == "meuble" &&
    calculatedValue.fiscalChoice == "reel"
  ) {
    //loyer charges comprises - charges deductibles
    console.log("charge deductible : " + calculatedValue.dutyDeductible);
    let assietteImposable = parseInt(
      calculatedValue.incomeCc * 12 - calculatedValue.dutyDeductible,
      10,
    );
    calculatedValue.assietteimposable = assietteImposable;
    assietteImposableDefinition.innerHTML =
      "Revenu de reférence - charges déductibles";
    assietteImposableValue.innerHTML = assietteImposable;
    if (assietteImposable > 0) {
      assietteImposableTitre.innerHTML = "Assiette imposable";
    }
    if (assietteImposable <= 0) {
      assietteImposableTitre.innerHTML = "Déficite foncier";
    }
    return assietteImposable;
  } else {
    return false;
  }
}

function calculeImpotRevenuFoncier() {
  let assietteImposable = getAssietteImposable();
  console.log("assiette impo: " + assietteImposable);
  let tauxMarginalImposition = getTauxMarginalImposition();

  if (assietteImposable <= 0) {
    //affichage montant impot
    impotFoncierValue.innerHTML = 0;

    //insertion ds l'objet
    calculatedValue.impotFoncier = 0;
    return;
  }

  console.log("assiette imposable: " + assietteImposable);

  let rate = tauxMarginalImposition + dataValueInit.tauxImpoFoncier;
  let impotFoncier = parseInt((assietteImposable * rate) / 100);

  //insertion ds l'objet
  calculatedValue.impotFoncier = impotFoncier;

  //affichage montant impot
  impotFoncierValue.innerHTML = impotFoncier;
  console.log("impot foncier: " + impotFoncier);
}

function bilanApresImposition() {
  let bilanFinal = calculatedValue.balance - calculatedValue.impotFoncier;
  //affichage dans bilan final

  if (bilanFinal <= 0) {
    containerSimulation.classList.remove("border-positif");
    containerSimulation.classList.add("border-negatif");
    simulationTitre.classList.remove("titre-positif");
    simulationTitre.classList.add("titre-negatif");
    coutMensuelContainer.classList.replace("result-positif", "result-negatif");
    
    bilanApresImpositionValue.innerHTML = bilanFinal;
    coutMensuelTitre.innerHTML =
      "Dans ces conditions, votre bien en location vous coûte:";
    coutMensuelValue.innerHTML = parseInt(Math.abs(bilanFinal / 12), 10);
  }


  if (bilanFinal > 0) {
    containerSimulation.classList.remove("border-negatif");
    containerSimulation.classList.add("border-positif");
    simulationTitre.classList.remove("titre-negatif");
    simulationTitre.classList.add("titre-positif");
    coutMensuelContainer.classList.replace("result-negatif", "result-positif");

    bilanApresImpositionValue.innerHTML = bilanFinal;
    coutMensuelTitre.innerHTML =
      "Dans ces conditions, votre bien en location vous rapporte:";
    coutMensuelValue.innerHTML = parseInt(bilanFinal / 12, 10);
  }
}

export {
  mensualite,
  coutDuCredit,
  initInputValue,
  initResultatFiscal,
  incomeByYear,
  controlValueOfIncome,
  balance,
  calculeImpotRevenuFoncier,
  bilanApresImposition,
};
