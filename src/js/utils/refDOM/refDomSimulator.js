/****************************************************************************
 * Références DOM du simulateur (formulaire, calculs, résultats)
 * Chargées uniquement lorsque le simulateur est initialisé.
 ****************************************************************************/
const loader = document.querySelector(".container-loader");
const inputSelectCalculator = document.querySelector("input[name='besoin-emprunt']");
//fieldset simulateur
const calculatorMensualite = document.querySelector("#calculette-mensualite");
const fieldsetRevenuLocatif = document.querySelector("#revenu-locatif");
const fieldsetTypeLocation = document.querySelector("#type-location");
const fieldsetFiscal = document.querySelector("#fiscal");
const fieldsetChargeTaxe = document.querySelector("#charge-taxe");
const fieldsetSimulation = document.querySelector("#simulation");

const inputNumberPrix = document.querySelector("input[name='number-prix']");
const inputNumberApport = document.querySelector("input[name='number-apport']");
const inputNumberTaeg = document.querySelector("input[name='number-taeg']");
const inputNumberDuree = document.querySelector("input[name='number-duree']");

const inputRangePrix = document.querySelector("input[name='range-prix']");
const inputRangeApport = document.querySelector("input[name='range-apport']");
const inputRangeTaeg = document.querySelector("input[name='range-taeg']");
const inputRangeDuree = document.querySelector("input[name='range-duree']");

const gainAdvice = document.querySelector(".gain-advice");
const uniteGain = document.querySelector("#gain");

const containerResultat = document.querySelector(".container-resultat");
//const containerInterest = document.querySelector("#cont-interest");

//const mensualiteTextStart = document.querySelector("#mensualite-text-start");
const resultat = document.querySelector("#mensualite");
//const mensualiteTextEnd = document.querySelector("#mensualite-text-end");

//const interestTextStart = document.querySelector("#interest-text-start");
const interestCredit = document.querySelector("#interest");
//const interestTextEnd = document.querySelector("#interest-text-end");

const resultatError = document.querySelector("#resultat-error-calculette");

const inputRadioLocationNue = document.querySelector("#location-nue");
const inputRadioLocationMeuble = document.querySelector("#location-meuble");

const inputNumberRevenuHorsCharge = document.querySelector(
  "input[name='number-revenu_hors_charge']",
);
const inputNumberRevenuChargeComprise = document.querySelector(
  "input[name='number-revenu_charge_comprise']",
);

const inputRangeRevenuHorsCharge = document.querySelector(
  "input[name='range-revenu_hors_charge']",
);
const inputRangeRevenuChargeComprise = document.querySelector(
  "input[name='range-revenu_charge_comprise']",
);

 const inputRevenuList = document.querySelectorAll(
   "#revenu-locatif input[type='number'], #revenu-locatif input[type='range']",
 );

const incomeOnYear = document.querySelector(".income-year");
const incomeOnYearCc = document.querySelector(".income-year-cc");

const containerChargeTaxe = document.querySelector("#charge-taxe");
const inputsNumberTaxe = document.querySelectorAll(
  "#charge-taxe input[type='number']",
);

const containerInputCfe = document.querySelector("#impot-cfe-container-input");
const containerInputNonDeductible = document.querySelector(
  "#charge-non-deductible",
);
const containerInputDeductible = document.querySelector("#charge-deductible");

const chargeForfaitaireList = document.querySelectorAll(".charge-forfaitaire");
const chargeReelList = document.querySelectorAll(".charge-reel");
const chargeAmortissableList = document.querySelectorAll(".charge-amortissable");

//input type number

const inputNumberCopro = document.querySelector("input[name='number-copro']");
const inputNumberGestion = document.querySelector("input[name='number-gestion']");
const inputNumberApno = document.querySelector("input[name='number-apno']");
const inputNumberAli = document.querySelector("input[name='number-ali']");
const inputNumberFoncier = document.querySelector("input[name='number-foncier']");
const inputNumberCfe = document.querySelector("input[name='number-cfe']");
const inputNumberAmortissableBat = document.querySelector("input[name='number-batiment']");
const inputNumberAmortissableMobilier = document.querySelector("input[name='number-mobilier']");
const inputNumberAmortissableTravaux = document.querySelector("input[name='number-travaux']");
const inputNumberAutreCaharge = document.querySelector("input[name='number-autre']");
/* const inputNumberChargeNondeductible = document.querySelector(
  "input[name='number-nondeductible']",
);
const inputNumberChargeDeductible = document.querySelector(
  "input[name='number-deductible']",
); */
const inputNumberAutreCharge = document.querySelector(
  "input[name='number-autre']",
);

//input type range
const inputRangeCopro = document.querySelector("input[name='range-copro']");
const inputRangeGestion = document.querySelector("input[name='range-gestion']");
const inputRangeApno = document.querySelector("input[name='range-apno']");
const inputRangeAli = document.querySelector("input[name='range-ali']");
const inputRangeFoncier = document.querySelector("input[name='range-foncier']");
const inputRangeCfe = document.querySelector("input[name='range-cfe']");
const inputRangeAmortissableBat = document.querySelector(
  "input[name='range-batiment']",
);
const inputRangeAmortissableMobilier = document.querySelector(
  "input[name='range-mobilier']",
);
const inputRangeAmortissableTravaux = document.querySelector(
  "input[name='range-travaux']",
);
const inputRangeAutreCharge = document.querySelector(
  "input[name='range-autre']",
);
const inputRangeChargeNondeductible = document.querySelector(
  "input[name='range-nondeductible']",
);
const inputRangeChargeDeductible = document.querySelector(
  "input[name='range-deductible']",
);

const titreRegimeImposition = document.querySelector("#title-regime-fiscal");
const containerInputRadioFiscal = document.querySelector(
  "#regime-fiscal-container-radio",
);
const containerInputFiscal = document.querySelector("#regime-fiscal-container-input");

//input type radio
const inputRadioTauxMarginalDefault = document.querySelector("[id='30']");
const inputRadioRegimeReel = document.querySelector("#impot-reel");
const inputRadioRegimeForfaitaire =
  document.querySelector("#impot-forfaitaire");

/* const inputRadioAmortissableDureeBat = document.querySelector(
  "#charge-amortissable-batiment input[type='radio']:checked"
);
const inputRadioAmortissableDureeMobilier = document.querySelector(
  "#charge-amortissable-mobilier input[type='radio']:checked"
);
const inputRadioAmortissableDureeTravaux = document.querySelector(
  "#charge-amortissable-travaux input[type='radio']:checked"
); */

const containerSimulation = document.querySelector("#simulation");
const simulationTitre = document.querySelector(".simulation-titre");
const totalRevenuLocatifValue = document.querySelector("#revenu-total-value");
const totalRevenuReferenceValue = document.querySelector("#revenu-reference-value");
const toltalChargeValue = document.querySelector("#charge-total-value");
const toltalChargeAmortissementValue = document.querySelector("#charge-total-amortissement-value");
const containerTotalChargeAmortissement = document.querySelector( "#charge-amortissable");

const bilanAvantImpotValue = document.querySelector("#bilan-avant-impot-value");
const assietteImposableDefinition = document.querySelector(
  "#assiette-imposable-definition",
);
const assietteImposableValue = document.querySelector("#assiette-imposable-value");
const assietteImposableTitre = document.querySelector("#assiette-imposable-titre");
const impotFoncierValue = document.querySelector("#impot-foncier-value");
const bilanApresImpositionValue = document.querySelector(
  "#bilan-apres-imposition-value",
);
const coutMensuelTitre = document.querySelector("#cout-mensuel-titre");
const coutMensuelValue = document.querySelector("#cout-mensuel-value");
const coutMensuelContainer = document.querySelector("#cout-mensuel");

export {
  loader,
  inputSelectCalculator,
  calculatorMensualite,
  fieldsetRevenuLocatif,
  fieldsetTypeLocation,
  fieldsetFiscal,
  fieldsetChargeTaxe,
  fieldsetSimulation,
  inputNumberPrix,
  inputNumberApport,
  inputNumberTaeg,
  inputNumberDuree,
  inputRangePrix,
  inputRangeApport,
  inputRangeTaeg,
  inputRangeDuree,
  containerResultat,
  gainAdvice,
  uniteGain,
  //containerResultat,
  //containerInterest,
  //mensualiteTextStart,
  resultat,
  //mensualiteTextEnd,
  //interestTextStart,
  interestCredit,
  //interestTextEnd,
  resultatError,
  inputRadioLocationNue,
  inputRadioLocationMeuble,
  inputNumberRevenuHorsCharge,
  inputNumberRevenuChargeComprise,
  inputRangeRevenuHorsCharge,
  inputRangeRevenuChargeComprise,
  //inputNumberRevenuList,
  incomeOnYear,
  incomeOnYearCc,
  containerChargeTaxe,
  inputsNumberTaxe,
  containerInputCfe,
  containerInputNonDeductible,
  containerInputDeductible,
  chargeForfaitaireList,
  chargeReelList,
  chargeAmortissableList,
  inputNumberCopro,
  inputNumberGestion,
  inputNumberApno,
  inputNumberAli,
  inputNumberFoncier,
  inputNumberCfe,
  inputNumberAutreCharge,
  //inputNumberChargeNondeductible,
  //inputNumberChargeDeductible,
  inputNumberAmortissableMobilier,
  inputNumberAmortissableBat,
  inputNumberAmortissableTravaux,
  inputRangeCopro,
  inputRangeGestion,
  inputRangeApno,
  inputRangeAli,
  inputRangeFoncier,
  inputRangeCfe,
  inputRangeChargeNondeductible,
  inputRangeChargeDeductible,
  inputRangeAmortissableBat,
  inputRangeAmortissableMobilier,
  inputRangeAmortissableTravaux,
  inputRangeAutreCharge,
  titreRegimeImposition,
  containerInputRadioFiscal,
  containerInputFiscal,
  inputRadioTauxMarginalDefault,
  inputRadioRegimeReel,
  inputRadioRegimeForfaitaire,
  containerSimulation,
  containerTotalChargeAmortissement,
  simulationTitre,
  totalRevenuLocatifValue,
  totalRevenuReferenceValue,
  toltalChargeValue,
  toltalChargeAmortissementValue,
  bilanAvantImpotValue,
  assietteImposableDefinition,
  assietteImposableValue,
  assietteImposableTitre,
  impotFoncierValue,
  bilanApresImpositionValue,
  coutMensuelTitre,
  coutMensuelValue,
  coutMensuelContainer,
  /* inputRadioAmortissableDureeBat,
  inputRadioAmortissableDureeMobilier,
  inputRadioAmortissableDureeTravaux */
  inputRevenuList,
};
