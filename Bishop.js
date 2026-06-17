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
}
