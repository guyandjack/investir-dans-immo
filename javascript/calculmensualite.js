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

//fiscal
const inputNumberFiscal = document.querySelector("input[name='number-fiscal']");

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
const inputRangeFoncier = document.querySelector("input[name='range-foncier']");
const inputRangeHabitation = document.querySelector(
  "input[name='range-habitation']"
);

//Fiscal
const inputRangeFiscal = document.querySelector("input[name='range-fiscal']");

//Span unité de mesure
//concerne l'input apport
const gainAdvice = document.querySelector(".gain-advice"); //conteneur oû on affiche le taux d' apport
const uniteGain = document.querySelector("#gain"); //conteneur oû on change la couleur

//concerne l'input revenu
const incomeOnYear = document.querySelector(".income-year"); // conteneur ou on affiche le revenu locatif à l' année

//Element contenant les resultats des mensualités
const containerResultat = document.querySelector("#cont-result");

const mensualiteTextStart = document.querySelector("#mensualite-text-start");
const resultat = document.querySelector("#mensualite");
const mensualiteTextEnd = document.querySelector("#mensualite-text-end");

const containerInterest = document.querySelector("#cont-interest");

const interestTextStart = document.querySelector("#interest-text-start");
const interestCredit = document.querySelector("#interest");
const interestTextEnd = document.querySelector("#interest-text-end");

//Element imput radio choix regime imposition
const containerInputRadioFiscal = document.querySelector(
  "#regime-fiscal-container-radio"
);
const containerInputFiscal = document.querySelector(
  "#regime-fiscal-container-input"
);
const inputReel = document.querySelector("#impot-reel");
const inputForfaitaire = document.querySelector("#impot-forfaitaire");

//titre container fiscal
const containerFiscaltitle = document.querySelector("#title-regime-fiscal");

//element contenantt les resultat de revenu charges et taxes
const containerResultatBalance = document.querySelector(
  "#cont-result-equilibre"
);

const equilibreTextStart = document.querySelector("#equilibre-text-start");
const equilibreResultat = document.querySelector("#equilibre");
const equilibreTextEnd = document.querySelector("#equilibre-text-end");

//element content les resultat de revenu charges et taxes
const containerResultatBilan = document.querySelector("#cont-result-bilan");

const bilanTextStart = document.querySelector("#bilan-text-start");
const bilanResultat = document.querySelector("#bilan");
const bilanTextEnd = document.querySelector("#bilan-text-end");

//Objet qui contient toutes les valeurs calculées relatif au pret
let calculatedValue = {
  //mensualite
  capital: 0,
  mensualite: 0,
  interet: 0,
  income: 0,
  duty: 0,
  balance: 0,
  //impot
  rateIncome:0,
  fiscalChoice:"",
  chargeDeductible:0,
};

//Objet qui contient les valeurs predeterminé relatif au pret, 
//utilisé pour initialiser les inputs utilisateurs
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
  //impot
  tauxImpotRevenu: 30,
  tauxImpoFoncier: 17.2,
  
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
//Ajoute des écouteurs evenement sur les inputs "calculette mensualité"
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
    });
  });
}

//Ajoute des écouteurs d'évènement sur l'input "revenus" number et range.
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
    });
  });
}

//Ajoute des ecouteurs d'évènement sur les inputs charges et taxes.
function addEventOnInputDuty() {
  let inputs = document.querySelectorAll(
    "#charge-taxe input[type='number'], #charge-taxe input[type='range']"
  );
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      linkInput(e);
      let isValid = checkValueUserDuty();
      if (!isValid) {
        return;
      }
      balance();
      calculeImpotRevenuFoncier();
    });
  });
}

//Ajoute des ecouteurs evènement sur les inputs fiscal de type number et range
function addEventOnInputFiscal() {
  let inputs = document.querySelectorAll(
    "#fiscal input[type='number'], #fiscal input[type='range']"
  );
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      linkInput(e);
      let isValid = true; //checkValueUserDuty();
      if (!isValid) {
        return;
      }
      balance();
      calculeImpotRevenuFoncier();
    });
  });
}
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

      //si l' input radio "reel" est cochée
      if (result == "reel") {
        let inputDisplayed = displayInputFiscal();
        inputDisplayed
          .then(() => {
            addEventOnInputFiscal();
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
            
            calculeImpotRevenuFoncier();
          })
          .catch((error) => {
            console.log("error: " + error);
          });
      }

      
    });
  });
}

// Fonction permettant de calculer les mensualites d'un credit immo
function mensualite(montant, apport, taeg, periode) {
  let capitalEmprunte = montant - apport;
  calculatedValue.capital = parseInt(capitalEmprunte, 10);
  let result =
    (capitalEmprunte * taeg) /
    100 /
    12 /
    (1 - Math.pow(1 + taeg / 100 / 12, -periode * 12));

  //Insertion dans l'objet calculated Value
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

  //fiscalite
  inputNumberFiscal;

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

//Function de verification des valeurs utilisateurs input mensualité
function checkValueUserMonthly(evt) {
  //Test si la valeurs de l'input user est un nombre
  let isNumber = testIfNumber(evt.target.value);
  console.log("etat de testIfNnumber: " + isNumber);
  if (!isNumber) {
    containerResultat.classList.add("error");
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
    containerResultat.classList.add("error"); //backgcolor orange
    resultat.classList.add("resultat-error"); //color white
    resultat.innerHTML = "Veuillez entrer un prix valide !"; //error message
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberPrix.value, 10) < 0) {
    containerResultat.classList.add("error");
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
    containerResultat.classList.add("error");
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
    containerResultat.classList.add("error");
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
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre apport est supérieur au prix du bien !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberApport.value, 10) < 0) {
    containerResultat.classList.add("error");
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
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Veuillez entrer un taux valide !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseFloat(inputNumberTaeg.value, 10) < 0) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre taux d'emprunt ne peut pas être negatif !";
    containerInterest.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseFloat(inputNumberTaeg.value, 10) > 8) {
    containerResultat.classList.add("error");
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
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "veuillez entrer une durée valide!";
    interestCredit.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberDuree.value, 10) < 0) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre duré d'emprunt ne peut pas être negative!";
    interestCredit.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }

  if (parseInt(inputNumberDuree.value, 10) > 30) {
    containerResultat.classList.add("error");
    resultat.classList.add("resultat-error");
    resultat.innerHTML = "Votre durée d'emprunt ne peut pas superieur à 30ans!";
    interestCredit.classList.add("hide");
    mensualiteTextStart.classList.add("hide");
    mensualiteTextEnd.classList.add("hide");
    return false;
  }
  containerResultat.classList.remove("error");
  resultat.classList.remove("resultat-error");
  interestCredit.classList.remove("hide");
  containerInterest.classList.remove("hide");
  mensualiteTextStart.classList.remove("hide");
  mensualiteTextEnd.classList.remove("hide");
  return true;
}

//Check l'input user revenu foncier;
function checkValueUserIncome(evt) {
  //Test si la valeurs de l'input user est un nombre
  let isNumber = testIfNumber(evt.target.value);

  if (!isNumber) {
    incomeOnYear.innerHTML = "Veuillez entrer un nombre !";
    incomeOnYear.style.color = "red";
    return false;
  }

  //test si la valeur est non null
  if (
    inputNumberRevenu.value == "undefined" ||
    inputNumberRevenu.value == "" ||
    inputNumberRevenu.value == null
  ) {
    incomeOnYear.innerHTML = "Veuillez entrer une valeur valide !";
    incomeOnYear.style.color = "red";
    return false;
  }

  //test si la valeur est positive
  if (parseInt(inputNumberRevenu.value) < 0) {
    incomeOnYear.innerHTML = "Veuillez entrer une valeur positive !";
    incomeOnYear.style.color = "red";
    return false;
  }
  incomeOnYear.style.color = "black";
  return true;
}

//check les inputs de charges et taxes
function checkValueUserDuty() {
  let errorMessages = [
    "charges de coproprietés",
    "charges locative",
    "primes d'assurance (PNO)",
    "primes d' assurance loyer impayé",
    "taxe fonciére",
    "taxe d'habitation",
  ];

  let inputs = document.querySelectorAll("#charge-taxe input[type='number]");

  inputs.forEach((input, index) => {
    //Test si la valeur est un nombre
    let isNumber = testIfNumber(input.value);
    if (!isNumber) {
      containerResultatBalance.classList.remove("error");
      containerResultatBalance.classList.add("error");
      equilibreTextStart.innerHTML =
        "Veuillez entrer un montant dans le champ " + errorMessages[index];

      return false;
    }

    //test si la valeur est non null
    if (
      inputNumber.value == "undefined" ||
      inputNumber.value == "" ||
      inputNumber.value == null
    ) {
      containerResultatBalance.classList.remove("error");
      containerResultatBalance.classList.add("error");
      equilibreTextStart.innerHTML =
        "Veuillez entrer une valeur valide dans le champ " +
        errorMessages[index];
      errorMessages[index];
      return false;
    }

    //test si la valeur est positive
    if (parseInt(input.value) < 0) {
      containerResultatBalance.classList.remove("error");
      containerResultatBalance.classList.add("error");
      equilibreTextStart.innerHTML =
        "Votre valeur " + errorMessages[index] + " est negative!";
      return false;
    }

    //test si la valeur n'est pas supérieur à 10000
    if (parseInt(input.value) > 10000) {
      containerResultatBalance.classList.remove("error");
      containerResultatBalance.classList.add("error");
      equilibreTextStart.innerHTML =
        "Votre valeur" + errorMessages[index] + " est supérireur à 10000 ";
      return false;
    }
  });

  containerResultatBalance.classList.remove("error");
  return true;
}

//Fonction qui test si la valeur est un nombre
function testIfNumber(expression) {
  if (Number.isNaN(expression)) {
    return false;
  }
  return true;
}

//Affiche les inputs "fiscal" number et range
async function displayInputFiscal() {
  if (containerInputFiscal.classList.contains("hide")) {
    containerInputFiscal.classList.remove("hide");
  }
  return true;
}

//Cache les inputs "fiscal" number et range
async function hideInputFiscal() {
  if (!containerInputFiscal.classList.contains("hide")) {
    containerInputFiscal.classList.add("hide");
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

  if (income > 15300) {
    console.log("income: " + income);
    //Modification du titre
    containerFiscaltitle.innerHTML = "Regime fiscal 'réel' obligatoire";

    //Cache les inputs de type radio
    if (!containerInputRadioFiscal.classList.contains("hide")) {
      containerInputRadioFiscal.classList.add("hide");
    }

    let inputDisplayed = displayInputFiscal();
    inputDisplayed
      .then(() => {
        //Lie les valeurs des inputs range et number 
        addEventOnInputFiscal();
        

        //Lance le control des inputs user fiscal
        //checkValueUserFiscal();
        console.log("check des data user fiscal");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }

  if (income <= 15300) {
    console.log("income: " + income);
    //Modifie le titre
    containerFiscaltitle.innerHTML =
      "Choix du regime fiscal.";

    //Affiche les inputs de type radio
    if (containerInputRadioFiscal.classList.contains("hide")) {
      containerInputRadioFiscal.classList.remove("hide");
    }

    //Cache les inputs de type number et range
    if (!containerInputFiscal.classList.contains("hide")) {
      containerInputFiscal.classList.add("hide");
    }
  }
}

//fonction qui etabli un bilan entre charge moins revenu locatif moins emprunt
function balance() {
  let duty =
  //charges
    parseInt(inputNumberCopro.value, 10) +
    parseInt(inputNumberGestion.value, 10) +
    parseInt(inputNumberApno.value, 10) +
    parseInt(inputNumberAli.value, 10) +
    parseInt(inputNumberFoncier.value, 10) +
    parseInt(inputNumberHabitation.value, 10) +
    //emprunt
    parseInt(calculatedValue.mensualite * 12)
    ;
  console.log("dutycopro: " + inputNumberCopro.value);
  console.log("dutygestion: " + inputNumberGestion.value);
  console.log("dutyapno: " + inputNumberApno.value);
  console.log("dutyali: " + inputNumberAli.value);
  console.log("dutyfonciere: " + inputNumberFoncier.value);
  console.log("dutyhabitation: " + inputNumberHabitation.value);
  console.log("dutyEmprunt: " + calculatedValue.mensualite * 12);
  console.log("duty: " + duty)

  calculatedValue.duty = duty;
  let income = calculatedValue.income;

  let balance = income - duty;
  calculatedValue.balance = balance;

  if (balance < 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBalance.classList.remove("negativ", "equal");

    containerResultatBalance.classList.add("negativ");
    equilibreTextStart.innerHTML = "Bilan avant imposition: ";
    equilibreResultat.innerHTML = balance;
    equilibreTextEnd.innerHTML = " €";
  }

  if (balance == 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBalance.classList.remove("negativ", "equal");

    containerResultatBalance.classList.add("equal");
    equilibreTextStart.innerHTML = "Bilan avant imposition: ";
    equilibreResultat.innerHTML = balance;
    equilibreTextEnd.innerHTML = " €";
  }

  if (balance > 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBalance.classList.remove("negativ", "equal");

    equilibreTextStart.innerHTML = "Bilan avant imposition: ";
    equilibreResultat.innerHTML = balance;
    equilibreTextEnd.innerHTML = " €";
  }
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

//Fonction qui calcule l'impot sur le revenu foncier
function calculeImpotRevenuFoncier() {

  //recupere la valeur de l'input radio "tranche imposition"
  let inputRadio = document.querySelector("input[name='taux-impot']:checked");
  let rateIncome = parseInt(inputRadio.value ,10);
  calculatedValue.rateIncom = rateIncome;
  console.log("tranche impot: " + rateIncome);
  let bilan = null;

  //Regime "micro foncier" ou  forfaitaire
  if (calculatedValue.fiscalChoice == "forfaitaire") {
    let assietteImposable = calculatedValue.income * 0.7;
    
    console.log("assiette imposable: " + assietteImposable);
    

    let impotFoncier = (assietteImposable * (rateIncome + dataValue.tauxImpoFoncier)/100) ;
    console.log("impot foncier: " + impotFoncier);

     bilan = calculatedValue.balance - impotFoncier;
  }

  //Regime "reel"
if (calculatedValue.fiscalChoice == "reel") {
  
  let balance = calculatedValue.income - calculatedValue.chargeDeductible;

  if (balance > 0) {
    let impotFoncier = balance * (calculatedValue.rateIncome + dataValue.tauxImpoFoncier) / 100; 
    bilan = calculatedValue.balance - impotFoncier;
  }
  if (balance <= 0){
    bilan = calculatedValue.balance;
  }

}
  

  if (bilan < 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBilan.classList.remove("negativ", "equal");

    containerResultatBilan.classList.add("negativ");
    bilanTextStart.innerHTML = "Bilan après imposition: ";
    bilanResultat.innerHTML = bilan;
    bilanTextEnd.innerHTML = " €";
  }

  if (bilan == 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBilan.classList.remove("negativ", "equal");

    containerResultatBilan.classList.add("equal");
    bilanTextStart.innerHTML = "Bilan après imposition: ";
    bilanResultat.innerHTML = bilan;
    bilanTextEnd.innerHTML = " €";
  }

  if (bilan > 0) {
    //supprime les eventuelles class ajoutées sur un calcul précédent
    containerResultatBilan.classList.remove("negativ", "equal");

    bilanTextStart.innerHTML = "Bilan après imposition: ";
    bilanResultat.innerHTML = bilan;
    bilanTextEnd.innerHTML = " €";
  }
}

//Script principal
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
balance();
addEventOnInputMonthly();
addEventOnInputIncome();
addEventOnInputDuty();
addEventOnInputRadioFiscal();

