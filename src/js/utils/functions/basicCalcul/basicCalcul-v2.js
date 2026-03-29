/****************************************************************************
 * Version optimisée pour réduire les accès DOM répétés et centraliser les calculs
 ****************************************************************************/

import {
  displayInputRadioRegimeFiscal,
  //hideChargeForfaitaire,
  //displayChargeForfaitaire,
  getTauxMarginalImposition,
  hideInputRadioRegimeFiscal,
} from "../other/other-v2.js";

import {
  assietteImposableDefinition,
  assietteImposableTitre,
  assietteImposableValue,
  bilanApresImpositionValue,
  bilanAvantImpotValue,
  containerSimulation,
  coutMensuelContainer,
  coutMensuelTitre,
  coutMensuelValue,
  impotFoncierValue,
  incomeOnYear,
  incomeOnYearCc,
  inputNumberAli,
  inputNumberAmortissableBat,
  inputNumberAmortissableMobilier,
  inputNumberAmortissableTravaux,
  inputNumberApno,
  inputNumberApport,
  inputNumberAutreCharge,
  inputNumberCfe,
  //inputNumberChargeDeductible,
  //inputNumberChargeNondeductible,
  inputNumberCopro,
  inputNumberDuree,
  inputNumberFoncier,
  inputNumberGestion,
  inputNumberPrix,
  inputNumberRevenuChargeComprise,
  inputNumberRevenuHorsCharge,
  inputNumberTaeg,
  /* inputRadioAmortissableDureeBat,
  inputRadioAmortissableDureeMobilier,
  inputRadioAmortissableDureeTravaux, */
  inputRadioLocationNue,
  inputRadioRegimeForfaitaire,
  inputRadioRegimeReel,
  inputRadioTauxMarginalDefault,
  inputRangeAli,
  inputRangeAmortissableBat,
  inputRangeAmortissableMobilier,
  inputRangeAmortissableTravaux,
  inputRangeApno,
  inputRangeApport,
  inputRangeAutreCharge,
  inputRangeCfe,
  inputRangeChargeDeductible,
  inputRangeChargeNondeductible,
  inputRangeCopro,
  inputRangeDuree,
  inputRangeFoncier,
  inputRangeGestion,
  inputRangePrix,
  inputRangeRevenuChargeComprise,
  inputRangeRevenuHorsCharge,
  inputRangeTaeg,
  interestCredit,
  resultat,
  resultatError,
  simulationTitre,
  titreRegimeImposition,
  toltalChargeValue,
  toltalChargeAmortissementValue,
  
  totalRevenuLocatifValue,
  totalRevenuReferenceValue,
} from "../../refDOM/refDomSimulator.js";

import { calculatedValue, dataValueInit } from "../../data/data.js";

const MONTHS_PER_YEAR = 12;

const toFiniteNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const toPositiveInt = (value) => Math.max(0, Math.round(toFiniteNumber(value)));

const setPairValue = (numberInput, rangeInput, rawValue) => {
  if (!numberInput || !rangeInput) return;
  const value = toPositiveInt(rawValue);
  numberInput.value = value === 0 ? null : value;
  rangeInput.value = value;

  return value;
};

const sumInputs = (nodes = []) =>
  nodes.reduce((acc, node) => acc + toFiniteNumber(node?.value), 0);

const setTextContent = (node, value) => {
  if (node) {
    node.textContent = value;
  }
};

const swapClasses = (node, removeClass, addClass) => {
  if (!node) return;
  if (removeClass) {
    node.classList.remove(removeClass);
  }
  if (addClass) {
    node.classList.add(addClass);
  }
};

function mensualite(montant, apport, taeg, periode) {
  // si une des valeurs des inputs est inavilde
  // ou que le calcul des mensualite n' est pas necessaire
  // on force le resultat a zero
  if (
    montant < 1 ||
    apport < 1 ||
    taeg < 1 ||
    periode < 1 ||
    !calculatedValue.useLoan
  ) {
    calculatedValue.mensualite = 0;
    calculatedValue.capital = 0;
    setTextContent(resultat, 0);
    return false;
  }

  const capitalEmprunte = toFiniteNumber(montant) - toFiniteNumber(apport);
  const months = Math.max(
    1,
    Math.round(toFiniteNumber(periode) * MONTHS_PER_YEAR),
  );
  const yearlyRate = toFiniteNumber(taeg) / 100;
  const monthlyRate = yearlyRate / MONTHS_PER_YEAR;

  //si l'utilisateur modifie les valeurs etle  montant de l' emprunt est null ou negatif
  //on met les valeurs calculatedvalue et on affiche un message d'erreur
  if (capitalEmprunte <= 0) {
    calculatedValue.capital = 0;
    calculatedValue.mensualite = 0;
    resultat && (resultat.textContent = "");
    resultatError.textContent =
      "Le montant de l'apport doit être\ninférieur au montant du projet!";
    resultatError.classList.remove("hidden");
    return false;
  }

  calculatedValue.capital = Math.round(capitalEmprunte);

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = capitalEmprunte / months;
  } else {
    const denominator = 1 - Math.pow(1 + monthlyRate, -months);
    monthlyPayment =
      denominator !== 0 ? (capitalEmprunte * monthlyRate) / denominator : 0;
  }

  const fixed = Number.isFinite(monthlyPayment)
    ? monthlyPayment.toFixed(0)
    : "0";
  calculatedValue.mensualite = fixed;
  if (!resultatError.classList.contains("hidden")) {
    resultatError.classList.add("hidden");
  }
  setTextContent(resultat, fixed);
  return true;
}

function coutDuCredit(isCalculated) {
  if (!isCalculated) {
    setTextContent(interestCredit, 0);
    return;
  }

  const capital = toFiniteNumber(calculatedValue.capital);
  const mensualiteValue = toFiniteNumber(calculatedValue.mensualite);
  const duree = Math.max(0, toFiniteNumber(inputNumberDuree?.value));

  const interest = mensualiteValue * duree * MONTHS_PER_YEAR - capital;
  const result = Math.round(Math.max(0, interest));
  calculatedValue.interet = result;

  setTextContent(interestCredit, result);
}

function initInputValue() {
  const {
    price,
    rateAdvice,
    taeg,
    periode,
    income,
    incomeCc,
    copro,
    rateGestion,
    apno,
    ali,
    foncier,
    cfe,
    nondeductible,
    deductible,
    locationtype,
    amortissableBat,
    amortissableMobilier,
    amortissableTravaux,
    autreCharge,
  } = dataValueInit;

  setPairValue(inputNumberPrix, inputRangePrix, price);
  const apport = (toFiniteNumber(price) * toFiniteNumber(rateAdvice)) / 100;
  setPairValue(inputNumberApport, inputRangeApport, apport);
  setPairValue(inputNumberTaeg, inputRangeTaeg, taeg);
  setPairValue(inputNumberDuree, inputRangeDuree, periode);

  calculatedValue.income = setPairValue(
    inputNumberRevenuHorsCharge,
    inputRangeRevenuHorsCharge,
    income,
  );
  calculatedValue.incomeCc = setPairValue(
    inputNumberRevenuChargeComprise,
    inputRangeRevenuChargeComprise,
    incomeCc,
  );

  setPairValue(inputNumberCopro, inputRangeCopro, copro);
  const gestionValue =
    (toFiniteNumber(rateGestion) / 100) *
    toFiniteNumber(income) *
    MONTHS_PER_YEAR;
  setPairValue(inputNumberGestion, inputRangeGestion, gestionValue);
  setPairValue(inputNumberApno, inputRangeApno, apno);
  setPairValue(inputNumberAli, inputRangeAli, ali);
  setPairValue(inputNumberFoncier, inputRangeFoncier, foncier);
  setPairValue(inputNumberCfe, inputRangeCfe, cfe);
  /* setPairValue(
    inputNumberChargeNondeductible,
    inputRangeChargeNondeductible,
    nondeductible,
  ); */
  setPairValue(
    inputNumberAmortissableBat,
    inputRangeAmortissableBat,
    amortissableBat,
  );
  setPairValue(
    inputNumberAmortissableMobilier,
    inputRangeAmortissableMobilier,
    amortissableMobilier,
  );
  setPairValue(
    inputNumberAmortissableTravaux,
    inputRangeAmortissableTravaux,
    amortissableTravaux,
  );
  setPairValue(inputNumberAutreCharge, inputRangeAutreCharge, autreCharge);
  /* calculatedValue.dutyDeductible = setPairValue(
    inputNumberChargeDeductible,
    inputRangeChargeDeductible,
    deductible,
  ); */

  if (inputRadioLocationNue) {
    inputRadioLocationNue.checked = true;
  }
  calculatedValue.locationType = "nue";

  if (inputRadioTauxMarginalDefault) {
    inputRadioTauxMarginalDefault.checked = true;
  }
  calculatedValue.rateIncome = 30;

  if (inputRadioRegimeForfaitaire) {
    inputRadioRegimeForfaitaire.checked = true;
  }
  calculatedValue.fiscalChoice = "forfaitaire";
  calculatedValue.fiscalChoiceMemo = "forfaitaire";

  totalRevenuReferenceValue.textContent = Math.round(
    (locationtype === "nue"
      ? toFiniteNumber(income)
      : toFiniteNumber(incomeCc)) * MONTHS_PER_YEAR,
  );
  totalRevenuLocatifValue.textContent = Math.round(
    toFiniteNumber(incomeCc) * MONTHS_PER_YEAR,
  );
}

function initResultatFiscal() {
  setTextContent(titreRegimeImposition, "Choix du r\u00E9gime d'imposition");
}

function incomeByYear() {
  const income = toFiniteNumber(inputNumberRevenuHorsCharge?.value);
  const incomeCc = toFiniteNumber(inputNumberRevenuChargeComprise?.value);

  calculatedValue.income = Math.round(income);
  calculatedValue.incomeCc = Math.round(incomeCc);

  setTextContent(
    incomeOnYear,
    `${Math.round(income * MONTHS_PER_YEAR)} \u20AC/an`,
  );
  setTextContent(
    incomeOnYearCc,
    `${Math.round(incomeCc * MONTHS_PER_YEAR)} \u20AC/an`,
  );
  setTextContent(
    totalRevenuLocatifValue,
    Math.round(incomeCc * MONTHS_PER_YEAR),
  );

  const reference =
    calculatedValue.locationType === "nue"
      ? income * MONTHS_PER_YEAR
      : incomeCc * MONTHS_PER_YEAR;
  setTextContent(totalRevenuReferenceValue, Math.round(reference));
}

//si les revenu locatif atteigne un certain seuil le regime d'imposition change automatiquement
//location nue: si income > 15300 => imposition reel obligatoire
//location meuble: si incommeCC > 77700 => imposition reel obligatoire
 
function controlValueOfIncome() {
  const income = toFiniteNumber(calculatedValue.income) * MONTHS_PER_YEAR;
  const incomeCC = toFiniteNumber(calculatedValue.incomeCc) * MONTHS_PER_YEAR;
  const typeLocation = calculatedValue.locationType ?? "nue";
  const seuil = typeLocation === "nue" ? 15300 : 77700;
  const incomeReference = typeLocation === "nue" ? income : incomeCC;
  //const fiscalChoiceSave = calculatedValue.fiscalChoiceMemo ?? "forfaitaire";

  if (incomeReference > seuil) {
    inputRadioRegimeReel && (inputRadioRegimeReel.checked = true);
    calculatedValue.fiscalChoice = "reel";
    titreRegimeImposition.classList.add("text-red-500");
    setTextContent(titreRegimeImposition, "R\u00E9gime r\u00E9el obligatoire");
    hideInputRadioRegimeFiscal();
    return "no-choice";
  }
  
  titreRegimeImposition.classList.remove("text-red-500");
  setTextContent(titreRegimeImposition, "Choix du r\u00E9gime d'imposition");
  displayInputRadioRegimeFiscal();

  /* if (fiscalChoiceSave === "reel") {
    calculatedValue.fiscalChoice = "reel";
    calculatedValue.fiscalChoiceMemo = "reel";
    inputRadioRegimeReel && (inputRadioRegimeReel.checked = true);
    inputRadioRegimeForfaitaire && (inputRadioRegimeForfaitaire.checked = false);
    //hideChargeForfaitaire();
    //displayChargeReel();
  } else {
    calculatedValue.fiscalChoice = "forfaitaire";
    calculatedValue.fiscalChoiceMemo = "forfaitaire";
    inputRadioRegimeForfaitaire && (inputRadioRegimeForfaitaire.checked = true);
    inputRadioRegimeReel && (inputRadioRegimeReel.checked = false);
    //hideChargeReel();
    //displayChargeForfaitaire();
  } */

  return "choice";
}

//ensemble des charges liees a la location du bien et qui peuvent être deductibles
const chargeGroups = [
  //charge de copropriete
  inputNumberCopro,
  //charge de gestion locative
  inputNumberGestion,
  //Assurance proprietaire non occupant
  inputNumberApno,
  //Assurance loyer impayé
  inputNumberAli,
  //taxe fonciere
  inputNumberFoncier,
  //autre charge
  inputNumberAutreCharge,
];

//calcul des charges amortissables
function getAmortissableDuty() {
  const amortissementBat =
    toFiniteNumber(
      inputNumberAmortissableBat.value / (calculatedValue.dureeBat !== 0
        ? calculatedValue.dureeBat
        : 20)
    ) || 0;
  const amortissementMobilier =
    toFiniteNumber(
      inputNumberAmortissableMobilier.value / (calculatedValue.dureeMobilier !== 0
        ? calculatedValue.dureeMobilier
        : 5)
    ) || 0;
  const amortissementTravaux =
    toFiniteNumber(
      inputNumberAmortissableTravaux.value / (calculatedValue.dureeTravaux !== 0
        ? calculatedValue.dureeTravaux
        : 10)
    ) || 0;

  //store amortissable duty
  calculatedValue.amortissableBat = amortissementBat;
  calculatedValue.amortissableMobilier = amortissementMobilier;
  calculatedValue.amortissableTravaux = amortissementTravaux;

  const result =
    amortissementBat + amortissementMobilier + amortissementTravaux || 0;
  setTextContent(toltalChargeAmortissementValue, result);
  return result;
}

// calcul les charges deductibles et non amortissables
function getTotalDuty() {
  const isLocationNue = calculatedValue.locationType === "nue" ? true : false;
  const isImpotForfaitaire =
    calculatedValue.fiscalChoice === "forfaitaire" ? true : false;
  //si les options sont cochées on prend en compte le type de charge correspondant
  const chargeBasics = sumInputs(chargeGroups);
  const mensualiteYear =
    (calculatedValue.useLoan ? toFiniteNumber(calculatedValue.mensualite) : 0) *
    MONTHS_PER_YEAR;
  const cfeYear = calculatedValue.useCfe
    ? toFiniteNumber(calculatedValue.cfe)
    : 0;

  const averageInterest = calculatedValue.useAmortissable
    ? getInterestAverage()
    : 0;

  let globalCharge = 0;
  //Categorisation des charges
  //charges non deductibles et non amortissables utilisees pour location nue / forfaitaire et meuble /forfaitaire
  let totalChargeNDNA = chargeBasics + mensualiteYear + cfeYear;

  //charge deductibles et non amortissables, utilisees pour location nue / reel
  let totalChargeDNA = chargeBasics + averageInterest + cfeYear;

  //si location nue regime forfaitaire
  if (isLocationNue && isImpotForfaitaire) {
    globalCharge = totalChargeNDNA;
  }
  //si location nue regime reel
  if (isLocationNue && !isImpotForfaitaire) {
    globalCharge = totalChargeDNA;
  }
  //si location meuble regime forfaitaire
  if (!isLocationNue && isImpotForfaitaire) {
    globalCharge = totalChargeNDNA;
  }
  //si location meuble regime forfaitaire
  if (!isLocationNue && !isImpotForfaitaire) {
    globalCharge = totalChargeDNA;
  }

  const dutyTotal = Math.round(globalCharge);
  //charge classique qui peuvent etre deductible selon le regime d'imposition
  calculatedValue.duty = dutyTotal;
  setTextContent(toltalChargeValue, dutyTotal);
  return dutyTotal;
}

// calcule le cout moyen des interets sur la periode de credit
//utilisé comme charge amortissable
function getInterestAverage() {
  return toFiniteNumber(calculatedValue.interet / MONTHS_PER_YEAR) || 0;
}

//calcul le capital moyen remboursé sur la periode de credit
//utilisé comme charge deductible
function getCapitalAverage() {
  return toFiniteNumber(calculatedValue.capital / inputNumberDuree) || 0;
}

//bilan avant imposition revenu - charge reeles
function balance() {
  const totalDuty = getTotalDuty();
  const yearlyIncome =
    toFiniteNumber(calculatedValue.incomeCc) * MONTHS_PER_YEAR;
  let balanceValue = Math.round(yearlyIncome - totalDuty);
  calculatedValue.balance = balanceValue;
  calculatedValue.duty = totalDuty;

  setTextContent(toltalChargeValue, calculatedValue.duty);
  setTextContent(bilanAvantImpotValue, balanceValue);
}

function getAssietteImposable() {
  const type = calculatedValue.locationType ?? "nue";
  const choice = calculatedValue.fiscalChoice ?? "forfaitaire";
  const balance = calculatedValue.balance;
  const totalDuty = calculatedValue.duty;
  let assietteImposable = 0;

  if (type === "nue" && choice === "forfaitaire") {
    assietteImposable = Math.round(
      toFiniteNumber(calculatedValue.income) * MONTHS_PER_YEAR * 0.7,
    );
    setTextContent(
      assietteImposableDefinition,
      "Revenu de r\u00E9f\u00E9rence - abattement forfaitaire de 30%",
    );
    setTextContent(assietteImposableTitre, "Revenu foncier imposable");
  } else if (type === "meuble" && choice === "forfaitaire") {
    assietteImposable = Math.round(
      toFiniteNumber(calculatedValue.incomeCc) * MONTHS_PER_YEAR * 0.5,
    );
    setTextContent(
      assietteImposableDefinition,
      "Revenu de r\u00E9f\u00E9rence - abattement forfaitaire de 50%",
    );
    setTextContent(assietteImposableTitre, "Revenu BIC imposable");
  } else if (type === "nue" && choice === "reel") {
    const base = toFiniteNumber(calculatedValue.income) * MONTHS_PER_YEAR;

    assietteImposable = base - toFiniteNumber(calculatedValue.duty);
    setTextContent(
      assietteImposableDefinition,
      "Revenu de r\u00E9f\u00E9rence - charges d\u00E9ductibles",
    );
    setTextContent(assietteImposableTitre, "Revenu foncier imposable");
  } else if (type === "meuble" && choice === "reel") {
    const base = toFiniteNumber(calculatedValue.incomeCc) * MONTHS_PER_YEAR;
    //si le bilan est negatif avec les charges deductibles on ne peut pas rajouter
    // du deficite avec les amortissements
    //les amortissements peuvent uniquement reduire à zero l'asiette imposable
    if (calculatedValue.useAmortissable && balance > 1) {
      const amortissable = getAmortissableDuty();
      assietteImposable = Math.max(0, base - totalDuty - amortissable);
      calculatedValue.dutyDeductible = toFiniteNumber(totalDuty + amortissable);
      //setTextContent(toltalChargeValue, calculatedValue.dutyDeductible);
      setTextContent(toltalChargeAmortissementValue, amortissable);

      setTextContent(
        assietteImposableDefinition,
        "Revenu de r\u00E9f\u00E9rence - charges d\u00E9ductibles - amortissements",
      );
      setTextContent(assietteImposableTitre, "Revenu BIC imposable");
    }
  }

  calculatedValue.assietteimposable = assietteImposable;
  setTextContent(assietteImposableValue, assietteImposable);
  return assietteImposable;
}

function calculeImpotRevenuFoncier() {
  const assietteImposable = getAssietteImposable();
  if (assietteImposable <= 0) {
    calculatedValue.impotFoncier = 0;
    setTextContent(impotFoncierValue, "0");
    return;
  }

  const tauxMarginalImposition = getTauxMarginalImposition();
  const rate = tauxMarginalImposition + dataValueInit.tauxImpoFoncier;
  const impotFoncier = Math.round((assietteImposable * rate) / 100);
  calculatedValue.impotFoncier = impotFoncier;
  setTextContent(impotFoncierValue, impotFoncier);
}

function bilanApresImposition() {
  const bilanFinal =
    toFiniteNumber(calculatedValue.balance) -
    toFiniteNumber(calculatedValue.impotFoncier);
  const isPositive = bilanFinal > 0;
  setTextContent(bilanApresImpositionValue, Math.round(bilanFinal));

  if (isPositive) {
    swapClasses(containerSimulation, "border-negatif", "border-positif");
    swapClasses(simulationTitre, "titre-negatif", "titre-positif");
    swapClasses(coutMensuelContainer, "result-negatif", "result-positif");
    setTextContent(
      coutMensuelTitre,
      "Dans ces conditions, votre bien en location vous rapporte:",
    );
    setTextContent(coutMensuelValue, Math.round(bilanFinal / MONTHS_PER_YEAR));
  } else {
    swapClasses(containerSimulation, "border-positif", "border-negatif");
    swapClasses(simulationTitre, "titre-positif", "titre-negatif");
    swapClasses(coutMensuelContainer, "result-positif", "result-negatif");
    setTextContent(
      coutMensuelTitre,
      "Dans ces conditions, votre bien en location vous co\u00FBte:",
    );
    setTextContent(
      coutMensuelValue,
      Math.round(Math.abs(bilanFinal) / MONTHS_PER_YEAR),
    );
  }
}

export {
  balance,
  bilanApresImposition,
  calculeImpotRevenuFoncier,
  controlValueOfIncome,
  coutDuCredit,
  incomeByYear,
  initInputValue,
  initResultatFiscal,
  mensualite,
};
