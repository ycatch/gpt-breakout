// JS BreakeOut Game by ChatGPT and Me
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const paddleWidth = 100, paddleHeight = 10, ballSize = 10;
let paddleX = (canvas.width - paddleWidth) / 2, ballX = canvas.width / 2, ballY = canvas.height / 2, ballVelX = 5, ballVelY = -5;
let gamePaused = true;

canvas.addEventListener('mousemove', (e) => {
  const relativeX = e.clientX - canvas.getBoundingClientRect().left;
  if (relativeX - paddleWidth / 2 > 0 && relativeX + paddleWidth / 2 < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
});

canvas.addEventListener('click', () => {
  if (gamePaused) {
    resetGame();
    gamePaused = false;
    gameLoop();
  }
});

function displayGameOver() {
  ctx.fillStyle = 'white';
  ctx.font = '48px sans-serif';
  ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
}

function resetGame() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballVelX = 5;
  ballVelY = -5;
}

function gameLoop() {
  if (gamePaused) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddle and ball
  ctx.fillStyle = 'white';
  ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);

  // Update ball position and handle collisions
  ballX += ballVelX;
  ballY += ballVelY;

  if (ballX <= 0 || ballX + ballSize / 2 >= canvas.width) ballVelX = -ballVelX;
  if (ballY <= ballSize / 2) {
    ballVelY = -ballVelY;
  } else if (ballY + ballSize / 2 >= canvas.height - paddleHeight - 1 && ballX >= paddleX - ballSize / 2 && ballX <= paddleX + paddleWidth + ballSize / 2) {
    ballVelY = -ballVelY;
  } else if (ballY + ballSize / 2 >= canvas.height) {
    displayGameOver();
    gamePaused = true;
    return;
  }

  requestAnimationFrame(gameLoop);
}
