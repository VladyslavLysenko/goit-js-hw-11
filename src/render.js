export function renderMarkUp(arrPhotos) {
    
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
                <div class="gallery__item__info">
                    <p class="gallery__text">Likes<span class="text">${likes}</span></p>
                    <p class="gallery__text">Views<span class="text">${views}</span></p>
                    <p class="gallery__text">Comments<span class="text">${comments}</span></p>
                    <p class="gallery__text">Downloads<span class="text">${downloads}</span></p>
                </div>
    </div>`
         }).join('');

     
     

 }


//  export function renderMarkUp(arrPhotos) {
    
//      return arrPhotos.map(
//       ({
//         largeImageURL,
//         previewURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//          }) =>
//          {
//              return `<div class="gallery__item">
//              <p class="gallery__text">Likes ${likes}</p>
//              <p class="gallery__text">Views ${views}</p>
//                  </div>`
//          }).join('');

     
     

//  }
