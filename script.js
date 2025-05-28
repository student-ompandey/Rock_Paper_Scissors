let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const winSound = document.querySelector("#win-sound");
const loseSound = document.querySelector("#lose-sound");
const drawSound = document.querySelector("#draw-sound");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randomIdx = Math.floor(Math.random() * 3);
  return options[randomIdx];
};

const drawGame = () => {
  msg.innerText = "Game was draw. Play again";
  msg.style.backgroundColor = "#081b31";
  drawSound.play();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    winSound.play();
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lose. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    loseSound.play();
  }

  checkMatchWinner();
};

const checkMatchWinner = () => {
  if (userScore === 5 || compScore === 5) {
    msg.innerText = userScore === 5 ? "🎉 You won the match!" : "😞 Computer won the match.";
    disableChoices();
  }
};

const disableChoices = () => {
  choices.forEach((choice) =>
    choice.removeEventListener("click", handleChoice)
  );
};

const handleChoice = (event) => {
  const userChoice = event.currentTarget.id;
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", handleChoice);
});

document.querySelector("#reset-btn").addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = "0";
  compScorePara.innerText = "0";
  msg.innerText = "Play your game";
  msg.style.backgroundColor = "#081b31";
  choices.forEach((choice) =>
    choice.addEventListener("click", handleChoice)
  );
});

document.querySelector("#theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

