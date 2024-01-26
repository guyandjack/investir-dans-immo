let inputQuestion = document.querySelector("#input-question");
let inputTimer = document.querySelector("#input-timer");
let inputResponse = document.querySelector("#input-response");
let inputScore = document.querySelector("#input-score");
let buttonStart = document.querySelector("#btn-start");
let containerRound = document.querySelector(".round");

let hidedWord = {
  tabOfWords: [
    "chat",
    "maison",
    "astronomie",
    "momie",
    "tableau",
    "timbre",
    "passeport",
    "numéro",
    "écran",
    "bicyclette",
    "camion",
  ],
  objetScore: {
    round1: 0,
    round2: 0,
    round3: 0,
    round4: 0,
    round5: 0,
    round6: 0,
    round7: 0,
    round8: 0,
    round9: 0,
    round10: 0,
  },
  duree: 20,
  word: "",
  counter: null,
  score: 0,
  roundNumber: 0,

  initInput: () => {
    inputTimer.setAttribute("max", parseInt(hidedWord.duree, 10));
    inputTimer.value = parseInt(0, 10);
    inputResponse.value = "";
    clearInterval(hidedWord.counter);
    hidedWord.counter = null;
    inputResponse.autofocus = true;
    inputResponse.disabled = false;
  },

  chooseRandomWord: () => {
    let maxNumberWord = hidedWord.tabOfWords["length"];
    let randomNumber = Math.floor(Math.random() * maxNumberWord);
    let randomWord = hidedWord.tabOfWords[randomNumber];
    hidedWord.word = randomWord;
    console.log("mot aleatoir: " + hidedWord.word);
  },

  increment: () => {
    inputTimer.value++;
    console.log("timer value: " + inputTimer.value);
    hidedWord.checkInputTimerValue();
  },

  timer: () => {
    hidedWord.counter = setInterval(hidedWord.increment, 1000);
    console.log("valeur de counter: " + hidedWord.counter);
  },

  checkInputTimerValue: () => {
    if (parseInt(inputTimer.value, 10) >= parseInt(hidedWord.duree, 10)) {
      console.log("temps ecoulé");
      inputResponse.value = hidedWord.word;
      inputResponse.disabled = true;
      clearInterval(hidedWord.counter);
      hidedWord.counter = null;
      containerRound.innerHTML += " ❌";
    }
  },

  checkInputResponseUser: () => {
    inputResponse.addEventListener("input", (e) => {
      if (e.target.value === hidedWord.word) {
        clearInterval(hidedWord.counter);
        hidedWord.counter = null;
        e.target.disabled = true;
        containerRound.innerHTML += " 👍";
        hidedWord.calculeAndDisplayScore();
      }
    });
  },
  calculeAndDisplayScore: () => {
    hidedWord.score += parseInt(hidedWord.duree - inputTimer.value);
    inputScore.value = hidedWord.score;
  },
  gameOver: () => {
    if (hidedWord.roundNumber == 10) {
      inputResponse.disabled = true;
      buttonStart.disabled = true;
      if (buttonReStart.classList.contains("hide")) {
        buttonReStart.classList.replace("hide", "display");
      }
    }
  },

  startGame: () => {
    buttonStart.addEventListener("click", () => {
      hidedWord.initInput();
      hidedWord.chooseRandomWord();
      hidedWord.timer();
      hidedWord.checkInputResponseUser();
    });
  },
};

hidedWord.startGame();
