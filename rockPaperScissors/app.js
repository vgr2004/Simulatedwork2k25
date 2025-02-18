const choices = document.querySelectorAll('.choice');
const resultText = document.getElementById('result-text');
const playerScoreText = document.getElementById('player-score');
const computerScoreText = document.getElementById('computer-score');
const resetButton = document.getElementById('reset-button');

const choicesArray = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.id;
        const computerChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];
        const result = determineWinner(userChoice, computerChoice);
        updateScores(result);
        resultText.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
        playSound(result);
        changeBackground(result);
    });
});

resetButton.addEventListener('click', resetGame);

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a draw!";
    }
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return "You win!";
    } else {
        return "You lose!";
    }
}

function updateScores(result) {
    if (result === "You win!") {
        playerScore++;
    } else if (result === "You lose!") {
        computerScore++;
    }
    playerScoreText.textContent = `Player Score: ${playerScore}`;
    computerScoreText.textContent = `Computer Score: ${computerScore}`;
}

function playSound(result) {
    const winSound = new Audio('win-sound.mp3');
    const loseSound = new Audio('lose-sound.mp3');
    const drawSound = new Audio('draw-sound.mp3');

    if (result === "You win!") {
        winSound.play();
    } else if (result === "You lose!") {
        loseSound.play();
    } else {
        drawSound.play();
    }
}

function changeBackground(result) {
    if (result === "You win!") {
        document.body.style.backgroundColor = 'green';
    } else if (result === "You lose!") {
        document.body.style.backgroundColor = 'red';
    } else {
        document.body.style.backgroundColor = 'yellow';
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreText.textContent = 'Player Score: 0';
    computerScoreText.textContent = 'Computer Score: 0';
    resultText.textContent = '';
    document.body.style.backgroundColor = '#f0f0f0';
}
