/****************************************************************************
 * Elements du DOM referencés pour l'utilisation dans le script principal******
 * *************************************************************************/


/****************************** Elements du formulaire #calculette*************************/
/***************************************** start ************************************** */

    /***** fieldset #calculette-mensualite *****/
    /*** start ****/

    //Input de type "Number"
    const inputNumberPrix = document.querySelector("input[name='number-prix']");
    const inputNumberApport = document.querySelector("input[name='number-apport']");
    const inputNumberTaeg = document.querySelector("input[name='number-taeg']");
    const inputNumberDuree = document.querySelector("input[name='number-duree']");


    //Input de type "Range"
    const inputRangePrix = document.querySelector("input[name='range-prix']");
    const inputRangeApport = document.querySelector("input[name='range-apport']");
    const inputRangeTaeg = document.querySelector("input[name='range-taeg']");
    const inputRangeDuree = document.querySelector("input[name='range-duree']");


    //conteneur oû on affiche le taux d'apport
    const gainAdvice = document.querySelector(".gain-advice");

    //Span unité de mesure oû on change la couleur
    const uniteGain = document.querySelector("#gain");

    //conteneurs qui affichent les elements resultat "mensualite" et cout d' "emprunt"
    const containerResultat = document.querySelector("#cont-result");
    const containerInterest = document.querySelector("#cont-interest");

    const mensualiteTextStart = document.querySelector("#mensualite-text-start");
    const resultat = document.querySelector("#mensualite");
    const mensualiteTextEnd = document.querySelector("#mensualite-text-end");

    const interestTextStart = document.querySelector("#interest-text-start");
    const interestCredit = document.querySelector("#interest");
    const interestTextEnd = document.querySelector("#interest-text-end");


    /***** fieldset #calculette-mensualite *****/
    /*** end ****/


    /***** fieldset #revenu-locatif *****/
    /*** start ****/

    //Input de type "Number"
    const inputNumberRevenu = document.querySelector("input[name='number-revenu']");
    const inputNumberRevenuCharge = document.querySelector("input[name='number-charge']");

    //Input de type "Range"
    const inputRangeRevenu = document.querySelector("input[name='range-revenu']");
    const inputRangeRevenuCharge = document.querySelector("input[name='range-charge']");

    // conteneur de rappel ou on affiche le revenu locatif à l'année.(sous input number)
    const incomeOnYear = document.querySelector(".income-year");


    /***** fieldset #revenu-locatif *****/
    /*** end ****/



    /***** fieldset #charge-taxe *****/
    /*** start ****/

    //Conatiner fieldset
    const containerChargeTaxe = document.querySelector("#charge-taxe");

    //Input de type "Number"
    const inputNumberCopro = document.querySelector("input[name='number-copro']");
    const inputNumberGestion = document.querySelector("input[name='number-gestion']");
    const inputNumberApno = document.querySelector("input[name='number-apno']");
    const inputNumberAli = document.querySelector("input[name='number-ali']");
    const inputNumberFoncier = document.querySelector("input[name='number-foncier']");
    const inputNumberHabitation = document.querySelector("input[name='number-habitation']");

    //Input de type "Range"
    const inputRangeCopro = document.querySelector("input[name='range-copro']");
    const inputRangeGestion = document.querySelector("input[name='number-gestion']");
    const inputRangeApno = document.querySelector("input[name='range-apno']");
    const inputRangeAli = document.querySelector("input[name='range-ali']");
    const inputRangeFoncier = document.querySelector("input[name='range-foncier']");
    const inputRangeHabitation = document.querySelector("input[name='range-habitation']");

    //conteneurs qui affichent les elements resultat "charges" et "revenu" "bilan avant imposition"
const containerResultatBalance = document.querySelector("#cont-result-equilibre");


const containerTotal = document.querySelector("cont-equilibre-total");
const containerText = document.querySelector("#cont-equilibre-text");

    //sous total "charge" et "revenu"
    const totalRevenu = document.querySelector("#equilibre-total-revenu");
    const totalCharge = document.querySelector("#equilibre-total-charge");

    //bilan avant imposition
    const equilibreTextStart = document.querySelector("#equilibre-text-start");
    const equilibreResultat = document.querySelector("#equilibre");
    const equilibreTextEnd = document.querySelector("#equilibre-text-end");


    /***** fieldset #charge-taxe *****/
    /*** end ****/




    /***** fieldset #fiscal *****/
    /*** start ****/


    //titre container fiscal
    const containerFiscaltitle = document.querySelector("#title-regime-fiscal");
    
    //element container input "number" et "range" cfe
    const containerInputCfe = document.querySelector("#impot-cfe-container-input");

    //Element container imput radio "choix regime imposition"
    const containerInputRadioFiscal = document.querySelector("#regime-fiscal-container-radio");
    const containerInputFiscal = document.querySelector("#regime-fiscal-container-input");

    //Input de type "radio" choix regime imposition
    const inputReel = document.querySelector("#impot-reel");
    const inputForfaitaire = document.querySelector("#impot-forfaitaire");


    //Input charges deductibles de type "Number"
    const inputNumberChargeDeductible = document.querySelector("#fiscal input[name='number-deductible']");

    //Input charges deductibles de type "Range"
    const inputRangeChargeDeductible = document.querySelector("#fiscal input[name='range-deductible']");


    //element contenant les resultats de imposition
    const containerResultatBilan = document.querySelector("#cont-result-bilan");

    
    const revenuImpotStart = document.querySelector("#revenu-text-start");
    const revenuImpot = document.querySelector("#revenu");
    const revenuImpotEnd = document.querySelector("#revenu-text-end");
    
    const montantImpotStart = document.querySelector("#impot-text-start");
    const montantImpot = document.querySelector("#impot");
    const montantImpotEnd = document.querySelector("#impot-text-end");


    const bilanTextStart = document.querySelector("#bilan-text-start");
    const bilanResultat = document.querySelector("#bilan");
    const bilanTextEnd = document.querySelector("#bilan-text-end");


    /***** fieldset #fiscal *****/
    /*** end ****/

    /****************************** Elements du formulaire #calculette*************************/
    /***************************************** end ************************************** */
