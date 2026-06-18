import { Piece } from "./Piece.js";

export class King extends Piece {
  #imageName;
  directions = [
    { row: -1, column: 0 },
    { row: -1, column: 1 },
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 1, column: 0 },
    { row: 1, column: -1 },
    { row: 0, column: -1 },
    { row: -1, column: -1 },
  ];
  constructor(color, row, column) {
    super(color, row, column);
    this.hasMoved = false;
    this.#imageName = color === "white" ? "a_rege.png" : "n_rege.png"; // Schimbat din tura în rege
  }
  get image() {
    return this.#imageName;
  }

  getPossibleMoves(board) {
    const moves = [];

    for (let i = 0; i < this.directions.length; i++) {
      const dir = this.directions[i];
      const newRow = this.row + dir.row;
      const newColumn = this.column + dir.column;

      if (newRow >= 0 && newRow <= 7 && newColumn >= 0 && newColumn <= 7) {
        const target = board[newRow][newColumn];

        if (target === null) {
          moves.push({ row: newRow, column: newColumn });
        } else {
          if (target.color !== this.color) {
            moves.push({ row: newRow, column: newColumn });
          }
        }
      }
    }

    if (!this.hasMoved) {
      const row = this.row;

      const rookSmall = board[row][7];
      if (rookSmall !== null && rookSmall.hasMoved === false && board[row][5] === null && board[row][6] === null) {
        moves.push({ row: row, column: 6, castling: "small" });
      }

      const rookBig = board[row][0];
      if (rookBig !== null && rookBig.hasMoved === false && board[row][1] === null && board[row][2] === null && board[row][3] === null) {
        moves.push({ row: row, column: 2, castling: "big" });
      }
    }

    return moves;
  }
}