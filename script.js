const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Javascript is powerful tool for web developers.",
    "Learning to code opens many career opportunities.",
    "Typing practice improves speed and accuracy",
    "Stay focused and consistent to become a better code.",
    "Front-end development includes HTML, CSS, and Javascript",
    "Debugging is an essential skill for every programmer",
    "You can build anything you imagine with enough practice",
    "Always test your code before deploying it.",
    "Never give up, even when things get tough",
];

// Get element from HTML

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const resultEl = document.getElementById("result");
const countdownEl = document.getElementById("countdown");
const ding = document.getElementById("ding")

let currentSentence = "";
let startTime = null;
let timerActive = false;

// Start or reset test

function startTest() {
    inputEl.disabled = true;
    resultEl.textContent = "";
    countdownEl.textContent = "";
    inputEl.value = "";
    timerActive = false;

// pick random sentences

    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceEl.textContent = currentSentence;

// show countdown before starting
    let countdown = 3;
    countdownEl.textContent = `Starting in ${countdown}..`;
    const countdownTimer = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownEl.textContent = `starting in ${countdown}..`;
        } else {
            clearInterval(countdownTimer);
            countdownEl.textContent = "Go!"
            inputEl.disabled = false;
            inputEl.focus();
            startTime = new Date().getTime();
            timerActive= true;
        }
    }, 1000);
}

// watch user input
inputEl.addEventListener("input", function () {
    const typedText = this.value;
    if (!timerActive || typedText.length > currentSentence.length) return;

// when typing is done
    if (typedText === currentSentence) {
        const endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000;
        const wordCount = currentSentence.split(" ").length;
        const wpm = Math.round((wordCount / timeTaken) * 60);

// count correct characters
        let correctChars = 0;
        for (let i = 0; i < typedText.length; i++) {
            if (typedText[i] === currentSentence[i]) {
                correctChars++;
            }
        }

// use Math.round to not showing much decimals
        const accuracy = Math.round((correctChars / currentSentence.length) * 100);

// show result 
        resultEl.textContent =
        `Time: ${timeTaken.toFixed(2)}s | WPM: ${wpm} | Accuracy: ${accuracy}%`;

        timerActive = false;
        ding.play();
    }
});

startTest();