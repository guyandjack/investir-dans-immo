/****************************************************************************
 * *********              fonction de calul   ******
 * mensualite,
 * cout du cdredit
 * initialisation des inputs
 * *************************************************************************/

//import des fonctions
import { displayInputFiscal, hideChargeAndTaxe, displayChargeAndTaxe, hideInputFiscal, getLocationType } from "../other/other.js";

import { addEventOnInputFiscal } from "../addEvent/addEvent.js";
import { testIfNumber } from "../checkValueUser/checkValueUser.js";




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
  inputNumberPrix.value = parseInt(dataValue.price, 10);
  inputNumberApport.value = parseInt(
    (dataValue.price * dataValue.rateAdvice) / 100,
    10
  );
  inputNumberTaeg.value = parseInt(dataValue.taeg, 10);
  inputNumberDuree.value = parseInt(dataValue.periode, 10);

  //revenu immobilier
    inputNumberRevenu.value = parseInt(dataValue.income, 10);
    inputNumberRevenuCharge.value = parseInt(dataValue.incomeCharge, 10);
    

  //charges et taxes
  inputNumberCopro.value = parseInt(dataValue.copro, 10);
  inputNumberGestion.value = parseInt(
    (dataValue.rateGestion / 100) * dataValue.income * 12,
    10
  );
  inputNumberApno.value = parseInt(dataValue.apno, 10);
  inputNumberAli.value = parseInt(dataValue.ali, 10);
  inputNumberFoncier.value = parseInt(dataValue.foncier, 10);
  inputNumberHabitation.value = parseInt(dataValue.habitation, 10);

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
}

//initialisation du div resultat impot foncier
function initResultatFiscal() {
  //Modifie le titre
  containerFiscaltitle.innerHTML = "Choix du regime fiscal";
}


//fonction qui calcule les revenus locatif sur un an
function incomeByYear() {
  let income = parseInt(inputNumberRevenu.value * 12, 10);
  let incomeCharge = parseInt(inputNumberRevenuCharge.value * 12, 10);

  //insertion dans le DOM sous l'input revenu
  incomeOnYear.innerHTML = income + " €/an";

  //insertion dans le DOM dans le bilan avant imposition
  //totalRevenu.innerHTML = "Total revenu: " + income + " €/an";

  //insertion dans l'objet
  calculatedValue.income = income;
  calculatedValue.incomeCharge = incomeCharge;

  
}


/**
 * affiche ou cache des elemnts en fonction de la valeur de "incomeUser"
 *
 */
function controlValueOfIncome() {
    //Verifie si l'utilisateur a choisi un type de location
    let isSelected = getLocationType();
    if (!isSelected) {
        return
    }
    //En fonction du type de location nue ou meublé le seuil regime réel diffère
    let income = 0;
    let seuil = 0;
    let typeLocation = calculatedValue.locationType;

    if (typeLocation == "nue") {
        income = parseInt(calculatedValue.income,10);
        seuil = 15300;
    }

    if (typeLocation == "meuble") {
        income = parseInt(calculatedValue.income + calculatedValue.incomeCharge, 10);
        seuil = 77700;
    }

    

    if (income > seuil) {
        //Modification du choix fiscal
        calculatedValue.fiscalChoice = "reel";

        //Modification du titre
        containerFiscaltitle.innerHTML = "Regime réel obligatoire";

        //cache les inputs du fieldset "taxe et charge"
        hideChargeAndTaxe();

        //cache les inputs de type radio "choix du regime fiscal"
        if (containerInputRadioFiscal.classList.contains("display")) {
            containerInputRadioFiscal.classList.replace("display", "hide");
        }

        //Affiche les inputs fiscal "number et range" charge deductible
        let inputDisplayed = displayInputFiscal();


        inputDisplayed
            .then(() => {
                addEventOnInputFiscal();

                
            })
            .catch((error) => {
                console.log("error: " + error);
            });
        
        return "no-choice"
    }

    if (income <= seuil) {
        //Modification du choix fiscal
        calculatedValue.fiscalChoice == "forfaitaire";

        //Modifie le titre
        containerFiscaltitle.innerHTML = "Choix du regime fiscal.";

        //Affiche les inputs du fieldset charge et taxes
        displayChargeAndTaxe();

        //Affiche les inputs de type radio
        if (containerInputRadioFiscal.classList.contains("hide")) {
            containerInputRadioFiscal.classList.replace("hide", "display");
        }

        //Cache les inputs de type number et range
        if (containerInputFiscal.classList.contains("display")) {
            containerInputFiscal.classList.replace("display", "hide");
        }

        return "choice"
    }
}

//permet de calculer les revenu en fonction du type de location
function getIncome() {
    let trueIncome = 0;
    //pour une location meublée revenu c'est loyer charges comprises
      if (calculatedValue.locationType == "meuble") {
          trueIncome = parseInt(calculatedValue.income + calculatedValue.incomeCharge, 10);
          return trueIncome
      }
      
      //Pour une location nue les revenu sont les loyers brut
      if (calculatedValue.locationType == "nue") {
          trueIncome = parseInt(calculatedValue.income, 10);
          return trueIncome
    }
    
    return false
}

//fonction qui etabli un bilan entre charge moins revenu locatif moins emprunt
//bilan avant imposition
function balance() {
  let duty =
    //emprunt
    parseInt(calculatedValue.mensualite * 12) +
    //charges
    parseInt(inputNumberCopro.value, 10) +
    parseInt(inputNumberGestion.value, 10) +
    parseInt(inputNumberApno.value, 10) +
    parseInt(inputNumberAli.value, 10) +
    parseInt(inputNumberFoncier.value, 10) +
    parseInt(inputNumberHabitation.value, 10);
  console.log("total des charges:" + duty);
  calculatedValue.duty = duty;
  //insertion dans le DOM bilan avant imposition
    totalCharge.innerHTML = "Total charge: " + duty + " €/an";

    let trueIncome = getIncome();

  let balance = trueIncome - duty;
  calculatedValue.balance = balance;

  if (balance < 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBalance.classList.remove("negativ", "equal");

    containerResultatBalance.classList.add("negativ");
    equilibreTextStart.innerHTML = "Bilan avant imposition: ";
    equilibreResultat.innerHTML = balance;
    equilibreTextEnd.innerHTML = " €";
  }

  if (balance == 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBalance.classList.remove("negativ", "equal");

    containerResultatBalance.classList.add("equal");
    equilibreTextStart.innerHTML = "Bilan avant imposition: ";
    equilibreResultat.innerHTML = balance;
    equilibreTextEnd.innerHTML = " €";
  }

  if (balance > 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBalance.classList.remove("negativ", "equal");

    equilibreTextStart.innerHTML = "Bilan avant imposition: ";
    equilibreResultat.innerHTML = balance;
    equilibreTextEnd.innerHTML = " €";
  }
}

//determination de l'assiette imposable en fonction du "type de location" et du "regime d'imposition"
function getAssietteImposable() {
    let assietteImposable = 0;

    //-1- location nue regime forfaitaire
    if (calculatedValue.fiscalChoice == "forfaitaire" && calculatedValue.locationType == "nue") {
        assietteImposable = parseInt((calculatedValue.income * 7 / 10),10);
        return assietteImposable
    }

    //-2- location meublé regime micro bic ou forfaitaire
    if (calculatedValue.fiscalChoice == "forfaitaire" && calculatedValue.locationType == "meuble") {
        assietteImposable = parseInt((calculatedValue.income + calculatedValue.incomeCharge) * 5 / 10,10);
        return assietteImposable
    }
    return false
}

function calculeImpotRevenuFoncier() {
    let assietteImposable = getAssietteImposable();
    let result = testIfNumber(assietteImposable);
    
    if (!result) {
        alert("assiette forfaitaire n' est pas un nombre")
        return
    }
    console.log("assiette imposable: " + assietteImposable)

  //recupere la valeur de l'input radio "tranche imposition"
  let inputRadio = document.querySelector("input[name='taux-impot']:checked");
  let rateIncome = parseInt(inputRadio.value, 10);
  calculatedValue.rateIncome = rateIncome;
  console.log("tranche impot: " + rateIncome);
  let bilan = null;

  //Regime "micro foncier" ou  forfaitaire
  if (calculatedValue.fiscalChoice == "forfaitaire") {
    console.log("assiette imposable: " + assietteImposable);
    let rate = rateIncome + dataValue.tauxImpoFoncier;
    let impotFoncier = parseInt((assietteImposable * rate) / 100);
    montantImpotStart.innerHTML = "Votre impôt foncier est de: ";
    montantImpot.innerHTML = impotFoncier;
    montantImpotEnd.innerHTML = " €";
    console.log("impot foncier: " + impotFoncier);

    // si la tranche d' imposition est de 0%
    if (rateIncome == 0) {
      impotFoncier = 0;
    }

    bilan = parseInt(calculatedValue.balance - impotFoncier, 10);
  }

  //Regime "reel"
  if (calculatedValue.fiscalChoice == "reel") {
    let chargeDeductible = document.querySelector(
      "#fiscal input[type='number']"
    ).value;

    //reinitialisation du bilan
    montantImpotStart.innerHTML = "";
    montantImpot.innerHTML = "";
      montantImpotEnd.innerHTML = "";
      
    //recupere le montant des revenus locatifs
    let trueIncome = getIncome();

    //bilan avant imposition: revenu - charges deductibles
    let balance = trueIncome - chargeDeductible;

    if (balance > 0) {
      let rate = calculatedValue.rateIncome + dataValue.tauxImpoFoncier;
      let impotFoncier = parseInt((balance * rate) / 100, 10);
      bilan = parseInt(balance - impotFoncier, 10);

      revenuImpotStart.innerHTML = "Vos revenus fonciers: ";
      revenuImpot.innerHTML = trueIncome;
      revenuImpotEnd.innerHTML = " €";

      montantImpotStart.innerHTML = "Vos impôts fonciers: ";
      montantImpot.innerHTML = impotFoncier;
      montantImpotEnd.innerHTML = " €";

      bilanTextStart.innerHTML = "Bilan après imposition: ";
      bilanResultat.innerHTML = bilan;
      bilanTextEnd.innerHTML = " €";
    }
    if (balance <= 0) {
      revenuImpotStart.innerHTML = "Vos revenus fonciers: ";
      revenuImpot.innerHTML = trueIncome;
      revenuImpotEnd.innerHTML = " €";

      montantImpotStart.innerHTML = "Déficite foncier: ";
      montantImpot.innerHTML = balance;
      montantImpotEnd.innerHTML = " €";

      bilanTextStart.innerHTML = "Bilan après imposition: ";
      bilanResultat.innerHTML = "";
      bilanTextEnd.innerHTML = " non imposable";
    }
  }

  //bilan apres imposition: balance - impot foncier
  if (bilan < 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBilan.classList.remove("negativ", "equal");

    containerResultatBilan.classList.add("negativ");
    bilanTextStart.innerHTML = "Bilan après imposition: ";
    bilanResultat.innerHTML = bilan;
    bilanTextEnd.innerHTML = " €";
  }

  if (bilan == 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBilan.classList.remove("negativ", "equal");

    containerResultatBilan.classList.add("equal");
    bilanTextStart.innerHTML = "Bilan après imposition: ";
    bilanResultat.innerHTML = bilan;
    bilanTextEnd.innerHTML = " €";
  }

  if (bilan > 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBilan.classList.remove("negativ", "equal");

    bilanTextStart.innerHTML = "Bilan après imposition: ";
    bilanResultat.innerHTML = bilan;
    bilanTextEnd.innerHTML = " €";
  }
}

export {
    mensualite,
    coutDuCredit,
    initInputValue,
    initResultatFiscal,
    incomeByYear,
    controlValueOfIncome,
    getIncome,
    balance,
    calculeImpotRevenuFoncier
}