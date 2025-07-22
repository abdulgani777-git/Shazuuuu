const gameArea = document.getElementById('game-area');
const scoreBoard = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart');

let score = 0;
let lives = 3;
let gameRunning = true;
let speed = 2500; // in ms (decreases to make game faster)

function getRandomPosition() {
  const x = Math.floor(Math.random() * (window.innerWidth - 60));
  return x;
}

function createBalloon() {
  if (!gameRunning) return;

  const balloon = document.createElement('img');
  balloon.src = 'balloon.png';
  balloon.classList.add('balloon');
  balloon.style.left = `${getRandomPosition()}px`;
  balloon.style.top = '-100px';
  gameArea.appendChild(balloon);

  let fallInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(fallInterval);
      return;
    }

    const currentTop = parseInt(balloon.style.top);
    if (currentTop > window.innerHeight) {
      balloon.remove();
      clearInterval(fallInterval);
    } else {
      balloon.style.top = `${currentTop + 5}px`;
    }
  }, 20);

  balloon.onclick = () => {
    if (!gameRunning) return;

    score++;
    updateScore();
    balloon.remove();
    clearInterval(fallInterval);

    if (score >= 10) {
      endGame(true);
    } else if (score % 3 === 0) {
      speed -= 200; // increase difficulty
    }
  };

  setTimeout(createBalloon, speed);
}

function createDustbin() {
  if (!gameRunning) return;

  const dustbin = document.createElement('img');
  dustbin.src = 'dustbin.png';
  dustbin.classList.add('dustbin');
  dustbin.style.left = `${getRandomPosition()}px`;
  dustbin.style.top = '-100px';
  gameArea.appendChild(dustbin);

  let fallInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(fallInterval);
      return;
    }

    const currentTop = parseInt(dustbin.style.top);
    if (currentTop > window.innerHeight) {
      dustbin.remove();
      clearInterval(fallInterval);
    } else {
      dustbin.style.top = `${currentTop + 6}px`;
    }
  }, 20);

  dustbin.onclick = () => {
    lives--;
    dustbin.remove();
    clearInterval(fallInterval);

    if (lives <= 0) {
      endGame(false);
    }
  };

  setTimeout(createDustbin, speed + 1000);
}

function updateScore() {
  scoreBoard.innerText = score;
}

function endGame(won) {
  gameRunning = false;
  gameOverScreen.style.display = 'block';
  finalScore.innerText = score;
  const message = won ? 'You Win! 🎉' : 'Game Over! ❌';
  gameOverScreen.querySelector('h2').innerText = message;
}

restartBtn.onclick = () => {
  location.reload();
};

// Start game
createBalloon();
createDustbin();