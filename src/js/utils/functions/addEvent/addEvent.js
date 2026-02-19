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
  changeColor,
  createElemntInfoBulle,
  deleteElement,
  displayChargeForfaitaire,
  displayChargeReel,
  displayInputCfe,
  extendOrCloseColapseInArticle,
  getIdOfParentElementHover,
  hideChargeForfaitaire,
  hideChargeReel,
  hideInputCfe,
  insertContentInfoBulle,
  linkInput,
  scrollToElement,
  styleOfInfoBulle,
} from "../other/other.js";

import {
  balance,
  bilanApresImposition,
  calculeImpotRevenuFoncier,
  controlValueOfIncome,
  coutDuCredit,
  incomeByYear,
  mensualite,
} from "../basicCalcul/basicCalcul.js";

import {
  checkValueUserDuty,
  checkValueUserIncome,
  checkValueUserMonthly,
  checkValueUserRadioFiscal,
} from "../checkValueUser/checkValueUser.js";

//import de fonction qui realise une requete HTTP avec fetch
import { FetchForDownload } from "../http/download.js";

/**
 *  lance / supprime le loader en fonction du chargement de la page

 * @param {} void
 * @return {} void
 */

function addEventOnPageLoading() {
  let delay = null;

  function hideLoader() {
    loader.classList.add("hide");
  }
  //debugger;
  window.addEventListener(
    "load",
    () => {
      delay = setTimeout(hideLoader, 400);
      //clearTimeout(delay);
    },
    { once: true }
  );
}

/**
 *  Ajoute des écouteurs evenement sur les boutton du banner

 * @param {} void
 * @return {} void
 */

function addEventOnBannerButton() {
  if (!listOfButton) return;
  listOfButton.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      let elementToScrollId = evt.target.name;
      let elementToScroll = document.querySelector("#" + elementToScrollId);

      //scroll vers le titre d'article correpondant
      scrollToElement(elementToScroll);

      //ouvre le collapse article correspondant
      let collapseElement = elementToScroll.querySelector(".colapse");

      if (collapseElement.classList.contains("colapse-close")) {
        collapseElement.classList.replace("colapse-close", "colapse-open");
      }

      //Tourne l'icon chevron lors de l'ouverture du collapse
      let chevronTitle = elementToScroll.querySelector(
        ".svg-icon-chevron-colapse"
      );
      chevronTitle.classList.toggle("chevron-up");
    });
  });
}

/**
 *  Ajoute un écouteur evenement sur le boutton simulateur

 * @param {} void
 * @return {} void
 */
 function addEventOnSimulateurButton() {
    if (!btnSimulateur) return;
    btnSimulateur.addEventListener("click", (evt) => {
      let elementToScrollId = evt.target.name;
      let elementToScroll = document.querySelector("#" + elementToScrollId);

      if (!elementToScroll) return;
      //scroll vers le titre d'article correpondant
     const y =
       elementToScroll.getBoundingClientRect().top + window.pageYOffset - 200;

     window.scrollTo({
       top: y,
       behavior: "smooth",
     });

     
    });
  
} 

/**
 *  Ajoute des écouteurs evenement sur les inputs du fieldset #calculette-mensualité

 * @param {} void
 * @return {} void
 */
function addEventOnInputMonthly() {
  let allInputs = document.querySelectorAll(
    "#calculette-mensualite input.calculette-number, #calculette-mensualite input.calculette-range"
  );

  allInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      linkInput(e);
      let isValid = checkValueUserMonthly(e);
      console.log("isvalid: " + isValid);

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

      //stocke la valeur ds l'objet
      console.log("nom de l'input: " + e.target.name);
      if (
        e.target.name == "number-revenu_hors_charge" ||
        e.target.name == "range-revenu_hors_charge"
      ) {
        calculatedValue.income = e.target.value;
      } else if (
        e.target.name == "number-revenu_charge_comprise" ||
        e.target.name == "range-revenu_charge_comprise"
      ) {
        calculatedValue.incomeCc = e.target.value;
      }

      //test la validite de l'input "revenu foncier"
      let isValidIncome = checkValueUserIncome();
      console.log("test validite revenu foncier: " + isValidIncome);
      if (!isValidIncome) {
        return;
      }
      //Controle le montant des revenus en fonction du choix du regime d'imposition
      let result = controlValueOfIncome();
      console.log("type checked: " + result);

      //Calcul des revenus fonciers sur une année
      incomeByYear();
      console.log("fuonction incomeByYear lancée dans l' event.");

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
      if (
        e.target.name == "number-deductible" ||
        e.target.name == "range-deductible"
      ) {
        calculatedValue.dutyDeductible = e.target.value;
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
        //affiche les inputs number et range CFE
        displayInputCfe();

        //Affiche le revenu locatif de reference
        totalRevenuReferenceValue.innerHTML = calculatedValue.incomeCc * 12;

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
        //Cache les inputs cfe
        hideInputCfe();

        //Affiche le revenu locatif de reference
        totalRevenuReferenceValue.innerHTML = calculatedValue.income * 12;

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
      //memorisation du choix utilisateur
      calculatedValue.fiscalChoiceMemo = result;
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
  let listTitleArticle = document.querySelectorAll("h3.title-article");

  listTitleArticle.forEach((titleArticle) => {
    titleArticle.addEventListener("click", (evt) => {
      let icon = titleArticle.firstElementChild;
      let parent = titleArticle.parentElement;
      let parentId = parent.id;

      //identifie les collapse enfants
      let collapseEnfant1 = "";
      let collapseEnfant2 = "";
      let exist = false;
      switch (parentId) {
        case "article-imposition-1":
          collapseEnfant1 = colapseForfaitaire1;
          collapseEnfant2 = colapseReel1;
          exist = true;
          break;

        case "article-imposition-2":
          collapseEnfant1 = colapseForfaitaire2;
          collapseEnfant2 = colapseReel2;
          exist = true;
          break;

        default:
          break;
      }

      let colapseElement = parent.querySelector("div.colapse");
      console.log("colapse: " + colapseElement);

      // tourne le chevron
      icon.classList.toggle("chevron-up");
      //ouverture du colapse parent

      if (colapseElement.classList.contains("colapse-close")) {
        colapseElement.classList.replace("colapse-close", "colapse-open");
        return;
      }
      //fermeture du collapse parent
      if (colapseElement.classList.contains("colapse-open")) {
        //On ferme le collapse enfant en premier si il existe
        if (exist) {
          //fermeture des collapses enfants
          if (collapseEnfant1.classList.contains("colapse-article-open")) {
            collapseEnfant1.classList.replace(
              "colapse-article-open",
              "colapse-article-close"
            );
            colapseElement.classList.remove("colapse-grow");
          }

          if (collapseEnfant2.classList.contains("colapse-article-open")) {
            collapseEnfant2.classList.replace(
              "colapse-article-open",
              "colapse-article-close"
            );
            colapseElement.classList.remove("colapse-grow");
          }
        }

        colapseElement.classList.replace("colapse-open", "colapse-close");
        return;
      }
    });
  });
}

/**
 *
 *
 */

function addEventOnLinkArticle() {
  linkColapseForfaitaire1.addEventListener("click", (e) => {
    extendOrCloseColapseInArticle(e);
  });
  linkColapseForfaitaire2.addEventListener("click", (e) => {
    extendOrCloseColapseInArticle(e);
  });
  linkColapseReel1.addEventListener("click", (e) => {
    extendOrCloseColapseInArticle(e);
  });
  linkColapseReel2.addEventListener("click", (e) => {
    extendOrCloseColapseInArticle(e);
  });
}

function addEventOnButtonDownload() {
  btnDownloadList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      FetchForDownload(e);
    });
  });
}

export {
  addEventOnPageLoading,
  addEventOnBannerButton,
  addEventOnSimulateurButton,
  addEventOnButtonDownload,
  addEventOnIconColapseArticle,
  addEventOnIconInfo,
  addEventOnInputDuty,
  addEventOnInputIncome,
  addEventOnInputMonthly,
  addEventOnInputRadioFiscal,
  addEventOnInputRadioImpot,
  addEventOnInputRadioTypeLocation,
  addEventOnLinkArticle,
};
