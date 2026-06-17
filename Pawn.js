import { Piece } from "./Piece.js";

export class Pawn extends Piece {
  directions = [{ row: 1, column: 0 }, { row: 2, column: 0 }, null, null];
  #imageName;

  constructor(color, row, column) {
    super(color, row, column);
    this.#imageName = color === "white" ? "a_pion.png" : "n_pion.png";

    if (color === "white") {
      this.directions[0].row *= -1;
      this.directions[1].row *= -1;
    }
  }

  get image() {
    return this.#imageName;
  }

  getPossibleMoves(board){
    const moves = []

    //DIRECTIA SI RANDUL DE START, IN FUNCTIE DE FIECARE CULOARE
    let direction;
    let startRow;
    if (this.color === "white") {
      direction = -1;
      startRow = 6;
    }else {
      direction = 1;
      startRow = 1;
    }

    //UN PAS INAINTE
    const oneStepRow = this.row + direction;
    if (oneStepRow >= 0 && oneStepRow <= 7) {
      if (board[oneStepRow][this.column] === null) {
        moves.push({row: oneStepRow, column: this.column});

        //DOI PASI INAINTE DOAR CAND POZITIA ESTE CEA INITIALA
        if (this.row === startRow) {
          const twoStepsRow = this.row + 2 * direction;
          if (board[twoStepsRow][this.column] === null) {
            moves.push({row: twoStepsRow, column: this.column});
          }
        }
      }
    }

    //CAPTURA ADVERSAR PE DIAGONALA STANGA
    const diagRow = this.row + direction;
    const leftColumn = this.column - 1;
    if (diagRow >= 0 && diagRow <= 7 && leftColumn >= 0) {
      const target = board[diagRow][leftColumn];
      if (target !== null && target.color !== this.color){
        moves.push({row: diagRow, column: leftColumn});
      }
    }

    //CAPTURA ADVERSAR PE DIAGONALA DREAPTA
    const rightColumn = this.column + 1;
    if (diagRow >= 0 && diagRow <= 7 && rightColumn <= 7){
      const target = board[diagRow][rightColumn];
      if (target !== null && target.color !== this.color){
        moves.push({row: diagRow, column:rightColumn});
      }
    }

    return moves;
  }
}
