const questions = [
  { q: "What is the capital of India?", options: ["Delhi", "Mumbai", "Chennai", "Kolkata"], answer: 0 },
  { q: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Markup Language", "None"], answer: 0 },
  { q: "CSS is used for?", options: ["Styling", "Programming", "Database", "Networking"], answer: 0 },
  { q: "Which planet is known as Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
  { q: "Largest ocean in the world?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
  { q: "Who wrote Ramayana?", options: ["Valmiki", "Vyasa", "Kalidasa", "Tulsidas"], answer: 0 },
  { q: "Fastest land animal?", options: ["Tiger", "Cheetah", "Horse", "Lion"], answer: 1 },
  { q: "Which gas do plants release?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: 0 },
  { q: "First Prime Minister of India?", options: ["Nehru", "Gandhi", "Patel", "Ambedkar"], answer: 0 },
  { q: "Which is smallest continent?", options: ["Asia", "Australia", "Europe", "Africa"], answer: 1 },
  { q: "JavaScript is a ___ language?", options: ["Programming", "Styling", "Markup", "Database"], answer: 0 },
  { q: "Which festival is known as Festival of Lights?", options: ["Holi", "Diwali", "Pongal", "Eid"], answer: 1 },
  { q: "Which is the national bird of India?", options: ["Peacock", "Parrot", "Crow", "Sparrow"], answer: 0 },
  { q: "Which is the largest desert?", options: ["Sahara", "Thar", "Gobi", "Kalahari"], answer: 0 },
  { q: "Which is the currency of Japan?", options: ["Yen", "Dollar", "Rupee", "Euro"], answer: 0 }
];

let current = 0, score = 0, time = 120;
let userAnswers = new Array(questions.length).fill(null);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

function loadQuestion() {
  questionEl.textContent = `Question ${current + 1}: ${questions[current].q}`;
  optionsEl.innerHTML = "";
  questions[current].options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    // highlight logic
    if (userAnswers[current] !== null) {
      if (i === questions[current].answer) {
        btn.style.background = "lightgreen"; // correct answer always green
      }
      if (userAnswers[current] === i && i !== questions[current].answer) {
        btn.style.background = "lightcoral"; // wrong selected red
      }
    }

    btn.onclick = () => {
      userAnswers[current] = i;
      loadQuestion(); // reload to show highlights
    };
    optionsEl.appendChild(btn);
  });
}

document.getElementById("nextBtn").onclick = () => {
  if (current < questions.length - 1) {
    current++;
    loadQuestion();
  } else {
    endQuiz();
  }
};

document.getElementById("prevBtn").onclick = () => {
  if (current > 0) {
    current--;
    loadQuestion();
  }
};

function endQuiz() {
  score = userAnswers.reduce((acc, ans, idx) => {
    if (ans === questions[idx].answer) acc++;
    return acc;
  }, 0);
  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  resultEl.textContent = `Final Score: ${score}/${questions.length}`;
  timerEl.textContent = "";
}

function startTimer() {
  const interval = setInterval(() => {
    time--;
    timerEl.textContent = `Time: ${time}s`;
    if (time <= 0) {
      clearInterval(interval);
      endQuiz();
    }
  }, 1000);
}

loadQuestion();
startTimer();
