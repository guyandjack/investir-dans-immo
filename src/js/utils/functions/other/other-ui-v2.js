
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

/* const queryHeaderLinks = () => ({
  navAccueil: document.querySelector("#nav-lien-accueil"),
  navContact: document.querySelector("#nav-lien-contact"),
  simulateurButtons: document.querySelectorAll(".btn-simulateur"),
});

const queryFooterLinks = () => ({
  accueil: document.querySelector("#footer-lien-accueil"),
  contact: document.querySelector("#footer-lien-contact"),
  cgu: document.querySelector("#footer-lien-cgu"),
  politique: document.querySelector("#footer-lien-politique"),
  mention: document.querySelector("#footer-lien-mention"),
});

function setLinkUrlNav() {
  const { navAccueil, navContact, simulateurButtons } = queryHeaderLinks();
  navAccueil?.setAttribute("href", urlLink.accueil);
  navContact?.setAttribute("href", urlLink.contact);
  simulateurButtons?.forEach((link) => {
    link.setAttribute("href", urlLink.simulateur);
  });
}

function setLinkUrlFooter() {
  const { accueil, contact, cgu, politique, mention } = queryFooterLinks();
  accueil?.setAttribute("href", urlLink.accueil);
  contact?.setAttribute("href", urlLink.contact);
  cgu?.setAttribute("href", urlLink.cgu);
  politique?.setAttribute("href", urlLink.politique);
  mention?.setAttribute("href", urlLink.mention);
}

function setLinkUrl() {
  setLinkUrlNav();
  setLinkUrlFooter();
} */


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

/* function isToggleMoved() {
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
} */

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
  //setLinkUrl,
  //setLinkUrlNav,
  //setLinkUrlFooter,
  eventToggleSwitch,
  useThemeColor,
  //isToggleMoved,
};
