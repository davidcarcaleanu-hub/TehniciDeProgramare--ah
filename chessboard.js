import { Rook } from "./Rook.js";
import { Knight } from "./Knight.js";
import { Bishop } from "./Bishop.js";
import { Queen } from "./Queen.js";
import { King } from "./King.js";
import { Pawn } from "./Pawn.js";
import { makeComputerMoveEasy, makeComputerMoveMedium } from "./machine.js";
import { handleMousePressed } from "./input.js";
import {
  drawSquares,
  drawPieces,
  drawCoordinates,
  drawGameOverMessage,
} from "./renderer.js";
import { img } from "./config.js";

let selectedPiece = null;
let currentTurn = "white";
let board = [];

let gameOver = false;
let winner = null;

let canvasWidth = 700;
let canvasHeight = 715;

// Obiect buton restart
const restartButton = {
  x: 300,
  y: 680,
  width: 100,
  height: 30,
  draw: function () {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    fill(0);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("RESTART", this.x + this.width / 2, this.y + this.height / 2);
  },
  checkIfClicked: function (callback) {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    ) {
      callback();
    }
  },
};

window.preload = function () {
  img["n_pion.png"] = loadImage("black/n_pion.png");
  img["n_tura.png"] = loadImage("black/n_tura.png");
  img["n_cal.png"] = loadImage("black/n_cal.png");
  img["n_nebun.png"] = loadImage("black/n_nebun.png");
  img["n_rege.png"] = loadImage("black/n_rege.png");
  img["n_regina.png"] = loadImage("black/n_regina.png");
  img["a_pion.png"] = loadImage("white/a_pion.png");
  img["a_tura.png"] = loadImage("white/a_tura.png");
  img["a_cal.png"] = loadImage("white/a_cal.png");
  img["a_nebun.png"] = loadImage("white/a_nebun.png");
  img["a_rege.png"] = loadImage("white/a_rege.png");
  img["a_regina.png"] = loadImage("white/a_regina.png");
};

window.setup = function () {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvas-holder");
  noStroke();
  initPieces();
  currentTurn = "white";

  function lockInputOnEnter(id) {
    document.getElementById(id).addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        this.disabled = true;
      }
    });
  }
  lockInputOnEnter("playerBlack");
  lockInputOnEnter("playerWhite");

  const urlParams = new URLSearchParams(window.location.search);
  const gameMode = urlParams.get("mode");

  if (gameMode == "ai" || gameMode === "ai_medium") {
    const blackInput = document.getElementById("playerBlack");
    const whiteInput = document.getElementById("playerWhite");

    if (blackInput) {
      blackInput.value =
        gameMode === "ai_medium" ? "Calculator (mediu)" : "Calculator (ușor)";
      blackInput.disabled = true;
    }
    if (whiteInput) {
      whiteInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          this.disabled = true;
        }
      });
    }
  }
};

async function computerThinkingAsync(gameMode) {
  try {
    // Creăm promisiunea direct aici, folosind funcțiile tale originale din machine.js
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        if (gameMode === "ai_medium") {
          // Apelăm direct funcția pentru modul mediu
          resolve(makeComputerMoveMedium(board));
        } else {
          // Apelăm direct funcția pentru modul ușor
          resolve(makeComputerMoveEasy(board));
        }
      }, 1000);
    });

    // Când e gata, actualizăm variabilele globale
    gameOver = result.gameOver;
    winner = result.winner;
    currentTurn = result.currentTurn;
  } catch (error) {
    console.error("Eroare la IA:", error);
    currentTurn = "white";
  }
}

// Funcția draw rămâne normală, curată, ca să nu se mai facă ecranul negru
window.draw = function () {
  background(0);
  drawSquares(board, selectedPiece, restartButton);
  drawPieces(board);
  drawCoordinates();
  drawGameOverMessage(gameOver, winner, canvasWidth, canvasHeight);

  if (currentTurn === "computer_thinking") {
    push();
    fill(0, 0, 0, 50);
    rect(50, 50, 600, 600);

    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Calculatorul gândește...", canvasWidth / 2, canvasHeight / 2);
    pop();
  }

  const urlParams = new URLSearchParams(window.location.search);
  const gameMode = urlParams.get("mode");

  if (currentTurn === "black" && !gameOver) {
    if (gameMode === "ai" || gameMode === "ai_medium") {
      currentTurn = "computer_thinking";

      // Apelăm funcția asincronă cu async/await creată mai sus
      computerThinkingAsync(gameMode);
    }
  }
};

function initPieces() {
  board = [
    [
      new Rook("black", 0, 0),
      new Knight("black", 0, 1),
      new Bishop("black", 0, 2),
      new Queen("black", 0, 3),
      new King("black", 0, 4),
      new Bishop("black", 0, 5),
      new Knight("black", 0, 6),
      new Rook("black", 0, 7),
    ],
    [
      new Pawn("black", 1, 0),
      new Pawn("black", 1, 1),
      new Pawn("black", 1, 2),
      new Pawn("black", 1, 3),
      new Pawn("black", 1, 4),
      new Pawn("black", 1, 5),
      new Pawn("black", 1, 6),
      new Pawn("black", 1, 7),
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      new Pawn("white", 6, 0),
      new Pawn("white", 6, 1),
      new Pawn("white", 6, 2),
      new Pawn("white", 6, 3),
      new Pawn("white", 6, 4),
      new Pawn("white", 6, 5),
      new Pawn("white", 6, 6),
      new Pawn("white", 6, 7),
    ],
    [
      new Rook("white", 7, 0),
      new Knight("white", 7, 1),
      new Bishop("white", 7, 2),
      new Queen("white", 7, 3),
      new King("white", 7, 4),
      new Bishop("white", 7, 5),
      new Knight("white", 7, 6),
      new Rook("white", 7, 7),
    ],
  ];
  return board;
}

window.mousePressed = function () {
  const result = handleMousePressed(
    { board, selectedPiece, currentTurn, gameOver, winner },
    restartButton,
    initPieces
  );
  board = result.board;
  selectedPiece = result.selectedPiece;
  currentTurn = result.currentTurn;
  gameOver = result.gameOver;
  winner = result.winner;
};
