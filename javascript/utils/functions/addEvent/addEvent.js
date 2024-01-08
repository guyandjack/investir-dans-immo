/****************************************************************************************
 * ************************************************************************************
 * Ensemble de fonctions qui ajoute un ecouteur d'évènement
 *
 * les ecouteur d'övünememnt gerent la logique et le sequencage des fonctions
 * qui calculent
 *  mensualite,
 * revenu locatif,
 * charges,
 * bilan avant impo,
 * bilan final apres imposition
 *
 * *************************************************************************************/

//Import de fonction de calcul et d'initialisation de plus bas niveau

import {
  linkInput,
  changeColor,
  hideChargeForfaitaire,
  displayChargeForfaitaire,
  hideChargeReel,
  displayChargeReel,
  displayInputCfe,
  hideInputCfe,
  hideAElement,
  displayAElement,
  InsertTextInAElement,
  getTauxMarginalImposition,
  getIdOfParentElementHover,
  createElemntInfoBulle,
  insertContentInfoBulle,
  styleOfInfoBulle,
  deleteElement,
} from "../other/other.js";

import {
  initInputValue,
  mensualite,
  coutDuCredit,
  incomeByYear,
  controlValueOfIncome,
  balance,
  calculeImpotRevenuFoncier,
  bilanApresImposition,
 
} from "../basicCalcul/basicCalcul.js";

import {
  checkValueUserMonthly,
  checkValueUserIncome,
  checkValueUserDuty,
  testIfNumber,
  checkValueUserRadioFiscal,
} from "../checkValueUser/checkValueUser.js";

/**
 *  Ajoute des écouteurs evenement sur les inputs du fieldset #calculette-mensualité

 * @param {} void
 * @return {} void
 */
function addEventOnInputMonthly() {
  let inputs = document.querySelectorAll(
    "#calculette-mensualite input.calculette-number, #calculette-mensualite input.calculette-range"
  );
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      linkInput(e);
      let isValid = checkValueUserMonthly(e);

      if (!isValid) {
        return;
      }
      mensualite(
        inputNumberPrix.value,
        inputNumberApport.value,
        inputNumberTaeg.value,
        inputNumberDuree.value
      );
      coutDuCredit();
      changeColor();
      balance();
      let checked = checkValueUserRadioFiscal();
      if (checked) {
        calculeImpotRevenuFoncier();
        bilanApresImposition();
      }
    });
  });
}

/**
 *  Ajoute des écouteurs evenement sur les inputs du fieldset #revenu-locatif

 * @param {} void
 * @return {} void
 */

function addEventOnInputIncome() {
  let inputs = document.querySelectorAll(
    "#revenu-locatif input[type='number'], #revenu-locatif input[type='range']"
  );
  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      //lie les inputs "range et "number"
      linkInput(e);
      calculatedValue.income = e.target.value;

      //Controle le montant des revenus en fonction du choix du regime d'imposition
      let result = controlValueOfIncome();
      console.log("type checked: " + result);

      //Calcul des revenus fonciers sur une année
      incomeByYear();
      console.log("fuonction incomeByYear lancée dans l' event.");

      //test la validite de l'input "revenu foncier"
      let isValidIncome = checkValueUserIncome(e);
      console.log("test validite revenu foncier: " + isValidIncome);

      if (!isValidIncome) {
        return;
      }
      // bilan avant imposition
      balance();

      //test si les inputs radio sont cochées
      let isChecked = checkValueUserRadioFiscal();
      console.log("test si les input radio sont selectionnées: : " + isChecked);
      if (!isChecked) {
        return;
      }

      //En fonction des revenus foncier on applique differente methode
      let choice = controlValueOfIncome();

      if (choice === "choice") {
        let isValidBalance = checkValueUserDuty();
        if (!isValidBalance) {
          return;
        }
        balance();
        calculeImpotRevenuFoncier();
        bilanApresImposition();
        return;
      }

      if (choice === "no-choice") {
        calculatedValue.fiscalChoice == "reel";
        calculeImpotRevenuFoncier();
        bilanApresImposition();
        return;
      }
    });
  });
}

/**
 *  Ajoute des écouteurs evenement sur les inputs du fieldset #charge-taxe

 * @param {} void
 * @return {} void
 */

function addEventOnInputDuty() {
  let inputs = document.querySelectorAll(
    "#charge-taxe input[type='number'], #charge-taxe input[type='range']"
  );

  console.log("list charges: ", inputs);

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      linkInput(e);
      let isValid = checkValueUserDuty();
      console.log("valeur duty checked: " + isValid);
      if (!isValid) {
        return;
      }
      //stocke les charges deductibles 
      if (e.target.name == "number-deductible" || e.target.name == "range-deductible") {
        calculatedValue.dutyDeductible = e.target.value
      }
      balance();
      calculeImpotRevenuFoncier();
      bilanApresImposition();
    });
  });
}

/**
 *  Ajoute des écouteurs evenement sur les inputs "radio" du fieldset #fiscal (taux d'imposition)

 * @param {} void
 * @return {} void
 */

function addEventOnInputRadioImpot() {
  let inputs = document.querySelectorAll("#fiscal input[name='taux-impot']");
  inputs.forEach((input) => {
    input.addEventListener("click", () => {
      let checked = checkValueUserRadioFiscal();
      if (checked) {
        calculeImpotRevenuFoncier();
        bilanApresImposition();
      }
    });
  });
}
/**
 *  Ajoute des écouteurs evenement sur les inputs "radio" du fieldset #fiscal (type location)

 * @param {} void
 * @return {} void
 */

function addEventOnInputRadioTypeLocation() {
  let inputs = document.querySelectorAll(
    "#location-type-container-radio input[name='type-location']"
  );
  inputs.forEach((input) => {
    input.addEventListener("click", (evt) => {
      let inputValue = evt.target.value;
      console.log("input radio type location value: " + inputValue);
      //insertion dans l'ôbjet calculatedValue
      calculatedValue.locationType = inputValue;

      //si location meublee est checked
      if (calculatedValue.locationType == "meuble") {
        displayInputCfe(); //affiche les inputs number et range CFE

        //On modifie le titre de l'input number revenus locatifs
        InsertTextInAElement("#label-revenu", "Loyer charges comprises");

        /*let checked = checkValueUserRadioFiscal();
        if (!checked) {
          return;
        }*/

        controlValueOfIncome();
        balance();
        calculeImpotRevenuFoncier();
        bilanApresImposition();
      }

      //si location nue est checked
      if (calculatedValue.locationType == "nue") {
        hideInputCfe();

        //On modifie le titre de l'input number revenus locatifs
        InsertTextInAElement("#label-revenu", "Loyer hors charges ");
        let checked = checkValueUserRadioFiscal();
        if (!checked) {
          return;
        }
        controlValueOfIncome();
        balance();
        calculeImpotRevenuFoncier();
        bilanApresImposition();
      }
    });
  });
}



/**
 *  supprime des écouteurs evenement sur les inputs "radio" du fieldset #fiscal (choix du type d'imposition)

 * @param {} void
 * @return {} void
 */
function removeEventOnInputCfe() {
  let inputs = document.querySelectorAll(
    "#fiscal input[name='number-cfe'], #fiscal input[name='range-cfe']"
  );
  inputs.forEach((input) => {
    input.removeEventListener("input", (e) => {
      let isDisplayed = displayInputCfe();
      isDisplayed
        .then(() => {
          linkInput(e);

          calculeImpotRevenuFoncier();
          bilanApresImposition();
        })
        .catch((e) => {
          console.log("error: " + e);
        });
    });
  });
}

/**
 *  Ajoute des écouteurs evenement sur les inputs "radio" du fieldset #fiscal (choix du type d'imposition)

 * @param {} void
 * @return {} void
 */

//Ajoute des ecouteurs evènement sur les inputs fiscal de type radio
function addEventOnInputRadioFiscal() {
  let inputs = document.querySelectorAll(
    "#regime-fiscal-container-radio input[name='regime-fiscal']"
  );
  inputs.forEach((input) => {
    input.addEventListener("click", (e) => {
      let target = e.target;
      console.log("input radio checked: " + target);
      let result = e.target.value;
      //insertion de la valeur ds l'objet
      calculatedValue.fiscalChoice = result;
      console.log("choix fiscal: " + result);

      //si l'input radio "regime forfaitaire" est cochée on affiche les inputs charges de type "forfaitaire"
      if (calculatedValue.fiscalChoice == "forfaitaire") {
         let result = controlValueOfIncome();
        hideChargeReel();
        displayChargeForfaitaire();
      }

      //si l'input radio "regime reel" est cochée on affiche les inputs charges de type "reel"
      if (calculatedValue.fiscalChoice == "reel") {
         let result = controlValueOfIncome();
        hideChargeForfaitaire();
        displayChargeReel();
      }

      balance();
      calculeImpotRevenuFoncier();
      bilanApresImposition();


    });
  });
}



/**
 *  Suprime des écouteurs evenement sur les inputs "number" et "range" du fieldset #fiscal

 * @param {} void
 * @return {} void
 */

function removeEventOnInputFiscal() {
  let inputs = document.querySelectorAll(
    "#charge-taxe input[type='number'], #charge-taxe input[type='range']"
  );
  inputs.forEach((input) => {
    input.removeEventListener("input", (e) => {
      linkInput(e);

      balance();
      let checked = checkValueUserRadioFiscal();
      if (checked) {
        calculeImpotRevenuFoncier();
        bilanApresImposition();
      }
    });
  });
}

/**
 *
 *
 */
function addEventOnIconInfo() {
  let listIcon = document.querySelectorAll(".svg-icon-info");
  listIcon.forEach((icon) => {
    //affiche les infos bulles au survol
    icon.addEventListener("mouseover", (evt) => {
      // recupere l' id parent de  l'element survolé
      let id = getIdOfParentElementHover(evt);
      console.log("id icon info: " + id);
      //creation d'un div infobulle inserré dans l'element parent survolé
      let elementCreated = createElemntInfoBulle("#" + id);
      elementCreated
        .then((element) => {
          let ele = insertContentInfoBulle(element, id);
          styleOfInfoBulle(ele);
        })

        .catch((e) => {
          console.log("error: " + e);
        })
        .catch((e) => {
          console.log(e);
        });
    });

    icon.addEventListener("mouseout", (evt) => {
      // recupere l' id parent de  l'element survolé
      let id = getIdOfParentElementHover(evt);
      console.log("id de l'element:" + id);

      //suppression du div info bulle

      deleteElement(id);
    });
  });
}

function addEventOnIconColapseArticle() {
  let listIconCollapse = document.querySelectorAll(".svg-icon-chevron-colapse");

  listIconCollapse.forEach((icon) => {
    icon.addEventListener("click", (evt) => {
      let parent = icon.parentElement;
      console.log("parent: " + parent);

      let grandParent = parent.parentElement;
      console.log("grand parent: " + grandParent);

      let colapseElement = grandParent.querySelector("div.colapse");
      console.log("colapse: " + colapseElement);

      // tourne le chevron
      icon.classList.toggle("chevron-up");

      //deplie ou replie le colapse

      if (colapseElement.classList.contains("colapse-close")) {
        colapseElement.classList.replace("colapse-close", "colapse-open");
        return;
      }
      if (colapseElement.classList.contains("colapse-open")) {
        colapseElement.classList.replace("colapse-open", "colapse-close");
        return;
      }
    });
  });
}

export {
  addEventOnInputMonthly,
  addEventOnInputDuty,
  addEventOnInputIncome,
  addEventOnInputRadioTypeLocation,
  addEventOnInputRadioFiscal,
  addEventOnInputRadioImpot,
  addEventOnIconInfo,
  addEventOnIconColapseArticle,
};
