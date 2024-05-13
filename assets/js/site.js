import { DrawEngine } from "./drawing.js";
import { InitStoryboard, CreateSlide, updateSlideImage, LoadSlideImage, LoadStoryboard } from "./modules/storyboard_module.js";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}


let activePage=document.getElementById('drawPage');


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

    drawEngine.LoadSlide(LoadSlideImage(myIndex))
}

// menu bar  create dynamic menu later

let myShotListbutton = document.getElementById('shotList');
myShotListbutton.setAttribute("data-page", 'shotlist');

myShotListbutton.addEventListener('click',menuCallback)

let myLoggingButton = document.getElementById('logging');
myLoggingButton.setAttribute("data-page", 'logging');

myLoggingButton.addEventListener('click',menuCallback)


let myDrawButton = document.getElementById('drawButton');
myDrawButton.setAttribute("data-page",'draw');

myDrawButton.addEventListener('click',menuCallback)


function menuCallback(e){

    activePage.classList.toggle('hidden');


    let myDrawPage=document.getElementById('drawPage');
    let myShotlistPage=document.getElementById('shotListPage');
    let myLoggingPage=document.getElementById('loggingPage');


let myPage=e.target.dataset.page;

console.log(myPage);


switch(myPage){

    case 'shotlist':
    //load shotlist page
    myShotlistPage.classList.toggle('hidden');
    activePage=myShotlistPage
   

    break;

    case 'logging':
        //load shotlist page
  
    myLoggingPage.classList.toggle('hidden');
    activePage=myLoggingPage
        break;

        case 'draw':
            //load shotlist page
            myDrawPage.classList.toggle('hidden');
            activePage=myDrawPage

            break;

  default:
    //do nothing
    break;
}

}


