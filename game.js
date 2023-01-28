function getComputerChoice() {
  let randomNo = Math.ceil(Math.random() * 3);
  let choice;
  if (randomNo === 1) {
    choice = "rock";
  }
  if (randomNo === 2) {
    choice = "scissor";
  }
  if (randomNo === 3) {
    choice = "paper";
  }
  return choice;
}

let round = 0;
function gameRound() {
  if (round <= 5) {
    let userChoices = document.querySelectorAll(".user-choices");
    userChoices.forEach((userChoice) => {
      userChoice.addEventListener("click", function () {
        round++;
        document.getElementById("round-no").textContent = round;
        document.getElementById("round-no-result").textContent = round;

        userPicked = userChoice.getAttribute("value");
        settleScoreAndShowResult(userPicked);

        if (round === 5) {
          setTimeout(displayEndGameModal, 500);
        }
      });
    });
  }
}

function displayEndGameModal() {
  let playAgainDiv = document.getElementById("display-end-game");
  playAgainDiv.classList.remove("d-none");
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
}

let choiceCompareResult = {
  msg: "",
  choice1Count: 0,
  choice2Count: 0,
};

function choiceComparison(choice1, choice2) {
  if (
    (choice1 === "rock" && choice2 === "rock") ||
    (choice1 === "scissor" && choice2 === "scissor") ||
    (choice1 === "paper" && choice2 === "paper")
  ) {
    choiceCompareResult.msg = "What a surprise... It's a draw!";
  } else if (choice1 === "rock" && choice2 === "scissor") {
    choiceCompareResult.msg = `You Win! ${choice1} beats ${choice2}!`;
    choiceCompareResult.choice1Count++;
  } else if (choice1 === "rock" && choice2 === "paper") {
    choiceCompareResult.msg = `You Lose! ${choice2} beats ${choice1}!`;
    choiceCompareResult.choice2Count++;
  } else if (choice1 === "paper" && choice2 === "scissor") {
    choiceCompareResult.msg = `You Lose! ${choice2} beats ${choice1}!`;
    choiceCompareResult.choice2Count++;
  } else if (choice1 === "paper" && choice2 === "rock") {
    choiceCompareResult.msg = `You Win! ${choice1} beats ${choice2}!`;
    choiceCompareResult.choice1Count++;
  } else if (choice1 === "scissor" && choice2 === "paper") {
    choiceCompareResult.msg = `You Win! ${choice1} beats ${choice2}!`;
    choiceCompareResult.choice1Count++;
  } else if (choice1 === "scissor" && choice2 === "rock") {
    choiceCompareResult.msg = `You Lose! ${choice2} beats ${choice1}!`;
    choiceCompareResult.choice2Count++;
  }
  return choiceCompareResult;
}

function countComparison(userTotal, pcTotal) {
  let result;
  if (userTotal > pcTotal) {
    result = "User";
  } else if (pcTotal > userTotal) {
    result = "Computer";
  } else {
    result = "Both players have same total score!";
  }
  return result;
}

function settleScoreAndShowResult(userPicked) {
  let pcPicked = getComputerChoice();
  let roundResult = choiceComparison(userPicked, pcPicked);

  displayChoices(userPicked, pcPicked);

  let gameResult = countComparison(
    roundResult.choice1Count,
    roundResult.choice2Count
  );

  document.getElementById("result-container").classList.remove("d-none");
  document.getElementById("user-score").textContent = roundResult.choice1Count;
  document.getElementById("pc-score").textContent = roundResult.choice2Count;

  document.getElementById("round-winner").textContent = roundResult.msg;
  document.getElementById("round-result").textContent = gameResult;
  document.getElementById("game-winner").textContent = gameResult;

  return gameResult;
}

function displayChoices(userPicked, pcPicked) {
  let userChoiceDiv = document.getElementById("user-choice-icon");
  let userSelectedIcon = document.getElementById("user-" + userPicked);
  userChoiceDiv.innerHTML = userSelectedIcon.innerHTML;

  let pcSelectDiv = document.getElementById("pc-choice-icon");
  let placePcSelection = document.getElementById("pc-" + pcPicked);
  pcSelectDiv.innerHTML = placePcSelection.innerHTML;
}

let playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", function () {
  //change div content to player selection div
  let gameIntro = document.getElementsByClassName("game-intro-container")[0];
  let userChoice = document.getElementsByClassName("selection-container")[0];
  gameIntro.innerHTML = userChoice.innerHTML;

  document.getElementsByTagName("body")[0].style.backgroundColor =
    "var(--dark-pink)";

  gameRound();
});

let playAgainBtn = document.getElementById("play-again-btn");
playAgainBtn.addEventListener("click", function () {
  window.location.reload();
});
