const quizData = [
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "How old is the universe estimated to be?",
    choices: [
      "4.5 billion years",
      "13.8 billion years",
      "10 million years",
      "100 billion years",
    ],
    answer: "13.8 billion years",
  },
  {
    question: "Which galaxy is Earth located in?",
    choices: ["Andromeda", "Whirlpool", "Milky Way", "Sombrero"],
    answer: "Milky Way",
  },
  {
    question: "What is the closest star to Earth?",
    choices: ["Alpha Centauri", "Sirius", "Proxima Centauri", "Betelgeuse"],
    answer: "Proxima Centauri",
  },
  {
    question:
      "What is the name of the theory that describes the origin of the universe?",
    choices: [
      "Theory of Relativity",
      "Quantum Theory",
      "Big Bang Theory",
      "String Theory",
    ],
    answer: "Big Bang Theory",
  },
  {
    question: "Which planet has the most moons?",
    choices: ["Saturn", "Jupiter", "Mars", "Neptune"],
    answer: "Saturn",
  },
  {
    question: "What is the most abundant element in the universe?",
    choices: ["Oxygen", "Helium", "Carbon", "Hydrogen"],
    answer: "Hydrogen",
  },
  {
    question: "Which is the hottest planet in our solar system?",
    choices: ["Mercury", "Venus", "Earth", "Mars"],
    answer: "Venus",
  },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  let currentQuestionData = quizData[currentQuestion];
  document.getElementById("question").textContent =
    currentQuestion + 1 + ". " + currentQuestionData.question;

  let choices = document.querySelectorAll(".choice");

  choices.forEach((choice, index) => {
    choice.textContent = currentQuestionData.choices[index];
    choice.style.background = ""; // Reset background
    choice.disabled = false; // Re-enable choices
  });

  document.getElementById("next-button").style.display = "none";
}

function selectAnswer(index) {
  let currentQuestionData = quizData[currentQuestion];
  let choices = document.querySelectorAll(".choice");

  // Get the selected choice text
  let selectedAnswer = choices[index].textContent;

  if (selectedAnswer === currentQuestionData.answer) {
    score++;
    choices[index].style.background = "green"; // Correct answer
  } else {
    choices[index].style.background = "red"; // Wrong answer
    // Highlight the correct answer
    choices.forEach((choice, idx) => {
      if (choice.textContent === currentQuestionData.answer) {
        choice.style.background = "green";
      }
    });
  }

  // Disable all choices after selection
  choices.forEach((choice) => {
    choice.disabled = true;
  });

  document.getElementById("next-button").style.display = "block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("question").textContent = "Quiz completed!";
    document.getElementById("score").textContent =
      "Your score: " + score + "/" + quizData.length;
    document.getElementById("next-button").style.display = "none";
  }
}

window.onload = loadQuestion;
