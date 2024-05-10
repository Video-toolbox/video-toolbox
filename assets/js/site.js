import { DrawEngine } from "./drawing.js";
import {InitStoryboard,CreateSlide,updateSlideImage,LoadSlideImage,LoadStoryboard} from "./modules/storyboard_module.js";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }

  // add draw engine to html id
export const drawEngine = new DrawEngine('canvas');

  // start storyboard
  let storyboardElement=document.getElementById('timeline');
  InitStoryboard(storyboardElement,drawEngine.SaveSLide())


  

let saveButton=document.getElementById('save');

saveButton.addEventListener('click',()=>{
updateSlideImage(drawEngine.SaveSLide())

})






let newSLide=document.getElementById('newSlide');

newSLide.addEventListener('click',()=>{
   // drawEngine.LoadSlide()
   drawEngine.ClearCanvas()
   CreateSlide(drawEngine.SaveSLide())


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


export function LoadSlideCallback(myIndex){

console.log('loading callback: '+myIndex);

drawEngine.LoadSlide(LoadSlideImage(myIndex))

//updateSlideImage(drawEngine.SaveSLide())

}





//console.log(`Local storage usage: ${localStorageSpace()}`);



function localStorageSpace() {
    var allStrings = '';
    for(var key in window.localStorage){
        if(window.localStorage.hasOwnProperty(key)){
            allStrings += window.localStorage[key];
        }
    }
    return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
};
