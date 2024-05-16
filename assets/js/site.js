import { DrawEngine } from "./drawing.js";
import { InitStoryboard, CreateSlide, updateSlideImage, LoadSlideImage, LoadStoryboard } from "./modules/storyboard_module.js";
import InitNavigation from './modules/navigation_module.js'


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}

let globalNavElement=document.getElementById('globalNav');
let LocalToolbar=document.getElementById('localToolBar');

InitNavigation(globalNavElement)




// init drawEngine
export const drawEngine = new DrawEngine('canvas', 'localToolBar');





let storyboardElement = document.getElementById('timeline');

// start storyboard
createPage('drawPage')


let clearCache = document.getElementById('clearCache');

clearCache.addEventListener('click', () => {
    localStorage.clear();
    InitStoryboard(storyboardElement, drawEngine.SaveSLide())
})




export function LoadSlideCallback(myIndex) {

    drawEngine.LoadSlide(LoadSlideImage(myIndex))
}



export function createPage(myPage) {


   


    switch (myPage) {

        case 'shotlistPage':
            //load shotlist page
            console.log(LocalToolbar.innerHTML);
            LocalToolbar.innerHTML=""

           



            break;

        case 'logginPage':
            //load shotlist page
          
            LocalToolbar.innerHTML=""


            break;

        case 'drawPage':
          
        
            InitStoryboard(storyboardElement, drawEngine.SaveSLide())

            break;

        default:
            //do nothing
            break;
    }

}


