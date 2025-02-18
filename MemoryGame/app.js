document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
      { name: 'fries', img: 'images/fries.png' },
      { name: 'cheeseburger', img: 'images/cheeseburger.png' },
      { name: 'ice-cream', img: 'images/ice-cream.png' },
      { name: 'pizza', img: 'images/pizza.png' },
      { name: 'milkshake', img: 'images/milkshake.png' },
      { name: 'hotdog', img: 'images/hotdog.png' },
      { name: 'fries', img: 'images/fries.png' },
      { name: 'cheeseburger', img: 'images/cheeseburger.png' },
      { name: 'ice-cream', img: 'images/ice-cream.png' },
      { name: 'pizza', img: 'images/pizza.png' },
      { name: 'milkshake', img: 'images/milkshake.png' },
      { name: 'hotdog', img: 'images/hotdog.png' }
  ];
  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const scoreDisplay = document.querySelector('#score');
  const timerDisplay = document.querySelector('#timer');
  const resetButton = document.querySelector('#reset-button');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let score = 0;
  let timer;
  let startTime;

  function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
          const card = document.createElement('img');
          card.setAttribute('src', 'images/blank.png');
          card.setAttribute('data-id', i);
          card.addEventListener('click', flipCard);
          grid.appendChild(card);
      }
  }

  function checkForMatch() {
      const cards = document.querySelectorAll('img');
      const optionOneId = cardsChosenId[0];
      const optionTwoId = cardsChosenId[1];

      if (optionOneId == optionTwoId) {
          cards[optionOneId].setAttribute('src', 'images/blank.png');
          cards[optionTwoId].setAttribute('src', 'images/blank.png');
          alert('You have clicked the same image!');
      } else if (cardsChosen[0] === cardsChosen[1]) {
          alert('You found a match');
          cards[optionOneId].setAttribute('src', 'images/white.png');
          cards[optionTwoId].setAttribute('src', 'images/white.png');
          cards[optionOneId].removeEventListener('click', flipCard);
          cards[optionTwoId].removeEventListener('click', flipCard);
          cardsWon.push(cardsChosen);
          score += 10; // Increment score
          playSound('match');
      } else {
          cards[optionOneId].setAttribute('src', 'images/blank.png');
          cards[optionTwoId].setAttribute('src', 'images/blank.png');
          alert('Sorry, try again');
          playSound('nomatch');
      }
      cardsChosen = [];
      cardsChosenId = [];
      scoreDisplay.textContent = `Score: ${score}`;
      resultDisplay.textContent = `Matches found: ${cardsWon.length}`;
      if (cardsWon.length === cardArray.length / 2) {
          clearInterval(timer);
          resultDisplay.textContent = `Congratulations! You found them all in ${timerDisplay.textContent} seconds!`;
          playSound('win');
      }
  }

  function flipCard() {
      let cardId = this.getAttribute('data-id');
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      if (cardsChosen.length === 2) {
          setTimeout(checkForMatch, 500);
      }
  }

  function startTimer() {
      startTime = new Date().getTime();
      timer = setInterval(() => {
          const currentTime = new Date().getTime();
          const elapsedTime = Math.floor((currentTime - startTime) / 1000);
          timerDisplay.textContent = elapsedTime;
      }, 1000);
  }

  function playSound(type) {
      const matchSound = new Audio('sounds/match.mp3');
      const noMatchSound = new Audio('sounds/nomatch.mp3');
      const winSound = new Audio('sounds/win.mp3');
      if (type === 'match') matchSound.play();
      if (type === 'nomatch') noMatchSound.play();
      if (type === 'win') winSound.play();
  }

  function resetGame() {
      cardsChosen = [];
      cardsChosenId = [];
      cardsWon = [];
      score = 0;
      clearInterval(timer);
      timerDisplay.textContent = '0';
      scoreDisplay.textContent = 'Score: 0';
      resultDisplay.textContent = '';
      grid.innerHTML = '';
      createBoard();
      startTimer();
  }

  resetButton.addEventListener('click', resetGame);

  createBoard();
  startTimer();
});
