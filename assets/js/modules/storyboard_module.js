import { ReadObject, SaveObject } from "./localstorage_object_module.js";

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

export function InitStoryboard(myElement) {
  StoryboardElement = myElement;
  CreateStoryboard("test story", "bo", "new storyboard");
}

export function CreateStoryboard(name, author, description) {
  activeStoryboard = {
    slides: [],
    info: {
      name: name,
      author: author,
      description: description,
    },
  };
  CreateSlide();

  console.log(activeStoryboard);
}

export function CreateSlide() {
  activeSlide = {
    info: {
      title: "Slide " + (activeStoryboard.slides.length + 1),
      description: "",
      dialog: "",
      duration: 2,
    },
    image: null,
  };
  activeStoryboard.slides.push(activeSlide);
  currentSlide = activeStoryboard.slides.length - 1;

  SaveStoryboard();
  ShowStoryboard();
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

export function SaveStoryboard() {
  SaveObject(activeStoryboard, "activeStoryboard");
}

export function LoadStoryboard() {
  activeStoryboard = ReadObject("activeStoryboard");
}

function ShowStoryboard() {
  StoryboardElement.innerHTML = `<h2>${activeStoryboard.info.name}</h2>`;

  activeStoryboard.slides.forEach((slide) => {
    var img = new Image();
    //img.src = dataURL;
    img.src = slide.image;

    img.onload = function () {
      let mySlide = document.createElement("div");
      mySlide.classList.add("slide");
      //mySlide.innerHTML = `<h3>${slide.info.title}</h3>`;
      mySlide.appendChild(img);
      StoryboardElement.appendChild(mySlide);
    };
  });
}
