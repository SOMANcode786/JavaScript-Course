const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const tileSize = 40;
const player = { x: 1, y: 1 };
const finish = { x: 8, y: 8 };

const maze = [
  "XXXXXXXXXX",
  "X        X",
  "X XXXX X X",
  "X X  X X X",
  "X X XX X X",
  "X X    X X",
  "X XXXX X X",
  "X      X X",
  "X XXXXX  X",
  "XXXXXXXXXX",
];

// Hidden traps! 😈
const traps = [
  { x: 3, y: 2 },
  { x: 5, y: 5 },
  { x: 7, y: 7 },
  { x: 2, y: 6 },
];

function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === "X") {
        ctx.fillStyle = "black";
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
      }
    }
  }

  ctx.fillStyle = "red";
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);

  ctx.fillStyle = "gold";
  ctx.fillRect(finish.x * tileSize, finish.y * tileSize, tileSize, tileSize);
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (maze[newY][newX] !== "X") {
    player.x = newX;
    player.y = newY;

    for (let trap of traps) {
      if (trap.x === player.x && trap.y === player.y) {
        player.x = 1;
        player.y = 1;
        document.getElementById("message").textContent =
          "💀 TRAP! Back to Start! 💀";
        break;
      } else {
        document.getElementById("message").textContent = "";
      }
    }
  }

  if (player.x === finish.x && player.y === finish.y) {
    document.getElementById("message").textContent = "🎉 YOU WIN! 🎉";
  }

  drawMaze();
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      movePlayer(0, -1);
      break;
    case "ArrowDown":
      movePlayer(0, 1);
      break;
    case "ArrowLeft":
      movePlayer(-1, 0);
      break;
    case "ArrowRight":
      movePlayer(1, 0);
      break;
  }
});

drawMaze();
