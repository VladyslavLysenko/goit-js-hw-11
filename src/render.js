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
                <div class="info">
                    <p class="gallery__text">Likes ${likes}</p>
                    <p class="gallery__text">Views ${views}</p>
                    <p class="gallery__text">Comments ${comments}</p>
                    <p class="gallery__text">Downloads ${downloads}</p
                </div>
    </div>`
         }).join('');

     
     

 }
