//Objet qui contient toutes  les valeurs des inputs utilisateur
let UserInputValueContainer = {
  //fieldset "calculette"
  financement: 0,
  apport: 0,
  taeg: 0,
  duree: 0,

  //fieldset "type location"
  locationType: "",

  //fieldset "revenu locatif"
  revenuLocatif: 0,

  //fieldset "charges et taxe"
  copro: 0,
  gestionLocative: 0,
  apno: 0,
  ali: 0,
  taxeFonciere: 0,
  taxehabitation: 0,
  cfe: 0,
  chargeNonDeductible: 0,
  chargeDeductible: 0,

  
};

//Objet qui contient toutes les valeurs calculées relatif au pret
let calculatedValue = {
  //mensualite
  capital: 0,
  mensualite: 0,
  interet: 0,

  //revenus locatif
  income: 0, 
  
  //charges et taxes
  duty: 0,
  dutyDeductible:0,
  balance: 0,

  //type de location
  locationType: "",
  cfe: 0,

  //impot
  rateIncome: 0,
  fiscalChoice: "",
  impotFoncier: 0,
};

//Objet qui contient les valeurs predeterminé relatif au pret,
//utilisé pour initialiser les inputs utilisateurs

let dataValueInit = {
  //mensualite
  price: 200000,
  rateAdvice: 20,
  taeg: 4,
  periode: 20,

  //type de location
  locationtype: "nue",

  //revenu
  income: 500,
 
  //charges et taxes
  copro: 1200,
  rateGestion: 10,
  apno: 200,
  ali: 1000,
  foncier: 1500,
  habitation: 1200,
  cfe: 500,
  nondeductible: 2000,
  deductible: 5000,

  //taux marginal imposition
  tauxImpotRevenu: 30,

  //taux prelevement sociaux
  tauxImpoFoncier: 17.2,

  //choix imposition
  fiscalChoice: "forfaitaire",
};
