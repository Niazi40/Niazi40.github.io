let randomNumber = Math.floor(Math.random() * 99) + 1;
let attempts = 0;
const maxAttempts = 7;
let wins = 0;
let losses = 0;

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const guessList = document.getElementById("guessList");
const winsText = document.getElementById("wins");
const lossesText = document.getElementById("losses");

guessBtn.addEventListener("click", makeGuess);
resetBtn.addEventListener("click", resetGame);

function makeGuess() {
  const guess = Number(guessInput.value);

  // Validation
  if (isNaN(guess) || guess < 1 || guess > 99) {
    message.textContent = "❌ Error: Please enter a number between 1 and 99.";
    message.style.color = "red";
    return;
  }

  attempts++;
  attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;

  const li = document.createElement("li");
  li.textContent = guess;
  guessList.appendChild(li);

  if (guess === randomNumber) {
    message.textContent = "🎉 Congratulations! You guessed the number!";
    message.style.color = "green";
    wins++;
    winsText.textContent = wins;
    endGame();
    return;
  } else if (guess < randomNumber) {
    message.textContent = "⬇️ Too low!";
    message.style.color = "blue";
  } else {
    message.textContent = "⬆️ Too high!";
    message.style.color = "blue";
  }

  if (attempts >= maxAttempts) {
    message.textContent = `❌ You Lost! The number was ${randomNumber}`;
    message.style.color = "red";
    losses++;
    lossesText.textContent = losses;
    endGame();
  }

  guessInput.value = "";
  guessInput.focus();
}

function endGame() {
  guessBtn.disabled = true;
  resetBtn.classList.remove("hidden");
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  attempts = 0;
  attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
  message.textContent = "";
  guessList.innerHTML = "";
  guessBtn.disabled = false;
  resetBtn.classList.add("hidden");
  guessInput.value = "";
  guessInput.focus();
}
