
import { createPage } from '../site.js'

let navigationItems = ['drawPage', 'shotlistPage', 'logginPage']// print page

let currentPage = document.getElementById(navigationItems[0]);

export default function InitNavigation(navElement) {

    console.log('building nav in: ' + navElement);
    let myNavElement = document.createElement('nav')
    myNavElement.classList.add('appNavigation')


    navigationItems.forEach(element => {

        let myButton = document.createElement('button')
        myButton.id = element + 'Button'
        myButton.setAttribute("data-page", element);
        myButton.innerText = element
        myButton.addEventListener('click', navCallback)


        myNavElement.appendChild(myButton)
    });


    navElement.innerHTML = ""
    navElement.appendChild(myNavElement)
}


function navCallback(e) {

    let myPage = e.target.dataset.page;
    console.log(myPage);

    currentPage=myPage


    console.log(currentPage);


    switch (myPage) {

        case 'shotlistPage':
            //load shotlist page
          
           
            createPage(myPage)

            break;

        case 'logginPage':
            //load shotlist page

            createPage(myPage)
            break;

        case 'drawPage':
            //load shotlist page
        
            createPage(myPage)
            break;

        default:
            //do nothing
            break;
    }



}