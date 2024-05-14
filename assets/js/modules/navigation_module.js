
import { createPage } from '../site.js'

let navigationItems = ['drawPage', 'shotlistPage', 'logginPage']

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

    currentPage.classList.toggle('hidden');


    let myDrawPage = document.getElementById('drawPage');
    let myShotlistPage = document.getElementById('shotListPage');
    let myLoggingPage = document.getElementById('loggingPage');



    console.log(currentPage);


    switch (myPage) {

        case 'shotlistPage':
            //load shotlist page
            myShotlistPage.classList.toggle('hidden');
            currentPage = myShotlistPage
            createPage(myPage)

            break;

        case 'logginPage':
            //load shotlist page

            myLoggingPage.classList.toggle('hidden');
            currentPage = myLoggingPage
            createPage(myPage)
            break;

        case 'drawPage':
            //load shotlist page
            myDrawPage.classList.toggle('hidden');
            currentPage = myDrawPage
            createPage(myPage)
            break;

        default:
            //do nothing
            break;
    }



}