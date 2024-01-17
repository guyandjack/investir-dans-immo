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
    10
  );
  inputNumberTaeg.value = parseInt(dataValueInit.taeg, 10);
  inputNumberDuree.value = parseInt(dataValueInit.periode, 10);

  //revenu immobilier
  inputNumberRevenu.value = parseInt(dataValueInit.income, 10);
  calculatedValue.income = parseInt(dataValueInit.income, 10);
  InsertTextInAElement("#label-revenu", "Loyer hors charges ");

  //charges et taxes
  inputNumberCopro.value = parseInt(dataValueInit.copro, 10);
  inputNumberGestion.value = parseInt(
    (dataValueInit.rateGestion / 100) * dataValueInit.income * 12,
    10
  );
  inputNumberApno.value = parseInt(dataValueInit.apno, 10);
  inputNumberAli.value = parseInt(dataValueInit.ali, 10);
  inputNumberFoncier.value = parseInt(dataValueInit.foncier, 10);
  inputNumberHabitation.value = parseInt(dataValueInit.habitation, 10);
  inputNumberCfe.value = parseInt(dataValueInit.cfe, 10);
  inputNumberChargeNondeductible.value = parseInt(
    dataValueInit.nondeductible,
    10
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
  inputRangeRevenu.value = inputNumberRevenu.value;

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

  //input radio "regime d'imposition"
  inputRadioRegimeForfaitaire.checked = true;
  calculatedValue.fiscalChoice = "forfaitaire";
  calculatedValue.fiscalChoiceMemo = "forfaitaire";
}

//initialisation du div resultat impot foncier
function initResultatFiscal() {
  //Modifie le titre
  titreRegimeImposition.innerHTML = "Choix du regime d'imposition";
}

//fonction qui calcule les revenus locatif sur un an
function incomeByYear() {
  let income = parseInt(inputNumberRevenu.value * 12, 10);

  //insertion dans le DOM sous l'input revenu
  incomeOnYear.innerHTML = income + " €/an";

  //insertion dans le DOM dans le bilan avant imposition
  totalRevenuTextStart.innerHTML = "Total revenu: ";
  totalRevenu.innerHTML = income;
  totalRevenuTextEnd.innerHTML = " €/an";
}

/**
 * affiche ou cache des elemnts en fonction de la valeur de "incomeUser"
 *
 */
function controlValueOfIncome() {
  //En fonction du type de location nue ou meublé le seuil regime réel diffère
  let income = parseInt(calculatedValue.income * 12, 10);
  let seuil = 0;
  let typeLocation = calculatedValue.locationType;
  let fiscalChoiceSave = calculatedValue.fiscalChoiceMemo;
  console.log("fiscal choice user memo: " + fiscalChoiceSave);

  switch (typeLocation) {
    case "nue":
      seuil = 15300;
      break;

    case "meuble":
      seuil = 77700;
      break;

    default:
      break;
  }

  if (income > seuil) {
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

  if (income <= seuil) {
    //Modifie le titre
    titreRegimeImposition.innerHTML = "Choix du regime d'imposition.";

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
  return dutyTotal;
}

//fonction qui etabli un bilan entre revenu locatif auquel on soustrait  "charge" et "mensualite*12"
//bilan avant imposition
function balance() {
  getTotalDuty();

  //insertion dans le DOM bilan avant imposition
  totalChargeTextStart.innerHTML = "Total charge (dont mensualités): ";
  totalCharge.innerHTML = calculatedValue.duty;
  totalChargeTextEnd.innerHTML = " €/an";

  let balance = parseInt(
    calculatedValue.income * 12 - calculatedValue.duty,
    10
  );
  console.log("bilan avant impot: " + balance);
  calculatedValue.balance = balance;

  equilibreTextStart.innerHTML = "Bilan avant imposition: ";
  equilibreResultat.innerHTML = calculatedValue.balance;
  equilibreTextEnd.innerHTML = " €/an";
}

//détermination de l'assiette imposable en fonction du "type de location" et du "regime d'imposition"
function getAssietteImposable() {
  //-1- location "nue" regime imposition forfaitaire
  if (
    calculatedValue.locationType == "nue" &&
    calculatedValue.fiscalChoice == "forfaitaire"
  ) {
    let assietteImposable = parseInt(
      (calculatedValue.income * 12 * 7) / 10,
      10
    );
    return assietteImposable;
  }

  //-2- location "meublée" regime imposition forfaitaire
  else if (
    calculatedValue.locationType == "meuble" &&
    calculatedValue.fiscalChoice == "forfaitaire"
  ) {
    let assietteImposable = parseInt(
      (calculatedValue.income * 12 * 5) / 10,
      10
    );
    return assietteImposable;
  }

  //-3- location "nue" ou "meublée" regime imposition "réel"
  else if (calculatedValue.fiscalChoice == "reel") {
    console.log("charge deductible : " + calculatedValue.dutyDeductible);
    let assietteImposable = parseInt(
      calculatedValue.income * 12 - calculatedValue.dutyDeductible,
      10
    );
    return assietteImposable;
  } else {
    return false;
  }
}

function calculeImpotRevenuFoncier() {
  let assietteImposable = getAssietteImposable();
  console.log("assiette impo: " + assietteImposable);
  let tauxMarginalImposition = getTauxMarginalImposition();

  if (assietteImposable < 0) {
    assietteImpotStart.innerHTML = "Déficite foncier de: ";
    assietteImpot.innerHTML = assietteImposable;
    assietteImpotEnd.innerHTML = " €/an";

    //affichage montant impot
    montantImpotStart.innerHTML = "Votre impôt foncier est de: ";
    montantImpot.innerHTML = 0;
    montantImpotEnd.innerHTML = " €/an";
    console.log("impot foncier: " + impotFoncier);

    //insertion ds l'objet
    calculatedValue.impotFoncier = 0;
    return;
  }

  console.log("assiette imposable: " + assietteImposable);

  let rate = tauxMarginalImposition + dataValueInit.tauxImpoFoncier;
  let impotFoncier = parseInt((assietteImposable * rate) / 100);

  //insertion ds l'objet
  calculatedValue.impotFoncier = impotFoncier;

  //affichage assiette imposable
  assietteImpotStart.innerHTML = "Assiette imposable: ";
  assietteImpot.innerHTML = assietteImposable;
  assietteImpotEnd.innerHTML = " €";

  //affichage montant impot
  montantImpotStart.innerHTML = "Votre impôt foncier est de: ";
  montantImpot.innerHTML = impotFoncier;
  montantImpotEnd.innerHTML = " €/an";
  console.log("impot foncier: " + impotFoncier);
}

function bilanApresImposition() {
  let bilanFinal = calculatedValue.balance - calculatedValue.impotFoncier;
  //affichage dans bilan final
  bilanTextStart.innerHTML = "Bilan après imposition: ";
  bilanResultat.innerHTML = bilanFinal;
  bilanTextEnd.innerHTML = " €/an";

  if (bilanFinal < 0) {
    coutTextStart.innerHTML =
      "Dans ces conditions, votre bien en location vous coûte:";
    coutResultat.innerHTML = parseInt(Math.abs(bilanFinal / 12), 10);
    coutTextEnd.innerHTML = " €/mois";
  }

  if (bilanFinal >= 0) {
    coutTextStart.innerHTML =
      "Dans ces conditions, votre bien en location vous raporte:";
    coutResultat.innerHTML = parseInt(bilanFinal / 12, 10);
    coutTextEnd.innerHTML = " €/mois";
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
