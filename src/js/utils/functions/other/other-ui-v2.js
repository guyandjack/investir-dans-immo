import { urlLink } from "@/js/utils/data/content/urlLink.js";
import {
  footerLinkAccueil,
  footerLinkCGU,
  footerLinkContact,
  footerLinkMention,
  footerLinkPolitique,
  navLinkAccueil,
  navLinkContact,
} from "../../refDOM/refDomUi.js";

const themeDark = "dim";
const themeClear = "winter";

const toggleRefs = {
  checkbox: null,
  switch: null,
  swap: null,
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

function setLinkUrl() {
  navLinkAccueil?.setAttribute("href", urlLink.accueil);
  navLinkContact?.setAttribute("href", urlLink.contact);

  footerLinkAccueil?.setAttribute("href", urlLink.accueil);
  footerLinkContact?.setAttribute("href", urlLink.contact);
  footerLinkCGU?.setAttribute("href", urlLink.cgu);
  footerLinkPolitique?.setAttribute("href", urlLink.politique);
  footerLinkMention?.setAttribute("href", urlLink.mention);
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

export { setLinkUrl, eventToggleSwitch, useThemeColor, isToggleMoved };
