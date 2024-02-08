/****************************************************************************
 * Elements du DOM referencés pour l'utilisation dans le script principal******
 * ****************************************************************************/

/****************************** Elements contenu dans banner page acceuil*************************/
/**** start */

//button de presenetation
let listOfButton = document.querySelectorAll("ul.introduction-banner button");

/****************************** Elements contenu dans banner page acceuil*************************/
/**** end */

/****************************** Elements contenu dans article*************************/
/**** start */

const collapseRang1LocationNue = document.querySelector("#loc-nue");
const collapseRang1LocationMeuble = document.querySelector("#loc-meuble");

//link colapse article fiscalite "location nue" et "location meublée"
const linkColapseForfaitaire1 = document.querySelector("#forfaitaire-a");
const linkColapseReel1 = document.querySelector("#reel-a");
const linkColapseForfaitaire2 = document.querySelector("#forfaitaire-b");
const linkColapseReel2 = document.querySelector("#reel-b");

//colapse article fiscalite "location nue" et "location meublée"
const colapseForfaitaire1 = document.querySelector("#colapse-forfaitaire-a");
const colapseReel1 = document.querySelector("#colapse-reel-a");
const colapseForfaitaire2 = document.querySelector("#colapse-forfaitaire-b");
const colapseReel2 = document.querySelector("#colapse-reel-b");

//button dowload
const btnDownloadList = document.querySelectorAll(".btn-download");

/****************************** Elements contenu dans article*************************/
/**** end */

/****************************** Elements du formulaire #calculette*************************/
/***************************************** start ************************************** */

/***** fieldset #calculette-mensualite *****/
/*** start ****/

//Input de type "Number"
const inputNumberPrix = document.querySelector("input[name='number-prix']");
const inputNumberApport = document.querySelector("input[name='number-apport']");
const inputNumberTaeg = document.querySelector("input[name='number-taeg']");
const inputNumberDuree = document.querySelector("input[name='number-duree']");

//Input de type "Range"
const inputRangePrix = document.querySelector("input[name='range-prix']");
const inputRangeApport = document.querySelector("input[name='range-apport']");
const inputRangeTaeg = document.querySelector("input[name='range-taeg']");
const inputRangeDuree = document.querySelector("input[name='range-duree']");

//conteneur oû on affiche le taux d'apport
const gainAdvice = document.querySelector(".gain-advice");

//Span unité de mesure oû on change la couleur
const uniteGain = document.querySelector("#gain");

//conteneurs qui affichent les elements resultat "mensualite" et cout d' "emprunt"
const containerResultat = document.querySelector("#cont-result");
const containerInterest = document.querySelector("#cont-interest");

const mensualiteTextStart = document.querySelector("#mensualite-text-start");
const resultat = document.querySelector("#mensualite");
const mensualiteTextEnd = document.querySelector("#mensualite-text-end");

const interestTextStart = document.querySelector("#interest-text-start");
const interestCredit = document.querySelector("#interest");
const interestTextEnd = document.querySelector("#interest-text-end");

const resultatError = document.querySelector("#resultat-error-calculette");

/***** fieldset #calculette-mensualite *****/
/*** end ****/

/***** fieldset #type-location *****/
/*** start ****/

const inputRadioLocationNue = document.querySelector("#location-nue");
const inputRadioLocationMeuble = document.querySelector("#location-meuble");

/***** fieldset #type-location *****/
/*** end ****/

/***** fieldset #revenu-locatif *****/
/*** start ****/

//container input revenu

//Input de type "Number"
const inputNumberRevenuHorsCharge = document.querySelector(
  "input[name='number-revenu_hors_charge']"
);
const inputNumberRevenuChargeComprise = document.querySelector(
  "input[name='number-revenu_charge_comprise']"
);

//Input de type "Range"
const inputRangeRevenuHorsCharge = document.querySelector(
  "input[name='range-revenu_hors_charge']"
);
const inputRangeRevenuChargeComprise = document.querySelector(
  "input[name='range-revenu_charge_comprise']"
);

//list des inputs number "revenu"
const inputNumberRevenuList = document.querySelectorAll(
  "#revenu-locatif input[type='number']"
);

// conteneur de rappel ou on affiche le revenu locatif à l'année.(sous input number)
const incomeOnYear = document.querySelector(".income-year");
const incomeOnYearCc = document.querySelector(".income-year-cc");

/***** fieldset #revenu-locatif *****/
/*** end ****/

/***** fieldset #charge-taxe *****/
/*** start ****/

//Container
const containerChargeTaxe = document.querySelector("#charge-taxe");
const inputsNumberTaxe = document.querySelectorAll(
  "#charge-taxe input[type='number']"
);

//main container
const containerInputCfe = document.querySelector("#impot-cfe-container-input");
const containerInputNonDeductible = document.querySelector(
  "#charge-non-deductible"
);
const containerInputDeductible = document.querySelector("#charge-deductible");

//liste charges "forfaitaire"
const chargeForfaitaireList = document.querySelectorAll(".charge-forfaitaire");

//liste charges "reel"
const chargeReelList = document.querySelectorAll(".charge-reel");

//Input de type "Number"
const inputNumberCopro = document.querySelector("input[name='number-copro']");
const inputNumberGestion = document.querySelector(
  "input[name='number-gestion']"
);
const inputNumberApno = document.querySelector("input[name='number-apno']");
const inputNumberAli = document.querySelector("input[name='number-ali']");
const inputNumberFoncier = document.querySelector(
  "input[name='number-foncier']"
);
const inputNumberHabitation = document.querySelector(
  "input[name='number-habitation']"
);
const inputNumberCfe = document.querySelector("input[name='number-cfe']");
const inputNumberChargeNondeductible = document.querySelector(
  "input[name='number-nondeductible']"
);
const inputNumberChargeDeductible = document.querySelector(
  "input[name='number-deductible']"
);

//Input de type "Range"
const inputRangeCopro = document.querySelector("input[name='range-copro']");
const inputRangeGestion = document.querySelector(
  "input[name='number-gestion']"
);
const inputRangeApno = document.querySelector("input[name='range-apno']");
const inputRangeAli = document.querySelector("input[name='range-ali']");
const inputRangeFoncier = document.querySelector("input[name='range-foncier']");
const inputRangeHabitation = document.querySelector(
  "input[name='range-habitation']"
);
const inputRangeCfe = document.querySelector("input[name='range-cfe']");
const inputRangeChargeNondeductible = document.querySelector(
  "input[name='range-nondeductible']"
);
const inputRangeChargeDeductible = document.querySelector(
  "input[name='range-deductible']"
);

/***** fieldset #charge-taxe *****/
/*** end ****/

/***** fieldset #fiscal *****/
/*** start ****/

//titre container fiscal
const titreRegimeImposition = document.querySelector("#title-regime-fiscal");

//Element container imput radio "choix regime imposition"
const containerInputRadioFiscal = document.querySelector(
  "#regime-fiscal-container-radio"
);

const containerInputFiscal = document.querySelector(
  "#regime-fiscal-container-input"
);

//Input de type "radio" taux marginal imposition
const inputRadioTauxMarginalDefault = document.querySelector("[id='30']");

//Input de type "radio" choix regime imposition
const inputRadioRegimeReel = document.querySelector("#impot-reel");
const inputRadioRegimeForfaitaire =
  document.querySelector("#impot-forfaitaire");

/***** fieldset #fiscal *****/
/*** end ****/

/***** fieldset #simulation *****/
/*** start ****/

//Total revenus locatifs
let totalRevenuLocatifValue = document.querySelector("#revenu-total-value");

//Total revenu de reference
let totalRevenuReferenceValue = document.querySelector(
  "#revenu-reference-value"
);

//Total charge
let toltalChargeValue = document.querySelector("#charge-total-value");

//Bilan avant impot
let bilanAvantImpotValue = document.querySelector("#bilan-avant-impot-value");

//Assiette imposable
let assietteImposableDefinition = document.querySelector(
  "#assiette-imposable-definition"
);
let assietteImposableValue = document.querySelector(
  "#assiette-imposable-value"
);

let assietteImposableTitre = document.querySelector(
  "#assiette-imposable-titre"
);

//Impot foncier
let impotFoncierValue = document.querySelector("#impot-foncier-value");

//Bilan apres impot
let bilanApresImpositionValue = document.querySelector(
  "#bilan-apres-imposition-value"
);

//Cout mensuel location
let coutMensuelTitre = document.querySelector("#cout-mensuel-titre");
let coutMensuelValue = document.querySelector("#cout-mensuel-value");

/***** fieldset #simulation *****/
/*** end ****/
/****************************** Elements du formulaire #calculette*************************/
/***************************************** end ************************************** */
