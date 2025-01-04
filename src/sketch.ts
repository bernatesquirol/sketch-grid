import p5 from "p5";
import { store } from './store';
import { snapshot } from 'valtio';
import { createNStateGrid, getGrid, positiveNegativeZero } from './grid';
import init, { p5SVG } from 'p5.js-svg'

init(p5)
import seedrandom from 'seedrandom'
const sketch = (p: p5SVG) => {
  p.setup = () => {
    p.createCanvas(800, 800, p.SVG);
    p.noLoop();
    // Initialize seeded random function
  };

  

  const drawCell = (x: number, y: number, value:number, size: number) => {
    // const region = calculateRegion(x, y);
    if (value === 0) return;
    // Set color based on region
    if (value > 0) {
      p.stroke(store.upperColor);
    } else {
      p.stroke(store.lowerColor);
    }
    
    // Use seededRandom instead of p.random
    if (globalThis.random() < store.horizontalChance) {
      // Horizontal line
      p.line(x, y + size/2, x + size, y + size/2);
    } else {
      // Vertical line
      p.line(x + size/2, y, x + size/2, y + size);
    }
    if (globalThis.debug) {
      // Draw the border of the cell in grey
      p.stroke(150); // Set stroke color to grey
      p.strokeWeight(1); // Set a thin stroke for the border
      p.noFill(); // No fill for the border
      p.rect(x, y, size, size); // Draw the cell border
    }
  };

  p.draw = () => {
    const state = snapshot(store);
    globalThis.random = seedrandom(state.seed)
    globalThis.debug = state.debug
    // Setup drawing parameters
    p.background(state.backgroundColor);
    p.strokeWeight(state.strokeWeight);
    // const f = (x,y)=>x-y
    const f = (x:number,y:number)=>Math.pow(x,0.5)-y*2
    let grid = getGrid(f,-p.width/2,p.width/2,-p.height/2,p.height/2,state.cellSize)
    // Draw grid of cells
    grid.forEach((row,y)=>{
      row.forEach((value,x)=>{
        p.strokeWeight(state.strokeWeight);
        drawCell(x*state.cellSize, y*state.cellSize, value, state.cellSize);
      })
    })
    // for (let x = -p.width/2; x < p.width/2; x += state.cellSize) {
    //   for (let y = -p.height/2; y < p.height/2; y += state.cellSize) {
    //     p.strokeWeight(state.strokeWeight);
    //     drawCell(x, y, state.cellSize);
    //   }
    // }
  };

  // Redraw when mouse is pressed
  p.mousePressed = () => {
    p.redraw();
  };
};

export default sketch;
