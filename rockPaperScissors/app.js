const choices = document.querySelectorAll('.choice');
const resultText = document.getElementById('result-text');

const choicesArray = ['rock', 'paper', 'scissors'];

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.id;
        const computerChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];
        const result = determineWinner(userChoice, computerChoice);
        resultText.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
    });
});

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
