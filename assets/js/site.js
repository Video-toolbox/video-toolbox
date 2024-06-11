import { InitStoryboard, CreateSlide, updateSlideImage, LoadSlideImage, LoadStoryboard } from "./modules/storyboard_module.js";
import InitNavigation from './modules/navigation_module.js'
import initShotList from './modules/shotList_module.js'
import initLogging  from './modules/logging_module.js'  


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}

let globalNavElement=document.getElementById('globalNav');
let LocalToolbar=document.getElementById('localToolBar');
let appElement=document.getElementById('app');

InitNavigation(globalNavElement)



//let storyboardElement = document.getElementById('timeline');

// start storyboard

createPage('shotlistPage')


/* let clearCache = document.getElementById('clearCache');

clearCache.addEventListener('click', () => {
    localStorage.clear();
    InitStoryboard(storyboardElement, drawEngine.SaveSLide())
}) */




 export function LoadSlideCallback(myIndex) {
    drawEngine.LoadSlide(LoadSlideImage(myIndex))
}



export function createPage(myPage) {

 switch (myPage) {

        case 'shotlistPage':
           
            initShotList(appElement)

            break;

        case 'logginPage':
            initLogging(appElement)
            break;

        case 'drawPage':
          
           
            InitStoryboard(appElement)

            break;

        default:
           
            break;
    }

}


