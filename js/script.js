/* This function generates grids for the sketch board */
function generateTiles(grids = 16) {
  
  /* sketchWidth and sketchHeight contain the width and the height of the sketch board in pixels, respectively. */
  const sketchWidth = sketch.clientWidth;
  const sketchHeight = sketch.clientHeight;
  
  /* totalBox contains the total boxes inside the sketch box depending on the number of grids in width and height sides. */
  let totalBox = grids * grids;
  
  /* boxWidth and boxHeight contain the sizes of the boxes in pixels based on the number of boxes per side. */
  const boxWidth = sketchWidth / grids;
  const boxHeight = sketchHeight / grids;
  
  for (let i = 0 ; i < totalBox ; i++) {
    
    let box = document.createElement("div");
    box.style.cssText = `width: ${boxWidth}px; height: ${boxHeight}px; border: 1px solid #000000; margin: 0;`;
    box.classList.add("box");
    sketch.appendChild(box);
  }
}

/* This function removes all the boxes inside the sketch board. */
function removeTiles() {
  let boxes = sketch.querySelectorAll(".box")
  
  boxes.forEach(box => {
    sketch.removeChild(box);
  });
}

/* This function asks the user for number of grids for each side of the sketch board that passes the number range condition.  */
function gridInput() {
  let validInput = true;
  let grid = "";
  
  while (validInput) {
    grid = parseInt(prompt("Enter number of grids per side: "));
    if (grid <= 100) {
      validInput = false;
    }
  }
  return grid;
}

const sketch = document.querySelector(".container-sketch");

/* this event handler generates the initial boxes inside the sketch board after the page loads. */
document.addEventListener("load", generateTiles());

const buttonGridSize = document.querySelector(".button-grid-size");

buttonGridSize.addEventListener("click", () => {
  removeTiles();
  generateTiles(gridInput());
});