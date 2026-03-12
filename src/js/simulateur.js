import {
  addEventOnInputDuty,
  addEventOnInputIncome,
  addEventOnInputMonthly,
  addEventOnInputRadioFiscal,
  addEventOnInputRadioImpot,
  addEventOnInputRadioTypeLocation,
  addEventOnPageLoading,
  
} from "./utils/functions/addEvent/addEvent-v2.js";
import {
  initInputValue,
  initResultatFiscal,
  mensualite,
  coutDuCredit,
  incomeByYear,
  balance,
  calculeImpotRevenuFoncier,
  bilanApresImposition,
} from "./utils/functions/basicCalcul/basicCalcul-v2.js";
import { checkValueUserRadioFiscal } from "./utils/functions/checkValueUser/checkValueUser.js";
import {
  eventToggleSwitch,
  initToggleSwitch,
  
  
} from "./utils/functions/other/other-ui-v2.js";
import { changeColor } from "./utils/functions/other/other-v2.js";
import { registerServiceWorker } from "./utils/registerServiceWorker.js";

/* const once = (fn) => {
  let promise = null;
  return () => {
    if (!promise) {
      promise = Promise.resolve(fn());
    }
    return promise;
  };
};

const observeSection = (selector, callback, options = { rootMargin: "0px 0px -20% 0px", threshold: 0 }) => {
  const target = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!target) return;

  if (!("IntersectionObserver" in window)) {
    callback(target);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      callback(target);
    }
  }, options);

  observer.observe(target);
}; */

const getInputInt = (selector) => {
  const value = document.querySelector(selector)?.value ?? "0";
  return parseInt(value, 10) || 0;
};

const getInputFloat = (selector) => {
  const value = document.querySelector(selector)?.value ?? "0";
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const initSimulator = () => {
  initInputValue();
  initResultatFiscal();

  mensualite(
    getInputInt("input[name='number-prix']"),
    getInputInt("input[name='number-apport']"),
    getInputFloat("input[name='number-taeg']"),
    getInputInt("input[name='number-duree']"),
  );
  coutDuCredit();
  changeColor();
  incomeByYear();
  checkValueUserRadioFiscal();
  balance();
  calculeImpotRevenuFoncier();
  bilanApresImposition();
};

const initEvents = () => {
  addEventOnInputMonthly();
  addEventOnInputIncome();
  addEventOnInputDuty();
  addEventOnInputRadioTypeLocation();
  addEventOnInputRadioImpot();
  addEventOnInputRadioFiscal();
  addEventOnPageLoading();
};


initToggleSwitch();
eventToggleSwitch();
initSimulator();
initEvents();
registerServiceWorker();

