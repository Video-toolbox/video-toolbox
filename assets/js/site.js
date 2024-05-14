import { DrawEngine } from "./drawing.js";
import { InitStoryboard, CreateSlide, updateSlideImage, LoadSlideImage, LoadStoryboard } from "./modules/storyboard_module.js";
import InitNavigation from './modules/navigation_module.js'


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}

let storyboardElement = document.getElementById('timeline');

// init drawEngine
export const drawEngine = new DrawEngine('canvas', 'toolBar');





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
            InitStoryboard(storyboardElement, drawEngine.SaveSLide())

            break;

        default:
            //do nothing
            break;
    }

}


