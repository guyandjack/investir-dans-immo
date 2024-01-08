/****************************************************************************
 * Elements du DOM referencés pour l'utilisation dans le script principal******
 * *************************************************************************/

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
const resultatErrorEquilibre = document.querySelector(
  "#resultat-error-equilibre"
);

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
const inputNumberRevenu = document.querySelector("input[name='number-revenu']");
const inputNumberRevenuCharge = document.querySelector(
  "input[name='number-charge']"
);

//Input de type "Range"
const inputRangeRevenu = document.querySelector("input[name='range-revenu']");
const inputRangeRevenuCharge = document.querySelector(
  "input[name='range-charge']"
);

// conteneur de rappel ou on affiche le revenu locatif à l'année.(sous input number)
const incomeOnYear = document.querySelector(".income-year");

//div error sous input revenu locatif
const incomeError = document.querySelector(".income-error");

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

//conteneurs qui affichent les elements resultat "charges" et "revenu" "bilan avant imposition"
const containerResultatBalance = document.querySelector(
  "#cont-result-equilibre"
);

const containerTotal = document.querySelector("cont-equilibre-total");
const containerText = document.querySelector("#cont-equilibre-text");

//sous total "revenu"
const totalRevenuTextStart = document.querySelector(
  "#equilibre-total-revenu-text-start"
);
const totalRevenu = document.querySelector("#equilibre-total-revenu");
const totalRevenuTextEnd = document.querySelector(
  "#equilibre-total-revenu-text-end"
);

//sous total "charge"
const totalChargeTextStart = document.querySelector(
  "#equilibre-total-charge-text-start"
);
const totalCharge = document.querySelector("#equilibre-total-charge");
const totalChargeTextEnd = document.querySelector(
  "#equilibre-total-charge-text-end"
);

//bilan avant imposition
const equilibreTextStart = document.querySelector("#equilibre-text-start");
const equilibreResultat = document.querySelector("#equilibre");
const equilibreTextEnd = document.querySelector("#equilibre-text-end");

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

//element contenant les resultats de imposition
const containerResultatBilan = document.querySelector("#cont-result-bilan");

const assietteImpotStart = document.querySelector("#assiette-text-start");
const assietteImpot = document.querySelector("#assiette");
const assietteImpotEnd = document.querySelector("#assiette-text-end");

const montantImpotStart = document.querySelector("#impot-text-start");
const montantImpot = document.querySelector("#impot");
const montantImpotEnd = document.querySelector("#impot-text-end");

const bilanTextStart = document.querySelector("#bilan-text-start");
const bilanResultat = document.querySelector("#bilan");
const bilanTextEnd = document.querySelector("#bilan-text-end");

const coutTextStart = document.querySelector("#cout-text-start");
const coutResultat = document.querySelector("#cout");
const coutTextEnd = document.querySelector("#cout-text-end");

/***** fieldset #fiscal *****/
/*** end ****/

/****************************** Elements du formulaire #calculette*************************/
/***************************************** end ************************************** */
