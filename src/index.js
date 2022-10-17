import './css/styles.css';
import Notiflix from 'notiflix';
const form = document.querySelector(".search-form");

form.addEventListener("submit", onSubmit)


function onSubmit(e) {
    e.preventDefault();

    const findImage = e.currentTarget.elements.searchQuery.value;
    console.log(findImage);
     fetchImages(findImage)

   
}

 function fetchImages(findImage) {
    let image = findImage.toLowerCase().trim();
    
    if (!image) {
        findImage.innerHTML = "";
    }
    else {
        const resp = fetch(`https://pixabay.com/api/?key=30662426-21982097d0559eebc608a0eec&q=${image}&image_type=photo&orientation=horizontal&safesearch =true`)
        resp.then(response =>{
            if (!response.ok) {

                  findImage.innerHTML = "";
                Notiflix.Notify.failure("Oops, there is no country with that name")
            }
            return response.json()   
        }) 
        .then(data => {
           console.log(data);
        }).catch(err => console.log(err))
    }
        
}