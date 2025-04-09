// You can add ball drop animation logic here soon

console.log("Plinko Game Loaded!");

// You can build animation logic with requestAnimationFrame or a physics engine later


let balance = 1000;
let gameRunning = false;

const balanceDisplay = document.getElementById("balance");
const betInput = document.getElementById("bet");
const riskSelect = document.getElementById("risk");
const playBtn = document.getElementById("playBtn");
const board = document.getElementById("plinkoBoard");
const resultDisplay = document.getElementById("result");

function updateBalanceDisplay() {
  balanceDisplay.textContent = `$${balance.toFixed(2)}`;
}

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9 * 10; i++) {
    const peg = document.createElement("div");
    peg.className = "peg";
    board.appendChild(peg);
  }
}

function getMultiplier(slotIndex, risk) {
  const multipliers = {
    low: [0.5, 0.8, 1, 1.1, 1.5, 1.1, 1, 0.8, 0.5],
    medium: [0.3, 0.6, 1, 2, 3, 2, 1, 0.6, 0.3],
    high: [0.1, 0.5, 1, 3, 7, 3, 1, 0.5, 0.1],
  };
  return multipliers[risk][slotIndex];
}

function dropBall() {
  const bet = parseFloat(betInput.value);
  const risk = riskSelect.value;

  if (isNaN(bet) || bet <= 0 || bet > balance) {
    alert("Enter a valid bet amount.");
    return;
  }

  gameRunning = true;
  playBtn.disabled = true;
  resultDisplay.textContent = '';

  balance -= bet;
  updateBalanceDisplay();

  const ball = document.createElement("div");
  ball.className = "ball";
  board.appendChild(ball);

  let col = Math.floor(Math.random() * 9);
  let row = 0;

  const interval = setInterval(() => {
    ball.style.top = `${row * 30}px`;
    ball.style.left = `${col * (board.offsetWidth / 9)}px`;

    if (row < 9) {
      col += Math.floor(Math.random() * 3) - 1; // move -1, 0, or 1
      col = Math.max(0, Math.min(8, col));
      row++;
    } else {
      clearInterval(interval);
      const multiplier = getMultiplier(col, risk);
      const win = bet * multiplier;
      balance += win;
      updateBalanceDisplay();

      resultDisplay.textContent = `🎉 You landed in slot ${col + 1}! Multiplier: ${multiplier}x, Winnings: $${win.toFixed(2)}`;
      gameRunning = false;
      playBtn.disabled = false;
    }
  }, 300);
}

playBtn.addEventListener("click", () => {
  if (!gameRunning) {
    dropBall();
  }
});

// Init
createBoard();
updateBalanceDisplay();
