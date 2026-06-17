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
}
