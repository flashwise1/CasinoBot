// script.js
const board = document.getElementById("plinko-board");
const resultDiv = document.getElementById("result");

const rows = 12;
const pegs = [];

function generateBoard() {
  board.innerHTML = "";
  pegs.length = 0;

  const boardWidth = board.clientWidth;

  for (let row = 0; row < rows; row++) {
    const pegCount = row + 1;
    const offset = (boardWidth - pegCount * 30) / 2;

    for (let i = 0; i < pegCount; i++) {
      const peg = document.createElement("div");
      peg.classList.add("peg");
      peg.style.top = `${row * 30}px`;
      peg.style.left = `${offset + i * 30}px`;
      board.appendChild(peg);
      pegs.push({ x: offset + i * 30, y: row * 30 });
    }
  }

  // Add slots at the bottom
  for (let i = 0; i < rows + 1; i++) {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slot.style.width = `${100 / (rows + 1)}%`;
    slot.style.left = `${(100 / (rows + 1)) * i}%`;
    slot.innerText = (Math.random() * 10).toFixed(2) + "x"; // Placeholder multiplier
    board.appendChild(slot);
  }
}

function dropBall() {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.top = `0px`;
  ball.style.left = `${board.clientWidth / 2}px`;
  board.appendChild(ball);

  let x = board.clientWidth / 2;
  let y = 0;
  let step = 0;

  const interval = setInterval(() => {
    if (step >= rows) {
      clearInterval(interval);
      const finalSlot = Math.floor(x / (board.clientWidth / (rows + 1)));
      const payout = document.getElementsByClassName("slot")[finalSlot]?.innerText || "0x";
      resultDiv.innerText = `🎉 You landed in slot ${finalSlot} → Payout: ${payout}`;
      return;
    }

    y += 30;
    x += Math.random() < 0.5 ? -15 : 15;

    x = Math.max(10, Math.min(board.clientWidth - 10, x));

    ball.style.top = `${y}px`;
    ball.style.left = `${x}px`;

    step++;
  }, 150);
}

generateBoard();
