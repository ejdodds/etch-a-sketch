
function generateTiles() {
  const sketchWidth = sketch.clientWidth;
  const sketchHeight = sketch.clientHeight;
  let totalBox = 16 * 16;
  
  const boxWidth = sketchWidth / 16;
  const boxHeight = sketchHeight / 16;
  
  for (let i = 0 ; i < totalBox ; i++) {
    
    let box = document.createElement("div");
    box.style.cssText = `width: ${boxWidth}px; height: ${boxHeight}px; border: 1px solid #000000; margin: 0;`;
    
    box.classList.add("box");
    sketch.appendChild(box);
    
    
  }
  
  
}

const sketch = document.querySelector(".container-sketch");

document.addEventListener("load", generateTiles());