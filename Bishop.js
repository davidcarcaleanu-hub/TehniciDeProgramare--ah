import { Piece } from "./Piece.js";

export class Bishop extends Piece {
  #imageName;
  directions = [
    { row: -1, column: 1 },
    { row: -1, column: -1 },
    { row: 1, column: -1 },
    { row: 1, column: 1 },
  ];

  constructor(color, row, column) {
    super(color, row, column);
    this.#imageName = color == "white" ? "a_nebun.png" : "n_nebun.png";
  }
  get image() {
    return this.#imageName;
  }

  getPossibleMoves(board) {
    const moves = [];

    for(let i = 0; i < this.directions.length; i++){
      const dir = this.directions[i];
      let newRow = this.row + dir.row;
      let newColumn = this.column + dir.column;

      while (newRow >= 0 && newRow <= 7 && newColumn >= 0 && newColumn <= 7){
        const target = board[newRow][newColumn];

        if (target === null){
          moves.push({row: newRow, column: newColumn})
        } else {
          if(target.color !== this.color) {
            moves.push({row: newRow, column:newColumn});
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
