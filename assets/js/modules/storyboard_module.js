import { ReadObject, SaveObject } from "./localstorage_object_module.js";
import { LoadSlideCallback,drawEngine } from "../site.js";

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
  LoadStoryboard()

 // CreateStoryboard("test story", "bo", "new storyboard",imageData);

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



  activeStoryboard.slides.push(activeSlide);
  currentSlide = activeStoryboard.slides.length - 1;

  console.log('createSlide current: '+currentSlide);

  SaveStoryboard();
  ShowStoryboard();
}

export function LoadSlideImage(mySlide){
   
    currentSlide= mySlide

    
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

export function DeleteSlide(myIndex){
   activeStoryboard.slides.splice(myIndex, 1);
  if(currentSlide >= myIndex){
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
  ShowStoryboard() 
}


function ShowStoryboard() {

    StoryboardElement.innerHTML = '';
  //StoryboardElement.innerHTML = `<h2>${activeStoryboard.info.name}</h2>`;

  activeStoryboard.slides.forEach((slide,index) => {

   

    var img = new Image();
    //img.src = dataURL;
    
    img.src = slide.image;


    

        let mySlide = document.createElement("div");

        mySlide.classList.add("slide");
        if(index=== currentSlide){
            
            mySlide.classList.add("activeSlide");
           }

  
        mySlide.addEventListener('click',()=>{
  LoadSlideCallback(index);
        })
  
       
        mySlide.appendChild(img);

       // mySlide.setAttribute("data-index", index);
       let myDelete = document.createElement("img");
       myDelete.addEventListener('click',()=>{
        DeleteSlide(index);
              })
              myDelete.src=' assets/img/delete-icon.svg'
              myDelete.classList.add("slide-delete-icon");
          mySlide.appendChild(myDelete);

        StoryboardElement.appendChild(mySlide);
  
  });
}
