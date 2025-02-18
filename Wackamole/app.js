const squares = document.querySelectorAll('.square');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');
const hitSound = document.querySelector('#hit-sound');
const gameOverSound = document.querySelector('#game-over-sound');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole');
  });

  const randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');

  hitPosition = randomSquare.id;
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id === hitPosition) {
      result++;
      scoreDisplay.textContent = result;
      hitSound.play();
      hitPosition = null;
      if (result % 10 === 0) { // Increase speed every 10 points
        clearInterval(timerId);
        timerId = setInterval(randomSquare, 500 - (result * 10)); // Increase speed
      }
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

moveMole();

function countDown() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    gameOverSound.play();
    alert('GAME OVER! Your final score is ' + result);
  }
}

let countDownTimerId = setInterval(countDown, 1000);
