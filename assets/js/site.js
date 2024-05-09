import { DrawEngine } from "./drawing.js";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }

  

// add draw engine to html id
const drawEngine = new DrawEngine('canvas');

let saveButton=document.getElementById('save');

saveButton.addEventListener('click',()=>{
    drawEngine.SaveSLide()
    console.log();

})


let loadButton=document.getElementById('load');

loadButton.addEventListener('click',()=>{
    drawEngine.LoadSlide()
    

})


let clearButton=document.getElementById('clear');

clearButton.addEventListener('click',()=>{
    drawEngine.ClearCanvas()
    

})

let eraserButton=document.getElementById('eraser');

eraserButton.addEventListener('click',()=>{
    drawEngine.SetColor([255,255,255,1])
    

})

let pencilButton=document.getElementById('pencil');

pencilButton.addEventListener('click',()=>{
    drawEngine.SetColor([1,1,1,1])
    

})







console.log(`Local storage usage: ${localStorageSpace()}`);



function localStorageSpace() {
    var allStrings = '';
    for(var key in window.localStorage){
        if(window.localStorage.hasOwnProperty(key)){
            allStrings += window.localStorage[key];
        }
    }
    return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
};