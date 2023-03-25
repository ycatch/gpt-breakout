// JS BreakeOut Game by ChatGPT and Me
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const paddleWidth = 100, paddleHeight = 10, ballSize = 10, blockWidth = 70, blockHeight = 20, blockRows = 3, blockCols = 8;
let paddleX = (canvas.width - paddleWidth) / 2, ballX = canvas.width / 2, ballY = canvas.height / 2, ballVelX = 5, ballVelY = -5;
let gamePaused = true;

const blocks = [];
const padding = (canvas.width - (blockCols * (blockWidth + 10))) / 2;
for (let i = 0; i < blockRows; i++) {
    blocks[i] = [];
    for (let j = 0; j < blockCols; j++) {
    blocks[i][j] = { x: j * (blockWidth + 10) + padding, y: i * (blockHeight + 10) + 60, active: true };
    }
}

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
    ctx.fillText('Game Over', (canvas.width - ctx.measureText('Game Over').width) / 2, canvas.height / 2);
}

function resetGame() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballVelX = 5;
    ballVelY = -5;
    blocks.forEach(row => {
    row.forEach(block => {
        block.active = true;
    });
    });
}

function drawBlocks() {
    ctx.fillStyle = 'white';
    for (let i = 0; i < blockRows; i++) {
    for (let j = 0; j < blockCols; j++) {
        if (blocks[i][j].active) {
        ctx.fillRect(blocks[i][j].x, blocks[i][j].y, blockWidth, blockHeight);
        }
    }
    }
}

function checkBlockCollision() {
    for (let i = 0; i < blockRows; i++) {
    for (let j = 0; j < blockCols; j++) {
        const block = blocks[i][j];
        if (block.active && ballX + ballSize / 2 >= block.x && ballX - ballSize / 2 <= block.x + blockWidth && ballY + ballSize / 2 >= block.y && ballY - ballSize / 2 <= block.y + blockHeight) {
        block.active = false;
        ballVelY = -ballVelY;
        return; 
        }
    }
    }
}

function gameLoop() {
  if (gamePaused) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddle, ball, and blocks
  ctx.fillStyle = 'white';
  ctx.fillRect(paddleX, canvas.height - paddleHeight - 80, paddleWidth, paddleHeight);
  ctx.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);
  drawBlocks();

  // Update ball position and handle collisions
  ballX += ballVelX;
  ballY += ballVelY;

  if (ballX <= 0 || ballX + ballSize / 2 >= canvas.width) ballVelX = -ballVelX;
  if (ballY <= ballSize / 2) {
    ballVelY = -ballVelY;
  } else if (
    ballY + ballSize / 2 >= canvas.height - paddleHeight - 80 - 1 &&
    ballY + ballSize / 2 <= canvas.height - paddleHeight - 80 + 1 &&
    ballX >= paddleX - ballSize / 2 &&
    ballX <= paddleX + paddleWidth + ballSize / 2
  ) {
    ballVelY = -ballVelY;
  } else if (ballY + ballSize / 2 >= canvas.height) {
    displayGameOver();
    gamePaused = true;
    return;
  }

  checkBlockCollision();

  requestAnimationFrame(gameLoop);
}