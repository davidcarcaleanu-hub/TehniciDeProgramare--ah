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
}
