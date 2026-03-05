/****************************************************************************
 * Version optimisée pour réduire les accès DOM répétés et centraliser les calculs
 ****************************************************************************/

import {
  hideInputRadioRegimeFiscal,
  displayInputRadioRegimeFiscal,
  hideChargeReel,
  displayChargeReel,
  hideChargeForfaitaire,
  displayChargeForfaitaire,
  getTauxMarginalImposition,
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
  inputNumberApno,
  inputNumberApport,
  inputNumberCfe,
  inputNumberChargeDeductible,
  inputNumberChargeNondeductible,
  inputNumberCopro,
  inputNumberDuree,
  inputNumberFoncier,
  inputNumberGestion,
  inputNumberHabitation,
  inputNumberPrix,
  inputNumberRevenuChargeComprise,
  inputNumberRevenuHorsCharge,
  inputNumberTaeg,
  inputRangeAli,
  inputRangeApno,
  inputRangeApport,
  inputRangeCfe,
  inputRangeChargeDeductible,
  inputRangeChargeNondeductible,
  inputRangeCopro,
  inputRangeDuree,
  inputRangeFoncier,
  inputRangeGestion,
  inputRangeHabitation,
  inputRangePrix,
  inputRangeRevenuChargeComprise,
  inputRangeRevenuHorsCharge,
  inputRangeTaeg,
  interestCredit,
  interestTextEnd,
  interestTextStart,
  mensualiteTextEnd,
  mensualiteTextStart,
  resultat,
  simulationTitre,
  titreRegimeImposition,
  toltalChargeValue,
  totalRevenuLocatifValue,
  totalRevenuReferenceValue,
  inputRadioLocationNue,
  inputRadioRegimeForfaitaire,
  inputRadioRegimeReel,
  inputRadioTauxMarginalDefault,
} from "../../refDOM/refDomSimulator.js";

import { calculatedValue, dataValueInit } from "../../data/data.js";

const MONTHS_PER_YEAR = 12;

const toFiniteNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const toPositiveInt = (value) => Math.max(0, Math.round(toFiniteNumber(value)));

const setPairValue = (numberInput, rangeInput, rawValue) => {
  const value = toPositiveInt(rawValue);
  if (numberInput) numberInput.value = value;
  if (rangeInput) rangeInput.value = value;
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
  const capitalEmprunte = toFiniteNumber(montant) - toFiniteNumber(apport);
  const months = Math.max(1, Math.round(toFiniteNumber(periode) * MONTHS_PER_YEAR));
  const yearlyRate = toFiniteNumber(taeg) / 100;
  const monthlyRate = yearlyRate / MONTHS_PER_YEAR;

  if (capitalEmprunte <= 0) {
    calculatedValue.capital = 0;
    calculatedValue.mensualite = "0.00";
    resultat && (resultat.textContent = "0");
    return;
  }

  calculatedValue.capital = Math.round(capitalEmprunte);

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = capitalEmprunte / months;
  } else {
    const denominator = 1 - Math.pow(1 + monthlyRate, -months);
    monthlyPayment = denominator !== 0 ? (capitalEmprunte * monthlyRate) / denominator : 0;
  }

  const fixed = Number.isFinite(monthlyPayment) ? monthlyPayment.toFixed(2) : "0.00";
  calculatedValue.mensualite = fixed;

  setTextContent(mensualiteTextStart, "Vos mensualit\u00E9s: ");
  setTextContent(resultat, fixed);
  setTextContent(mensualiteTextEnd, " \u20AC");
}

function coutDuCredit() {
  const capital = toFiniteNumber(calculatedValue.capital);
  const mensualiteValue = toFiniteNumber(calculatedValue.mensualite);
  const duree = Math.max(0, toFiniteNumber(inputNumberDuree?.value));

  const interest = mensualiteValue * duree * MONTHS_PER_YEAR - capital;
  const result = Math.max(0, interest);
  calculatedValue.interet = result.toFixed(2);

  setTextContent(interestTextStart, "Co\u00FBt de l'emprunt: ");
  setTextContent(interestCredit, result.toFixed(2));
  setTextContent(interestTextEnd, " \u20AC");
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
    habitation,
    cfe,
    nondeductible,
    deductible,
    locationtype,
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
    (toFiniteNumber(rateGestion) / 100) * toFiniteNumber(income) * MONTHS_PER_YEAR;
  setPairValue(inputNumberGestion, inputRangeGestion, gestionValue);
  setPairValue(inputNumberApno, inputRangeApno, apno);
  setPairValue(inputNumberAli, inputRangeAli, ali);
  setPairValue(inputNumberFoncier, inputRangeFoncier, foncier);
  setPairValue(inputNumberHabitation, inputRangeHabitation, habitation);
  setPairValue(inputNumberCfe, inputRangeCfe, cfe);
  setPairValue(
    inputNumberChargeNondeductible,
    inputRangeChargeNondeductible,
    nondeductible,
  );
  calculatedValue.dutyDeductible = setPairValue(
    inputNumberChargeDeductible,
    inputRangeChargeDeductible,
    deductible,
  );

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
  setTextContent(totalRevenuLocatifValue, Math.round(incomeCc * MONTHS_PER_YEAR));

  const reference =
    calculatedValue.locationType === "nue"
      ? income * MONTHS_PER_YEAR
      : incomeCc * MONTHS_PER_YEAR;
  setTextContent(totalRevenuReferenceValue, Math.round(reference));
}

function controlValueOfIncome() {
  const income = toFiniteNumber(calculatedValue.income) * MONTHS_PER_YEAR;
  const incomeCC = toFiniteNumber(calculatedValue.incomeCc) * MONTHS_PER_YEAR;
  const typeLocation = calculatedValue.locationType ?? "nue";
  const seuil = typeLocation === "nue" ? 15300 : 77700;
  const incomeReference = typeLocation === "nue" ? income : incomeCC;
  const fiscalChoiceSave = calculatedValue.fiscalChoiceMemo ?? "forfaitaire";

  if (incomeReference > seuil) {
    inputRadioRegimeReel && (inputRadioRegimeReel.checked = true);
    calculatedValue.fiscalChoice = "reel";
    setTextContent(titreRegimeImposition, "R\u00E9gime r\u00E9el obligatoire");

    hideChargeForfaitaire();
    displayChargeReel();
    hideInputRadioRegimeFiscal();
    return "no-choice";
  }

  setTextContent(titreRegimeImposition, "Choix du r\u00E9gime d'imposition");
  displayInputRadioRegimeFiscal();

  if (fiscalChoiceSave === "reel") {
    calculatedValue.fiscalChoice = "reel";
    calculatedValue.fiscalChoiceMemo = "reel";
    inputRadioRegimeReel && (inputRadioRegimeReel.checked = true);
    inputRadioRegimeForfaitaire && (inputRadioRegimeForfaitaire.checked = false);
    hideChargeForfaitaire();
    displayChargeReel();
  } else {
    calculatedValue.fiscalChoice = "forfaitaire";
    calculatedValue.fiscalChoiceMemo = "forfaitaire";
    inputRadioRegimeForfaitaire && (inputRadioRegimeForfaitaire.checked = true);
    inputRadioRegimeReel && (inputRadioRegimeReel.checked = false);
    hideChargeReel();
    displayChargeForfaitaire();
  }

  return "choice";
}

const chargeGroups = {
  nue: {
    forfaitaire: [
      inputNumberCopro,
      inputNumberGestion,
      inputNumberApno,
      inputNumberAli,
      inputNumberFoncier,
      inputNumberHabitation,
    ],
    reel: [
      inputNumberHabitation,
      inputNumberChargeNondeductible,
      inputNumberChargeDeductible,
    ],
  },
  meuble: {
    forfaitaire: [
      inputNumberCopro,
      inputNumberGestion,
      inputNumberApno,
      inputNumberAli,
      inputNumberFoncier,
      inputNumberHabitation,
      inputNumberCfe,
    ],
    reel: [
      inputNumberHabitation,
      inputNumberChargeNondeductible,
      inputNumberChargeDeductible,
      inputNumberCfe,
    ],
  },
};

function getTotalDuty() {
  const mensualiteYear = toFiniteNumber(calculatedValue.mensualite) * MONTHS_PER_YEAR;
  const type = calculatedValue.locationType ?? "nue";
  const choice = calculatedValue.fiscalChoice ?? "forfaitaire";

  const charges = sumInputs(chargeGroups[type]?.[choice]);
  const dutyTotal = Math.round(mensualiteYear + charges);
  calculatedValue.duty = dutyTotal;
  setTextContent(toltalChargeValue, dutyTotal);
  return dutyTotal;
}

function balance() {
  const totalDuty = getTotalDuty();
  const yearlyIncome = toFiniteNumber(calculatedValue.incomeCc) * MONTHS_PER_YEAR;
  const balanceValue = Math.round(yearlyIncome - totalDuty);
  calculatedValue.balance = balanceValue;
  setTextContent(bilanAvantImpotValue, balanceValue);
}

function getAssietteImposable() {
  const type = calculatedValue.locationType ?? "nue";
  const choice = calculatedValue.fiscalChoice ?? "forfaitaire";
  let assietteImposable = 0;

  if (type === "nue" && choice === "forfaitaire") {
    assietteImposable = Math.round(toFiniteNumber(calculatedValue.income) * MONTHS_PER_YEAR * 0.7);
    setTextContent(
      assietteImposableDefinition,
      "Revenu de r\u00E9f\u00E9rence - abattement forfaitaire de 30%",
    );
    setTextContent(assietteImposableTitre, "Assiette imposable");
  } else if (type === "meuble" && choice === "forfaitaire") {
    assietteImposable = Math.round(toFiniteNumber(calculatedValue.incomeCc) * MONTHS_PER_YEAR * 0.5);
    setTextContent(
      assietteImposableDefinition,
      "Revenu de r\u00E9f\u00E9rence - abattement forfaitaire de 50%",
    );
    setTextContent(assietteImposableTitre, "Assiette imposable");
  } else if (choice === "reel") {
    const base =
      type === "nue"
        ? toFiniteNumber(calculatedValue.income) * MONTHS_PER_YEAR
        : toFiniteNumber(calculatedValue.incomeCc) * MONTHS_PER_YEAR;
    assietteImposable = Math.round(base - toFiniteNumber(calculatedValue.dutyDeductible));
    setTextContent(
      assietteImposableDefinition,
      "Revenu de r\u00E9f\u00E9rence - charges d\u00E9ductibles",
    );
    setTextContent(
      assietteImposableTitre,
      assietteImposable > 0 ? "Assiette imposable" : "D\u00E9ficit foncier",
    );
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
    toFiniteNumber(calculatedValue.balance) - toFiniteNumber(calculatedValue.impotFoncier);
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
