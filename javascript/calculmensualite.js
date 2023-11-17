/**********script page calculette********* */

//ref des elements du DOM

//Input range
const inputSliderPrix = document.querySelector("input[name='range-prix']");
const inputSliderApport = document.querySelector("input[name='range-apport']");
const inputSliderTaeg = document.querySelector("input[name='range-taeg']");
const inputSliderDuree = document.querySelector("input[name='range-duree']");

//Input Number
const inputNumberPrix = document.querySelector("input[name='number-prix']");
const inputNumberApport = document.querySelector("input[name='number-apport']");
const inputNumberTaeg = document.querySelector("input[name='number-taeg']");
const inputNumberDuree = document.querySelector("input[name='number-duree']");

//Span unité de mesure
const gainAdvice = document.querySelector(".gain-advice");
const uniteGain = document.querySelector("#gain");


//Element contenant le resultat
const resultat = document.querySelector(".resultat");

//function linkInput
//Modifie les valeurs des inputs en fonction du slider range
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

//Function addEvent
//Ajoute des écouteurs evenement sur les inputs
function addEventOnInput() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      linkInput(e);
      let isValid = checkValueUser(e);
      console.log("valeur de checkvalueUser: " + isValid);
      if (!isValid) {
        return;
      }
      mensualite(
        inputNumberPrix.value,
        inputNumberApport.value,
        inputNumberTaeg.value,
        inputNumberDuree.value
      );
      changeColor();
    });
  });
}

// Fonction permettant de calculer les mesualites d'un credit immo
function mensualite(montant, apport, taeg, periode) {
  let result =
    ((montant - apport) * taeg) /
    100 /
    12 /
    (1 - Math.pow(1 + taeg / 100 / 12, -periode * 12));
  resultat.innerHTML = "Vos mensualitées: " + result.toFixed(2) + " €";
}

//Function apport
//calcul l'apport recommandé soit 20% du montant du credit
function TauxApport() {
  inputNumberApport.value = inputNumberPrix.value * 0.2;
}

//Function initRangeValue;
//Positionnne la valeur du range en fonction de la defautValue de l'input number
function initRangeValue() {
  inputSliderPrix.value = inputNumberPrix.value;
  inputNumberApport.value = inputNumberPrix.value * 0.2;
  inputSliderApport.value = inputNumberPrix.value * 0.2;
  inputSliderTaeg.value = inputNumberTaeg.value;
  inputSliderDuree.value = inputNumberDuree.value;
}

//Function de verification des valeurs utilisateurs
function checkValueUser(evt) {
  console.log("input user modifié: " + evt.target.name);
  console.log("prix du bien: " + inputNumberPrix.value);
  console.log("valeur de l'apport: " + inputNumberApport.value);

  //Test si la valeurs de l'input user est un nombre
  let isNumber = testIfNumber(evt.target.value);
  console.log("etat de testIfNnumber: " + isNumber);
  if (!isNumber) {
    return false;
  }

  //test sur le montant du credit


  if (
    inputNumberPrix.value == "undefined" ||
    inputNumberPrix.value == "" ||
    inputNumberPrix.value == null
  ) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Veuillez entrer un prix valide !";
    return false;
  }

  if (parseInt(inputNumberPrix.value,10) < 0) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Le montant de l'emprunt doit etre positif !";
    return false;
  }

  if (parseInt(inputNumberPrix.value,10) < parseInt(inputNumberApport.value,10)) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML =
      "Le prix du bien doit etre superieur à l'apport !";
    return false;
  }
  
  

  //test sur le montant de l' apport
  if (
    inputNumberApport.value == "undefined" ||
    inputNumberApport.value == "" ||
    inputNumberApport.value == null
  ) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Veuillez entrer une valeur d'apport valide !";
    return false;
  }
  if (parseInt(inputNumberApport.value,10) > parseInt(inputNumberPrix.value,10)) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre apport est supérieur au prix du bien !";
    return false;
  }

  if (parseInt(inputNumberApport.value,10) < 0) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre apport ne peut pas être negatif !";
    return false;
  }
  
  

  //test sur le taux du dredit

  if (
    inputNumberTaeg.value == "undefined" ||
    inputNumberTaeg.value == "" ||
    inputNumberTaeg.value == null
  ) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Veuillez entrer un taux valide !";
    return false;
  }

  if (parseFloat(inputNumberTaeg.value,10) < 0) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre taux d'emprunt ne peut pas être negatif !";
    return false;
  }

  if (parseFloat(inputNumberTaeg.value,10) > 8) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre taux d'emprunt ne peut pas superieur à 8% !";
    return false;
  }
  
  

  //test sur la durée de l' emprunt

  if (
    inputNumberDuree.value == "undefined" ||
    inputNumberDuree.value == "" ||
    inputNumberDuree.value == null
  ) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "veuillez entrer une durée valide!";
    return false;
  }


  if (parseInt(inputNumberDuree.value,10) < 0) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre duré d'emprunt ne peut pas être negative!";
    return false;
  }

  if (parseInt(inputNumberDuree.value,10) > 30) {
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre durée d'emprunt ne peut pas superieur à 30ans!";
    return false;
  }
  

  resultat.classList.remove("resultat-error");
  return true;
}

//Fonction qui test si la valeur est un nombre
function testIfNumber(expression) {
  if (Number.isNaN(expression)) {
    return false;
  }
  return true;
}

//Fonction qui fait varier la couleur de fond des span-unite de mesure
function changeColor() {
  
  let value = parseFloat((inputNumberApport.value / inputNumberPrix.value), 10);
  console.log("value: " + value);

  if (value < 0.05) {
    uniteGain.style.backgroundColor = "red";
    gainAdvice.innerHTML = parseFloat(value * 100).toFixed(2) + " %";
     
  }
  if (value >= 0.05 && value < 0.1) {
    uniteGain.style.backgroundColor = "orange";
    gainAdvice.innerHTML = parseFloat(value * 100).toFixed(2) + " %";
     
  }
  if (value >= 0.1 && value < 0.15) {
    uniteGain.style.backgroundColor = "yellow";
    gainAdvice.innerHTML = parseFloat(value * 100).toFixed(2) + " %";
     
  }

  if (value >= 0.15 && value < 0.2) {
    uniteGain.style.backgroundColor = "lightgreen";
    gainAdvice.innerHTML = parseFloat(value * 100).toFixed(2) + " %";
     
  }

  if (value >= 0.2) {
    uniteGain.style.backgroundColor = "green";
    gainAdvice.innerHTML = parseFloat(value * 100).toFixed(2) + " %";
     
  }
  
}

//fonction qui calcule le taux d' imposition sur le revenu immobilier
function calculeTauxImpotImmo() {
  
  let rateCsg = 17;
  let inputRadio = document.querySelector("input[name='taux-impot']:checked");
  let rateIncome = inputRadio.value;
  switch (rateIncome) {
    case 0:
      rateCsg = 17;
      break;
    case 11:
      rateCsg = 17;
      break;
    case 30:
      rateCsg = 17;
      break;
    case 41:
      rateCsg = 17;
      break;
    case 45:
      rateCsg = 17;
      break;
  
    default:
      break;
  }
  return rateIncome + rateCsg
}

//function qui calcule l' impot sur les revenus immobiliers
function calculeImpotRevenuImmo(tauximpotimmo, unmoisdeloyer) {
  
}

initRangeValue();
mensualite(
  parseInt(inputNumberPrix.value,10),
  parseInt(inputNumberApport.value,10),
  parseInt(inputNumberTaeg.value,10),
  parseInt(inputNumberDuree.value,10)
);
changeColor();
addEventOnInput();
