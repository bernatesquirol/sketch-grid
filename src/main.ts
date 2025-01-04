import p5 from "p5";
import * as dat from 'dat.gui';
import { store } from './store';
import sketch from "./sketch";
import { subscribe } from 'valtio';
import init, { p5SVG } from 'p5.js-svg'

const canvas = document.getElementById("sketch");

// Initialize dat.GUI
const gui = new dat.GUI();

// Add controls
gui.add(store, 'debug').name('Debug Mode');
gui.add(store, 'seed').name('Seed');
gui.add(store, 'cellSize', 5, 50).step(1);
gui.add(store, 'strokeWeight', 0.5, 5).step(0.5);
gui.add(store, 'horizontalChance', 0, 1).step(0.05).name('Horizontal Probability');
gui.add(store, 'exponentBase', 1.1, 5).step(0.1).name('Exp Base');
gui.add(store, 'exponentScale', 0.001, 0.02).step(0.001).name('Exp Scale');
gui.add(store, 'gapSize', 0, 30).step(1).name('Gap Size');
gui.addColor(store, 'upperColor').name('Upper Color');
gui.addColor(store, 'lowerColor').name('Lower Color');
gui.addColor(store, 'backgroundColor');
init(p5)

// Setup p5 instance
const p5Instance = new p5(sketch, canvas!);

// Subscribe to store changes to trigger redraws
subscribe(store, () => {
  p5Instance.redraw();
});
