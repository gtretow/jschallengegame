const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    hitPosition: 0,
    result: 0,
    curretTime: 60,
    gameVelocity: 1000,
    currentTime: 60,
    lastPosition: null,
  },
  actions: {
    timerId: setInterval(randomSquare, 450),
    countdownTimerId: setInterval(countdown, 1000),
  },
};

function countdown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countdownTimerId);
    alert("GAME OVER! Seu resultado foi:" + state.values.result);
  }
}
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });
  
  let newNumber;

  do {
    newNumber = Math.floor(Math.random() * 9);
  } while (newNumber === state.values.lastPosition);

  state.values.lastPosition = newNumber;

  let randomNumber = newNumber;
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}


function init() {
  addListenerHitBox();
}

init();
