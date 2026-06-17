import { Piece } from "./Piece.js";

export class Queen extends Piece {
  #imageName;
  constructor(color, row, column) {
    super(color, row, column);
    this.#imageName = color === "white" ? "a_regina.png" : "n_regina.png";

    // Definim direcțiile direct, combinând mișcările pe diagonală și în linie dreaptă
    this.directions = [
      { row: 0, column: -1 },
      { row: 0, column: 1 },
      { row: 1, column: 0 },
      { row: -1, column: 0 },
      { row: -1, column: 1 },
      { row: -1, column: -1 },
      { row: 1, column: -1 },
      { row: 1, column: 1 },
    ];
  }

  get image() {
    return this.#imageName;
  }

getPossibleMoves(board) {
    const moves = [];

    for (let i = 0; i < this.directions.length; i++) {
      const dir = this.directions[i];
      let newRow = this.row + dir.row;
      let newColumn = this.column + dir.column;

      while (newRow >= 0 && newRow <= 7 && newColumn >= 0 && newColumn <= 7) {
        const target = board[newRow][newColumn];

        if (target === null) {
          moves.push({ row: newRow, column: newColumn });
        } else {
          if (target.color !== this.color) {
            moves.push({ row: newRow, column: newColumn });
          }
          break;
        }
        newRow = newRow + dir.row;
        newColumn = newColumn + dir.column;
      }
    }

    return moves;  
  }
}
