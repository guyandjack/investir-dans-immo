/**********script page calculette********* */

//import du contenu des infos Bulles
import {
  infoBulleCalculMensualite,
  
} from "./utils/data/content/infoBulle.js";

//import des fonctions

import {
  addEventOnInputMonthly,
  addEventOnInputDuty,
  addEventOnInputIncome,
  addEventOnInputRadioTypeLocation,
  addEventOnInputRadioFiscal,
  addEventOnInputRadioImpot,
  addEventOnIconInfo,
  addEventOnIconColapseArticle
  
} from "./utils/functions/addEvent/addEvent.js";

import { eventToggleSwitch, useThemeColor, isToggleMoved} from "./utils/functions/other/other.js";





import {
  initInputValue,
  initResultatFiscal,
  mensualite,
  coutDuCredit,
  incomeByYear,
  balance,
  calculeImpotRevenuFoncier,
  bilanApresImposition
  
  
} from "./utils/functions/basicCalcul/basicCalcul.js"

import { checkValueUserRadioFiscal } from "./utils/functions/checkValueUser/checkValueUser.js";

import {
  
  changeColor
  
  
} from "./utils/functions/other/other.js"





/************************************************************************************************************* */
/********************************************** Script principal ************************************************/
/***************************************************************************************************************** */

/**** Routine d'initialisation /
 /** start **/

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

//Test si au moins une input "tranche d'imposition" et "choix du regime fiscal" a ete selectionnée
checkValueUserRadioFiscal();

//Billan avant imposition
balance();

//Calcul le bilan apres imposition

calculeImpotRevenuFoncier();
bilanApresImposition();

/**** Routine d'initialisation /
 /** end **/


//Ajoute les écouteurs d'évènements pour un calcul automatique des impots sur revenus foncier

addEventOnInputMonthly();
addEventOnInputIncome();
addEventOnInputDuty();
addEventOnInputRadioTypeLocation();
addEventOnInputRadioImpot();
addEventOnInputRadioFiscal();

//concerne les fenetre information
addEventOnIconInfo();

//concerne le conteneur des articles
addEventOnIconColapseArticle();

//concerne le toggle switch pour changement de theme de couleur
eventToggleSwitch();
useThemeColor();
isToggleMoved();

