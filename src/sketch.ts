import p5 from "p5";
import { store } from './store';
import { snapshot } from 'valtio';
import { createNStateGrid, getGrid, positiveNegativeZero } from './grid';

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(800, 800);
    p.noLoop();
  };

  const calculateRegion = (x: number, y: number) => {
    // const expY = calculateExpY(x);
    const f = (x:number,y:number)=>Math.pow(x,2)-y*2
    let value = positiveNegativeZero(f(x,y))
    const gap = store.gapSize;

    // Create a continuous gap band
    if (value===0) {
        return 'gap';
    } else if (value>=0) {
        return 'upper';
    } else {
        return 'lower';
    }
  };

  const drawCell = (x: number, y: number, size: number) => {
    

    const region = calculateRegion(x, y);
    
    if (region === 'gap') return;

    // Set color based on region
    if (region === 'upper') {
      p.stroke(store.upperColor);
    } else {
      p.stroke(store.lowerColor);
    }
    
    // Randomly choose between horizontal or vertical line
    if (p.random() < store.horizontalChance) {
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
    globalThis.debug = state.debug
    // Setup drawing parameters
    p.background(state.backgroundColor);
    p.strokeWeight(state.strokeWeight);
    let grid = getGrid((x,y)=>x-y,-p.width/2,p.width/2,-p.height/2,p.height/2,state.cellSize)
    // Draw grid of cells
    grid.forEach((row,y)=>{
      row.forEach((col,x)=>{
        p.strokeWeight(state.strokeWeight);
        drawCell(x*state.cellSize, y*state.cellSize, state.cellSize);
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
