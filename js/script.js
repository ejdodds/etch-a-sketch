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

/* This function checks which color mode is currently active before applying color to a grid. */
function colorApply(grid) {
  
  if (colorMode === "monochrome") {
     monochrome(grid);
     
  } else if (colorMode === "randomize") {
     randomize(grid);
  }
}

/* This function changes the current color mode to another mode and changes the button colors. */
function changeColorMode(mode) {
  const buttonOn = "on";
  const buttonOff = "off";
  
  if (mode === "monochrome" && !buttonMonochrome.classList.contains(buttonOn)) {
    
    colorMode = "monochrome";
    
    buttonMonochrome.classList.toggle(buttonOn);
    buttonRandomize.classList.toggle(buttonOn);
    
    
  } else if (mode === "randomize" && !buttonRandomize.classList.contains(buttonOn)) {
    
    colorMode = "randomize";
    
    buttonRandomize.classList.toggle(buttonOn);
    buttonMonochrome.classList.toggle(buttonOn);
    
  }
}

/* This function applies progressive black color. */
function monochrome(grid) {
  
  const gridColor = grid.style["background-color"];
  let gridOpacity = Number(grid.style["opacity"]);
  const colorBlack = "rgb(0, 0, 0)";
  
  if (gridColor === "" || gridColor !== colorBlack) {
    grid.style["background-color"] =  "rgb(0, 0, 0)";
    grid.style["opacity"] = "0.1";
    
  } else if (gridOpacity < 1) {
    gridOpacity += 0.1;
    grid.style["opacity"] = String(gridOpacity.toFixed(1));
  } 
  
}

/* This function applies random RGB color to a grid. */
function randomize(grid) {
  
    grid.style["background-color"] =  `rgb(${generateRandomIntensity()}, ${generateRandomIntensity()}, ${generateRandomIntensity()})`;
    
}

/* This function generates random number from 0 to 255 for the RGB function. */
function generateRandomIntensity() {
  
  return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
  
}

const sketch = document.querySelector(".container-sketch");
const buttonMonochrome = document.querySelector(".button-monochrome");
const buttonRandomize = document.querySelector(".button-randomize");

/* this event handler generates the initial boxes inside the sketch board after the page loads and sets the monochrome color mode on. */
window.addEventListener("load", () => {
  
  generateTiles();
  colorMode = "monochrome";
  buttonRandomize.classList.toggle("on");
  
});

let colorMode;

const options = document.querySelectorAll(".options button");

/* This event handler captures all events that occur from any of the option buttons. */
options.forEach(button => {
  button.addEventListener("click", event => {
    const buttonClass = event.target.classList;
    
    if (buttonClass.contains("button-grid-size")) {
      removeTiles();
      generateTiles(gridInput());
      
    } else if (buttonClass.contains("button-randomize")) {
      changeColorMode("randomize");
      
    } else if (buttonClass.contains("button-monochrome")) {
      changeColorMode("monochrome");
    }
    
  });
  
});

/* This event handler captures event that occur within the sketch area and applies a color depending on the currently active color mode.*/
sketch.addEventListener("click", event => {
  
  const grid = event.target;
  colorApply(grid);
  
});