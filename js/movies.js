let DEBUG = true;
const url = 'https://tide-opalescent-sled.glitch.me/movies'
const apiKeyOmdb = 'http://img.omdbapi.com/?apikey=[9bad961]&'

let movieList = [];


// ************************************************************************
// FETCH REQUEST TO MOVIE API
// ************************************************************************

function movieFetchRequest() {

    const moviesObject = fetch(url);
    let loadingmsg = $('<div>');
    let loadEl = $('#load');
    loadingmsg.html("<b>loading</b>");
    loadEl.append(loadingmsg);

    moviesObject
        .then(response => response.json())
        .then(data => {
            movieList = data;
            renderCards(data);
            if (DEBUG) {
                console.log(data);
            }
        })
        .finally(_ => {
            loadingmsg.remove();
        });
    //PROMISE COMPLETED
}

function renderCards(data) {
    let parent = $('#cards-container');
    parent.empty();
    for (let i = 0; i < data.length; i++) {
        renderMovieCards(data[i], parent);
    }
    return data;
}


// ************************************************************************
// ADD MOVIE FUNCTION
// ************************************************************************

function addMovie(e) {
    e.preventDefault();
    let addMovieTitle = $('#movie-title').val();
    let addMovieGenre = $('#movie-genre').val();
    let addMovieRating = $('#movie-rating').val();
    let addMovieDescription = $('#movie-plot').val();
    let addMovieDirector = $('#movie-director').val();
    let addMovieYear = $('#movie-year').val();
    let addMovieActor = $('#movie-actors').val();
    let addMoviePoster = "https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy.jpg";

    const newMovieObj = {
        title: addMovieTitle,
        rating: addMovieRating,
        poster: addMoviePoster,
        year: addMovieYear,
        genre: addMovieGenre,
        director: addMovieDirector,
        plot: addMovieDescription,
        actors: addMovieActor
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovieObj),
    };
    // INSERT NEW MOVIE
    fetch(url, options).then(function (e) {
        movieFetchRequest();
    }).catch(e => {
        alert("Something went wrong")
    })
}


// ************************************************************************
// DELETE MOVIE FUNCTION
// ************************************************************************

function deleteMovie(id) {
    const removeMovie = fetch(`${url}/${id}`, {

        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json()).then(movieFetchRequest)
        .catch(error => console.error(error)) /* handle errors */
}


// ************************************************************************
// EDIT MOVIE FUNCTION
// ************************************************************************


$('#update-movie-btn').on('click',function (e) {
    e.preventDefault();
    updateMovie($('#update-id').val())
})

function updateMovie(index) {

    const a = {

        title: $('#movie-title').val(),
        genre: $('#movie-genre').val(),
        rating: $('#movie-rating').val(),
        plot: $('#movie-plot').val(),
        director: $('#movie-director').val(),
        year: $('#movie-year').val(),
        actors: $('#movie-actors').val(),
        poster: "https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy.jpg"

    }

    const editMovieInfo = fetch(`${url}/${index}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(a)
    }).then((response) => response.json())
        .then(movieFetchRequest)
        .catch(error => console.error(error)) /* handle errors */


}


// ************************************************************************
// RENDER CARDS
// ************************************************************************

function renderMovieCards(movie, parentContainer) {

    let cardEl = $('<div>');
    cardEl.attr("class", "col-8 col-md-8");

    let cardHTML =

        `<div class="card mb-3">
                <div class="img">
                    <img class="card-img-top" src=${movie.poster} alt="Card image top">
                </div>                
                <div>                        
                    <button class="card-btn" onclick="editForm(${movieList.indexOf(movie)})" id="edit">Edit</button><button class="card-btn" onclick="deleteMovie(${movie.id})">Delete</button>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-8">
                            <h2 class="card-title card-text" id="title">${movie.title}</h2>
                            <p class="card-text" id="plot">${movie.plot}</p>
                            <p class="card-text" id="genres">${movie.genre}</p>
                        </div>
                        <div class="col-4">
                            <p class="card-text" id="rating"><em>Rating:</em> ${movie.rating}</p>
                            <p class="card-text" id="director"><em>Director:</em> ${movie.director}</p>
                            <p class="card-text" id="cast"><em>Cast:</em> ${movie.actors}</p>
                            <p class="card-text" id="year"><em>Released:</em> ${movie.year}</p>
                        </div>
                    </div>
                </div>            
            </div>`
    cardEl.html(cardHTML);
    parentContainer.append(cardEl)

}

function editForm(index) {
    $("#add-movie-btn").hide();
    $("#update-movie-btn").show();
    let movie = movieList[index];

    $('#movie-title').val(movie.title);
    $('#movie-genre').val(movie.genre);
    $('#movie-rating').val(movie.rating);
    $('#movie-plot').val(movie.plot);
    $('#movie-director').val(movie.director);
    $('#movie-year').val(movie.year);
    $('#movie-actors').val(movie.actors);

    $('#update-id').val(movie.id);
};


$(document).ready(function () {
    movieFetchRequest();
    $('#add-movie-btn').on('click', addMovie);
    $('#update-movie-btn ').hide()

});
