/**********script page calculette********* */

//import du contenu des infos Bulles
import { infoBulleCalculMensualite } from "./utils/data/content/infoBulle.js";
import {
  inputNumberApport,
  inputNumberDuree,
  inputNumberPrix,
  inputNumberTaeg,
} from "./utils/refDOM/refDOM.js";

//import des fonctions



import {
 
  addEventOnPageLoading,
  addEventOnBannerButton,
  addEventOnSimulateurButton,
  addEventOnInputMonthly,
  addEventOnInputDuty,
  addEventOnInputIncome,
  addEventOnInputRadioTypeLocation,
  addEventOnInputRadioFiscal,
  addEventOnInputRadioImpot,
  addEventOnIconInfo,
  addEventOnIconColapseArticle,
  addEventOnLinkArticle,
  addEventOnButtonDownload,
} from "./utils/functions/addEvent/addEvent.js";

import {
  setLinkUrl,
  eventToggleSwitch,
  useThemeColor,
  isToggleMoved,
} from "./utils/functions/other/other.js";

import {
  initInputValue,
  initResultatFiscal,
  mensualite,
  coutDuCredit,
  incomeByYear,
  balance,
  calculeImpotRevenuFoncier,
  bilanApresImposition,
} from "./utils/functions/basicCalcul/basicCalcul.js";

import { checkValueUserRadioFiscal } from "./utils/functions/checkValueUser/checkValueUser.js";

import { changeColor } from "./utils/functions/other/other.js";

import { registerSW } from "virtual:pwa-register";

/************************************************************************************************************* */
/********************************************** Script principal ************************************************/
/***************************************************************************************************************** */

/**** Routine d'initialisation /
 /** start **/

 //determine les url des liens de navigation
setLinkUrl();

//initialisation des inputs user
initInputValue();

//Initialisation resultat fiscal
initResultatFiscal();

//Calcul des mensualite et cout du credit en fonction des valeurs d' initialisation
mensualite(
  parseInt(inputNumberPrix.value, 10),
  parseInt(inputNumberApport.value, 10),
  parseInt(inputNumberTaeg.value, 10),
  parseInt(inputNumberDuree.value, 10)
);
coutDuCredit();

//fonction qui change le style de l' element taux apport
changeColor();

//Calcule le revenu sur un an avec les valeurs d'initialiasation
incomeByYear();

//Test si au moins une input "tranche d'imposition" et "choix du regime fiscal" a ete selectionnÃ©e
checkValueUserRadioFiscal();

//Billan avant imposition
balance();

//Calcul le bilan apres imposition

calculeImpotRevenuFoncier();
bilanApresImposition();

/**** Routine d'initialisation /
 /** end **/

//concerne les booutons du banner
addEventOnBannerButton();

//concerne le bouton simulateur
addEventOnSimulateurButton();

//Ajoute les Ã©couteurs d'Ã©vÃ¨nements pour un calcul automatique des impots sur revenus foncier

addEventOnInputMonthly();
addEventOnInputIncome();
addEventOnInputDuty();
addEventOnInputRadioTypeLocation();
addEventOnInputRadioImpot();
addEventOnInputRadioFiscal();

//concerne les fenetre information
//addEventOnIconInfo();

//concerne le conteneur des articles
addEventOnIconColapseArticle();
addEventOnLinkArticle();
addEventOnButtonDownload();

//concerne le toggle switch pour changement de theme de couleur
eventToggleSwitch();
useThemeColor();
isToggleMoved();

//controle le loader
addEventOnPageLoading();

// Enregistre le Service Worker uniquement en production / preview
/*if ("serviceWorker" in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener("load", async () => {
      try {
        await navigator.serviceWorker.register(
          `${import.meta.env.BASE_URL}service-worker.js`
        );
        console.log("Service Worker enregistré");
      } catch (error) {
        console.error("SW registration failed:", error);
      }
    });
  } else {
    // En mode dev : on nettoie les anciens SW
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
    console.log("Service Workers supprimés (mode dev)");
  }
}


registerSW({ immediate: true });*/

if (import.meta.env.PROD) {
  // Après le premier rendu, pas immédiat
  window.addEventListener("load", () => {
    registerSW({ immediate: false });
  });
}
