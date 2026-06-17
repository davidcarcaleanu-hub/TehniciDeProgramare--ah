import { Piece } from "./Piece.js";

export class King extends Piece {
  #imageName;
  directions = [
    { row: -1, column: 0 },
    { row: -1, column: 1 },
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 1, column: 0 },
    { row: 1, column: -1 },
    { row: 0, column: -1 },
    { row: -1, column: -1 },
  ];
  constructor(color, row, column) {
    super(color, row, column);
    this.#imageName = color === "white" ? "a_rege.png" : "n_rege.png"; // Schimbat din tura în rege
  }
  get image() {
    return this.#imageName;
  }
}
