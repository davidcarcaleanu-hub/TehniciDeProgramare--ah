import { Rook } from "./Rook.js";
import { Knight } from "./Knight.js";
import { Bishop } from "./Bishop.js";
import { Queen } from "./Queen.js";
import { King } from "./King.js";
import { Pawn } from "./Pawn.js";

import {
  name,
  squareSize,
  offsetX,
  offsetY,
  boardSize,
  img,
} from "./config.js";

let selectedPiece = null;
let currentTurn = "white";
let board = [];

let canvasWidth = 700;
let canvasHeight = 700;

// Obiect butoane simplu
const restartButton = {
  x: 300,
  y: 660,
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
};

window.draw = function () {
  background(0);
  drawSquares();
  drawPieces();
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
      new King("white", 7, 3),
      new Queen("white", 7, 4),
      new Bishop("white", 7, 5),
      new Knight("white", 7, 6),
      new Rook("white", 7, 7),
    ],
  ];
}

function drawSquares() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 == 0) {
        fill(255);
      } else {
        fill(100);
      }
      // Corectat ordinea: j reprezintă X (coloana), i reprezintă Y (rândul)
      rect(
        offsetX + j * squareSize,
        offsetY + i * squareSize,
        squareSize,
        squareSize
      );

      if (selectedPiece) {
        if (selectedPiece.row == i && selectedPiece.column == j) {
          fill("#ffd477cc");
          rect(
            offsetX + j * squareSize,
            offsetY + i * squareSize,
            squareSize,
            squareSize
          );
        }

        if (selectedPiece.getPossibleMoves) {
          for (const move of selectedPiece.getPossibleMoves(board)) {
            if (move.row == i && move.column == j) {
              fill("#ffe8b599");
              rect(
                offsetX + j * squareSize,
                offsetY + i * squareSize,
                squareSize,
                squareSize
              );

              push();
              stroke("#00000000");
              fill("#00000020");
              circle(
                offsetX + j * squareSize + 0.5 * squareSize,
                offsetY + i * squareSize + 0.5 * squareSize,
                squareSize * 0.4
              );
              pop();
            }
          }
        }
      }
    }
  }
  if (document.getElementById("playerBlack")) {
    name.black = document.getElementById("playerBlack").value;
  }
  if (document.getElementById("playerWhite")) {
    name.white = document.getElementById("playerWhite").value;
  }

  // Desenăm butonul de restart doar dacă este definit
  if (typeof restartButton !== "undefined" && restartButton.draw) {
    restartButton.draw();
  }
}

function drawPieces() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let piece = board[i][j];
      if (piece != null) {
        let imgKey = piece.image; // Aceasta returnează acum stringul imaginii (ex: "a_tura.png")
        if (img[imgKey]) {
          image(
            img[imgKey],
            offsetX + j * squareSize,
            offsetY + i * squareSize,
            squareSize,
            squareSize
          );
        }
      }
    }
  }
}

// window.mousePressed = function () {
//   restartButton.checkIfClicked(() => {
//     selectedPiece = null;
//     initPieces();
//     const black = document.getElementById("playerBlack");
//     const white = document.getElementById("playerWhite");
//     if (black && white) {
//       black.value = "";
//       white.value = "";
//       black.disabled = false;
//       white.disabled = false;
//     }
//     currentTurn = "white";
//   });

//   if (
//     mouseX < offsetX ||
//     mouseX > offsetX + boardSize ||
//     mouseY < offsetY ||
//     mouseY > offsetY + boardSize
//   ) {
//     return;
//   }

//   let clickedColumn = Math.floor((mouseX - offsetX) / squareSize);
//   let clickedRow = Math.floor((mouseY - offsetY) / squareSize);

//   let clickedPiece = board[clickedRow][clickedColumn];

//   if (selectedPiece) {
//     if (clickedPiece === selectedPiece) {
//       selectedPiece = null;
//     } else if (clickedPiece && selectedPiece.color !== clickedPiece.color) {
//       // Captură
//       board[selectedPiece.row][selectedPiece.column] = null;
//       selectedPiece.column = clickedColumn;
//       selectedPiece.row = clickedRow;
//       board[clickedRow][clickedColumn] = selectedPiece;
//       selectedPiece = null;
//       currentTurn = currentTurn === "white" ? "black" : "white"; // Schimbă tura
//     } else if (!clickedPiece) {
//       // Mutare pe căsuță liberă
//       board[selectedPiece.row][selectedPiece.column] = null;
//       selectedPiece.column = clickedColumn;
//       selectedPiece.row = clickedRow;
//       board[clickedRow][clickedColumn] = selectedPiece;
//       selectedPiece = null;
//       currentTurn = currentTurn === "white" ? "black" : "white"; // Schimbă tura
//     } else {
//       selectedPiece = clickedPiece;
//     }
//   } else {
//     if (clickedPiece && clickedPiece.color === currentTurn) {
//       selectedPiece = clickedPiece;
//     }
//   }
// };
