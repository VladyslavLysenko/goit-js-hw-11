import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { apiPixabay } from "./apiPixabay";

const form = document.querySelector(".search-form");
const loadMore = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery");
let findImage = "";
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
    

    
    function manageRenderMarkup(data) {
        if (!findImage) {
            Notiflix.Notify.failure("The field is empty")
        } else {
            const render = renderMarkUp(data.hits)
            gallery.insertAdjacentHTML("beforeend", render)
            lightbox.refresh()
        }
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

 
//  loadMore.addEventListener("сlick", onLoad)

    

// function onLoad(findImage) {
//     apiPixabay(data).then(data => {
//         if (data.total === 0) {
//         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//         } else {
//     manageRenderMarkup(data)  
//         }
     
// })  
//  }

