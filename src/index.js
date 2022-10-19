import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");



form.addEventListener("submit", onSubmit)

let lightbox = new SimpleLightbox('.gallery a', {
      captionSelector: "img",
      captionsData: "alt",
      captionDelay: 250,
});
    
function onSubmit(e) {
    e.preventDefault();
    let findImage = e.currentTarget.elements.searchQuery.value.toLowerCase().trim();
    apiPixabay(findImage)
    
    function apiPixabay(findImage) {
        //    pixabay.com/api
        const key = `30662426-21982097d0559eebc608a0eec`;
        const baseUrl = `https://pixabay.com/api/`;
        const perPage = `40`
        const baseUrlOptions = `image_type=photo&orientation=horizontal&safesearch=true`;
        const page = `1`
        
        return fetch(`${baseUrl}?key=${key}&q=${findImage}&${baseUrlOptions}&per_page=${perPage}&page=${page}`)
            
            .then(response => {

        console.log(response);
       
        if (!response.ok) {
            Notify.failure("Sorry, have a problem with server. Please try again.")
            throw new Error('fail')
        }
        return response.json()
    })
    .then(data => {
        if (data.total === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}
      manageRenderMarkup(data)  
    })
}
    
    function manageRenderMarkup(data) {
    if (!findImage) {
        Notiflix.Notify.failure("The field is empty")
    } else {
        
        const render = renderMarkUp(data.hits)
        
        gallery.insertAdjacentHTML("beforeend", render)
    }
        lightbox.refresh()
    
}


}


function renderMarkUp(arrPhotos) {
     return arrPhotos.map(
      ({
        largeImageURL,
        previewURL,
        tags,
        likes,
        views,
        comments,
        downloads,
         }) =>
         {return `<div class="gallery__item">
            <a class="gallery__link" href="${largeImageURL}">
                <img class="gallery__image" src="${previewURL}" alt="${tags}" />
            </a>
                <div class="info">
                    <p class="gallery__text">Likes ${likes}</p>
                    <p class="gallery__text">Views ${views}</p>
                    <p class="gallery__text">Comments ${comments}</p>
                    <p class="gallery__text">Downloads ${downloads}</p
                </div>
    </div>`
         }).join('');

     
     

 }

 

