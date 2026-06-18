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

  // const urlParams = new URLSearchParams(window.location.search);
  // const gameMode = urlParams.get("mode");
  // const whiteInput = document.getElementById("playerWhite");
  // const blackInput = document.getElementById("playerBlack");

  // if (gameMode !== "ai") {
  //   function lockInputOnEnter(id) {
  //     const inputElement = document.getElementById(id);
  //     if (inputElement) {
  //       inputElement.addEventListener("keydown", function (e) {
  //         if (e.key === "Enter") {
  //           this.disabled = true;
  //         }
  //       });
  //     }
  //   }
  //   lockInputOnEnter("playerWhite");
  //   lockInputOnEnter("playerBlack");
  // } else {
  //   if (whiteInput) {
  //     whiteInput.addEventListener("keydown", function (e) {
  //       if (e.key === "Enter" && this.value.trim() !== "") {
  //         this.disabled = true;

  //         if (blackInput) {
  //           blackInput.value = "Computer";
  //           blackInput.disabled = true;
  //         }
  //       }
  //     });
  //   }
  //   if (blackInput) {
  //     blackInput.addEventListener("keydown", function (e) {
  //       if (e.key === "Enter" && this.value.trim() !== "") {
  //         this.disabled = true;

  //         if (whiteInput) {
  //           whiteInput.value = "Computer";
  //           whiteInput.disabled = true;
  //         }
  //       }
  //     });
  //   }
  // }
};

window.draw = function () {
  background(0);
  drawSquares();
  drawPieces();
  drawCoordinates();
  drawGameOverMessage();

  const urlParams = new URLSearchParams(window.location.search);
  const gameMode = urlParams.get("mode");
  if (currentTurn === "black" && !gameOver) {
    if (gameMode === "ai") {
      setTimeout(makeComputerMoveEasy, 800);
      currentTurn = "computer_thinking";
    } else if (gameMode == "ai_medium") {
      setTimeout(makeComputerMoveMedium, 800);
      currentTurn = "computer_thinking";
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
}

function drawSquares() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 == 0) {
        fill(255);
      } else {
        fill(100);
      }
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

  if (typeof restartButton !== "undefined" && restartButton.draw) {
    restartButton.draw();
  }
}

function drawPieces() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let piece = board[i][j];
      if (piece != null) {
        let imgKey = piece.image;
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

function drawCoordinates() {
  push();
  fill(255);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);

  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

  for (let i = 0; i < 8; i++) {
    let x = offsetX + i * squareSize + squareSize / 2;
    text(letters[i], x, offsetY + boardSize + 15);

    let y = offsetY + i * squareSize + squareSize / 2;
    text(8 - i, offsetX + boardSize + 15, y);
  }
  pop();
}

// Afișează mesajul de șah-mat peste tablă când jocul s-a terminat
function drawGameOverMessage() {
  if (!gameOver) return;

  push();
  // Fundal semi-transparent peste tot
  fill(0, 0, 0, 180);
  rect(0, 0, canvasWidth, canvasHeight);

  // Textul cu câștigătorul
  fill(255);
  textSize(36);
  textAlign(CENTER, CENTER);

  if (winner === "draw"){
    text("Pat!", canvasWidth / 2, canvasHeight / 2 - 25);
    textSize(24)
    text("Remiza", canvasWidth / 2, canvasHeight / 2 + 15)
  }else {
  let winnerName;
  if (winner === "white") {
    winnerName = "ALB";
  } else {
    winnerName = "NEGRU";
  }

  text("ȘAH-MAT!", canvasWidth / 2, canvasHeight / 2 - 25);
  textSize(24);
  text(winnerName + " a câștigat", canvasWidth / 2, canvasHeight / 2 + 15);
}
  pop();
}

// Caută poziția Regelui de culoarea dată
function findKing(color, board) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece instanceof King && piece.color === color) {
        return { row: i, column: j };
      }
    }
  }
  return null;
}

// Verifică dacă Regele de culoarea dată e în șah
function isInCheck(color, board) {
  // 1. Găsim poziția Regelui de culoarea dată
  const kingPos = findKing(color, board);
  if (kingPos === null) return false;

  // 2. Parcurgem toată tabla căutând piese adverse
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];

      if (piece !== null && piece.color !== color) {
        const enemyMoves = piece.getPossibleMoves(board);

        // 3. Verificăm dacă vreuna dintre mutări ajunge pe Rege
        for (let k = 0; k < enemyMoves.length; k++) {
          if (
            enemyMoves[k].row === kingPos.row &&
            enemyMoves[k].column === kingPos.column
          ) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

// Verifică dacă jucătorul de culoare `color` are cel puțin o mutare legală
function hasAnyLegalMove(color, board) {
  // Parcurgem toate piesele de culoarea dată
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];

      if (piece !== null && piece.color === color) {
        const possibleMoves = piece.getPossibleMoves(board);

        // Încercăm fiecare mutare a piesei
        for (let k = 0; k < possibleMoves.length; k++) {
          const move = possibleMoves[k];
          const originalRow = piece.row;
          const originalColumn = piece.column;
          const capturedPiece = board[move.row][move.column];

          board[piece.row][piece.column] = null;
          piece.row = move.row;
          piece.column = move.column;
          board[move.row][move.column] = piece;

          // Verificăm dacă Regele e încă în șah
          const stillInCheck = isInCheck(color, board);

          board[move.row][move.column] = capturedPiece;
          piece.row = originalRow;
          piece.column = originalColumn;
          board[originalRow][originalColumn] = piece;

          // Dacă Regele NU mai e în șah → am găsit o mutare legală
          if (!stillInCheck) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

// Verifică dacă jucătorul e în șah-mat
function isCheckmate(color, board) {
  return isInCheck(color, board) && !hasAnyLegalMove(color, board);
}

function isStalemate(color, board) {
  return !isInCheck(color, board) && !hasAnyLegalMove(color, board);
}
window.mousePressed = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const gameMode = urlParams.get("mode");

  restartButton.checkIfClicked(() => {
    selectedPiece = null;
    initPieces();
    const black = document.getElementById("playerBlack");
    const white = document.getElementById("playerWhite");
    if (black && white) {
      white.value = "";
      white.disabled = false;

      if (gameMode === "ai") {
        black.value = "Computer";
        black.disabled = true;
      } else {
        black.value = "";
        black.disabled = false;
      }
    }
    currentTurn = "white";
    gameOver = false;
    winner = null;
  });

  // Dacă jocul s-a terminat, ignorăm click-urile pe tablă
  if (gameOver) {
    return;
  }

  if (
    mouseX < offsetX ||
    mouseX > offsetX + boardSize ||
    mouseY < offsetY ||
    mouseY > offsetY + boardSize
  ) {
    return;
  }

  let clickedColumn = Math.floor((mouseX - offsetX) / squareSize);
  let clickedRow = Math.floor((mouseY - offsetY) / squareSize);
  let clickedPiece = board[clickedRow][clickedColumn];

  if (selectedPiece) {
    if (clickedPiece === selectedPiece) {
      selectedPiece = null;
      return;
    }

    // Click pe altă piesă proprie → schimbă selecția
    if (clickedPiece && clickedPiece.color === selectedPiece.color) {
      selectedPiece = clickedPiece;
      return;
    }

    // Verificăm dacă mutarea e validă (filtrăm și mutările care lasă Regele în șah)
    const possibleMoves = selectedPiece.getPossibleMoves(board).filter((move) => {
      const originalRow = selectedPiece.row;
      const originalColumn = selectedPiece.column;
      const capturedPiece = board[move.row][move.column];

      board[originalRow][originalColumn] = null;
      selectedPiece.row = move.row;
      selectedPiece.column = move.column;
      board[move.row][move.column] = selectedPiece;

      const inCheck = isInCheck(selectedPiece.color, board);

      board[move.row][move.column] = capturedPiece;
      selectedPiece.row = originalRow;
      selectedPiece.column = originalColumn;
      board[originalRow][originalColumn] = selectedPiece;

      return !inCheck;
    });

    let isValid = false;
    for (let i = 0; i < possibleMoves.length; i++) {
      if (
        possibleMoves[i].row === clickedRow &&
        possibleMoves[i].column === clickedColumn
      ) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      return;
    }

    // Executăm mutarea (acoperă și captura)
    const move = possibleMoves.find(m => m.row === clickedRow && m.column === clickedColumn);


    board[selectedPiece.row][selectedPiece.column] = null;
    selectedPiece.row = clickedRow;
    selectedPiece.column = clickedColumn;
    board[clickedRow][clickedColumn] = selectedPiece;

    if(move && move.castling){
      const row = clickedRow;
      if(move.castling === "small"){
        const rook = board[row][7];
        board[row][7] = null;
        rook.column = 5;
        board[row][5] = rook;
        rook.hasMoved = true;
      }else if (move.castling === "big") {
        const rook = board [row][0]
        board[row][0] = null;
        rook.column = 3;
        board[row][3] = rook;
        rook.hasMoved = true;
      }
    }

    if(selectedPiece instanceof King || selectedPiece instanceof Rook){
      selectedPiece.hasMoved = true;
    }

    const justMovedColor = selectedPiece.color;
    selectedPiece = null;

    // Schimbăm tura
    if (currentTurn === "white") {
      currentTurn = "black";
    } else {
      currentTurn = "white";
    }

    if (isCheckmate(currentTurn, board)){
      gameOver = true;
      winner = justMovedColor;
    }
    else if (isStalemate(currentTurn, board)){
      gameOver = true
      winner = "draw"
    }
  } else {
    if (clickedPiece && clickedPiece.color === currentTurn) {
      selectedPiece = clickedPiece;
    }
  }
};

function makeComputerMoveEasy() {
  let computerPieces = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let piece = board[i][j];
      if (piece !== null && piece.color === "black") {
        computerPieces.push(piece);
      }
    }
  }

  let allValidMoves = [];
  for (let i = 0; i < computerPieces.length; i++) {
    let piece = computerPieces[i];
    let possibleMoves = piece.getPossibleMoves(board);

    let safeMoves = possibleMoves.filter((move) => {
      const originalRow = piece.row;
      const originalColumn = piece.column;
      const capturedPiece = board[move.row][move.column];

      board[originalRow][originalColumn] = null;
      piece.row = move.row;
      piece.column = move.column;
      board[move.row][move.column] = piece;

      const stillInCheck = isInCheck("black", board);

      board[move.row][move.column] = capturedPiece;
      piece.row = originalRow;
      piece.column = originalColumn;
      board[originalRow][originalColumn] = piece;

      return !stillInCheck;
    });

    for (let j = 0; j < safeMoves.length; j++) {
      allValidMoves.push({
        piece: piece,
        targetMove: safeMoves[j],
      });
    }
  }
  if (allValidMoves.length > 0) {
    let randomIndex = Math.floor(Math.random() * allValidMoves.length);
    let chosen = allValidMoves[randomIndex];
    let piece = chosen.piece;
    let move = chosen.targetMove;

    board[piece.row][piece.column] = null;
    piece.row = move.row;
    piece.column = move.column;
    board[move.row][move.column] = piece;

    if (move.castling) {
      const row = move.row;
      if (move.castling === "small") {
        const rook = board[row][7];
        board[row][7] = null;
        rook.column = 5;
        board[row][5] = rook;
        rook.hasMoved = true;
      } else if (move.castling === "big") {
        const rook = board[row][0];
        board[row][0] = null;
        rook.column = 3;
        board[row][3] = rook;
        rook.hasMoved = true;
      }
    }
    if (piece instanceof King || piece instanceof Rook) {
      piece.hasMoved = true;
    }

    if (isCheckmate("white", board)) {
      gameOver = true;
      winner = "black";
    } else if (isStalemate("white", board)) {
      gameOver = true;
      winner = "draw";
    }
    currentTurn = "white";
  } else {
    // Dacă negrul nu mai are nicio mutare validă dar nu e în șah, este remiză (pat)
    if (isInCheck("black", board)) {
      gameOver = true;
      winner = "white"; // Șah-mat, câștigă albul
    } else {
      gameOver = true;
      winner = "draw"; // Remiză
    }

    currentTurn = "white";
  }
}

//Modul mediu - backtracking
function evaluateBoard(currentBoard) {
  let score = 0;
  const pieceValues = {
    Pawn: 10,
    Knight: 30,
    Bishop: 30,
    Rook: 50,
    Queen: 90,
    King: 9000,
  };
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let piece = currentBoard[i][j];
      if (piece !== null) {
        let type = piece.constructor.name;
        let value = pieceValues[type] || 0;
        if (piece.color === "white") score += value;
        else score -= value;
      }
    }
  }
  return score;
}

function minimax(currentBoard, depth, isMaximizingPlayer) {
  if (depth === 0) return evaluateBoard(currentBoard);
  let activatePieces = [];
  let colorTurn = isMaximizingPlayer ? "white" : "black";
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let p = currentBoard[i][j];
      if (p !== null && p.color === colorTurn) activatePieces.push(p);
    }
  }
  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    for (let p of activatePieces) {
      let moves = p.getPossibleMoves(currentBoard);
      for (let move of moves) {
        let originalRow = p.row;
        let originalCol = p.column;
        let captured = currentBoard[move.row][move.column];
        currentBoard[originalRow][originalCol] = null;
        p.row = move.row;
        p.column = move.column;
        currentBoard[move.row][move.column] = p;
        if (!isInCheck("white", currentBoard)) {
          let nextBoardCopy = currentBoard.map((row) =>
            row.map((p) =>
              p
                ? Object.assign(Object.create(Object.getPrototypeOf(p)), p)
                : null
            )
          );
          let evaluation = minimax(nextBoardCopy, depth - 1, false);
          maxEval = Math.max(maxEval, evaluation);
        }
        currentBoard[move.row][move.column] = captured;
        p.row = originalRow;
        p.column = originalCol;
        currentBoard[originalRow][originalCol] = p;
      }
    }
    return maxEval == -Infinity ? evaluateBoard(currentBoard) : maxEval;
  } else {
    let minEval = Infinity;
    for (let p of activatePieces) {
      let moves = p.getPossibleMoves(currentBoard);
      for (let move of moves) {
        let originalRow = p.row;
        let originalCol = p.column;
        let captured = currentBoard[move.row][move.column];
        currentBoard[originalRow][originalCol] = null;
        p.row = move.row;
        p.column = move.column;
        currentBoard[move.row][move.column] = p;
        if (!isInCheck("black", currentBoard)) {
          let nextBoardCopy = currentBoard.map((row) =>
            row.map((p) =>
              p
                ? Object.assign(Object.create(Object.getPrototypeOf(p)), p)
                : null
            )
          );
          let evaluation = minimax(nextBoardCopy, depth - 1, true);
          minEval = Math.min(minEval, evaluation);
        }
        currentBoard[move.row][move.column] = captured;
        p.row = originalRow;
        p.column = originalCol;
        currentBoard[originalRow][originalCol] = p;
      }
    }
    return minEval === Infinity ? evaluateBoard(currentBoard) : minEval;
  }
}

function makeComputerMoveMedium() {
  let computerPieces = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let piece = board[i][j];
      if (piece !== null && piece.color === "black") computerPieces.push(piece);
    }
  }
  let bestMove = null;
  let bestScore = Infinity;
  for (let i = 0; i < computerPieces.length; i++) {
    let piece = computerPieces[i];
    let possibleMoves = piece.getPossibleMoves(board);
    for (let j = 0; j < possibleMoves.length; j++) {
      let move = possibleMoves[j];
      const originalRow = piece.row;
      const originalColumn = piece.column;
      const capturedPiece = board[move.row][move.column];
      board[originalRow][originalColumn] = null;
      piece.row = move.row;
      piece.column = move.column;
      board[move.row][move.column] = piece;
      if (!isInCheck("black", board)) {
        let boardCopy = board.map((row) =>
          row.map((p) =>
            p ? Object.assign(Object.create(Object.getPrototypeOf(p)), p) : null
          )
        );
        let score = minimax(boardCopy, 1, true);

        if (score < bestScore) {
          bestScore = score;
          bestMove = { piece, move };
        }
      }
      board[move.row][move.column] = capturedPiece;
      piece.row = originalRow;
      piece.column = originalColumn;
      board[originalRow][originalColumn] = piece;
    }
  }
  if (bestMove !== null) {
    let piece = bestMove.piece;
    let move = bestMove.move;
    board[piece.row][piece.column] = null;
    piece.row = move.row;
    piece.column = move.column;
    board[move.row][move.column] = piece;

    if (move.castling) {
      const row = move.row;
      if (move.castling === "small") {
        const rook = board[row][7];
        board[row][7] = null;
        rook.column = 5;
        board[row][5] = rook;
        rook.hasMoved = true;
      } else if (move.castling === "big") {
        const rook = board[row][0];
        board[row][0] = null;
        rook.column = 3;
        board[row][3] = rook;
        rook.hasMoved = true;
      }
    }
    if (piece instanceof King || piece instanceof Rook) {
      piece.hasMoved = true;
    }

    if (isCheckmate("white", board)) {
      gameOver = true;
      winner = "black";
    } else if (isStalemate("white", board)) {
      gameOver = true;
      winner = "draw";
    }
    currentTurn = "white";
  } else {
    if (isInCheck("black", board)) {
      gameOver = true;
      winner = "white";
    } else {
      gameOver = true;
      winner = "draw";
    }
    currentTurn = "white";
  }
}
