import { ReadObject, SaveObject } from "./localstorage_object_module.js";
import { LoadSlideCallback, drawEngine } from "../site.js";

export let StoryboardElement = null;
export let currentSlide = 0;
let slideInfoElement = null;

export let activeStoryboard = {
  slides: [],
  info: {
    name: "test",
    author: "John Doe",
    description: "This is a test storyboard",
  },
};

export let activeSlide = {
  info: {
    title: "Slide 1",
    description: "This is the first slide",
    dialog: "This is some sample dialog for the first slide",
    duration: 2,
  },
  image: null,
};

export function InitStoryboard(myElement, imageData) {

  StoryboardElement = document.getElementById('timeline');

  slideInfoElement = document.getElementById('slideInfo');
  LoadStoryboard()

  if (!activeStoryboard) {
    CreateStoryboard("test story", "bo", "new storyboard", imageData);
  }
}


export function CreateStoryboard(name, author, description, imageData) {
  activeStoryboard = {
    slides: [],
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
      duration: 2,
    },
    image: myImagedata
  };



  activeStoryboard.slides.push(activeSlide);
  currentSlide = activeStoryboard.slides.length - 1;

  console.log('createSlide current: ' + currentSlide);

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
  activeStoryboard.slides.splice(myIndex, 1);
  if (currentSlide >= myIndex) {
    currentSlide--;
  }
  LoadSlideCallback(myIndex)
  SaveStoryboard();
  ShowStoryboard();
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
      console.log('load slide image click');
      LoadSlideCallback(index);
    })

    mySlide.appendChild(img);

    // mySlide.setAttribute("data-index", index);
    let myDelete = document.createElement("img");
    myDelete.addEventListener('pointerdown', () => {
      DeleteSlide(index);
    })
    myDelete.src = ' assets/img/delete-icon.svg'
    myDelete.classList.add("slide-delete-icon");
    mySlide.appendChild(myDelete);

    StoryboardElement.appendChild(mySlide);

  });

  let newslideButton = document.createElement("button");
  newslideButton.innerText = '+'
  newslideButton.addEventListener('pointerdown', () => {




    drawEngine.ClearCanvas();

    CreateSlide(drawEngine.SaveSLide())

  })

  StoryboardElement.appendChild(newslideButton);

  showBoardInfo()

}

function showBoardInfo() {
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

}

function infoCallBack(e) {

  let myInfo = activeStoryboard.slides[currentSlide].info;
  let myField = e.target.dataset.fieldname;
  myInfo[myField] = e.target.value


}
