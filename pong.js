// JS BreakeOut Game by ChatGPT and Me
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const paddleHeight = 100, paddleWidth = 10, ballSize = 10;
let paddleY = (canvas.height - paddleHeight) / 2, ballX = canvas.width / 2, ballY = canvas.height / 2, ballVelX = -5, ballVelY = 5;
let gamePaused = true;

canvas.addEventListener('mousemove', (e) => {
  const relativeY = e.clientY - canvas.getBoundingClientRect().top;
  if (relativeY - paddleHeight / 2 > 0 && relativeY + paddleHeight / 2 < canvas.height) {
    paddleY = relativeY - paddleHeight / 2;
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
  ballVelX = -5;
  ballVelY = 5;
}

function gameLoop() {
  if (gamePaused) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // パドルとボールを描画
  ctx.fillStyle = 'white';
  ctx.fillRect(canvas.width - paddleWidth, paddleY, paddleWidth, paddleHeight);
  ctx.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);

  // ボールの位置を更新し、衝突を処理
  ballX += ballVelX;
  ballY += ballVelY;

  if (ballY <= 0 || ballY + ballSize / 2 >= canvas.height) ballVelY = -ballVelY;
  if (ballX <= ballSize / 2) {
    ballVelX = -ballVelX;
  } else if (ballX + ballSize / 2 >= canvas.width - paddleWidth && ballY >= paddleY && ballY <= paddleY + paddleHeight) {
    ballVelX = -ballVelX;
  } else if (ballX + ballSize / 2 >= canvas.width) {
    displayGameOver();
    gamePaused = true;
    return;
  }

  requestAnimationFrame(gameLoop);
}
