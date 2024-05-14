import { ReadObject, SaveObject } from "./localstorage_object_module.js";
import { LoadSlideCallback, drawEngine } from "../site.js";

export let StoryboardElement = null;
export let currentSlide = 0;
let slideInfoElement = null;
let boardInfoElement = null;

export let activeStoryboard = {
  slides: [],
  scenes: [],
  info: {
    name: "test",
    author: "John Doe",
    description: "This is a test storyboard"
  }
};

export let activeScene = {
  info: {
    title: "Scene 1",
    description: "This is the first scene",
    slides: []
  }
};


export let activeSlide = {
  info: {
    title: "Slide 1",
    description: "This is the first slide",
    dialog: "This is some sample dialog for the first slide",
    duration: 2000,
    scene: 0,
  },
  image: null,

};


let firstRun = true

export function InitStoryboard(myElement, imageData) {

  if (firstRun) {
    firstRun = false

    StoryboardElement = document.getElementById('timeline');

    slideInfoElement = document.getElementById('slideInfo');
    boardInfoElement = document.getElementById('boardInfo');

    let boardInfoButton = document.getElementById('showBoardInfo');

    boardInfoButton.addEventListener('click', () => {
      showBoardInfo()
    })

    let newslideButton = document.getElementById('newSlideButton');



    newslideButton.addEventListener('click', () => {


      drawEngine.ClearCanvas();
      CreateSlide(drawEngine.SaveSLide())
    })
  }



  LoadStoryboard()

  if (!activeStoryboard) {
    CreateStoryboard("test story", "bo", "new storyboard", imageData);
  }

  showBoardInfo()
}


export function CreateStoryboard(name, author, description, imageData) {
  activeStoryboard = {
    slides: [],
    scenes: [activeScene],
    info: {
      name: name,
      author: author,
      description: description,
    },
  };

  CreateSlide(imageData);

}


export function CreateSlide(myImagedata) {




  activeSlide = {
    info: {
      title: "Slide " + (activeStoryboard.slides.length + 1),
      description: "This is a frame",
      dialog: "lots of talk",
      duration: 2000,
      scene: 0,
    },
    image: myImagedata
  };



  activeStoryboard.slides.push(activeSlide);
  currentSlide = activeStoryboard.slides.length - 1;



  SaveStoryboard();
  ShowStoryboard();
}

export function LoadSlideImage(mySlide) {


  currentSlide = mySlide

  ShowStoryboard()
  return activeStoryboard.slides[currentSlide].image


}



export function updateSlideImage(myImage) {


  activeStoryboard.slides[currentSlide].image = myImage;

  SaveStoryboard();
  ShowStoryboard();


}


export function updateSlideData(myData) {
  activeStoryboard.slides[currentSlide].info = myData;
  SaveStoryboard();
}

export function DeleteSlide(myIndex) {

  if (activeStoryboard.slides.length > 1) {
    activeStoryboard.slides.splice(myIndex, 1);

    //if (currentSlide >= myIndex) {

    if (currentSlide > 0) {
      currentSlide--;
    }

    console.log('DeleteSlide ' + currentSlide);

    LoadSlideCallback(currentSlide)
    SaveStoryboard();
    ShowStoryboard();
  }

}




export function SaveStoryboard() {
  SaveObject(activeStoryboard, "activeStoryboard");
}


export function LoadStoryboard() {
  activeStoryboard = ReadObject("activeStoryboard");
  if (activeStoryboard) {
    ShowStoryboard()
  }

}


function ShowStoryboard() {

  StoryboardElement.innerHTML = '';
  //StoryboardElement.innerHTML = `<h2>${activeStoryboard.info.name}</h2>`;


  activeStoryboard.slides.forEach((slide, index) => {
    var img = new Image();

    img.src = slide.image;
    let mySlide = document.createElement("div");

    mySlide.classList.add("slide");
    if (index === currentSlide) {
      mySlide.classList.add("activeSlide");
    }

    mySlide.addEventListener('pointerdown', () => {

      LoadSlideCallback(index);
    })

    mySlide.appendChild(img);

    // mySlide.setAttribute("data-index", index);
    let myDelete = document.createElement("img");

    myDelete.addEventListener('pointerdown', (e) => {
      e.stopPropagation()
      DeleteSlide(index);
    })
    myDelete.src = ' assets/img/delete-icon.svg'
    myDelete.classList.add("slide-delete-icon");
    mySlide.appendChild(myDelete);

    StoryboardElement.appendChild(mySlide);

  });
  showFrameInfo()

}

function showFrameInfo() {

  let myInfo = activeStoryboard.slides[currentSlide].info;

  slideInfoElement.innerHTML = ""



  let myLabel = document.createElement('label')
  myLabel.innerText = 'Title'

  slideInfoElement.appendChild(myLabel)

  let myTitle = document.createElement('input')
  myTitle.value = myInfo.title
  myTitle.addEventListener('change', infoCallBack)

  myTitle.setAttribute("data-fieldName", 'title');


  slideInfoElement.appendChild(myTitle)



  myLabel = document.createElement('label')
  myLabel.innerText = 'Desctiption'

  slideInfoElement.appendChild(myLabel)

  let myDescription = document.createElement('textarea')
  myDescription.value = myInfo.description
  myDescription.classList.add('inputField')

  myDescription.addEventListener('change', infoCallBack)

  myDescription.setAttribute("data-fieldName", 'description');

  slideInfoElement.appendChild(myDescription)



  myLabel = document.createElement('label')
  myLabel.innerText = 'Dialog'

  slideInfoElement.appendChild(myLabel)

  let myDialog = document.createElement('textarea')
  myDialog.value = myInfo.dialog
  myDialog.addEventListener('change', infoCallBack)

  myDialog.setAttribute("data-fieldName", 'dialog');

  myDialog.classList.add('inputField')

  slideInfoElement.appendChild(myDialog)



  myLabel = document.createElement('label')
  myLabel.innerText = 'Duration in ms'

  slideInfoElement.appendChild(myLabel)

  let myDuration = document.createElement('input')
  myDuration.value = myInfo.duration


  myDuration.addEventListener('change', infoCallBack)

  myDuration.setAttribute("data-fieldName", 'duration');

  slideInfoElement.appendChild(myDuration)




  /////////// scene info
  myLabel = document.createElement('label')
  myLabel.innerText = 'Scene'

  slideInfoElement.appendChild(myLabel)


  let myScene = document.createElement('input')


  myScene.value = activeStoryboard.scenes[myInfo.scene].info.title

  myScene.addEventListener('change', infoCallBack)

  myScene.setAttribute("data-fieldName", 'scene');

  slideInfoElement.appendChild(myScene)

}

function infoCallBack(e) {

  let myInfo = activeStoryboard.slides[currentSlide].info;
  let myField = e.target.dataset.fieldname;
  myInfo[myField] = e.target.value

}


function showBoardInfo() {

  let myInfo = activeStoryboard.info;

  slideInfoElement.innerHTML = ""


  let myLabel = document.createElement('label')
  myLabel.innerText = 'Title'

  slideInfoElement.appendChild(myLabel)

  let myTitle = document.createElement('input')
  myTitle.value = myInfo.name
  myTitle.addEventListener('change', boardInfoCallBack)

  myTitle.setAttribute("data-fieldName", 'name');


  slideInfoElement.appendChild(myTitle)

  myLabel = document.createElement('label')
  myLabel.innerText = 'Author'

  slideInfoElement.appendChild(myLabel)

  let myAuthor = document.createElement('input')
  myAuthor.value = myInfo.author
  myAuthor.addEventListener('change', boardInfoCallBack)

  myAuthor.setAttribute("data-fieldName", 'author');


  slideInfoElement.appendChild(myAuthor)



  myLabel = document.createElement('label')
  myLabel.innerText = 'Description'

  slideInfoElement.appendChild(myLabel)

  let myDescription = document.createElement('textarea')
  myDescription.value = myInfo.description
  myDescription.classList.add('inputField')

  myDescription.addEventListener('change', boardInfoCallBack)

  myDescription.setAttribute("data-fieldName", 'description');

  slideInfoElement.appendChild(myDescription)

}

function boardInfoCallBack(e) {
  let myInfo = activeStoryboard.info;
  let myField = e.target.dataset.fieldname;
  myInfo[myField] = e.target.value

}
