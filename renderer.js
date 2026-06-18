import { isInCheck } from "./rules.js";
import { offsetX, offsetY, squareSize, boardSize, img, name } from "./config.js";

export function drawSquares(board, selectedPiece, restartButton) {
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
          const legalMoves = selectedPiece.getPossibleMoves(board).filter((move) => {
            const origRow = selectedPiece.row;
            const origCol = selectedPiece.column;
            const captured = board[move.row][move.column];
            board[origRow][origCol] = null;
            selectedPiece.row = move.row;
            selectedPiece.column = move.column;
            board[move.row][move.column] = selectedPiece;
            const inCheck = isInCheck(selectedPiece.color, board);
            board[move.row][move.column] = captured;
            selectedPiece.row = origRow;
            selectedPiece.column = origCol;
            board[origRow][origCol] = selectedPiece;
            return !inCheck;
          });
          for (const move of legalMoves) {
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

export function drawPieces(board) {
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

export function drawCoordinates() {
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

export function drawGameOverMessage(gameOver, winner, canvasWidth, canvasHeight) {
  if (!gameOver) return;

  push();
  fill(0, 0, 0, 180);
  rect(0, 0, canvasWidth, canvasHeight);

  fill(255);
  textSize(36);
  textAlign(CENTER, CENTER);

  if (winner === "draw") {
    text("Pat!", canvasWidth / 2, canvasHeight / 2 - 25);
    textSize(24);
    text("Remiza", canvasWidth / 2, canvasHeight / 2 + 15);
  } else {
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
