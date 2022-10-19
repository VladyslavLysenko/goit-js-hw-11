    export function apiPixabay(findImage) {
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
                } else {
               return response.json()
                }
     
             })

    }