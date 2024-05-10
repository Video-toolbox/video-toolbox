import { DrawEngine } from "./drawing.js";
import {InitStoryboard,CreateSlide,updateSlideImage,LoadSlideImage,LoadStoryboard} from "./modules/storyboard_module.js";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }

  // add draw engine to html id


export const drawEngine = new DrawEngine('canvas','toolBar');

  // start storyboard
  let storyboardElement=document.getElementById('timeline');
  InitStoryboard(storyboardElement,drawEngine.SaveSLide())


  

let clearCache=document.getElementById('clearCache');

clearCache.addEventListener('click',()=>{
   
    localStorage.clear();
    InitStoryboard(storyboardElement,drawEngine.SaveSLide())

})
 


export function LoadSlideCallback(myIndex){
console.trace();
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
