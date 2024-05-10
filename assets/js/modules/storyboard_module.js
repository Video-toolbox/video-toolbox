import { ReadObject, SaveObject } from "./localstorage_object_module.js";
import { LoadSlideCallback } from "../site.js";

export let StoryboardElement = null;
 export let currentSlide = 0;

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

}


export function CreateSlide(myImagedata) {
    

  activeSlide = {
    info: {
      title: "Slide " + (activeStoryboard.slides.length + 1),
      description: "",
      dialog: "",
      duration: 2,
    },
    image:myImagedata
  };

  console.log(activeSlide);

  activeStoryboard.slides.push(activeSlide);
  currentSlide = activeStoryboard.slides.length - 1;

  console.log('createSlide current: '+currentSlide);

  SaveStoryboard();
  ShowStoryboard();
}

export function LoadSlideImage(mySlide){
   
    currentSlide= mySlide

    console.log('returning slide: '+currentSlide);
    ShowStoryboard()
    return activeStoryboard.slides[currentSlide].image


}



export function updateSlideImage(myImage) {
    console.log('updateSlideImage: '+currentSlide);
    console.log(activeStoryboard);

  activeStoryboard.slides[currentSlide].image = myImage;
  
  //SaveStoryboard();
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

    console.log('drawing: '+index);

    var img = new Image();
    //img.src = dataURL;
    
    img.src = slide.image;


    

        let mySlide = document.createElement("div");
        mySlide.classList.add("slide");
  
        mySlide.addEventListener('click',()=>{
  
  console.log('assigning index: '+index);
  LoadSlideCallback(index);
  
        })
  
        //mySlide.innerHTML = `<h3>${slide.info.title}</h3>`;
        mySlide.appendChild(img);
        mySlide.setAttribute("data-index", index);
        StoryboardElement.appendChild(mySlide);
  
  });
}
