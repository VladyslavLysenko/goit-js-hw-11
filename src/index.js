import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");


form.addEventListener("submit",onSubmit)

function onSubmit(e) {
    e.preventDefault();
    let findImage = e.currentTarget.elements.searchQuery.value.toLowerCase().trim();
    apiPixabay()

function apiPixabay(keyWord) {
//    pixabay.com/api
    const baseUrl = `https://pixabay.com/api/`;
    const key = `30662426-21982097d0559eebc608a0eec`;
    const baseUrlOptions = `image_type=photo&orientation=horizontal&safesearch=true`;
    const perPage = `9`
    const page = `9`
    
    return fetch(`${baseUrl}?key=${key}&q=${findImage}&${baseUrlOptions}&per_page=${perPage}&page=${page}`).then(response => {
        if (!response.ok) {
            throw new Error('fail')
        }
        return response.json()
    }).then(data => {
        // console.log(data.hits)
        const render = renderMarkUp(data.hits)
        // console.log(render);
        gallery.insertAdjacentHTML("beforeend",render )
    })
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
         {
             return `<div class="gallery__item">
      <a class="gallery__link" href="${largeImageURL}">
            <img class="gallery__image" src="${previewURL}" alt="${tags}" />
         </a>
         <p class="gallery__text">Likes ${likes}</p>
         <p class="gallery__text">Views ${views}</p>
         <p class="gallery__text">Comments ${comments}</p>
          <p class="gallery__text">Downloads ${downloads}</p>
    </div>`
         }).join('');
     

 }

 
let lightbox = new SimpleLightbox('.gallery a', {
      captionSelector: "img",
      captionsData: "alt",
      captionDelay: 250,
    });

