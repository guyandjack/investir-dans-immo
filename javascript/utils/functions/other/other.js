//import du contenu des infos bulles
import { infoBulleCalculMensualite } from "../../data/content/infoBulle.js";

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
  console.log("input duty: " + inputName + " liée");
}

//Cache les inputs radio choix regime fiscal
function hideInputRadioRegimeFiscal() {
  if (containerInputRadioFiscal.classList.contains("display")) {
    containerInputRadioFiscal.classList.replace("display", "hide");
  }
}

function displayInputRadioRegimeFiscal() {
  if (containerInputRadioFiscal.classList.contains("hide")) {
    containerInputRadioFiscal.classList.replace("hide","display");
  }
}

// Affiche le container des inputs cfe
 function displayInputCfe() {
  if (containerInputCfe.classList.contains("hide-taxe")) {
    containerInputCfe.classList.replace("hide-taxe", "display-taxe");
  }
  return true;
}


// Cache le container des inputs cfe
 function hideInputCfe() {
  if (containerInputCfe.classList.contains("display-taxe")) {
    containerInputCfe.classList.replace("display-taxe", "hide-taxe");
  }
  return true;
}




function displayChargeForfaitaire() {
  chargeForfaitaireList.forEach((inputCharge) => {
    if (inputCharge.classList.contains("hide-taxe")) {
      inputCharge.classList.replace("hide-taxe","display-taxe" );
    }
  });
}

function hideChargeForfaitaire() {
  chargeForfaitaireList.forEach((inputCharge) => {
    if (inputCharge.classList.contains("display-taxe")) {
      inputCharge.classList.replace("display-taxe", "hide-taxe");
    }
  });
}


function displayChargeReel() {

   chargeReelList.forEach((inputCharge) => {
     if (inputCharge.classList.contains("hide-taxe")) {
       inputCharge.classList.replace("hide-taxe", "display-taxe");
     }
   });
}

function hideChargeReel() {

   chargeReelList.forEach((inputCharge) => {
     if (inputCharge.classList.contains("display-taxe")) {
       inputCharge.classList.replace("display-taxe","hide-taxe");
     }
   });
}



//recupere le type de location choisi par l'utilisteur
function getLocationType() {
  let inputs = document.querySelectorAll(
    "#fiscal input[name='type-location']:checked"
  );
  //Si aucune input radio n' est cochée on applique les valeurs d'initialisation
  if (inputs.length < 1) {
    inputRadioLocationNue.checked = true;
    calculatedValue.locationType = "nue";
    return true
  }

  else if (inputs.length == 1) {
    //Si une input radio est coché 
    let locationTypeValue = inputs[0].value;

    //insertion danss l'objet calculatedValue
    calculatedValue.locationType = locationTypeValue;
    return true;
  }
    
  else {
    return false
  }
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


/**
 * deplace le toggle switch
 *
 * @return {*} 
 */
function moveSwitch() {
  let switchToggle = document.querySelector(".switch");

  if (switchToggle.classList.contains("move")) {
    switchToggle.classList.remove("move");
    localStorage.removeItem("toggle");//memorisation de la position du switch pour les autres pages du site
    return;
  }

  if (!switchToggle.classList.contains("move")) {
    switchToggle.classList.add("move");
    localStorage.setItem("toggle", "ok"); //memorisation de la position du switch pour les autres pages du site
    return;
  }
}

/**
 * positionne le toggle switch à l'ouverture de page  en fonction la memorisation de position
 *
 * @return {*} 
 */
function isToggleMoved() {
  let switchToggle = document.querySelector(".switch");

  if (localStorage.getItem("toggle") == "ok") {
    if (!switchToggle.classList.contains("move")) {
      switchToggle.classList.add("move");
    }
    return;
  }

  if (!localStorage.getItem("toggle") == "ok") {
    if (switchToggle.classList.contains("move")) {
      switchToggle.classList.remove("move");
    }
    return;
  }
}

/**
 *
 * change le text du toogle switch en fonction du theme de couleur choisi
 * @param {*} text
 */
function changeTextToggle(text) {
  let textToggle = document.querySelector(".toggle-text");
  textToggle.innerHTML = text;
}


/**
 * memorise le choix du theme de couleur de l' utilisateur
 *
 * @return {*} 
 */
function storeThemeColor() {
  let inputCheckBox = document.querySelector("#toggle-switch");
  let value = JSON.stringify(inputCheckBox.value);

  if (!localStorage.getItem("themeColor")) {
    localStorage.setItem("themeColor", value);
    return;
  }

  if (localStorage.getItem("themeColor")) {
    localStorage.removeItem("themeColor");
    return;
  }
}


/**
 * applique le theme de couleur
 *@return {*} 
 */
function useThemeColor() {
  let body = document.body;

  if (JSON.parse(localStorage.getItem("themeColor")) == "dark") {
    if (!body.classList.contains("dark")) {
      body.classList.add("dark");
      changeTextToggle("Theme clair");
    }
    return
  }

  if (!localStorage.getItem("themeColor")) {
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      changeTextToggle("Theme sombre");
    }
    return
  }
}


/**
 * applique un ecouteur d' évènement sur le toggle switch
 *
 */
function eventToggleSwitch() {
  let toggleSwitch = document.querySelector(".container-switch");
  toggleSwitch.addEventListener("click", (e) => {
    moveSwitch(e);
    storeThemeColor();
    useThemeColor();
  });
}

export {
  changeColor,
  linkInput,
  getLocationType,
  getTauxMarginalImposition,
  hideInputRadioRegimeFiscal,
  displayInputRadioRegimeFiscal,
  hideChargeForfaitaire,
  displayChargeForfaitaire,
  hideChargeReel,
  displayChargeReel,
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
  eventToggleSwitch,
  useThemeColor,
  isToggleMoved,
};
