import { King } from "./King.js";
import { Rook } from "./Rook.js";
import { isInCheck, isCheckmate, isStalemate } from "./rules.js";

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
              p ? Object.assign(Object.create(Object.getPrototypeOf(p)), p) : null
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
              p ? Object.assign(Object.create(Object.getPrototypeOf(p)), p) : null
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

export function makeComputerMoveEasy(board) {
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
      allValidMoves.push({ piece: piece, targetMove: safeMoves[j] });
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
      return { gameOver: true, winner: "black", currentTurn: "white" };
    } else if (isStalemate("white", board)) {
      return { gameOver: true, winner: "draw", currentTurn: "white" };
    }
    return { gameOver: false, winner: null, currentTurn: "white" };
  } else {
    if (isInCheck("black", board)) {
      return { gameOver: true, winner: "white", currentTurn: "white" };
    } else {
      return { gameOver: true, winner: "draw", currentTurn: "white" };
    }
  }
}

export function makeComputerMoveMedium(board) {
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
      return { gameOver: true, winner: "black", currentTurn: "white" };
    } else if (isStalemate("white", board)) {
      return { gameOver: true, winner: "draw", currentTurn: "white" };
    }
    return { gameOver: false, winner: null, currentTurn: "white" };
  } else {
    if (isInCheck("black", board)) {
      return { gameOver: true, winner: "white", currentTurn: "white" };
    } else {
      return { gameOver: true, winner: "draw", currentTurn: "white" };
    }
  }
}
