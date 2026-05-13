// This game helps students practice finding the Least Common Multiple.

let firstNumber = 0;
let secondNumber = 0;
let score = 0;
let questionCounter = 1;

// HTML elements
const firstNumberElement = document.getElementById("firstNumber");
const secondNumberElement = document.getElementById("secondNumber");
const answerInput = document.getElementById("answerInput");
const feedbackMessage = document.getElementById("feedbackMessage");
const scoreElement = document.getElementById("score");
const questionCounterElement = document.getElementById("questionCounter");
const hintSection = document.getElementById("hintSection");
const hintText = document.getElementById("hintText");

const checkButton = document.getElementById("checkButton");
const hintButton = document.getElementById("hintButton");
const nextButton = document.getElementById("nextButton");

// Generate a random number between a minimum and maximum value.
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Find the Greatest Common Divisor using the Euclidean algorithm.
function findGCD(a, b) {
  while (b !== 0) {
    const temporaryValue = b;
    b = a % b;
    a = temporaryValue;
  }

  return a;
}

// Find the Least Common Multiple using the GCD.
function findLCM(a, b) {
  return (a * b) / findGCD(a, b);
}

// Generate a new LCM challenge.
function generateNewChallenge() {
  firstNumber = getRandomNumber(2, 12);
  secondNumber = getRandomNumber(2, 12);

  firstNumberElement.textContent = firstNumber;
  secondNumberElement.textContent = secondNumber;

  answerInput.value = "";
  feedbackMessage.textContent = "Write your answer and click Check Answer.";
  hintSection.style.display = "none";

  questionCounterElement.textContent = questionCounter;
}

// Check the student's answer.
function checkAnswer() {
  const studentAnswer = Number(answerInput.value);
  const correctAnswer = findLCM(firstNumber, secondNumber);

  if (!studentAnswer) {
    feedbackMessage.textContent = "Please type an answer before checking.";
    return;
  }

  if (studentAnswer === correctAnswer) {
    score += 10;
    scoreElement.textContent = score;
    feedbackMessage.textContent = "Excellent! That is the correct LCM.";
  } else {
    feedbackMessage.textContent = `Try again. The LCM is not ${studentAnswer}.`;
  }
}

// Show a helpful hint using multiples.
function showHint() {
  const multiplesOfFirstNumber = [];
  const multiplesOfSecondNumber = [];

  for (let i = 1; i <= 10; i++) {
    multiplesOfFirstNumber.push(firstNumber * i);
    multiplesOfSecondNumber.push(secondNumber * i);
  }

  hintText.innerHTML = `
    Multiples of ${firstNumber}: ${multiplesOfFirstNumber.join(", ")}<br>
    Multiples of ${secondNumber}: ${multiplesOfSecondNumber.join(", ")}<br><br>
    Look for the first number that appears in both lists.
  `;

  hintSection.style.display = "block";
}

// Move to the next challenge.
function goToNextChallenge() {
  questionCounter++;
  generateNewChallenge();
}

// Button events
checkButton.addEventListener("click", checkAnswer);
hintButton.addEventListener("click", showHint);
nextButton.addEventListener("click", goToNextChallenge);

// Start the game
generateNewChallenge();
