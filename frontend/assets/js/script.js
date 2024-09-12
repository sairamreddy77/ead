var pageEl = document.querySelector("#page");
var newReleases = [];

fetch("https://www.omdbapi.com/?i=tt3896198&apikey=68149114")
    .then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        console.log("here 1");
    })
    .catch(err => {
        console.error(err);
    });

fetch("https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb")
    .then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });

// search by popularity in descending order 
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w200'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query="';

pageEl.innerHTML = "<h2 class='title'>New Releases</h2>";
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    newReleases = data.results;

    showMovies(data.results)
    console.log(data.results)
}

function showMovies(movies) {


    movies.forEach((movie, index) => {
        var { title, poster_path, overview, id } = movie;


        var cardContainerEl = document.createElement("div");
        cardContainerEl.classList.add("col", "s12", "m2");

        var cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardContainerEl.appendChild(cardEl);

        var cardImageContainerEl = document.createElement('div');
        cardImageContainerEl.className = 'card-image vert';
        cardEl.appendChild(cardImageContainerEl);

        var imgEl = document.createElement('img');
        if (!poster_path) {
            imgEl.src = "./assets/images/movie-not-found.jpg";
        } else {
            imgEl.src = IMG_PATH + poster_path;
        }


        var cardContentEl = document.createElement('div');
        cardContentEl.className = "card-content";
        cardContentEl.innerHTML = `<p>${overview}`;
        cardEl.appendChild(cardContentEl);


        cardImageContainerEl.appendChild(imgEl);


        var cardActionEl = document.createElement("div");

        cardActionEl.classList.add("card-action", "truncate");
        cardActionEl.innerHTML = ("<a href='https://www.themoviedb.org/movie/" + id + "' target='_blank'>" + title + "</a>"); //need to search by movie id, not title
        cardEl.appendChild(cardActionEl);
        pageEl.appendChild(cardContainerEl);

    })

}



var form = document.getElementById('form');
var search = document.getElementById('search')

form.addEventListener("submit", (event) => {
    event.preventDefault();

    var searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        pageEl.innerHTML = ''
        pageEl.innerHTML = "<h2 class='title'>Your Results:</h2>"
        getMovies(SEARCH_API + searchTerm);
        search.value = '';

    } else {
        window.location.reload();
    }
})
