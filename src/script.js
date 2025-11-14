/* === 抽卡物件 === */
const items = ["🔥", "💎", "⚡", "🌙", "⭐", "🧩"];

/* === 主抽卡 === */
function drawCard() {
  const card  = document.getElementById("card");
  const front = document.getElementById("front");

  /* SSR 機率（可調整） */
  const SSR_RATE = 0.5;

  let selected;
  if (Math.random() < SSR_RATE) selected = "🔥";
  else {
    const pool = ["💎", "⚡", "🌙", "⭐", "🧩"];
    selected = pool[Math.floor(Math.random() * pool.length)];
  }

  front.textContent = selected;

  card.classList.remove("flip");
  setTimeout(() => card.classList.add("flip"), 100);

  if (selected === "🔥") triggerBurst();
}

/* === 粒子爆發 === */
function triggerBurst() {
  const container = document.getElementById("particle-container");

  for (let i = 0; i < 28; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const angle = Math.random() * Math.PI * 2;
    const dist  = 120 + Math.random() * 100;

    p.style.setProperty("--x", Math.cos(angle) * dist + "px");
    p.style.setProperty("--y", Math.sin(angle) * dist + "px");

    const rect = document.getElementById("card").getBoundingClientRect();
    p.style.left = rect.left + rect.width / 2 + "px";
    p.style.top  = rect.top  + rect.height / 2 + "px";

    container.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }

  const flash = document.createElement("div");
  flash.className = "flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 400);
}

/* === 無限循環雷射網格背景 === */
const canvas = document.getElementById("grid-bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let offset = 0;
const gridSize = 40;

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(0,255,255,0.28)";
  ctx.lineWidth = 1;

  offset = (offset + 1) % gridSize;
  
  for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + offset, canvas.height);
    ctx.stroke();
  }

  for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y + offset);
    ctx.lineTo(canvas.width, y + offset);
    ctx.stroke();
  }

  requestAnimationFrame(drawGrid);
}

drawGrid();

