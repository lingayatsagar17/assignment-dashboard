const questions = [
  "What is Git?",
  "What is GitHub?",
  "What is a repository?",
  "What is version control?",
  "What is a commit?",
  "What is a branch?",
  "What is merge?",
  "What is pull request?",
  "What is clone?",
  "What is fork?"
];

let current = 0;
let timeLeft = 120;
let timerInterval;

const questionEl = document.querySelector(".question");
const progress = document.querySelector("input[type=range]");
const timerEl = document.getElementById("timer");
const titleEl = document.getElementById("q-title");
const nextBtn = document.querySelector(".next-btn");
const answerEl = document.getElementById("answer");

// LOAD QUESTION
function loadQuestion() {
  questionEl.textContent = questions[current];
  titleEl.textContent = `Question ${current + 1} of 10`;

  const percent = ((current + 1) / questions.length) * 100;
  progress.value = current + 1;
  progress.style.background = `linear-gradient(
    to right,
    #667eea 0%,
    #667eea ${percent}%,
    #e0e0e0 ${percent}%,
    #e0e0e0 100%
  )`;

  answerEl.value = "";
  answerEl.focus();   // ⭐ important

  resetTimer();
}


// TIMER
function startTimer() {
  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerEl.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
      return; // IMPORTANT
    }

    timeLeft--;
  }, 1000);
}


function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 120;
  startTimer();
}

// NEXT QUESTION
function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    loadQuestion();
  } else {
    clearInterval(timerInterval);
    alert("Quiz completed 🎉");
  }
}

// BUTTON
nextBtn.addEventListener("click", nextQuestion);

// INITIAL LOAD
loadQuestion();
