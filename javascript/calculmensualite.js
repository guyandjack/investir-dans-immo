/**********script page calculette********* */

//import des fonctions

import {
  addEventOnInputMonthly,
  addEventOnInputDuty,
  addEventOnInputIncome,
  addEventOnInputRadioTypeLocation,
  addEventOnInputRadioFiscal,
  addEventOnInputRadioImpot,
  
} from "./utils/functions/addEvent/addEvent.js";



import {
  initInputValue,
  initResultatFiscal,
  mensualite,
  coutDuCredit,
  incomeByYear,
  balance,
  calculeImpotRevenuFoncier,
  
  
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

/*// affiche ou suprime des elements en fonction du montant des revenus foncier sur l^'année
let choice = controlValueOfIncome();
if (choice === "choice") {
  //etabli un bilan avant imposition (revenu - charge courante - mensualite)
  balance();
}*/

//etabli un bilan avant imposition (revenu - charge courante - mensualite)
balance();


//Test si au moins une input "tranche d'imposition" et "choix du regime fiscal" a ete selectionnée
checkValueUserRadioFiscal();

//Calcul le bilan apres imposition
calculeImpotRevenuFoncier();

/**** Routine d'initialisation /
 /** end **/


//Ajoute les écouteurs d'évènements pour un calcul automatique des impots sur revenus foncier
//
addEventOnInputMonthly();
addEventOnInputIncome();
addEventOnInputDuty();
addEventOnInputRadioTypeLocation();
addEventOnInputRadioImpot();
addEventOnInputRadioFiscal();
