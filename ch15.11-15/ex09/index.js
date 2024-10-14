// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

let grid = [];
let paused = true;
let ws;
let animationId = null; // アニメーションID

// WebSocket サーバーに接続する
function connectWebSocket() {
  ws = new WebSocket("ws://localhost:3003/");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "update") {
      grid = message.grid;
      renderGrid(grid);
    } else if (message.type === "pause") {
      paused = true;
      cancelAnimationFrame(animationId); // アニメーション停止
      animationId = null;
    } else if (message.type === "start") {
      paused = false;
      if (!animationId) {
        update(); // アニメーション再開
      }
    }
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket server");
    setTimeout(connectWebSocket, 1000); // 自動的に再接続
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let liveNeighbors = 0;
      // 周囲のセルの確認
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;

          const newRow = row + i;
          const newCol = col + j;

          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
            if (grid[newRow][newCol]) {
              liveNeighbors++;
            }
          }
        }
      }

      // Life Game のルールによる次世代の状態決定
      if (grid[row][col]) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          nextGrid[row][col] = false;
        }
      } else {
        if (liveNeighbors === 3) {
          nextGrid[row][col] = true;
        }
      }
    }
  }

  return nextGrid;
}

// canvas がクリックされたときの処理 (セルの値を反転してサーバーに送信)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  
  // セルの反転情報をサーバーに送信
  ws.send(JSON.stringify({ type: "toggle", row, col }));
});

// Start ボタンが押されたときの処理
startButton.addEventListener("click", () => {
  if (paused) {
    ws.send(JSON.stringify({ type: "start" }));
  }
});

// Pause ボタンが押されたときの処理
pauseButton.addEventListener("click", () => {
  if (!paused) {
    ws.send(JSON.stringify({ type: "pause" }));
  }
});

// リモートから受け取ったグリッドに基づいて画面を更新する
function update() {
  if (!paused) {
    grid = updateGrid(grid); // グリッドの更新
    renderGrid(grid);
    animationId = requestAnimationFrame(update); // 再描画のためのリクエスト
  }
}

connectWebSocket();
