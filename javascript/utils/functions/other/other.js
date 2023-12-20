//import du contenu des infos bulles
import {
  infoBulleCalculMensualite,
  
} from "../../data/content/infoBulle.js";

//import des referenecce du dom
 

//Fonction qui fait varier la couleur de fond des span-unite de mesure
function changeColor() {
  let value = parseFloat(inputNumberApport.value / inputNumberPrix.value, 10);
  console.log("value: " + value);

  uniteGain.style.transition = "background-color 1s linear";
  if (value < 0.05) {
    uniteGain.style.transition = "background-color 1s linear";
    uniteGain.style.backgroundColor = "red";
    gainAdvice.innerHTML = parseFloat(value * 100).toFixed(2) + " %";
  }
  if (value >= 0.05 && value < 0.1) {
    uniteGain.style.transition = "background-color 1s linear";
    uniteGain.style.backgroundColor = "orange";
    gainAdvice.innerHTML = parseFloat(value * 100).toFixed(2) + " %";
  }
  if (value >= 0.1 && value < 0.15) {
    uniteGain.style.transition = "background-color 1s linear";
    uniteGain.style.backgroundColor = "yellow";
    gainAdvice.innerHTML = parseFloat(value * 100).toFixed(2) + " %";
  }

  if (value >= 0.15 && value < 0.2) {
    uniteGain.style.transition = "background-color 1s linear";
    uniteGain.style.backgroundColor = "lightgreen";
    gainAdvice.innerHTML = parseFloat(value * 100).toFixed(2) + " %";
  }

  if (value >= 0.2) {
    uniteGain.style.transition = "background-color 1s linear";
    uniteGain.style.backgroundColor = "green";
    gainAdvice.innerHTML = parseFloat(value * 100).toFixed(2) + " %";
  }
}

//function "linkInput"

/******
 * Lie les valeurs des inputs de type "range" et "number".
 * Lorsque la valeur d'une input est modifé, l'autre input est modifié de la même valeur
 *
 */
function linkInput(evt) {
  let inputValue = evt.target.value;
  let inputType = evt.target.type;
  let inputName = evt.target.name;

  let name = inputName.split("-")[1];

  if (inputType == "range") {
    let inputToLinked = document.querySelector(`input[name = number-${name}]`);
    inputToLinked.value = inputValue;
  } else {
    let inputToLinked = document.querySelector(`input[name = range-${name}]`);
    inputToLinked.value = inputValue;
  }
}

//Affiche les inputs "revenus" number et range ()
async function displayInputRevenu() {
  if (containerInputFiscal.classList.contains("hide")) {
    containerInputFiscal.classList.replace("hide", "display");
  }
  return true;
}

//Cache les inputs "revenu" number et range ()
async function hideInputRevenu() {
  if (containerInputFiscal.classList.contains("display")) {
    containerInputFiscal.classList.replace("display", "hide");
  }
  return true;
}
//Affiche les inputs "fiscal" number et range (charge deductible)
async function displayInputFiscal() {
  if (containerInputFiscal.classList.contains("hide")) {
    containerInputFiscal.classList.replace("hide", "display");
  }
  return true;
}

//Cache les inputs "fiscal" number et range (charge deductible)
async function hideInputFiscal() {
  if (containerInputFiscal.classList.contains("display")) {
    containerInputFiscal.classList.replace("display", "hide");
  }
  return true;
}

// Affiche le container des inputs cfe
async function displayInputCfe() {
  if (containerInputCfe.classList.contains("hide")) {
    containerInputCfe.classList.replace("hide", "display");
  }
  return true;
}
// Affiche le container des inputs cfe
async function hideInputCfe() {
  if (containerInputCfe.classList.contains("display")) {
    containerInputCfe.classList.replace("display", "hide");
  }
  return true;
}

//Cache le container des charges
function hideChargeAndTaxe() {
  if (containerChargeTaxe.classList.contains("display-taxe")) {
    containerChargeTaxe.classList.replace("display-taxe", "hide-taxe");
  }
  return true;
}

// Affiche le container des charges
function displayChargeAndTaxe() {
  if (containerChargeTaxe.classList.contains("hide-taxe")) {
    containerChargeTaxe.classList.replace("hide-taxe", "display-taxe");
  }
  return true;
}

//recupere le type de location  choisi par l'utilisteur
function getLocationType() {
  let inputs = document.querySelectorAll(
    "#fiscal input[name='type-location']:checked"
  );
  if (inputs.length < 1) {
    bilanResultat.innerHTML =
      " Veuillez selectionner un type de location 'nue' ou 'meublé'";
    return false;
  }
  let locationTypeValue = inputs[0].value;

  //insertion danss l'objet calculatedValue
  calculatedValue.locationType = locationTypeValue;
  return true;
}

function getTauxMarginalImposition() {
  //recupere la valeur de l'input radio "tranche imposition"
  let inputRadio = document.querySelector("input[name='taux-impot']:checked");
  let rateIncome = parseInt(inputRadio.value, 10);

  //stockage de la valeur dans lobjet calculatedValue
  calculatedValue.rateIncome = rateIncome;

  return rateIncome;
}

//permet de cacher un element du DOM
/**
 *
 *
 * @param {*} selector
 * @return {*} boolean
 */
async function hideAElement(selector) {
  console.log("le selector: " + selector);
  let element = document.querySelector(selector);

  if (element.classList.contains("display")) {
    element.classList.replace("display", "hide");
  }
  return true;
}

//permet d'afficher un element du DOM en modifiant une class
/**
 *
 *
 * @param {*} selector
 * @return {*} boolean
 */

async function displayAElement(selector) {
  console.log("le selector: " + selector);
  let element = document.querySelector(selector);

  console.log("element selectionné:  " + element);

  if (element.classList.contains("hide")) {
    element.classList.replace("hide", "display");
  }
  return true;
}
//permet d'afficher du text dans element du DOM
/**
 *
 *
 * @param {*} selector
 * @return {*} boolean
 */

async function InsertTextInAElement(selector, text) {
  console.log("le selector: " + selector);
  let element = document.querySelector(selector);

  console.log("element selectionné:  " + element);

  element.innerHTML = text;
  return true;
}

/**
 *
 * recupere l'id du parent de l' icon survolé
 * @param {*} evt
 * @return {*} string
 */
function getIdOfParentElementHover(evt) {
  let element = evt.target;
  let parentOfelement = element.parentElement;
  let id = parentOfelement.id;
  return id;
}

async function createElemntInfoBulle(idInsertion) {
  let insertionPoint = document.querySelector(idInsertion);
  console.log("noeud d'insertion: " + insertionPoint);

  let containerDiv = document.createElement("div");
  let titleContainerDiV = document.createElement("h3");
  let para1 = document.createElement("p");
  let para2 = document.createElement("p");
  let para3 = document.createElement("p");
  let closure = document.createElement("div");
  closure.innerHTML = "fermer";

  containerDiv.appendChild(titleContainerDiV);
  containerDiv.appendChild(para1);
  containerDiv.appendChild(para2);
  containerDiv.appendChild(para3);
  

  insertionPoint.appendChild(containerDiv);
  
  return containerDiv;
}

function styleOfInfoBulle(element) {
  element.classList.add("info-bulle");
}

function insertContentInfoBulle(element, refContent) {
  let titre = element.querySelector("h3");
  let paraList = element.querySelectorAll("p");
  titre.innerHTML = infoBulleCalculMensualite[refContent]["titre"];
  paraList[0].innerHTML = infoBulleCalculMensualite[refContent]["contenu1"];
  paraList[1].innerHTML = infoBulleCalculMensualite[refContent]["contenu2"];
  paraList[2].innerHTML = infoBulleCalculMensualite[refContent]["contenu3"];

  return element;
}

function deleteElement(elementId) {
  let elementParentSelected = document.querySelector("#" + elementId);
  let infobulle = elementParentSelected.lastElementChild;
  console.log("element selected: " + infobulle);
  if (infobulle !== null) {
    infobulle.remove();
  }
}

export {
  changeColor,
  linkInput,
  getLocationType,
  getTauxMarginalImposition,
  displayInputFiscal,
  hideInputFiscal,
  hideChargeAndTaxe,
  displayChargeAndTaxe,
  displayInputCfe,
  hideInputCfe,
  hideAElement,
  displayAElement,
  InsertTextInAElement,
  getIdOfParentElementHover,
  createElemntInfoBulle,
  insertContentInfoBulle,
  styleOfInfoBulle,
  deleteElement,
};
