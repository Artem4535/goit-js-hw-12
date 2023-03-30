import { axios } from "axios";

import marcup from './marcup/marcup'
import { searchImage } from './fetch'
import Notiflix from "notiflix";



const refs = {
    form: document.querySelector('form'),
    input: document.querySelector('input'),
    searchButton: document.querySelector('button'),
    galleryContainer: document.querySelector('.gallery'),
    searchMoreBtn: document.querySelector('.load-more')
}


refs.form.addEventListener('submit', searchButtonClick);
refs.searchMoreBtn.addEventListener('click', searchMore)
let numberOfPage = 1;
let currentValue = '';
const per_page = 40;


async function searchButtonClick(e) {
    
    e.preventDefault()
    await resetNumberOfPage()
    await resetMurcup()
    
    
    
    currentValue = e.currentTarget.searchQuery.value.trim();
        // resetNumberOfPage()
    asynkFunction(currentValue, numberOfPage)
    
  
   
}

async function asynkFunction(currentValue, numberOfPage) {
    
    try {
         await increment()
   
    const response = await searchImage(currentValue, numberOfPage)
    if (response.data.totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
    }
     if (response.data.totalHits < (numberOfPage * 40)) {
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
         console.log('svsd')
         refs.searchMoreBtn.style.display = 'none'
         return
     }
        refs.searchMoreBtn.style.display = 'block';
    
    const images = await response.data.hits;
    
    creareMarcup(images)
        
    } catch (error) {
       handlerErorr()
    }
   
}

 function searchMore() {
     asynkFunction(currentValue, numberOfPage)
     


}


 function creareMarcup(value) {
    const marcupEl = marcup(value)
    refs.galleryContainer.insertAdjacentHTML('beforeend', marcupEl)
}

async function resetNumberOfPage() {
    numberOfPage = 1;
}

async function increment() {
   return  numberOfPage += 1   
}

async function resetMurcup() {
    refs.galleryContainer.innerHTML = '';
}

function handlerErorr(error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    console.error(error);
}







