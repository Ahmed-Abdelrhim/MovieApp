const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=705d258d411a635c022f629a0324b915';
const Img_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=705d258d411a635c022f629a0324b915&query="';
const APi = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
let form = document.getElementById('form');
let search = document.getElementById('search');
let main = document.getElementById('main');

getMovie(API_URL);
async function getMovie(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovie(data.results);
}

function showMovie(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie;
        console.log(poster_path);
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
                
                    <img src = "${'https://image.tmdb.org/t/p/w500' + poster_path}"
                    alt = "${title}" >
                    <div class = "movie-info" >
                        <h3> ${title} </h3> 
                        <span class = "green" > ${vote_average} </span> 
                    </div> 
                    <div class = "overview">
                        <h3> overview </h3>
                        ${overview}
                    </div> 
        `
        main.appendChild(movieEl);
    });
}
document.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('movie')) {
        let movieTitle = e.target.parentElement.children[1].children[0].innerText;
        console.log(movieTitle);
        getMovie(SEARCH_API + movieTitle);
        search.value = ''
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        getMovie(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
})
