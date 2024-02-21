const quizData = [
    {
        "question": "What is the SI unit of force?",
        "options": ["Newton", "Joule", "Watt", "Volt"],
        "correctOption": "Newton"
    },
    {
        "question": "Which of the following is a vector quantity?",
        "options": ["Mass", "Speed", "Distance", "Displacement"],
        "correctOption": "Displacement"
    },
    {
        "question": "What is the SI unit of electric current?",
        "options": ["Ampere", "Ohm", "Coulomb", "Volt"],
        "correctOption": "Ampere"
    },
    {
        "question": "Which of the following is a scalar quantity?",
        "options": ["Force", "Velocity", "Temperature", "Acceleration"],
        "correctOption": "Temperature"
    },
    {
        "question": "What is the SI unit of luminous intensity?",
        "options": ["Lumen", "Candela", "Lux", "Watt"],
        "correctOption": "Candela"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const statusElement = document.getElementById('status');

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;

    optionsContainer.innerHTML = "";
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(answer) {
    const currentQuizData = quizData[currentQuestion];
    if (answer === currentQuizData.correctOption) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showStatus();
    }
}

function showStatus() {
    questionElement.innerText = "Quiz Completed!";
    optionsContainer.innerHTML = "";
    statusElement.innerText = `Your Score: ${score} / ${quizData.length}`;
}

function loadNextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function reloadQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    statusElement.innerText = "";
}

// Event listeners
document.getElementById('next-btn').addEventListener('click', loadNextQuestion);
document.getElementById('reload-btn').addEventListener('click', reloadQuiz);

// Initial load
loadQuestion();
