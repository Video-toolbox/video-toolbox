import { DrawEngine } from "./drawing.js";
import { InitStoryboard, CreateSlide, updateSlideImage, LoadSlideImage, LoadStoryboard } from "./modules/storyboard_module.js";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}



// add draw engine to html id


export const drawEngine = new DrawEngine('canvas', 'toolBar');

// start storyboard
let storyboardElement = document.getElementById('timeline');

InitStoryboard(storyboardElement, drawEngine.SaveSLide())




let clearCache = document.getElementById('clearCache');

clearCache.addEventListener('click', () => {
    localStorage.clear();
    InitStoryboard(storyboardElement, drawEngine.SaveSLide())
})



export function LoadSlideCallback(myIndex) {
    console.log('loading callback: ' + myIndex);
    drawEngine.LoadSlide(LoadSlideImage(myIndex))
}



