/**************************************************************************
 * ******************* controle du formulaire contact *********************
 * ************************************************************************/

import {
  masqueCivilite,
  masqueText,
  masqueMail,
  masqueMessage,
  masqueNumber,
} from "./utils/regEx/regEx.js";

//Objet contenant les message d'erreurs
let listOfMessageError = {
  civilite: "Veuillez indiquer un etat civil valide !",
  lastname: "Veuillez entrer un nom valid !",
  firstname: "Veuillez entrer un prenom valide !",
  email: "Veuillez entrer un email valide !",
  message: "Veuillez entrer un message valide!",
  submit: "Veuillez compléter le formulaire !",
};

//objet contenent le resultat des fonction de controle
let valueControl = {
  civilite: false,
  lastname: false,
  firstname: false,
  email: false,
  message: false,
  sujet: false,
};

//corps de la requette fetch
let bodyRequest = {
  civilite: "",
  lastname: "",
  firstname: "",
  email: "",
  message: "",
  sujet: "error",
};

function selectErrorMessage(id) {
  let errorMessageMatch = listOfMessageError[id];
  return errorMessageMatch;
}

function displayErrorMessage(id, errorMessage) {
  let divErrorId = "error-" + id;
  console.log("div error ID: " + divErrorId);
  let divErrorMatch = document.querySelector(`#${divErrorId}`);
  console.log("div error element: " + divErrorMatch);
  divErrorMatch.innerHTML = errorMessage;

  if (divErrorMatch.classList.contains("hide-error")) {
    divErrorMatch.classList.replace("hide-error", "display-error");
  }
}

function deleteErrorMessage(id) {
  let divErrorId = "error-" + id;
  let divErrorMatch = document.querySelector(`#${divErrorId}`);
  divErrorMatch.innerHTML = "";
  if (divErrorMatch.classList.contains("display-error")) {
    divErrorMatch.classList.replace("display-error", "hide-error");
  }
}

/**
 * test la validite de l'input "civilite"
 *
 * @param {*} e
 */
async function checkUserValueSujet() {
  let sujetValue = document.querySelector("#sujet").value;
  console.log("valeur de input hidden: " + sujetValue)
  
  if (sujetValue.length < 1) {
    valueControl.sujet = true;
    bodyRequest.sujet = "";
    return true;
  } else {
    
    valueControl.sujet = false;
    bodyRequest.sujet = "error";
    return false;
  }
}
/**
 * test la validite de l'input "civilite"
 *
 * @param {*} e
 */
function checkUserValueCivilite(id, civilite) {
  console.log("id civilite: " + id);
  if (masqueCivilite.test(civilite)) {
    deleteErrorMessage(id);
    valueControl.civilite = true;
    bodyRequest.civilite = civilite;
    return true;
  } else {
    let message = selectErrorMessage(id);
    displayErrorMessage(id, message);
    valueControl.civilite = false;
    bodyRequest.civilite = "";
    return false;
  }
}
/**
 * test la validite de l'input "Nom"
 *
 * @param {*} e
 */
function checkUserValueLastname(id, lastname) {
  if (masqueText.test(lastname)) {
    deleteErrorMessage(id);
    valueControl.lastname = true;
    bodyRequest.lastname = lastname;
    return true;
  } else {
    let message = selectErrorMessage(id);
    console.log("message d'erreur à afficher: " + message);
    displayErrorMessage(id, message);
    valueControl.lastname = false;
    bodyRequest.lastname = "";
    return false;
  }
}
/**
 * test la validite de l'input "prenom"
 *
 * @param {*} e
 */
function checkUserValueFirstname(id, firstname) {
  if (masqueText.test(firstname)) {
    deleteErrorMessage(id);
    valueControl.firstname = true;
    bodyRequest.firstname = firstname;
    return true;
  } else {
    let message = selectErrorMessage(id);
    displayErrorMessage(id, message);
    valueControl.firstname = false;
    bodyRequest.firstname = "";
    return false;
  }
}
/**
 * test la validite de l'input "email"
 *
 * @param {*} e
 */
function checkUserValueEmail(id, email) {
  if (masqueMail.test(email)) {
    deleteErrorMessage(id);
    valueControl.email = true;
    bodyRequest.email = email;
    return true;
  } else {
    let message = selectErrorMessage(id);
    displayErrorMessage(id, message);
    valueControl.email = false;
    bodyRequest.email = "";
    return false;
  }
}
/**
 * test la validite de l'input "message"
 *
 * @param {*} e
 */
function checkUserValueMessage(id, message) {
  if (masqueMessage.test(message)) {
    deleteErrorMessage(id);
    valueControl.message = true;
    bodyRequest.message = message;
    return true;
  } else {
    let message = selectErrorMessage(id);
    displayErrorMessage(id, message);
    valueControl.message = false;
    bodyRequest.message = "";
    return false;
  }
}

/**
 *
 *
 */
function checkUserInputSelected(e) {
  let inputSelectedId = e.target.id;
  let inputSelectedValue = e.target.value;
  console.log("id de l' input utilisateur: " + inputSelectedId);
  console.log("value de l' input utilisateur: " + inputSelectedValue);
  let result = false;
  switch (inputSelectedId) {
    case "civilite":
      result = checkUserValueCivilite(inputSelectedId, inputSelectedValue);
      break;
    case "lastname":
      result = checkUserValueLastname(inputSelectedId, inputSelectedValue);
      break;
    case "firstname":
      result = checkUserValueFirstname(inputSelectedId, inputSelectedValue);
      break;
    case "email":
      result = checkUserValueEmail(inputSelectedId, inputSelectedValue);
      break;
    case "message":
      result = checkUserValueMessage(inputSelectedId, inputSelectedValue);
      break;
    

    default:
      break;
  }
  return result;
}

async function checkAllUserInput() {
  let divErrorsubmit = document.querySelector("#error-submit");
  console.log(valueControl);
  if (
    !valueControl.civilite ||
    !valueControl.lastname ||
    !valueControl.firstname ||
    !valueControl.email ||
    !valueControl.message 
    
  ) {
    divErrorsubmit.innerHTML = listOfMessageError.submit;
    if (divErrorsubmit.classList.contains("hide-error")) {
      divErrorsubmit.classList.replace("hide-error", "display-error");
    }
    return false;
  } else {
    if (divErrorsubmit.classList.contains("display-error")) {
      divErrorsubmit.classList.replace("display-error", "hide-error");
    }
    return true;
  }
}

function submitForm(e) {
  e.preventDefault();
   
   
  checkAllUserInput()
    .then((test1) => {
      if (!test1) {
        return
      }
      else {
        return checkUserValueSujet();
      }
    })
    .then((test2) => {
      if (!test2) {
        return;
      } else {
        let urlTestFetch = "http://localhost:5000/contact";
        let urlProdFetch =
          "https://www.apielectravauxproduction.electravaux.com/contact";

        fetch(urlTestFetch, {
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(bodyRequest),
        })
          .then((response) => {
            response
              .json()

              .then((data) => {
                let result = JSON.parse(JSON.stringify(data));
                console.log(result);
                if (result.message !== "valide") {
                  alert(
                    " Une erreur est survenue lors de l’envoi du message !!! \n Votre message ne nous est pas parvenu."
                  );
                } else {
                  alert("message recu! 👍 \n il sera traité dans les 48h");
                }
              });
          })

          /*.then(() => {
      window.location.reload();
    })*/

          .catch((error) => console.log(error));
        //console.log("formulaire envoyé !");
      }
  })
  

  
}

function hideValidDiv(evt) {
  let validDiv = evt.target.parentElement;
  if (validDiv.classList.contains("display-valid")) {
    validDiv.classList.replace("display-valid", "hide-valid");
  }
}

function displayValidDiv() {
  let validDiv = document.querySelector(".valid");
  if (validDiv.classList.contains("hide-valid")) {
    validDiv.classList.replace("hide-valid", "display-valid");
  }
}

function addEventControlOnInput() {
  let listOfInputs = document.querySelectorAll(".input-contact");
  let buttonSubmit = document.querySelector("#btn");
  let closure = document.querySelector(".closure");

  listOfInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      checkUserInputSelected(e);
    });
  });

  buttonSubmit.addEventListener("click", (e) => {
    submitForm(e);
  });

  closure.addEventListener("click", (e) => {
    hideValidDiv(e);
  });
}

/*************************** script principal **************************/
addEventControlOnInput();
