/****************************************************************************************
 * addEvent-v2.js — Optimisé TBT (delegation + debounce + moins de travail au chargement)
 *
 * API (exports) identique à ton fichier actuel :
 *  addEventOnPageLoading,
 *  
 *  addEventOnSimulateurButton,
 *  addEventOnButtonDownload,
 *  
 *  
 *  addEventOnInputDuty,
 *  addEventOnInputIncome,
 *  addEventOnInputMonthly,
 *  addEventOnInputRadioFiscal,
 *  addEventOnInputRadioImpot,
 *  addEventOnInputRadioTypeLocation,
 *  addEventOnLinkArticle
 *
 * Important :
 * - Tu peux appeler ces fonctions comme avant depuis index-v2.js
 * - Les fonctions "addEventOnInput*" ajoutent maintenant une délégation globale (une seule fois)
 ****************************************************************************************/

import {
  containerLinkBanner,
  btnDownloadList,
  
  
} from "../../refDOM/refDomUi.js";
import {
  loader,
  inputSelectCalculator,
  inputNumberApport,
  inputNumberDuree,
  inputNumberPrix,
  inputNumberTaeg,
  inputRangeApport,
  inputRangeDuree,
  inputRangePrix,
  inputRangeTaeg,
  totalRevenuReferenceValue,
  calculatorMensualite,
  containerResultat
} from "../../refDOM/refDomSimulator.js";

import { calculatedValue } from "../../data/data.js";

import {
  changeColor,
  
  displayChargeAmortissable,
  displayTotalAmortissement,
  
  //displayChargeForfaitaire,
  displayChargeReel,
  displayInputCfe,
  
  hideChargeAmortissable,
  hideTotalAmortissement,
  
  //hideChargeForfaitaire,
  hideChargeReel,
  hideInputCfe,
  
  linkInput,
  
} from "../other/other-v2.js";

import {
  balance,
  bilanApresImposition,
  calculeImpotRevenuFoncier,
  controlValueOfIncome,
  coutDuCredit,
  incomeByYear,
  mensualite,
} from "../basicCalcul/basicCalcul-v2.js";

import {
  checkValueUserDuty,
  checkValueUserIncome,
  checkValueUserMonthly,
  checkValueUserRadioFiscal,
} from "../checkValueUser/checkValueUser.js";

import { FetchForDownload } from "../http/download.js";

/* ----------------------------- Helpers perf ----------------------------- */

const debounce = (fn, delay = 150) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
};

// Évite de recalculer 3 fois si plusieurs events arrivent quasi ensemble
const scheduleMicrotask = (fn) => {
  let scheduled = false;
  return (...args) => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      fn(...args);
    });
  };
};

const zeroDisplaySelector = ".calculette-number";
let zeroDisplayListenerAttached = false;

const ensureZeroDisplayHandler = () => {
  if (zeroDisplayListenerAttached) return;
  zeroDisplayListenerAttached = true;

  document.addEventListener(
    "blur",
    (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== "number") return;
      if (!target.matches(zeroDisplaySelector)) return;
      if (target.value === "") return;
      const numericValue = Number(target.value);
      if (Number.isFinite(numericValue) && numericValue === 0) {
        target.value = "";
      }
    },
    true,
  );
};

const monthlyInputsConfig = [
  { number: () => inputNumberPrix, range: () => inputRangePrix },
  { number: () => inputNumberApport, range: () => inputRangeApport },
  { number: () => inputNumberTaeg, range: () => inputRangeTaeg },
  { number: () => inputNumberDuree, range: () => inputRangeDuree },
];

let savedMonthlyInputs = null;

const captureMonthlyInputs = () => {
  savedMonthlyInputs = monthlyInputsConfig.map(({ number, range }) => {
    const numberInput = number();
    const rangeInput = range();
    return {
      numberValue: numberInput?.value ?? "",
      rangeValue: rangeInput?.value ?? "",
    };
  });
};

const restoreMonthlyInputs = () => {
  if (!savedMonthlyInputs) return;
  savedMonthlyInputs.forEach(({ numberValue, rangeValue }, index) => {
    const { number, range } = monthlyInputsConfig[index];
    const numberInput = number();
    const rangeInput = range();
    if (numberInput) {
      numberInput.value = numberValue ?? "";
    }
    if (rangeInput) {
      rangeInput.value = rangeValue ?? "";
    }
  });
};

const getNumberValue = (input) => {
  if (!input) return 0;
  const parsed = Number.parseFloat(input.value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const recalcAfterMonthlyToggle = () => {
  const isCalculated = mensualite(
    getNumberValue(inputNumberPrix),
    getNumberValue(inputNumberApport),
    getNumberValue(inputNumberTaeg),
    getNumberValue(inputNumberDuree),
  );
  coutDuCredit(isCalculated);
  balance();
  const checked = checkValueUserRadioFiscal();
  if (checked) {
    calculeImpotRevenuFoncier();
    bilanApresImposition();
  }
};

const disableMonthlyCalculator = () => {
  captureMonthlyInputs();
  calculatorMensualite?.classList.add("hide-calculette");
  calculatedValue.useLoan = false;
  calculatedValue.capital = 0;
  calculatedValue.mensualite = 0;
  //resultat && (resultat.textContent = "");
  coutDuCredit(false);
  balance();
  const checked = checkValueUserRadioFiscal();
  if (checked) {
    calculeImpotRevenuFoncier();
    bilanApresImposition();
  }
};

const enableMonthlyCalculator = () => {
  calculatorMensualite?.classList.remove("hide-calculette");
  calculatedValue.useLoan = true;
  restoreMonthlyInputs();
  recalcAfterMonthlyToggle();
};

const displayCharge = () => {
  const isReal = calculatedValue.fiscalChoice === "reel" ? true : false;
  const isMeuble = calculatedValue.locationType === "meuble" ? true : false;

  //si location nue regime forfaitaire
  if (!isMeuble && !isReal) {
    hideInputCfe();
    hideChargeAmortissable();
    hideTotalAmortissement();
    calculatedValue.useAmortissable = false;
    calculatedValue.useCfe = false;
    totalRevenuReferenceValue.innerHTML = calculatedValue.income * 12;
    const checked = checkValueUserRadioFiscal();
    if (!checked) return;

    //controlValueOfIncome();
    recalcAfterRadio();
    return;
  }
  //si location nue regime reel
  if (!isMeuble && isReal) {
    hideInputCfe();
    hideChargeAmortissable();
    hideTotalAmortissement();
    calculatedValue.useAmortissable = false;
    calculatedValue.useCfe = false;
    totalRevenuReferenceValue.innerHTML = calculatedValue.incomeCc * 12;
    //controlValueOfIncome();
    recalcAfterRadio();
    return;
  }

  //si location meuble regime forfaitaire
  if (isMeuble && !isReal) {
    displayInputCfe();
    hideChargeAmortissable();
    hideTotalAmortissement();
    calculatedValue.useAmortissable = false;
    calculatedValue.useCfe = true;
    totalRevenuReferenceValue.innerHTML = calculatedValue.incomeCc * 12;
    //controlValueOfIncome();
    recalcAfterRadio();
    return;
  }

  //si location meuble regime reel
  if (isMeuble && isReal) {
    displayInputCfe();
    displayChargeAmortissable();
    displayTotalAmortissement();
    calculatedValue.useAmortissable = true;
    calculatedValue.useCfe = true;
    totalRevenuReferenceValue.innerHTML = calculatedValue.incomeCc * 12;
    //controlValueOfIncome();
    recalcAfterRadio();
    return;
  }


  
};

/* ------------------------- Recalculs centralisés ------------------------- */

function recalcMonthlyIfValid(e) {
  linkInput(e);
  const isValid = checkValueUserMonthly(e);
  if (!isValid) return;

  const isCaculated = mensualite(
    inputNumberPrix.value,
    inputNumberApport.value,
    inputNumberTaeg.value,
    inputNumberDuree.value,
  );

   
  coutDuCredit(isCaculated);
  changeColor();

  balance();

  const checked = checkValueUserRadioFiscal();
  if (checked) {
    calculeImpotRevenuFoncier();
    bilanApresImposition();
  }
}

function recalcIncomeIfValid(e) {
  linkInput(e);

  // Stockage valeurs dans calculatedValue
  const n = e.target?.name;
  if (n === "number-revenu_hors_charge" || n === "range-revenu_hors_charge") {
    calculatedValue.income = e.target.value;
  } else if (
    n === "number-revenu_charge_comprise" ||
    n === "range-revenu_charge_comprise"
  ) {
    calculatedValue.incomeCc = e.target.value;
  }

  /* const isValidIncome = checkValueUserIncome();
  if (!isValidIncome) return; */

  // Détermine type / contrôle
  controlValueOfIncome();

  incomeByYear();
  balance();

  const isChecked = checkValueUserRadioFiscal();
  if (!isChecked) return;

  const choice = controlValueOfIncome();
  if (choice === "choice") {
    const isValidBalance = checkValueUserDuty();
    if (!isValidBalance) return;
    balance();
    calculeImpotRevenuFoncier();
    bilanApresImposition();
    return;
  }

  if (choice === "no-choice") {
    calculatedValue.fiscalChoice = "reel";
    calculeImpotRevenuFoncier();
    bilanApresImposition();
    return;
  }
}

function recalcDutyIfValid(e) {
  
   linkInput(e);
  /*const isValid = checkValueUserDuty();
  if (!isValid) return; */

  balance();
  calculeImpotRevenuFoncier();
  bilanApresImposition();
}

// Debounce pour éviter les long tasks à chaque frappe
const recalcMonthlyDebounced = debounce(recalcMonthlyIfValid, 160);
const recalcIncomeDebounced = debounce(recalcIncomeIfValid, 160);
const recalcDutyDebounced = debounce(recalcDutyIfValid, 160);

// Pour les clicks radio : pas besoin de debounce long, mais on évite multiples calls
const recalcAfterRadio = scheduleMicrotask(() => {
  balance();
  calculeImpotRevenuFoncier();
  bilanApresImposition();
});

/* ------------------------- Delegation flags ------------------------- */

let delegatedInputsMonthly = false;
let delegatedInputsIncome = false;
let delegatedInputsDuty = false;
let delegatedRadioImpot = false;
let delegatedRadioTypeLocation = false;
let delegatedRadioFiscal = false;
let delegatedRadioAmortissement = false;
let delegatedDownloads = false;
let delegatedNeedLoanToggle = false;

/* ------------------------- Loader ------------------------- */

function addEventOnPageLoading() {
  const hideLoader = () => {
    if (!loader) {
      console.warn("[loader] refDOM loader est null");
      return;
    }
    loader.classList.add("hide");
  };

  // Si le DOM est déjà prêt au moment où tu appelles la fonction
  if (document.readyState === "complete") {
    setTimeout(hideLoader, 0);
    return;
  }

  // Cache vite après que le DOM est prêt (souvent suffisant)
  window.addEventListener(
    "DOMContentLoaded",
    () => {
      setTimeout(hideLoader, 150);
    },
    { once: true },
  );

  // Cache après load (images, etc.)
  window.addEventListener(
    "load",
    () => {
      setTimeout(hideLoader, 400);
    },
    { once: true },
  );

  // Fallback ultime (évite un loader “bloqué”)
  setTimeout(hideLoader, 3000);
}

/* /* ------------------------- Banner  ------------------------- */



function addEventOnLinkBanner() {
  containerLinkBanner.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    const id = link.hash.slice(1);

    const details = document.querySelector(`#${id} details`);
    if (!details) return;

    details.open = true;
  });
}


/* ------------------------- Inputs (delegation) ------------------------- */


function addEventOnInputMonthly() {
  if (delegatedInputsMonthly) return;
  delegatedInputsMonthly = true;
  ensureZeroDisplayHandler();

  document.addEventListener("input", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;

    // On filtre uniquement les inputs du fieldset monthly
    // correspond à: #calculette-mensualite input.calculette-number / input.calculette-range
    if (
      t.matches(
        "#calculette-mensualite input[type='number'], #calculette-mensualite input[type='range']",
      )
    ) {
      recalcMonthlyDebounced(e);
      
    }
  });
}

function addEventOnNeedLoanToggle() {
  if (delegatedNeedLoanToggle) return;
  delegatedNeedLoanToggle = true;

  captureMonthlyInputs();

  const handleToggle = () => {
    const shouldUseLoan = inputSelectCalculator?.checked ?? false;
    if (shouldUseLoan) {
      enableMonthlyCalculator();
    } else {
      disableMonthlyCalculator();

    }
    recalcAfterMonthlyToggle();
  };

  if (inputSelectCalculator) {
    inputSelectCalculator.addEventListener("click", handleToggle);
  }
  handleToggle();
}

function addEventOnInputIncome() {
  if (delegatedInputsIncome) return;
  delegatedInputsIncome = true;

  document.addEventListener("input", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;

    if (
      t.matches(
        "#revenu-locatif input[type='number'], #revenu-locatif input[type='range']"
      )
    ) {
      recalcIncomeDebounced(e);
    }
  });
}

function addEventOnInputDuty() {
  if (delegatedInputsDuty) return;
  delegatedInputsDuty = true;

  document.addEventListener("input", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;

    if (
      t.matches(
        "#charge-taxe input[type='number'], #charge-taxe input[type='range']" )
    ) {
      recalcDutyDebounced(e);
    }
  });
}

/* ------------------------- Radios (delegation) ------------------------- */

function addEventOnInputRadioImpot() {
  if (delegatedRadioImpot) return;
  delegatedRadioImpot = true;

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    if (!t.matches("#fiscal input[name='taux-impot']")) return;

    const checked = checkValueUserRadioFiscal();
    if (checked) {
      calculeImpotRevenuFoncier();
      bilanApresImposition();
    }
  });
}

function addEventOnInputRadioTypeLocation() {
  if (delegatedRadioTypeLocation) return;
  delegatedRadioTypeLocation = true;

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    if (
      !t.matches("#location-type-container-radio input[name='type-location']")
    )
      return;

    const inputValue = t.value;
    calculatedValue.locationType = inputValue;
    displayCharge();
    recalcAfterRadio();
  });
}

function addEventOnInputRadioFiscal() {
  if (delegatedRadioFiscal) return;
  delegatedRadioFiscal = true;

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    if (
      !t.matches("#regime-fiscal-container-radio input[name='regime-fiscal']")
    )
      return;

    const result = t.value;
    calculatedValue.fiscalChoice = result;
    calculatedValue.fiscalChoiceMemo = result;
    displayCharge()

    recalcAfterRadio();
  });
}

function addEventOnInputRadioAmortissable() {
  if (delegatedRadioAmortissement) return;
  delegatedRadioAmortissement = true;

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    if (
      !t.matches(
        "#charge-amortissable-batiment input[type='radio'], #charge-amortissable-mobilier input[type='radio'], #charge-amortissable-travaux input[type='radio']"
      )
    )
      return;
    const result = t.value;
    const name = t.name;
    console.log("valeur radio amortissable: ", result + "and name:" + name);

    if (t.name === "duree-batiment") {
      calculatedValue.dureeBat = result;
    };
    if (t.name === "duree-mobilier") {
      calculatedValue.dureeMobilier = result;
    };
    if (t.name === "duree-travaux") {
      calculatedValue.dureeTravaux = result;
    };
    recalcAfterRadio();
  })
}

/* -------------------------  download ------------------------- */



function addEventOnButtonDownload() {
  if (delegatedDownloads) return;
  delegatedDownloads = true;

  // Si btnDownloadList est une NodeList déjà prête, on peut conserver forEach (peu d’éléments)
  // Sinon delegation via class ou data-attr serait encore mieux.
  if (!btnDownloadList) return;

  btnDownloadList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      FetchForDownload(e);
    });
  });
}



/* ------------------------- Exports (API identique) ------------------------- */

export {
  addEventOnPageLoading,
  addEventOnNeedLoanToggle,
  addEventOnLinkBanner,
  addEventOnButtonDownload,
  addEventOnInputDuty,
  addEventOnInputIncome,
  addEventOnInputMonthly,
  addEventOnInputRadioFiscal,
  addEventOnInputRadioImpot,
  addEventOnInputRadioTypeLocation,
  addEventOnInputRadioAmortissable,
};
