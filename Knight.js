import { Piece } from "./Piece.js";

export class Knight extends Piece {
  #imageName;
  directions = [
    { row: -1, column: -2 },
    { row: -2, column: -1 },
    { row: -2, column: 1 },
    { row: -1, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 1 },
    { row: 2, column: -1 },
    { row: 1, column: -2 },
  ];
  constructor(color, row, column) {
    super(color, row, column);
    this.#imageName = color === "white" ? "a_cal.png" : "n_cal.png";
  }
  get image() {
    return this.#imageName; // Corectat din #image în #imageName
  }

  getPossibleMoves(board){
    const moves = [];

    for (let i = 0; i < this.directions.length; i++) {
      const dir = this.directions[i];
      const newRow = this.row + dir.row;
      const newColumn = this.column + dir.column;

      //VERIFICAM NOUA POZITIE DACA ESTE PE TABALA    
      if (newRow >= 0 && newRow <= 7 && newColumn >= 0 && newColumn <= 7) {
      const target = board[newRow][newColumn];

      if(target === null) {
        moves.push({row: newRow, column: newColumn})
      } else {
        if(target.color !== this.color){
          moves.push({row: newRow, column: newColumn})
        }
      }
      }
    }
    return moves
  }
}
