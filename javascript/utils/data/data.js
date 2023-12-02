//Objet qui contient toutes les valeurs calculées relatif au pret
let calculatedValue = {
  //mensualite
  capital: 0,
  mensualite: 0,
    interet: 0,
  //revenus locatif 
    income: 0,//Hors charge
    incomeCharge:0, //charges locatives
  //charges et taxes
  duty: 0,
    balance: 0,
  //type de location
    locationType:"",
  //impot
  rateIncome: 0,
  fiscalChoice: "",
  chargeDeductible: 0,
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
  incomeCharge: 100,
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
