//reference du DOM

const hurryUp = document.querySelector(".hurry-up");
const inputQuestion = document.querySelector("#input-question");
const labelResponse = document.querySelector("#label-response");
const inputResponse = document.querySelector("#input-response");

const progressBarLabel = document.querySelector("#label-progress-bar span");
const progressBar = document.querySelector("#progress-bar");
const labelScore = document.querySelector("#label-score");
const inputScore = document.querySelector("#input-score");
const buttonStart = document.querySelector("#btn-start");
const buttonReStart = document.querySelector("#btn-restart");
const divRoundString = document.querySelector(".round-string");
const divRoundNumber = document.querySelector(".round-number");

const mainContainerRound = document.querySelector(".main-container-round");

let hidedWord = {
  //Liste de mots à trouver
  tabOfWords: [
    //animaux
    "chat",
    "éléphant",
    "grenouille",
    "cheval",

    //batiment
    "maison",
    "cabanne",
    "usine",
    "mairie",

    //science
    "astronomie",
    "physique",
    "électricité",

    //objet
    "momie",
    "tableau",
    "timbre",
    "passeport",
    "numéro",
    "écran",
    "imprimante",
    "ordinateur",
    "livre",
    "bouquin",

    //véhicule
    "bicyclette",
    "camion",
    "bateau",
    "voiture",
    "avion",
    "train",

    //sport
    "snowboard",
    "boxe",
    "badminton",
    "tennis",
    "basket",
    "golf",
    "équitation",

    //vetement
    "veste",
    "pantalon",
    "chemise",
    "soulier",
    "chandail",
    "brodequin",
    "gant",

    //aliments
    "légume",
    "tomate",
    "ail",
    "poivre",
    "cornichon",
    "salade",
    "banane",
    "haricot",
    "curry",

    //activite culturelle
    "concert",
    "musique",
    "lecture",
  ],
  tabOfWordUsed: [],
  tabScore: [],
  tabIndexUsed: [],
  tabMixWord: [],

  duree: 20,
  word: "",
  checkWord: false,
  randomNumber: null,
  check: false,
  timer: 0,
  score: 0,
  roundNumber: 1,
  roundEnd: false,
  hiScore: 0,
  listenerClickBtnStart: 0,
  listenerClickBtnReStart: 0,

  //initialisatin des variables pour lancer le jeux
  initGame: function () {
    /********** initialisation des tableaux*********** */

    hidedWord.tabOfWordUsed = [];
    hidedWord.tabScore = [];
    hidedWord.tabMixWord = [];

    /********** initialisation des variables*********** */

    hidedWord.word = "";
    hidedWord.checkWord = false;
    hidedWord.randomNumber = null;
    hidedWord.check = false;
    hidedWord.timer = null;
    hidedWord.score = 0;
    hidedWord.roundNumber = 1;
    hidedWord.roundEnd = false;
    hidedWord.listenerClickBtnStart = 0;
    hidedWord.listenerClickBtnReStart = 0;

    /******* initialisation des animations sur div hurryup   *********** */

    //Anim slide sur div hurry up
    if (hurryUp.classList.contains("animation-hurryup-1")) {
      hurryUp.classList.remove("animation-hurryup-1");
    }

    //Anime vibration sur div hurry up

    if (hurryUp.classList.contains("animation-hurryup-2")) {
      hurryUp.classList.remove("animation-hurryup-2");
    }
    /******* initialisation des inputs + boutons + display     *********** */

    //init input question
    inputQuestion.value = "";

    //init input response
    labelResponse.textContent = "Votre réponse";
    inputResponse.value = "";
    inputResponse.disabled = false;
    inputResponse.focus();

    //init input timer
    progressBarLabel.textContent = ` ${hidedWord.duree} s`;
    progressBar.setAttribute("max", parseInt(hidedWord.duree, 10));
    progressBar.value = parseInt(0, 10);

    //init input score
    inputScore.value = 0;
    labelScore.textContent = "Score";

    //Init boutton start
    hidedWord.enabledStartButton();

    /******************** reset style input response*********** */
    hidedWord.resetInputResponse();

    /******************* reset round result ***************/
    hidedWord.cleanRoundResult();
  },

  startANewRound: function () {
    hidedWord.listenerClickBtnStart++;
    hidedWord.initNewRound();
    hidedWord.disabledStartButton();
    hidedWord.roundNumber++;

    //recherche un mot aleatoir qui n'a pas ete deja sortie
    while (!hidedWord.checkWord) {
      hidedWord.chooseRandomWord();
      hidedWord.checkRandomWord();
    }
    //reset la variable pour relancer la recherche d'un mot aléatoir apres click sur "next round"
    hidedWord.checkWord = false;

    //mélange le mot
    hidedWord.wordMixed();

    //lance le timer
    hidedWord.timerOn();
  },

  //lance un nouveau round
  initNewRound: function () {
    /******* initialisation animation sur div hurryup     *********** */
    //Anim slide sur div hurry up
    if (hurryUp.classList.contains("animation-hurryup-1")) {
      hurryUp.classList.remove("animation-hurryup-1");
    }

    //Anime vibration sur div hurry up

    if (hurryUp.classList.contains("animation-hurryup-2")) {
      hurryUp.classList.remove("animation-hurryup-2");
    }
    /******* initialisation des inputs + boutons + display     *********** */
    //init input question
    inputQuestion.value = "";

    //init input response
    labelResponse.textContent = "Votre réponse";
    inputResponse.value = "";
    inputResponse.disabled = false;
    inputResponse.focus();

    //init input timer
    progressBarLabel.textContent = ` ${hidedWord.duree} s`;
    progressBar.value = parseInt(0, 10);

    /************** Initialisation des tableaux ****************/
    hidedWord.tabMixWord = [];
    hidedWord.tabIndexUsed = [];

    /********** initialisation des variables*********** */

    hidedWord.word = "";
    hidedWord.checkWord = false;
    hidedWord.randomNumber = null;
    hidedWord.check = false;
    hidedWord.timer = null;
    hidedWord.roundEnd = false;

    /*************** reset style input response ********************** */
    hidedWord.resetInputResponse();
  },

  chooseRandomWord: function () {
    let maxNumberWord = hidedWord.tabOfWords["length"];
    let randomNumber = Math.floor(Math.random() * maxNumberWord);
    let randomWord = hidedWord.tabOfWords[randomNumber];
    hidedWord.word = randomWord;
    console.log("mot aleatoir: " + hidedWord.word);
  },

  checkRandomWord: function () {
    //test si le randomword est deja sortie
    let test = hidedWord.tabOfWordUsed.includes(hidedWord.word);
    if (test) {
      hidedWord.checkWord = false;
      return false;
    }
    hidedWord.tabOfWordUsed.push(hidedWord.word);
    hidedWord.checkWord = true;
    return true;
  },

  giveRandomNumber: function () {
    let word = hidedWord.word;
    let splitWordTab = word.split("");
    let randomNumber = Math.floor(Math.random() * splitWordTab.length);
    hidedWord.randomNumber = randomNumber;
    console.log("nombre aleatoire: " + randomNumber);
  },

  checkRandomNumber: function () {
    console.log(
      "longeur tableau des indexes deja utilisés: " +
        hidedWord.tabIndexUsed.length
    );
    let indexFree = hidedWord.tabIndexUsed.includes(hidedWord.randomNumber);
    console.log("index free: " + indexFree);
    if (!indexFree) {
      hidedWord.tabIndexUsed.push(hidedWord.randomNumber);
      hidedWord.check = true;
      return true;
    }

    hidedWord.check = false;
    return false;
  },

  wordMixed: function () {
    let word = hidedWord.word;
    let splitWordTab = word.split("");
    let mixWordTab = [];
    console.log("tableau du mot splite: " + splitWordTab);
    console.log("longeur du tableau du mot splite " + splitWordTab.length);
    splitWordTab.forEach((element, index) => {
      while (!hidedWord.check) {
        hidedWord.giveRandomNumber();
        hidedWord.checkRandomNumber();
      }

      mixWordTab[hidedWord.randomNumber] = splitWordTab[index];
      console.log("tableau melangé: " + mixWordTab);
      //reset de la variable pour relancer la boucle while
      hidedWord.check = false;
    });

    //test si le mot melangé et le mot random sont identiques
    if (JSON.stringify(mixWordTab) === JSON.stringify(splitWordTab)) {
      //alors on range le tableau par ordre alphabetique (algorythm de secours)
      mixWordTab.sort();
    }
    inputQuestion.value = mixWordTab.join(" ");
  },

  checkInputTimerValue: function () {
    if (parseInt(progressBar.value, 10) >= parseInt(hidedWord.duree, 10)) {
      console.log("temps ecoulé");
      hidedWord.timerOff();
      hidedWord.roundEnd = true;
      labelResponse.textContent = "solution";
      inputResponse.value = hidedWord.word;
      inputResponse.disabled = true;
      hidedWord.tabScore[parseInt(hidedWord.roundNumber - 2, 10)] = "❌";
      hidedWord.calculeAndDisplayScore();
      hidedWord.enabledStartButton();
      if (inputResponse.classList.contains("normal-color")) {
        inputResponse.classList.replace("normal-color", "invalid-color");
      }
      hidedWord.testGameOver();
    }

    //Affiche le div hurryup
    if (parseInt(progressBar.value, 10) >= parseInt(hidedWord.duree, 10) - 5) {
      if (!hurryUp.classList.contains("animation-hurryup-1")) {
        hurryUp.classList.add("animation-hurryup-1");
      }
    }

    //Anime le div hurry up
    if (parseInt(progressBar.value, 10) >= parseInt(hidedWord.duree, 10) - 2) {
      if (!hurryUp.classList.contains("animation-hurryup-2")) {
        hurryUp.classList.add("animation-hurryup-2");
      }
    }
  },

  increment: function () {
    progressBar.value = parseInt(progressBar.value, 10) + 1;
    let timeRemaining = parseInt(hidedWord.duree, 10) - progressBar.value;

    console.log("timeremaning: " + timeRemaining);

    if (timeRemaining < 10) {
      progressBarLabel.textContent = " " + "0" + timeRemaining + " s";
    }
    if (timeRemaining >= 10) {
      progressBarLabel.textContent = " " + timeRemaining + " s";
    }

    console.log("timer value: " + progressBar.value);
    hidedWord.checkInputTimerValue();
  },

  timerOn: function () {
    hidedWord.timer = setInterval(hidedWord.increment, 1000);
    console.log("le timer numéro: " + hidedWord.timer + " est lancé.");
  },

  timerOff: function () {
    console.log("le timer numéro: " + hidedWord.timer + " est en cours");
    clearInterval(hidedWord.timer);
    console.log("le timer numéro: " + hidedWord.timer + " est annulé");
    hidedWord.timer = null;
  },

  checkInputResponseUser: function () {
    if (inputResponse.value == hidedWord.word) {
      hidedWord.timerOff();
      hidedWord.roundEnd = true;
      inputResponse.disabled = true;
      hidedWord.tabScore[parseInt(hidedWord.roundNumber - 2, 10)] = "👍";
      hidedWord.calculeAndDisplayScore();
      hidedWord.enabledStartButton();
      inputResponse.value = "« " + hidedWord.word + " »";
      if (inputResponse.classList.contains("normal-color")) {
        inputResponse.classList.replace("normal-color", "valid-color");
      }
      hidedWord.testGameOver();
    }
  },

  resetInputResponse: function () {
    if (inputResponse.classList.contains("valid-color")) {
      inputResponse.classList.replace("valid-color", "normal-color");
    }
    if (inputResponse.classList.contains("invalid-color")) {
      inputResponse.classList.replace("invalid-color", "normal-color");
    }
  },

  calculeAndDisplayScore: function () {
    hidedWord.score +=
      parseInt(hidedWord.duree, 10) - parseInt(progressBar.value, 10);
    console.log("SCORE:" + hidedWord.score);
    inputScore.value = parseInt(hidedWord.score, 10);

    console.log("tabscore: " + hidedWord.tabScore);
    //reset round result
    hidedWord.cleanRoundResult();

    this.tabScore.forEach((element, index) => {
      hidedWord.displayRoundResult(element, index);
    });
  },

  displayRoundResult: function (result, index) {
    //creation element conteneur-round
    const containerRound = document.createElement("div");
    containerRound.setAttribute(
      "class",
      "container-round flex-column-start-center"
    );

    //creation element round-number
    const roundNumber = document.createElement("div");
    roundNumber.setAttribute("class", "round-number");
    roundNumber.textContent = `Round ${index + 1}`;

    //creation element round-string
    const roundString = document.createElement("div");
    roundString.setAttribute("class", "round-string animation-result");
    roundString.textContent = result;

    //imbrication Dom
    containerRound.appendChild(roundNumber);
    containerRound.appendChild(roundString);
    mainContainerRound.appendChild(containerRound);
  },

  cleanRoundResult: function () {
    let roundResultList = document.querySelectorAll(".container-round");
    console.log("round resuslt list: " + roundResultList);
    if (roundResultList.length > 0) {
      roundResultList.forEach((element) => {
        element.remove();
      });
    }
  },

  disabledStartButton: function () {
    buttonStart.disabled = true;
    if (buttonStart.classList.contains("enabled")) {
      buttonStart.classList.replace("enabled", "disabled");
      buttonStart.textContent =
        "Round " + parseInt(hidedWord.roundNumber, 10) + " is running";
    }
  },

  enabledStartButton: function () {
    //Affiche bouton nouvelle partie
    if (buttonStart.classList.contains("hide")) {
      buttonStart.classList.replace("hide", "display");
      if (buttonReStart.classList.contains("display")) {
        buttonReStart.classList.replace("display", "hide");
      }
    }
    buttonStart.disabled = false;
    buttonStart.textContent = `Start round\n ${parseInt(
      hidedWord.roundNumber,
      10
    )}`;
    if (buttonStart.classList.contains("disabled")) {
      buttonStart.classList.replace("disabled", "enabled");
    }
  },

  switchButton: function () {
    //Affiche bouton restart
    if (buttonStart.classList.contains("display")) {
      buttonStart.classList.replace("display", "hide");
      if (buttonReStart.classList.contains("hide")) {
        buttonReStart.classList.replace("hide", "display");
      }

      return;
    }

    //Affiche bouton nouvelle partie
    if (buttonStart.classList.contains("hide")) {
      buttonStart.classList.replace("hide", "display");
      if (buttonReStart.classList.contains("display")) {
        buttonReStart.classList.replace("display", "hide");
      }
      hidedWord.enabledStartButton();
      return;
    }
  },

  testGameOver: function () {
    if (parseInt(hidedWord.roundNumber, 10) > 5 && hidedWord.roundEnd) {
      //init
      hidedWord.roundNumber = 1;

      //permutte les bouttons (affiche le bouton nouvelle partie)
      hidedWord.switchButton();

      //affiche le score final
      labelScore.textContent = "Score final";
    }
  },
};

/********************* *************** *************************************
/********************* script principal *************************************
 * ************************************************************************* */

//init du jeux
hidedWord.initGame();

//initialisation des écouteurs

//lance un nouveau round
buttonStart.addEventListener("click", () => {
  hidedWord.startANewRound();
});

//evalue la reponse du joueur
inputResponse.addEventListener("input", () => {
  hidedWord.checkInputResponseUser();
});

//relance le jeux
buttonReStart.addEventListener("click", () => {
  hidedWord.initGame();
});
