
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
  
  eventToggleSwitch,
  useThemeColor,
  
};
