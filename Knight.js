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
}
