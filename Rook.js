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
}
