import { prelevementSociauxList } from "../../refDOM/refDomUi.js";
import { dataValueInit } from "../../data/data.js";

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


const getToggleSwap = () => {
  if (toggleRefs.swap && toggleRefs.swap.isConnected) {
    return toggleRefs.swap;
  }
  toggleRefs.swap = document.querySelector(".swap");
  return toggleRefs.swap;
};




function storeThemeColor() {
  const checkbox = getToggleCheckbox();
  const themeToStore = checkbox?.checked ? themeDark : themeClear;
  localStorage.setItem("themeColor", themeToStore);
}

function useThemeColor() {
  const checkbox = getToggleCheckbox();
  const stored = localStorage.getItem("themeColor");
  const theme = stored === themeDark ? themeDark : themeClear;

  document.documentElement.setAttribute("data-theme", theme);
  if (checkbox) {
    checkbox.checked = theme === themeDark;
  }
}

function initToggleSwitch() {
  const checkbox = getToggleCheckbox();
  if (!checkbox) return;
  let value = false;
  const theme = localStorage.getItem("themeColor");
  value = theme === themeDark ? true : false;
  checkbox.checked = value;
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

function displaySocialRateTaxe(){
  if (prelevementSociauxList.length < 1) return;

  prelevementSociauxList.forEach((el) => {
    el.textContent = dataValueInit.tauxImpoFoncier;
  })
}

export {
  
  initToggleSwitch,
  eventToggleSwitch,
  useThemeColor,
  displaySocialRateTaxe
  
};
