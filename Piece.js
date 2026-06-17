let pieces = [];
let selectedPiece = null;

export class Piece {
  constructor(color, row, column) {
    if (this.constructor === Piece) {
      throw new Error(
        "Clasa abstractă 'Piece' nu poate fi instanțiată direct."
      );
    }
    this.row = row;
    this.column = column;
    this.color = color;
  }

  moveNotOnBoard(i, j) {
    return i > 7 || i < 0 || j > 7 || j < 0;
  }
  clone() {
    return new this.constructor();
  }
}

// export const Piece = {
//   row: 0,
//   column: 0,
//   //type: null,
//   color: null,

//   constructor(color, row, column) {
//     // aceasta ar fi echivalenta cu o functie init
//     //this.type = type;
//     this.row = row;
//     this.column = column;
//     this.color = color;
//   },

//   moveNotOnBoard(i, j) {
//     return i > 7 || i < 0 || j > 7 || j < 0;
//   },

//   clone() {
//     return new this.constructor();
//   },

//   // getPossibleMoves(b, {ignoreOwnKingChecks } = {}) {
//   //   if (this instanceOf Pawn) {
//   //     this.checkForDiagonalTake();
//   //   }

//   //   //ia piesa adversarului daca este pion

//   // }

//   draw: function () {
//     let square = squareSize;
//     let ChessPiece = this.color + "_" + this.type;
//     image(
//       img[ChessPiece],
//       offsetX + this.column * square,
//       offsetY + this.row * square,
//       square,
//       square
//     );
//   },
// };
// export function initPieces() {
//   pieces = [];
//   let back_row = [
//     "tura",
//     "cal",
//     "nebun",
//     "regina",
//     "rege",
//     "nebun",
//     "cal",
//     "tura",
//   ];

//   for (let col = 0; col < 8; col++) {
//     // => pentru piesele negre
//     let p = Object.create(Piece);
//     p.init(0, col, back_row[col], "n"); //n se refera la negru
//     pieces.push(p);

//     let p2 = Object.create(Piece);
//     p2.init(1, col, "pion", "n");
//     pieces.push(p2);
//   }

//   for (let col = 0; col < 8; col++) {
//     // => pentru piesele albe
//     let p = Object.create(Piece);
//     p.init(6, col, "pion", "a"); // a se referea la alb
//     pieces.push(p);

//     let p2 = Object.create(Piece);
//     p2.init(7, col, back_row[col], "a");
//     pieces.push(p2);
//   }
// }
