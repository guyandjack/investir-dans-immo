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
  displayInputFiscal,
  hideInputFiscal,
  hideChargeAndTaxe,
  displayChargeAndTaxe,
} from "../other/other.js";

import {
  initInputValue,
  mensualite,
  coutDuCredit,
  incomeByYear,
  balance,
  calculeImpotRevenuFoncier,
} from "../basicCalcul/basicCalcul.js";

import {
  checkValueUserMonthly,
  checkValueUserIncome,
  checkValueUserDuty,
  testIfNumber,
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
      calculeImpotRevenuFoncier();
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
      linkInput(e);
      let isValidIncome = checkValueUserIncome(e);
      let isValidBalance = checkValueUserDuty();
      if (!isValidIncome || !isValidBalance) {
        return;
      }
      incomeByYear();
      balance();
      calculeImpotRevenuFoncier();
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
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      linkInput(e);
      let isValid = checkValueUserDuty();
      console.log("valeur duty checked: " + isValid);
      if (!isValid) {
        return;
      }
      balance();
      calculeImpotRevenuFoncier();
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
      calculeImpotRevenuFoncier();
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
    "#regime-fiscal-container-radio input[type='radio']"
  );
  inputs.forEach((input) => {
    input.addEventListener("click", (e) => {
      let result = e.target.value;
      calculatedValue.fiscalChoice = result;
      console.log("choix fiscal: " + result);

      //si l'input radio "reel" est cochée
      if (result == "reel") {
        let inputDisplayed = displayInputFiscal();
        inputDisplayed
            .then(() => {
                addEventOnInputFiscal();
                balance();
                calculeImpotRevenuFoncier();
                hideChargeAndTaxe();
          })
          .catch((error) => {
            console.log("error: " + error);
          });
      }

      //si l' input radio "forfaitaire" est cochée
      if (result == "forfaitaire") {
        let inputDisplayed = hideInputFiscal();
        inputDisplayed
          .then(() => {
            removeEventOnInputFiscal();
            balance();
              calculeImpotRevenuFoncier();
              displayChargeAndTaxe();
          })
          .catch((error) => {
            console.log("error: " + error);
          });
      }
    });
  });
}

/**
 *  Ajoute des écouteurs evenement sur les inputs "number" et "range" du fieldset #fiscal

 * @param {} void
 * @return {} void
 */

function addEventOnInputFiscal() {
  let inputs = document.querySelectorAll(
    "#fiscal input[type='number'], #fiscal input[type='range']"
  );
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      linkInput(e);
      balance();
      calculeImpotRevenuFoncier();
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
    "#fiscal input[type='number'], #fiscal input[type='range']"
  );
  inputs.forEach((input) => {
    input.removeEventListener("input", (e) => {
      linkInput(e);
      /*let isValid = true; //checkValueUserDuty();
      if (!isValid) {
        return;
      }*/
      balance();
      calculeImpotRevenuFoncier();
    });
  });
}

export {
  addEventOnInputMonthly,
  addEventOnInputDuty,
  addEventOnInputIncome,
  addEventOnInputRadioFiscal,
  addEventOnInputRadioImpot,
  addEventOnInputFiscal,
};
