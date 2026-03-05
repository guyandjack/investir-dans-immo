// Version optimisée pour limiter les accès DOM répétitifs et les longs tasks
import { infoBulleCalculMensualite } from "../../data/content/infoBulle.js";
import { urlLink } from "@/js/utils/data/content/urlLink.js";
import {
  collapseRang1LocationMeuble,
  collapseRang1LocationNue,
  colapseForfaitaire1,
  colapseForfaitaire2,
  colapseReel1,
  colapseReel2,
  footerLinkAccueil,
  footerLinkCGU,
  footerLinkContact,
  footerLinkMention,
  footerLinkPolitique,
  navLinkAccueil,
  navLinkContact,
} from "../../refDOM/refDomUi.js";
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

const collapseConfig = {
  "forfaitaire-a": {
    selected: colapseForfaitaire1,
    parent: collapseRang1LocationNue,
    sibling: colapseReel1,
  },
  "reel-a": {
    selected: colapseReel1,
    parent: collapseRang1LocationNue,
    sibling: colapseForfaitaire1,
  },
  "forfaitaire-b": {
    selected: colapseForfaitaire2,
    parent: collapseRang1LocationMeuble,
    sibling: colapseReel2,
  },
  "reel-b": {
    selected: colapseReel2,
    parent: collapseRang1LocationMeuble,
    sibling: colapseForfaitaire2,
  },
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

const getToggleSwitch = () => {
  if (toggleRefs.switch && toggleRefs.switch.isConnected) {
    return toggleRefs.switch;
  }
  toggleRefs.switch = document.querySelector(".switch");
  return toggleRefs.switch;
};

const getToggleSwap = () => {
  if (toggleRefs.swap && toggleRefs.swap.isConnected) {
    return toggleRefs.swap;
  }
  toggleRefs.swap = document.querySelector(".swap");
  return toggleRefs.swap;
};

const getToggleText = () => {
  if (toggleRefs.text && toggleRefs.text.isConnected) {
    return toggleRefs.text;
  }
  toggleRefs.text = document.querySelector(".toggle-text");
  return toggleRefs.text;
};

const safeNumber = (value) => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

function setLinkUrl() {
  navLinkAccueil?.setAttribute("href", urlLink.accueil);
  navLinkContact?.setAttribute("href", urlLink.contact);

  footerLinkAccueil?.setAttribute("href", urlLink.accueil);
  footerLinkContact?.setAttribute("href", urlLink.contact);
  footerLinkCGU?.setAttribute("href", urlLink.cgu);
  footerLinkPolitique?.setAttribute("href", urlLink.politique);
  footerLinkMention?.setAttribute("href", urlLink.mention);
}

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

  if (linked.value !== target.value) {
    linked.value = target.value;
  }
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
  element.innerHTML = text;
  return true;
}

function getIdOfParentElementHover(evt) {
  const element = evt?.target;
  const parent = element?.parentElement;
  return parent?.id ?? null;
}

async function createElemntInfoBulle(idInsertion) {
  const insertionPoint = getCachedElement(idInsertion);
  if (!insertionPoint) return null;

  const fragment = document.createDocumentFragment();
  const containerDiv = document.createElement("div");
  const title = document.createElement("h3");
  const para1 = document.createElement("p");
  const para2 = document.createElement("p");
  const para3 = document.createElement("p");
  const closure = document.createElement("div");

  closure.textContent = "fermer";

  containerDiv.append(title, para1, para2, para3, closure);
  fragment.appendChild(containerDiv);
  insertionPoint.appendChild(fragment);

  return containerDiv;
}

function styleOfInfoBulle(element) {
  element?.classList?.add("info-bulle");
}

function insertContentInfoBulle(element, refContent) {
  if (!element) return null;
  const titre = element.querySelector("h3");
  const paraList = element.querySelectorAll("p");
  const content = infoBulleCalculMensualite[refContent];

  if (!content) return element;

  if (titre) titre.textContent = content["titre"];
  paraList[0] && (paraList[0].textContent = content["contenu1"]);
  paraList[1] && (paraList[1].textContent = content["contenu2"]);
  paraList[2] && (paraList[2].textContent = content["contenu3"]);

  return element;
}

function deleteElement(elementId) {
  if (!elementId) return;
  const parent = getCachedElement(`#${elementId}`);
  const infobulle = parent?.querySelector(".info-bulle:last-child")
    ?? parent?.lastElementChild;

  if (infobulle?.classList?.contains("info-bulle")) {
    infobulle.remove();
  }
}

function moveSwitch() {
  const switchToggle = getToggleSwitch();
  if (!switchToggle) return;

  if (switchToggle.classList.contains("move")) {
    switchToggle.classList.remove("move");
    localStorage.removeItem("toggle");
    return;
  }

  switchToggle.classList.add("move");
  localStorage.setItem("toggle", "ok");
}

function isToggleMoved() {
  const switchToggle = getToggleSwitch();
  if (!switchToggle) return;

  const shouldMove = localStorage.getItem("toggle") === "ok";
  if (shouldMove) {
    if (!switchToggle.classList.contains("move")) {
      switchToggle.classList.add("move");
    }
    return;
  }

  if (switchToggle.classList.contains("move")) {
    switchToggle.classList.remove("move");
  }
}

function changeTextToggle(text) {
  const textToggle = getToggleText();
  if (!textToggle) return;
  textToggle.textContent = text;
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

function extendOrCloseColapseInArticle(e) {
  const elementLiId = e?.currentTarget?.id;
  if (!elementLiId) return;

  const config = collapseConfig[elementLiId];
  if (!config) return;

  const { selected, parent, sibling } = config;
  if (!selected || !parent || !sibling) return;

  const iconSvgMatched = e.currentTarget.lastElementChild;
  iconSvgMatched?.classList?.toggle("chevron-up");

  if (selected.classList.contains("colapse-article-close")) {
    if (!parent.classList.contains("colapse-grow")) {
      parent.classList.add("colapse-grow");
    }
    selected.classList.replace(
      "colapse-article-close",
      "colapse-article-open",
    );
    return;
  }

  if (selected.classList.contains("colapse-article-open")) {
    const shrinkParentIfNeeded = () => {
      if (
        parent.classList.contains("colapse-grow") &&
        sibling.classList.contains("colapse-article-close")
      ) {
        parent.classList.remove("colapse-grow");
      }
    };

    selected.addEventListener("transitionend", shrinkParentIfNeeded, {
      once: true,
    });

    selected.classList.replace(
      "colapse-article-open",
      "colapse-article-close",
    );
  }
}

function scrollToElement(elementToScroll) {
  elementToScroll?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
}

export {
  setLinkUrl,
  InsertTextInAElement,
  changeColor,
  createElemntInfoBulle,
  deleteElement,
  displayAElement,
  displayChargeForfaitaire,
  displayChargeReel,
  displayInputCfe,
  displayInputRadioRegimeFiscal,
  eventToggleSwitch,
  extendOrCloseColapseInArticle,
  getIdOfParentElementHover,
  getLocationType,
  getTauxMarginalImposition,
  hideAElement,
  hideChargeForfaitaire,
  hideChargeReel,
  hideInputCfe,
  hideInputRadioRegimeFiscal,
  insertContentInfoBulle,
  isToggleMoved,
  linkInput,
  scrollToElement,
  styleOfInfoBulle,
  useThemeColor,
};
