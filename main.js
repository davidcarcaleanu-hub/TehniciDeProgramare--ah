import { initPieces } from "./Pieces.js";
import { boardSize, offsetX, offsetY, name } from "./config.js";
 function draw() { //desenarea tablei 


      background(0);
    //   offsetX = (width - boardSize) / 2;
    //   offsetY = (height - boardSize) / 2;
      name.black = document.getElementById("playerBlack").value;
      name.white = document.getElementById("playerWhite").value;
      restartButton.draw();

      for (let i = 0; i < 8; i++) {
        //bucla orizontala
        for (let j = 0; j < 8; j++) {
          // bucla verticala
          if ((i + j) % 2 == 0) {
            fill(255); //alb
          } else {
            fill(100); //negru
          }
          rect(
            offsetX + i * squareSize,
            offsetY + j * squareSize,
            squareSize,
            squareSize
          );
        }
      }


      if (selectedPiece) { //coloreaza fundalul casutei cu galben in momentul in care selectam o piesa
        let square = squareSize;
        fill(255, 255, 0, 150);
        rect(
          offsetX + selectedPiece.column * squareSize,
          offsetY + selectedPiece.row * squareSize,
          squareSize,
          squareSize,
        )
      }

      for (let i = 0; i < pieces.length; i++) {
        pieces[i].draw();
      }

    }

function setup() {
    let canvas = createCanvas(700, 700);
    canvas.parent("canvas-holder");
    noStroke();
    background(0);
    initPieces();
}

function mousePressed() {

}

window.draw = draw;
window.setup = setup;
window.mousePressed = mousePressed;


