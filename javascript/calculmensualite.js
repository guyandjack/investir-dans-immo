/**********script page calculette********* */

//ref des elements du DOM

//Input Number
//mensualite
const inputNumberPrix = document.querySelector("input[name='number-prix']");
const inputNumberApport = document.querySelector("input[name='number-apport']");
const inputNumberTaeg = document.querySelector("input[name='number-taeg']");
const inputNumberDuree = document.querySelector("input[name='number-duree']");

//revenus immobilier
const inputNumberRevenu = document.querySelector("input[name='number-revenu']");

//charges et taxes
const inputNumberCopro = document.querySelector("input[name='number-copro']");
const inputNumberGestion = document.querySelector(
  "input[name='number-gestion']"
);
const inputNumberApno = document.querySelector("input[name='number-apno']");
const inputNumberAli = document.querySelector("input[name='number-ali']");
const inputNumberFoncier = document.querySelector(
  "input[name='number-foncier']"
);
const inputNumberHabitation = document.querySelector(
  "input[name='number-habitation']"
);

//Input range
//mensualite
const inputRangePrix = document.querySelector("input[name='range-prix']");
const inputRangeApport = document.querySelector("input[name='range-apport']");
const inputRangeTaeg = document.querySelector("input[name='range-taeg']");
const inputRangeDuree = document.querySelector("input[name='range-duree']");

//revenus immobilier
const inputRangeRevenu = document.querySelector("input[name='range-revenu']");

//charges et taxes
const inputRangeCopro = document.querySelector("input[name='range-copro']");
const inputRangeGestion = document.querySelector(
  "input[name='number-gestion']"
);
const inputRangeApno = document.querySelector("input[name='range-apno']");
const inputRangeAli = document.querySelector("input[name='range-ali']");
const inputRangeFoncier = document.querySelector(
  "input[name='range-foncier']"
);
const inputRangeHabitation = document.querySelector(
  "input[name='range-habitation']"
);

//Span unité de mesure
//concerne l'input apport
const gainAdvice = document.querySelector(".gain-advice");//conteneur oû on affiche le taux d' apport
const uniteGain = document.querySelector("#gain");//conteneur oû on change la couleur

//concerne l'input revenu
const incomeOnYear = document.querySelector(".income-year");// conteneur ou on affiche le revenu locatif à l' année

//Element contenant les resultats
const containerResultat = document.querySelector("#cont-result");

const mensualiteTextStart = document.querySelector("#mensualite-text-start");
const resultat = document.querySelector("#mensualite");
const mensualiteTextEnd = document.querySelector("#mensualite-text-end");

const containerInterest = document.querySelector("#cont-interest");

const interestTextStart = document.querySelector("#interest-text-start");
const interestCredit = document.querySelector("#interest");
const interestTextEnd = document.querySelector("#interest-text-end");

//Objet qui contient toutes les valeurs calculées relatif au pret
let calculatedValue = {
  capital: 0,
  mensualite: 0,
  interet: 0,
  income: 0,
};

//Objet qui contient les valeurs predeterminé relatif au pret
let dataValue = {
  //mensualite
  price: 200000,
  rateAdvice: 20,
  taeg: 4,
  periode: 20,
  //revenu
  income: 500,
  //charges et taxes
  copro: 1200,
  rateGestion: 10,
  apno: 200,
  ali: 1000,
  foncier: 1500,
  habitation: 1200,
};

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
  let inputs = document.querySelectorAll("input.calculette-number, input.calculette-range");
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      linkInput(e);
      let isValid = checkValueUser(e);
      
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
      incomeByYear();
    });
  });
}

// Fonction permettant de calculer les mesualites d'un credit immo
function mensualite(montant, apport, taeg, periode) {
  let capitalEmprunte = montant - apport;
  calculatedValue.capital = parseInt(capitalEmprunte, 10);
  let result =
    (capitalEmprunte * taeg) /
    100 /
    12 /
    (1 - Math.pow(1 + taeg / 100 / 12, -periode * 12));

  //Insertion dans l'objet globalResult
  calculatedValue.mensualite = parseFloat(result).toFixed(2);

  //Insertion dans le DOM
  mensualiteTextStart.innerHTML = "Vos mensualités: ";
  resultat.innerHTML = result.toFixed(2);
  mensualiteTextEnd.innerHTML = " €";
}

//fonction qui calcule le cout des interrest sur la periode d' emprunt
function coutDuCredit() {
  let capital = calculatedValue.capital;
  let mensualite = calculatedValue.mensualite;
  let duree = parseInt(inputNumberDuree.value, 10);

  let interest = mensualite * (duree * 12) - capital;
  let result = parseFloat(interest).toFixed(2);

  //Insertion dans l'objet globalresult
  calculatedValue.interet = result;

  //Insertion dans elemnt du DOM
  interestTextStart.innerHTML = "Coût de l'emprunt: ";
  interestCredit.innerHTML = result;
  interestTextEnd.innerHTML = " €";
}



//Function initInputValue;
//Initialise les value des inputs number et range
function initInputValue() {
  /*******Input number ******/
  //mensualite
  inputNumberPrix.value = parseInt(dataValue.price, 10);
  inputNumberApport.value = parseInt(
    (dataValue.price * dataValue.rateAdvice) / 100,
    10
  );
  inputNumberTaeg.value = parseInt(dataValue.taeg, 10);
  inputNumberDuree.value = parseInt(dataValue.periode, 10);

  //revenu immobilier
  inputNumberRevenu.value = parseInt(dataValue.income, 10);

  //charges et taxes
  inputNumberCopro.value = parseInt(dataValue.copro, 10);
  inputNumberGestion.value = parseInt(
    (dataValue.rateGestion / 100) * dataValue.income * 12,
    10
  );
  inputNumberApno.value = parseInt(dataValue.apno, 10);
  inputNumberAli.value = parseInt(dataValue.ali, 10);
  inputNumberFoncier.value = parseInt(dataValue.foncier, 10);
  inputNumberHabitation.value = parseInt(dataValue.habitation, 10);

  /****Input range *******/
  //mesualite
  inputRangePrix.value = inputNumberPrix.value;
  inputRangeApport.value = inputNumberApport.value;
  inputRangeTaeg.value = inputNumberTaeg.value;
  inputRangeDuree.value = inputNumberDuree.value;

  //revenu immobilier
  inputRangeRevenu.value = inputNumberRevenu.value;

  //charges et taxes
  inputRangeCopro.value = inputNumberCopro.value;
  inputRangeGestion.value = inputNumberGestion.value;
  inputRangeApno.value = inputNumberApno.value;
  inputRangeAli.value = inputNumberAli.value;
  inputRangeFoncier.value = inputNumberFoncier.value;
  inputRangeHabitation.value = inputNumberHabitation.value;
}

//Function de verification des valeurs utilisateurs
function checkValueUser(evt) {
  //Test si la valeurs de l'input user est un nombre
  let isNumber = testIfNumber(evt.target.value);
  console.log("etat de testIfNnumber: " + isNumber);
  if (!isNumber) {
    containerResultat.classList.add("container-resultat-error");
    resultat.innerHTML = "Veuillez entrer une valeur valide !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  //test sur le montant du credit

  if (
    inputNumberPrix.value == "undefined" ||
    inputNumberPrix.value == "" ||
    inputNumberPrix.value == null
  ) {
    containerResultat.classList.add("container-resultat-error"); //backgcolor orange
    resultat.classList.add("resultat-error"); //color white
    resultat.innerHTML = "Veuillez entrer un prix valide !"; //error message
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberPrix.value, 10) < 0) {
    containerResultat.classList.add("container-resultat-error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Le montant de l'emprunt doit etre positif !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (
    parseInt(inputNumberPrix.value, 10) < parseInt(inputNumberApport.value, 10)
  ) {
    containerResultat.classList.add("container-resultat-error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Le prix du bien doit etre superieur à l'apport !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  //test sur le montant de l' apport
  if (
    inputNumberApport.value == "undefined" ||
    inputNumberApport.value == "" ||
    inputNumberApport.value == null
  ) {
    containerResultat.classList.add("container-resultat-error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Veuillez entrer une valeur d'apport valide !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }
  if (
    parseInt(inputNumberApport.value, 10) > parseInt(inputNumberPrix.value, 10)
  ) {
    containerResultat.classList.add("container-resultat-error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre apport est supérieur au prix du bien !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberApport.value, 10) < 0) {
    containerResultat.classList.add("container-resultat-error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre apport ne peut pas être negatif !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  //test sur le taux du dredit

  if (
    inputNumberTaeg.value == "undefined" ||
    inputNumberTaeg.value == "" ||
    inputNumberTaeg.value == null
  ) {
    containerResultat.classList.add("container-resultat-error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Veuillez entrer un taux valide !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseFloat(inputNumberTaeg.value, 10) < 0) {
    containerResultat.classList.add("container-resultat-error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre taux d'emprunt ne peut pas être negatif !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseFloat(inputNumberTaeg.value, 10) > 8) {
    containerResultat.classList.add("container-resultat-error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre taux d'emprunt ne peut pas superieur à 8% !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  //test sur la durée de l' emprunt

  if (
    inputNumberDuree.value == "undefined" ||
    inputNumberDuree.value == "" ||
    inputNumberDuree.value == null
  ) {
    containerResultat.classList.add("container-resultat-error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "veuillez entrer une durée valide!";
    interestCredit.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberDuree.value, 10) < 0) {
    containerResultat.classList.add("container-resultat-error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre duré d'emprunt ne peut pas être negative!";
    interestCredit.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberDuree.value, 10) > 30) {
    containerResultat.classList.add("container-resultat-error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre durée d'emprunt ne peut pas superieur à 30ans!";
    interestCredit.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }
  containerResultat.classList.remove("container-resultat-error");
  resultat.classList.remove("resultat-error");
  interestCredit.classList.remove("hide");
  containerInterest.classList.remove("hide");
  mensualiteTextStart.classList.remove("hide");
  mensualiteTextEnd.classList.remove("hide");
  return true;

  //test sur les revenus

}

//Fonction qui test si la valeur est un nombre
function testIfNumber(expression) {
  if (Number.isNaN(expression)) {
    return false;
  }
  return true;
}

//fonction qui calcule les revenus locatif sur un an
function incomeByYear() {
  let income = parseInt(inputNumberRevenu.value * 12, 10);
  //insertion dans le DOM
  incomeOnYear.innerHTML = income + "/ans";

  //insertion dans l'objet 
  calculatedValue.income = income;
}

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
  return rateIncome + rateCsg;
}

//function qui calcule l' impot sur les revenus immobiliers
function calculeImpotRevenuImmo(tauximpotimmo, unmoisdeloyer) {}

initInputValue();
mensualite(
  parseInt(inputNumberPrix.value, 10),
  parseInt(inputNumberApport.value, 10),
  parseInt(inputNumberTaeg.value, 10),
  parseInt(inputNumberDuree.value, 10)
);
coutDuCredit();
changeColor();
incomeByYear();
addEventOnInput();
