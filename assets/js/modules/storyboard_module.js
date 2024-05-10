import { ReadObject, SaveObject } from "./localstorage_object_module.js";
import { LoadSlideCallback } from "../site.js";

export let StoryboardElement = null;
 let currentSlide = 0;

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

export function InitStoryboard(myElement,imageData) {
  StoryboardElement = myElement;
  CreateStoryboard("test story", "bo", "new storyboard",imageData);
}

export function CreateStoryboard(name, author, description,imageData) {
  activeStoryboard = {
    slides: [],
    info: {
      name: name,
      author: author,
      description: description,
    },
  };

  CreateSlide(imageData);

  console.log(activeStoryboard);
}

export function CreateSlide(myImagedata) {
  activeSlide = {
    info: {
      title: "Slide " + (activeStoryboard.slides.length + 1),
      description: "",
      dialog: "",
      duration: 2,
    },
    image: myImagedata
  };
  activeStoryboard.slides.push(activeSlide);
  currentSlide = activeStoryboard.slides.length - 1;
  console.log(currentSlide);

  SaveStoryboard();
  ShowStoryboard();
}

export function LoadSlideImage(mySlide){
    console.log('returning slide: '+mySlide);
    currentSlide= mySlide

    return activeStoryboard.slides[currentSlide].image


}

export function updateSlideImage(myImage) {
    console.log('updateSlideImage: '+currentSlide);
  activeStoryboard.slides[currentSlide].image = myImage;
  console.table(activeStoryboard.slides);
  SaveStoryboard();
  ShowStoryboard();
}

export function updateSlideData(myData) {
  activeStoryboard.slides[currentSlide].info = myData;
  SaveStoryboard();
}

export function SaveStoryboard() {
  SaveObject(activeStoryboard, "activeStoryboard");
}

export function LoadStoryboard() {
  activeStoryboard = ReadObject("activeStoryboard");
}

function ShowStoryboard() {
    StoryboardElement.innerHTML = '';
  //StoryboardElement.innerHTML = `<h2>${activeStoryboard.info.name}</h2>`;

  activeStoryboard.slides.forEach((slide,index) => {
    var img = new Image();
    //img.src = dataURL;
    img.src = slide.image;

    img.onload = function () {

      let mySlide = document.createElement("div");
      mySlide.classList.add("slide");

      mySlide.addEventListener('click',()=>{


LoadSlideCallback(index);

      })

      //mySlide.innerHTML = `<h3>${slide.info.title}</h3>`;
      mySlide.appendChild(img);
      StoryboardElement.appendChild(mySlide);
    };
  });
}
