import { DrawEngine } from "./drawing.js";
import { InitStoryboard, CreateSlide, updateSlideImage, LoadSlideImage, LoadStoryboard } from "./modules/storyboard_module.js";
import InitNavigation from './modules/navigation_module.js'


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}



// init drawEngine
export const drawEngine = new DrawEngine('canvas', 'toolBar');





// start storyboard
createPage('drawPage')




/* let clearCache = document.getElementById('clearCache');

clearCache.addEventListener('click', () => {
    localStorage.clear();
    InitStoryboard(storyboardElement, drawEngine.SaveSLide())
}) */




export function LoadSlideCallback(myIndex) {

    drawEngine.LoadSlide(LoadSlideImage(myIndex))
}




// menu bar  create dynamic menu later
/* 
let myShotListbutton = document.getElementById('shotList');
myShotListbutton.setAttribute("data-page", 'shotlist');

myShotListbutton.addEventListener('click', navCallback)

let myLoggingButton = document.getElementById('logging');
myLoggingButton.setAttribute("data-page", 'logging');

myLoggingButton.addEventListener('click', navCallback)


let myDrawButton = document.getElementById('drawButton');
myDrawButton.setAttribute("data-page", 'draw');

myDrawButton.addEventListener('click', navCallback)

 */
export function createPage(myPage) {


    console.log('createPage: ' + myPage);


    switch (myPage) {

        case 'shotlistPage':
            //load shotlist page


            InitNavigation(document.getElementById('shotlistPageNav'))



            break;

        case 'logginPage':
            //load shotlist page
            InitNavigation(document.getElementById('loggingPageNav'))

            break;

        case 'drawPage':
            InitNavigation(document.getElementById('drawNav'))
            let storyboardElement = document.getElementById('timeline');
            InitStoryboard(storyboardElement, drawEngine.SaveSLide())

            break;

        default:
            //do nothing
            break;
    }

}


