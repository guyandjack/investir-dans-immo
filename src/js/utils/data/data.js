//Objet qui contient toutes  les valeurs des inputs utilisateur
const UserInputValueContainer = {
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
  cfe: 0,
  chargeNonDeductible: 0,
  chargeDeductible: 0,
};

//Objet qui contient toutes les valeurs calculées relatif au pret
const calculatedValue = {
  //mensualite
  capital: 0,
  mensualite: 0,
  interet: 0,

  //revenus locatif
  income: 0,
  incomeCc: 0,
  assietteimposable: 0,
  //flag pour retrancher les amortissement au bilan avant imposition
  

  //charges et taxes
  duty: 0,
  dutyDeductible: 0,
  cfe: 0,
  amortissableBat: 0,
  amortissableMobilier: 0,
  amortissableTravaux: 0,
  amortissementYear:0,
  //flag type de charge
  useLoan: true,
  useAmortissable: false,
  useCfe: false,
  //duree amortissement
  dureeBat: 0,
  dureeMobilier: 0,
  dureeTravaux:0,
  
  //type de location
  locationType: "",
  
  //bilan avant imposition et avant amortissement
  balance: 0,


  //impot

  //abatement fiscal forfaitaire
  rateIncome: 0,
  fiscalChoice: "",
  fiscalChoiceMemo: "",
  //montant de l'impot foncier
  impotFoncier: 0,
};

//Objet qui contient les valeurs prédéterminé relatif au pret,
//utilisé pour initialiser les inputs utilisateurs

const dataValueInit = {
  //mensualite
  price: 0,
  rateAdvice: 0,
  taeg: 0,
  periode: 0,

  //type de location
  locationtype: "nue",

  //revenu
  income: 0,
  incomeCc: 0,

  //charges et taxes
  copro: 0,
  rateGestion: 0,
  apno: 0,
  ali: 0,
  foncier: 0,
  cfe: 0,
  nondeductible: 0,
  deductible: 0,
  amortissableBat: 0,
  amortissableMobilier: 0,
  amortissabletravaux: 0,
  autreCharge: 0,

  //taux marginal imposition
  tauxImpotRevenu: 0,

  //taux prelevement sociaux
  tauxImpoFoncier: 17.2,

  //choix imposition
  fiscalChoice: "forfaitaire",
  fiscalChoiceMemo: "forfaitaire",
};

export { UserInputValueContainer, calculatedValue, dataValueInit };
