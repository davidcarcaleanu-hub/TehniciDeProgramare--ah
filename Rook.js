import { Piece } from "./Piece.js";
export class Rook extends Piece {
  #imageName;
  directions = [
    { row: 0, column: -1 },
    { row: 0, column: 1 },
    { row: 1, column: 0 },
    { row: -1, column: 0 },
  ];
  constructor(color, row, column) {
    super(color, row, column);
    this.#imageName = color == "white" ? "a_tura.png" : "n_tura.png";
  }

  get image() {
    return this.#imageName;
  }

  getPossibleMoves(board) {
    const moves = [];

    //PE FIECARE DINTRE CELE 4 DIRECTII

    for (let i = 0; i < this.directions.length; i++) {
      const dir = this.directions[i];
      let newRow = this.row + dir.row;
      let newColumn = this.column + dir.column;

      // VERIFICAREA CA SUNTEM PE TABLA

      while (newRow >= 0 && newRow <= 7 && newColumn >= 0 && newColumn <= 7) {
        const target = board[newRow][newColumn];
        
        //VERIFICARE DACA CASUTA ESTE GOALA
        if (target === null) {
          moves.push({row: newRow, column: newColumn});
        }

        //VERIFICARE DACA EXISTA O PIESA ACOLO SI DACA ESTE A NOASTRA SAU NU
        else {
          if (target.color !== this.color) {
            moves.push({row: newRow, column: newColumn});
          }
          break;
        }

        newRow = newRow + dir.row;
        newColumn = newColumn + dir.column
      }
    }

    return moves;
  }
}
