/**************************************************************************
 * ******************* controle du formulaire contact *********************
 * ************************************************************************/


 // import des regEx
import {
  masqueCivilite,
  masqueText,
  masqueMail,
  masqueMessage,
  masqueNumber,
} from "./utils/regEx/regEx.js";

//Objet contenant les messages d'erreurs
let listOfMessageError = {
  civilite: "Veuillez indiquer un etat civil valide !",
  lastname: "Veuillez entrer un nom valid !",
  firstname: "Veuillez entrer un prenom valide !",
  email: "Veuillez entrer un email valide !",
  message: "Veuillez entrer un message valide!",
  submit: "Veuillez compléter le formulaire !",
};

//objet contenent le resultat des fonctions de controle unitaire
let valueControl = {
  civilite: false,
  lastname: false,
  firstname: false,
  email: false,
  message: false,
  sujet: false,
};



//corps de la requette fetch pour la soumission du formulaire
let bodyRequest = {
  civilite: "",
  lastname: "",
  firstname: "",
  email: "",
  message: "",
  sujet: "",
};


/**
 * Controle le resultat des fonctions de controle unitaire
 * @ return void
 */
function checkValueControl() {
  if (
    !valueControl.civilite ||
    !valueControl.lastname ||
    !valueControl.firstname ||
    !valueControl.email ||
    !valueControl.message 
    
  ){
    disableButtonSubmit();
  }
  else{
    enableButtonSubmit();
  }
}

/**
 * Selectionne le message d' erreur en fonction de l' input en defaut
 *
 * @param {*} id
 * @return {*} message d' erreur
 */
function selectErrorMessage(id) {
  let errorMessageMatch = listOfMessageError[id];
  return errorMessageMatch;
}


/**
 * insert le message d'erreur dans le divError
 * affiche le divError
 *
 * @param {*} id
 * @param {*} errorMessage
 */
function displayErrorMessage(id, errorMessage) {

  //determination de l' id de l'element qui recoit le message d' erreur
  let divErrorId = "error-" + id;
  
  //selection du div error
  let divErrorMatch = document.querySelector(`#${divErrorId}`);
  
  divErrorMatch.innerHTML = errorMessage;
  
  //affichage du diverror
  if (divErrorMatch.classList.contains("hide-error")) {
    divErrorMatch.classList.replace("hide-error", "display-error");
  }
}


/**
 * suprime le message d'erreur dans le divError
 * cache le divError
 * @param {*} id
 */
function deleteErrorMessage(id) {
  //determination de l' id de l'element qui recoit le message d' erreur
  let divErrorId = "error-" + id;

  //selection du div error
  let divErrorMatch = document.querySelector(`#${divErrorId}`);

  divErrorMatch.innerHTML = "";

  //cache le diverror
  if (divErrorMatch.classList.contains("display-error")) {
    divErrorMatch.classList.replace("display-error", "hide-error");
  }
}

/**
 * test la validite de l'input "sujet" (pot de miel)
 * met à jour l' objet qui contient les resultats des test unitaire
 * met à jour le coprs de la requette
 *
 * @return boolean
 */
async function checkUserValueSujet() {
  let sujetValue = document.querySelector("#sujet").value;
    
  if (sujetValue.length < 1) {
    valueControl.sujet = true;
    bodyRequest.sujet = "";
    return true;
  } else {
    
    valueControl.sujet = false;
    return false;
  }
}
/**
 * test la validite de l'input "civilite" 
 * met à jour l' objet qui contient les resultats des test unitaire
 * met à jour le coprs de la requette
 *
 * @param {} "id" id del'input user 
 * @param {} "civilite" valeur de l'input user
 * @return boolean
 */
function checkUserValueCivilite(id, civilite) {
  
  if (masqueCivilite.test(civilite)) {
    deleteErrorMessage(id);
    valueControl.civilite = true;
    bodyRequest.civilite = civilite;
    checkValueControl();
    return true;
  } else {
    let message = selectErrorMessage(id);
    displayErrorMessage(id, message);
    valueControl.civilite = false;
    bodyRequest.civilite = "";
    checkValueControl();
    return false;
  }
}
/**
 * Test la validite de l'input "nom" 
 * met à jour l' objet qui contient les resultats des test unitaire
 * met à jour le coprs de la requette
 *
 * @param {} "id" id del'input user 
 * @param {} "lastname" valeur de l'input user
 * @return boolean
 */
function checkUserValueLastname(id, lastname) {
  if (masqueText.test(lastname)) {
    deleteErrorMessage(id);
    valueControl.lastname = true;
    bodyRequest.lastname = lastname;
    checkValueControl();
    return true;
  } else {
    let message = selectErrorMessage(id);
    console.log("message d'erreur à afficher: " + message);
    displayErrorMessage(id, message);
    valueControl.lastname = false;
    bodyRequest.lastname = "";
    checkValueControl();
    return false;
  }
}
/**
 * Test la validite de l'input "prénom" 
 * met à jour l' objet qui contient les resultats des test unitaire
 * met à jour le coprs de la requette
 *
 * @param {} "id" id del'input user 
 * @param {} "firstname" valeur de l'input user
 * @return boolean
 */
function checkUserValueFirstname(id, firstname) {
  if (masqueText.test(firstname)) {
    deleteErrorMessage(id);
    valueControl.firstname = true;
    bodyRequest.firstname = firstname;
    checkValueControl();
    return true;
  } else {
    let message = selectErrorMessage(id);
    displayErrorMessage(id, message);
    valueControl.firstname = false;
    bodyRequest.firstname = "";
    checkValueControl();
    return false;
  }
}
/**
 * Test la validite de l'input "email" 
 * met à jour l' objet qui contient les resultats des test unitaire
 * met à jour le coprs de la requette
 *
 * @param {} "id" id del'input user 
 * @param {} "email" valeur de l'input user
 * @return boolean
 */
function checkUserValueEmail(id, email) {
  if (masqueMail.test(email)) {
    deleteErrorMessage(id);
    valueControl.email = true;
    bodyRequest.email = email;
    checkValueControl();
    return true;
  } else {
    let message = selectErrorMessage(id);
    displayErrorMessage(id, message);
    valueControl.email = false;
    bodyRequest.email = "";
    checkValueControl();
    return false;
  }
}
/**
 * Test la validite de l'input "message" 
 * met à jour l' objet qui contient les resultats des test unitaire
 * met à jour le coprs de la requette
 *
 * @param {} "id" id del'input user 
 * @param {} "message" valeur de l'input user
 * @return boolean
 */
function checkUserValueMessage(id, message) {
  if (masqueMessage.test(message)) {
    deleteErrorMessage(id);
    valueControl.message = true;
    bodyRequest.message = message;
    checkValueControl();
    return true;
  } else {
    let message = selectErrorMessage(id);
    displayErrorMessage(id, message);
    valueControl.message = false;
    bodyRequest.message = "";
    checkValueControl();
    return false;
  }
}

/**
 * selectionne la fonction de test unitaire  en fonction de l'input user utilisé
 *@param {} "objet event"
 *@return {} le resultat dela fonction unitaire
 */
function checkUserInputSelected(e) {
  let inputSelectedId = e.target.id;
  let inputSelectedValue = e.target.value;
  
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


/**
 *soumet le formulaire via une requette fetch
 *
 * @param {*} objet event
 */

function submitForm(e) {
  e.preventDefault();
   
    
  checkUserValueSujet()
    .then((test) => {
      if (!test) {
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
                
                if (result.message !== "valide") {
                  displayValidDiv("Une erreur est survenue... 😞");
                  
                } else {
                  displayValidDiv("message reçu! 👍");
                  
                }
              });
          })

          .catch((error) => console.log(error));
        
      }
  })
  

}

/**
 * cache le div de confirmation d' envoi du message
 *
 * @param {*} validDiv
 */
function hideValidDiv(validDiv) {
  
  let validText = validDiv.lastElementChild;
  
  validText.innerHTML = "";
    if (validDiv.classList.contains("display-valid")) {
    validDiv.classList.replace("display-valid", "hide-valid");
  }

}

/**
 * insert le text de validation d' envoi
 * affiche le div de validation
 *
 * @param {*} "text" texte à afficher"
 */
function displayValidDiv(text) {
  let validDiv = document.querySelector(".valid");
  let validText = document.querySelector(".valid-text");
  
  if (validDiv.classList.contains("hide-valid")) {
    validDiv.classList.replace("hide-valid", "display-valid");
  }
  validText.innerHTML = text;
}


/**
 * active le bouton de soumission du formulaire
 *
 */
function enableButtonSubmit() {
  let button = document.querySelector("#btn");
  if (button.classList.contains("disabled")) {
    button.classList.replace("disabled", "enabled");
  };
  button.disabled = false;
}

/**
 * desactive le bouton de soumission du formulaire
 *
 */
function disableButtonSubmit() {
  let button = document.querySelector("#btn");
  if (button.classList.contains("enabled")) {
    button.classList.replace("enabled","disabled");
  };
  
  button.disabled = true;
}


/**
 * reinitialise la valeur des inputs user
 *
 */
function resetInput() {
  let listInputs = document.querySelectorAll(".input-contact");
  listInputs.forEach((input) => {
    input.value = "";
  });
  
}


/**
 * réinitialise les resultats des fonctions de test unitaire 
 *
 */
function resetValueControl() {
  for (let element in valueControl) {

    valueControl[element] = false;
  }
  
}


/**
 * reinitialise le formulaire de contact apres apres validation du user 
 *
 */
function resetForm() {
  resetInput();
  resetValueControl();
  disableButtonSubmit();
}



/**
 * ajoute les ecouteurs d' évènement sur les inputs et bouton du formulaire
 *
 */
function addEventControlOnInput() {
  let listOfInputs = document.querySelectorAll(".input-contact");
  let buttonSubmit = document.querySelector("#btn");
  let validDiv = document.querySelector(".valid");

  listOfInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      checkUserInputSelected(e);
    });
  });

  buttonSubmit.addEventListener("click", (e) => {
    submitForm(e);
  });

  validDiv.addEventListener("click", () => {
    hideValidDiv(validDiv);
    resetForm();
  });
}

/*************************** script principal **************************/
addEventControlOnInput();
