import { DrawEngine } from "./drawing.js";


const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext("2d");

const drawEngine = new DrawEngine('canvas');
console.log(drawEngine);