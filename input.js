import { King } from "./King.js";
import { Rook } from "./Rook.js";
import { isInCheck, isCheckmate, isStalemate } from "./rules.js";
import { offsetX, offsetY, boardSize, squareSize } from "./config.js";

export function handleMousePressed(state, restartButton, initPieces) {
  let { board, selectedPiece, currentTurn, gameOver, winner } = state;

  const urlParams = new URLSearchParams(window.location.search);
  const gameMode = urlParams.get("mode");

  restartButton.checkIfClicked(() => {
    selectedPiece = null;
    board = initPieces();
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

  if (gameOver) {
    return { board, selectedPiece, currentTurn, gameOver, winner };
  }

  if (
    mouseX < offsetX ||
    mouseX > offsetX + boardSize ||
    mouseY < offsetY ||
    mouseY > offsetY + boardSize
  ) {
    return { board, selectedPiece, currentTurn, gameOver, winner };
  }

  let clickedColumn = Math.floor((mouseX - offsetX) / squareSize);
  let clickedRow = Math.floor((mouseY - offsetY) / squareSize);
  let clickedPiece = board[clickedRow][clickedColumn];

  if (selectedPiece) {
    if (clickedPiece === selectedPiece) {
      selectedPiece = null;
      return { board, selectedPiece, currentTurn, gameOver, winner };
    }

    if (clickedPiece && clickedPiece.color === selectedPiece.color) {
      selectedPiece = clickedPiece;
      return { board, selectedPiece, currentTurn, gameOver, winner };
    }

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
      return { board, selectedPiece, currentTurn, gameOver, winner };
    }

    const move = possibleMoves.find(m => m.row === clickedRow && m.column === clickedColumn);

    board[selectedPiece.row][selectedPiece.column] = null;
    selectedPiece.row = clickedRow;
    selectedPiece.column = clickedColumn;
    board[clickedRow][clickedColumn] = selectedPiece;

    if (move && move.castling) {
      const row = clickedRow;
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

    if (selectedPiece instanceof King || selectedPiece instanceof Rook) {
      selectedPiece.hasMoved = true;
    }

    const justMovedColor = selectedPiece.color;
    selectedPiece = null;

    if (currentTurn === "white") {
      currentTurn = "black";
    } else {
      currentTurn = "white";
    }

    if (isCheckmate(currentTurn, board)) {
      gameOver = true;
      winner = justMovedColor;
    } else if (isStalemate(currentTurn, board)) {
      gameOver = true;
      winner = "draw";
    }
  } else {
    if (clickedPiece && clickedPiece.color === currentTurn) {
      selectedPiece = clickedPiece;
    }
  }

  return { board, selectedPiece, currentTurn, gameOver, winner };
}
