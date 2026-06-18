import {King} from "./King.js";

// Caută poziția Regelui de culoarea dată
export function findKing(color, board) {
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
export function isInCheck(color, board) {
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
export function hasAnyLegalMove(color, board) {
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
export function isCheckmate(color, board) {
  return isInCheck(color, board) && !hasAnyLegalMove(color, board);
}

export function isStalemate(color, board) {
  return !isInCheck(color, board) && !hasAnyLegalMove(color, board);
}