/****************************************************************************
 * *********              fonction de calul   ******
 * mensualite,
 * cout du cdredit
 * initialisation des inputs
 * *************************************************************************/

//import des fonctions
import { displayInputFiscal, hideInputFiscal } from "../other/other.js";


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


//fonction qui calcule les revenus locatif sur un an
function incomeByYear() {
  let income = parseInt(inputNumberRevenu.value * 12, 10);

  //insertion dans le DOM sous l' input revenu
  incomeOnYear.innerHTML = income + " €/an";

  //insertion dans le DOM dans le bilan aavant imposition
  totalRevenu.innerHTML = "Total revenu: " + income + " €/an";



  //insertion dans l'objet
  calculatedValue.income = income;

  if (income > 15300) {
    console.log("income: " + income);
    //Modification du titre
    containerFiscaltitle.innerHTML = "Regime fiscal 'réel' obligatoire";

    //cache les inputs de type radio
    if (containerInputRadioFiscal.classList.contains("display")) {
      containerInputRadioFiscal.classList.replace("display", "hide");
    }

    //Affiche les inputs fiscal number et range
    let inputDisplayed = displayInputFiscal();
    inputDisplayed
      .then(() => {
        //Lie les valeurs des inputs range et number
        addEventOnInputFiscal();

        //Lance le control des inputs user fiscal
        //checkValueUserFiscal();
        console.log("check des data user fiscal");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  if (income <= 15300) {
    console.log("income: " + income);
    //Modifie le titre
    containerFiscaltitle.innerHTML = "Choix du regime fiscal.";

    //Affiche les inputs de type radio
    if (containerInputRadioFiscal.classList.contains("hide")) {
      containerInputRadioFiscal.classList.replace("hide", "display");
    }

    //Cache les inputs de type number et range
    if (containerInputFiscal.classList.contains("display")) {
      containerInputFiscal.classList.replace("display", "hide");
    }
  }
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
  let income = calculatedValue.income;

  let balance = income - duty;
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

function calculeImpotRevenuFoncier() {
  //Deux conditions pour lancer la fonction "calculeimpotrevenufoncier":
  //condition 1 une tranche d' imposition doit etre choisi
  let inputRadioChoiceImpot = document.querySelectorAll(
    "#fiscal input[name='taux-impot']:checked"
  );

  if (inputRadioChoiceImpot.length < 1) {
    bilanResultat.innerHTML = "Veuillez sélectionner une tranche d'imposition.";
  }

  //condition 2 un regime d' imposition sur revenu foncier doit etre choisi
  let inputRadioChoiceFiscal = document.querySelectorAll(
    "#fiscal input[name='regime-fiscal']:checked"
  );

  if (inputRadioChoiceFiscal.length < 1) {
    bilanResultat.innerHTML =
      "Veuillez sélectionner un régime fiscal réel ou forfaitaire";
  }

  if (inputRadioChoiceFiscal.length < 1 || inputRadioChoiceImpot.length < 1) {
    return;
  }

  //recupere la valeur de l'input radio "tranche imposition"
  let inputRadio = document.querySelector("input[name='taux-impot']:checked");
  let rateIncome = parseInt(inputRadio.value, 10);
  calculatedValue.rateIncome = rateIncome;
  console.log("tranche impot: " + rateIncome);
  let bilan = null;

  //Regime "micro foncier" ou  forfaitaire
  if (calculatedValue.fiscalChoice == "forfaitaire") {
    let assietteImposable = calculatedValue.income * 0.7;

    console.log("assiette imposable: " + assietteImposable);
    let rate = rateIncome + dataValue.tauxImpoFoncier;
      let impotFoncier = parseInt((assietteImposable * rate) / 100);
      montantImpotStart.innerHTML = "Votre impôt foncier est de: ";
      montantImpot.innerHTML = impotFoncier;
      montantImpotEnd.innerHTML = " €"
    console.log("impot foncier: " + impotFoncier);

    // si la tranche d' imposition est de 0%
    if (rateIncome == 0) {
      impotFoncier = 0;
    }

    bilan = parseFloat(calculatedValue.balance - impotFoncier);
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

    //bilan avant imposition: revenu - charges deductibles
    let balance = calculatedValue.income - chargeDeductible;

    

    if (balance > 0) {
      let rate = calculatedValue.rateIncome + dataValue.tauxImpoFoncier;
      let impotFoncier = (balance * rate) / 100;
        bilan = balance - impotFoncier;

        revenuImpotStart.innerHTML = "Vos revenus fonciers: "   ;
        revenuImpot.innerHTML = calculatedValue.income;
        revenuImpotEnd.innerHTML = " €";
        
        montantImpotStart.innerHTML = "Vos impôts fonciers: ";
        montantImpot.innerHTML = impotFoncier;
        montantImpotEnd.innerHTML = " €";
        
        bilanTextStart.innerHTML = "Bilan après imposition: ";
        bilanResultat.innerHTML = bilan;
        bilanTextEnd.innerHTML =  " €";
    }
    if (balance <= 0) {
      revenuImpotStart.innerHTML = "Vos revenus fonciers: ";
      revenuImpot.innerHTML = calculatedValue.income;
      revenuImpotEnd.innerHTML = " €";

      montantImpotStart.innerHTML = "Déficite foncier: ";
      montantImpot.innerHTML = "";
      montantImpotEnd.innerHTML = " pas d'imposition";

      bilanTextStart.innerHTML = "";
      bilanResultat.innerHTML = "";
      bilanTextEnd.innerHTML = "";
    }
  }

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
    incomeByYear,
    balance,
    calculeImpotRevenuFoncier
}