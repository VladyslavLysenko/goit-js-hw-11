import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderMarkUp } from "./render";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const guard = document.querySelector(".guard");
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
        apiPixabay(findImage).then(data => {
        if (data.total === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return;
        }
            Notiflix.Notify.info(`Holy sh*t! We found special for YOU! Total ${data.total} photos`);
            const render = renderMarkUp(data.hits);
            gallery.innerHTML = "";
            gallery.insertAdjacentHTML("beforeend", render)
            lightbox.refresh()
            observer.observe(guard);
    })
    

    }
}

    function apiPixabay(findImage) {
        //    pixabay.com/api
        const key = `30662426-21982097d0559eebc608a0eec`;
        const baseUrl = `https://pixabay.com/api/`;
        const baseUrlOptions = `image_type=photo&orientation=horizontal&safesearch=true`;
        
        return fetch(`${baseUrl}?key=${key}&q=${findImage}&${baseUrlOptions}&per_page=${perPage}&page=${page}`)
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

function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      apiPixabay(findImage).then(data => {
        console.log('page', page);
        console.log('2', data.totalHits / perPage);
        console.log('3', Math.ceil(data.totalHits / perPage));
        if (
          data.totalHits > 0 &&
          page > Math.ceil(data.totalHits / perPage)
        ) {
            console.log('We are sorry, but you have reached the end of search results.');
        //   Notify.warning(
        //     'We are sorry, but you have reached the end of search results.',
        //     optionsNotify
        //   );
          return;
        }
        const render = renderMarkUp(data.hits);
        gallery.insertAdjacentHTML("beforeend", render)
        lightbox.refresh();
      });
    }
  });
}
