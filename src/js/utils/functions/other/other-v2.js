// Version optimisée pour limiter les accès DOM répétitifs et les longs tasks


import {
  chargeForfaitaireList,
  chargeReelList,
  containerInputCfe,
  containerInputRadioFiscal,
  gainAdvice,
  inputNumberApport,
  inputNumberPrix,
  inputRadioLocationMeuble,
  inputRadioLocationNue,
  uniteGain,
} from "../../refDOM/refDomSimulator.js";
import { calculatedValue } from "../../data/data.js";

const themeDark = "dim";
const themeClear = "winter";

const domCache = new Map();
const linkedInputCache = new Map();

const getCachedElement = (selector) => {
  if (!selector) return null;
  const cached = domCache.get(selector);
  if (cached && cached.isConnected) {
    return cached;
  }
  const element = document.querySelector(selector);
  if (element) {
    domCache.set(selector, element);
  }
  return element;
};

const getLinkedInputElement = (name) => {
  if (!name) return null;
  const cached = linkedInputCache.get(name);
  if (cached && cached.isConnected) {
    return cached;
  }
  const element = document.querySelector(`input[name='${name}']`);
  if (element) {
    linkedInputCache.set(name, element);
  }
  return element;
};

const toggleClass = (element, from, to) => {
  if (!element || !element.classList || !from || !to) return false;
  if (element.classList.contains(from)) {
    element.classList.replace(from, to);
    return true;
  }
  return false;
};

const changeBlockState = (list, from, to) => {
  if (!list) return;
  list.forEach((item) => toggleClass(item, from, to));
};

const toNumberOrZero = (value) => {
  if (value === "" || value === null || value === undefined) return 0;
  const normalized =
    typeof value === "string" ? value.replace(",", ".") : value;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const setLinkedInputValue = (input, numericValue) => {
  if (!input) return;
  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
  if (input.type === "number") {
    input.value = safeValue === 0 ? "" : String(safeValue);
    return;
  }
  input.value = String(safeValue);
};



const toggleRefs = {
  checkbox: null,
  switch: null,
  swap: null,
  text: null,
};

const getToggleCheckbox = () => {
  if (toggleRefs.checkbox && toggleRefs.checkbox.isConnected) {
    return toggleRefs.checkbox;
  }
  toggleRefs.checkbox = document.querySelector("#toggle-switch");
  return toggleRefs.checkbox;
};

/* const getToggleSwitch = () => {
  if (toggleRefs.switch && toggleRefs.switch.isConnected) {
    return toggleRefs.switch;
  }
  toggleRefs.switch = document.querySelector(".switch");
  return toggleRefs.switch;
}; */

const getToggleSwap = () => {
  if (toggleRefs.swap && toggleRefs.swap.isConnected) {
    return toggleRefs.swap;
  }
  toggleRefs.swap = document.querySelector(".swap");
  return toggleRefs.swap;
};

/* const getToggleText = () => {
  if (toggleRefs.text && toggleRefs.text.isConnected) {
    return toggleRefs.text;
  }
  toggleRefs.text = document.querySelector(".toggle-text");
  return toggleRefs.text;
}; */

const safeNumber = (value) => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};



let lastColorApplied = "";

function changeColor() {
  if (!inputNumberApport || !inputNumberPrix || !uniteGain || !gainAdvice) {
    return;
  }

  const price = safeNumber(inputNumberPrix.value);
  if (price <= 0) {
    uniteGain.style.backgroundColor = "";
    gainAdvice.textContent = "0 %";
    lastColorApplied = "";
    return;
  }

  const ratio = safeNumber(inputNumberApport.value) / price;
  const percent = (ratio * 100).toFixed(2);

  const bands = [
    { max: 0.05, color: "red" },
    { max: 0.1, color: "orange" },
    { max: 0.15, color: "yellow" },
    { max: 0.2, color: "lightgreen" },
    { max: Number.POSITIVE_INFINITY, color: "green" },
  ];

  const matched = bands.find((band) => ratio < band.max) ?? bands.at(-1);

  if (lastColorApplied !== matched.color) {
    uniteGain.style.transition = "background-color 180ms linear";
    uniteGain.style.backgroundColor = matched.color;
    lastColorApplied = matched.color;
  }

  gainAdvice.textContent = `${percent} %`;
}

function linkInput(evt) {
  const target = evt?.target;
  if (!(target instanceof HTMLInputElement)) return;

  const [type, name] = target.name.split("-");
  if (!name) return;

  const oppositeType = type === "range" ? "number" : "range";
  const linked = getLinkedInputElement(`${oppositeType}-${name}`);
  if (!linked || linked === target) return;

  const numericValue = toNumberOrZero(target.value);
  setLinkedInputValue(linked, numericValue);
}

function hideInputRadioRegimeFiscal() {
  toggleClass(containerInputRadioFiscal, "display", "hide");
}

function displayInputRadioRegimeFiscal() {
  toggleClass(containerInputRadioFiscal, "hide", "display");
}

function displayInputCfe() {
  return toggleClass(containerInputCfe, "hide-taxe", "display-taxe");
}

function hideInputCfe() {
  return toggleClass(containerInputCfe, "display-taxe", "hide-taxe");
}

function displayChargeForfaitaire() {
  changeBlockState(chargeForfaitaireList, "hide-taxe", "display-taxe");
}

function hideChargeForfaitaire() {
  changeBlockState(chargeForfaitaireList, "display-taxe", "hide-taxe");
}

function displayChargeReel() {
  changeBlockState(chargeReelList, "hide-taxe", "display-taxe");
}

function hideChargeReel() {
  changeBlockState(chargeReelList, "display-taxe", "hide-taxe");
}

function getLocationType() {
  if (inputRadioLocationNue?.checked) {
    calculatedValue.locationType = "nue";
    return true;
  }

  if (inputRadioLocationMeuble?.checked) {
    calculatedValue.locationType = "meuble";
    return true;
  }

  if (inputRadioLocationNue) {
    inputRadioLocationNue.checked = true;
    calculatedValue.locationType = "nue";
    return true;
  }

  return false;
}

function getTauxMarginalImposition() {
  const scope =
    document.querySelector("#fiscal") ??
    containerInputRadioFiscal ??
    document;
  const inputRadio =
    scope.querySelector("input[name='taux-impot']:checked") ??
    document.querySelector("input[name='taux-impot']:checked");

  if (!inputRadio) {
    return calculatedValue.rateIncome ?? 0;
  }

  const rateIncome = parseInt(inputRadio.value, 10);
  calculatedValue.rateIncome = rateIncome;
  return rateIncome;
}

async function hideAElement(selector) {
  const element = getCachedElement(selector);
  if (!element) return false;
  toggleClass(element, "display", "hide");
  return true;
}

async function displayAElement(selector) {
  const element = getCachedElement(selector);
  if (!element) return false;
  toggleClass(element, "hide", "display");
  return true;
}

async function InsertTextInAElement(selector, text) {
  const element = getCachedElement(selector);
  if (!element) return false;
  element.textContent = text;
  return true;
}

function getIdOfParentElementHover(evt) {
  const element = evt?.target;
  const parent = element?.parentElement;
  return parent?.id ?? null;
}



function storeThemeColor() {
  const checkbox = getToggleCheckbox();
  const themeToStore = checkbox?.checked ? themeDark : themeClear;
  localStorage.setItem("themeColor", themeToStore);
}

function useThemeColor() {
  const checkbox = getToggleCheckbox();
  const body = document.body;
  const stored = localStorage.getItem("themeColor");
  const theme = stored === themeDark ? themeDark : themeClear;

  body.dataset.theme = theme;
  if (checkbox) {
    checkbox.checked = theme === themeDark;
  }
}

let toggleSwitchListenerAttached = false;

function eventToggleSwitch() {
  const toggleSwitch = getToggleSwap();
  if (!toggleSwitch || toggleSwitchListenerAttached) return;

  toggleSwitchListenerAttached = true;
  toggleSwitch.addEventListener("click", () => {
    storeThemeColor();
    useThemeColor();
  });
}



export {
  
  InsertTextInAElement,
  changeColor,
  
  displayAElement,
  displayChargeForfaitaire,
  displayChargeReel,
  displayInputCfe,
  displayInputRadioRegimeFiscal,
  eventToggleSwitch,
  
  getIdOfParentElementHover,
  getLocationType,
  getTauxMarginalImposition,
  hideAElement,
  hideChargeForfaitaire,
  hideChargeReel,
  hideInputCfe,
  hideInputRadioRegimeFiscal,
  
  linkInput,
  
  useThemeColor,
};
