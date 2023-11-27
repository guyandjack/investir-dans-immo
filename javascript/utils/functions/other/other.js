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

//Affiche les inputs "fiscal" number et range
async function displayInputFiscal() {
  if (containerInputFiscal.classList.contains("hide")) {
    containerInputFiscal.classList.replace("hide", "display");
  }
  return true;
}

//Cache les inputs "fiscal" number et range
async function hideInputFiscal() {
  if (containerInputFiscal.classList.contains("display")) {
    containerInputFiscal.classList.replace("display", "hide");
  }
  return true;
}

//Met à jour le bilan avant imposition en fonction de la valeur charge deductible
function hideChargeAndTaxe() {
  
    if (containerChargeTaxe.classList.contains("display")) {
      containerChargeTaxe.classList.replace("display", "hide");
    }
}

function displayChargeAndTaxe() {
    if (containerChargeTaxe.classList.contains("hide")) {
      containerChargeTaxe.classList.replace("hide", "display");
    }
}

export {
  changeColor,
  linkInput,
  displayInputFiscal,
  hideInputFiscal,
  hideChargeAndTaxe,
  displayChargeAndTaxe,
};