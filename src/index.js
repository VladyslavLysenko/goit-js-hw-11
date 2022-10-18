import './css/styles.css';
import Notiflix from 'notiflix';
const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");


form.addEventListener("submit", onSubmit)
function onSubmit(e) {
    e.preventDefault();
    const findImage = e.currentTarget.elements.searchQuery.value;

function apiPixabay() {
//    pixabay.com/api
    const baseUrl = `https://pixabay.com/api/`;
    const key = `30662426-21982097d0559eebc608a0eec`;
    const baseUrlOptions = `image_type=photo&orientation=horizontal&safesearch=true`;
    const perPage = `3`
    const page = `9`
    
    return fetch(`${baseUrl}?key=${key}&q=${findImage}&${baseUrlOptions}&per_page=${perPage}&page=${page}`).then(response => {
        if (!response.ok) {
            throw new Error('fail')
        }
        return response.json()
    })
}
   apiPixabay().then(console.log)
}


// hello



//  function fetchImages(findImage) {
//     let image = findImage.toLowerCase().trim();
    
//     if (!image) {
//         findImage.innerHTML = "";
//     }
//     else {
//         const resp = fetch(`https://pixabay.com/api/?key=30662426-21982097d0559eebc608a0eec&q=${image}&image_type=photo&orientation =horizontal&safesearch =true&per_page=9&page=1`)
//         resp.then(response =>{
//             if (!response.ok) {
//                   findImage.innerHTML = "";
//                 Notiflix.Notify.failure("Oops, there is no country with that name")
//             }
//             return response.json()   
//         }) 
//         .then(data => {
//             console.log(data);
//             for (let index = 0; index < data.length; index++) {
    
//     const markup = data.reduce((acc, image) =>
//      acc + 
//      `<div class="gallery__item">
//         <a class="gallery__item" href="${image.largeImageURL}">
//         <img class="gallery__image" src="${image.webformatUR}" alt="${image.tags}" />
//         </a>
//     </div>`, "")

//     gallery.insertAdjacentHTML("beforeend", markup)
//     console.log(markup);
// }

//         }).catch(err => console.log(err))
//     }
        
//  }




// //  webformatURL - ссылка на маленькое изображение для списка карточек.
// // largeImageURL - ссылка на большое изображение.
// // tags - строка с описанием изображения. Подойдет для атрибута alt.
// // likes - количество лайков.
// // views - количество просмотров.
// // comments - количество комментариев.
// // downloads - количество загрузок.