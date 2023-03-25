// JS BreakeOut Game by ChatGPT and Me
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const paddleHeight = 100, paddleWidth = 10, ballSize = 10;
let paddleY = (canvas.height - paddleHeight) / 2, ballX = canvas.width / 2, ballY = canvas.height / 2, ballVelX = 5, ballVelY = 5;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && paddleY > 0) paddleY -= 10;
  if (e.key === 'ArrowDown' && paddleY + paddleHeight < canvas.height) paddleY += 10;
});

(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddle and ball
  ctx.fillStyle = 'white';
  ctx.fillRect(canvas.width - paddleWidth, paddleY, paddleWidth, paddleHeight);
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  // Update ball position and handle collisions
  ballX += ballVelX;
  ballY += ballVelY;

  if (ballY <= 0 || ballY + ballSize >= canvas.height) ballVelY = -ballVelY;
  if (ballX + ballSize >= canvas.width - paddleWidth && ballY >= paddleY && ballY <= paddleY + paddleHeight) {
    ballVelX = -ballVelX;
  } else if (ballX + ballSize >= canvas.width) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  requestAnimationFrame(gameLoop);
})();
