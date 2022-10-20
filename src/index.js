import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { renderMarkUp } from "./render";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const guard = document.querySelector(".guard");

const key = `30662426-21982097d0559eebc608a0eec`;
const baseUrl = `https://pixabay.com/api/`;
const baseUrlOptions = `image_type=photo&orientation=horizontal&safesearch=true`;

const lightbox = new SimpleLightbox('.gallery a', {
      captionSelector: "img",
      captionsData: "alt",
      captionDelay: 250,
});
const optionsObserve = {
    root: null,
    rootMargin: '30px',
    threshold: 1,
}   
let observer = new IntersectionObserver(onLoad, optionsObserve);
let findImage = "";
let page = 1;
let perPage = 40;
    


form.addEventListener("submit", onSubmit)

function onSubmit(e) {
    e.preventDefault();
    findImage = e.currentTarget.elements.searchQuery.value.toLowerCase().trim();
    if (!findImage) {
    Notiflix.Notify.failure("The field is empty")
    return;
    }
    
    else {
        apiPixabay(findImage).then(repsonse => {
            console.log(data);
            
        if (repsonse.data.total === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return;
        }
            Notiflix.Notify.info(`We found special for YOU! Total ${repsonse.data.total} photos`);
            const render = renderMarkUp(repsonse.data.hits);
            gallery.innerHTML = "";
            gallery.insertAdjacentHTML("beforeend", render)
            lightbox.refresh()
            observer.observe(guard);
    })
    

    }
}



async function apiPixabay(findImage) {
//    pixabay.com/api
    const response = await axios.get(`${baseUrl}?key=${key}&q=${findImage}&${baseUrlOptions}&per_page=${perPage}&page=${page}`)
    return response
    }

function onLoad(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            page += 1;
            apiPixabay(findImage).then(response => {
                console.log('page', page);
                const allPagesFetch = Math.ceil(response.data.totalHits / perPage);
                console.log(allPagesFetch);
                if (page < allPagesFetch) {
                const render = renderMarkUp(response.data.hits);
                gallery.insertAdjacentHTML("beforeend", render)
                lightbox.refresh();
                return;
                } Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.')
                return;
                
             
            })
        } 
    })
}
     
            
