import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderMarkUp } from "./render";

const form = document.querySelector(".search-form");
// const loadMore = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery");
let findImage = "";
let render = "";
let lightbox = new SimpleLightbox('.gallery a', {
      captionSelector: "img",
      captionsData: "alt",
      captionDelay: 250,
});
    


form.addEventListener("submit", onSubmit)


function onSubmit(e) {
    e.preventDefault();
    findImage = e.currentTarget.elements.searchQuery.value.toLowerCase().trim();
    apiPixabay(findImage).then(data => {
        if (data.total === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
      manageRenderMarkup(data)  
    })
    
    function apiPixabay(data) {
        //    pixabay.com/api
        const key = `30662426-21982097d0559eebc608a0eec`;
        const baseUrl = `https://pixabay.com/api/`;
        const perPage = `40`;
        const fetchPage = `1`;
        const baseUrlOptions = `image_type=photo&orientation=horizontal&safesearch=true`;
        
        return fetch(`${baseUrl}?key=${key}&q=${findImage}&${baseUrlOptions}&per_page=${perPage}&page=${fetchPage}`)
            .then(response => {
                // console.log(response);
                if (!response.ok) {
                    Notify.failure("Sorry, have a problem with server. Please try again.")
                    throw new Error('fail')
                } else {
               return response.json()
                }
     
             })

    }
    
    function manageRenderMarkup(data) {
        if (!findImage) {
            Notiflix.Notify.failure("The field is empty")
        } else {
            render = renderMarkUp(data.hits)
            gallery.insertAdjacentHTML("beforeend", render)
             lightbox.refresh()
          
        }
    }
  //  Infinity scroll
    const guard = document.querySelector(".guard");
    let options = {
        root: null,
        rootMargin: '30px',
        threshold: 1,
    }

    let observer = new IntersectionObserver(onLoad, options);
    let page = 0;
    apiPixabay(page=1).then(data => {
        gallery.insertAdjacentHTML("beforeend", renderMarkUp(data.hits));
        observer.observe(guard);
    })

    function onLoad(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                page+=1
                apiPixabay(page).then(data => {
                    gallery.insertAdjacentHTML("beforeend", renderMarkUp(data.hits));
                })  
            }
        });
    

    }

}




