




let DEBUG = true;
const url = 'https://tide-opalescent-sled.glitch.me/movies'



// ************************************************************************
                            // FETCH REQUEST TO API
// ************************************************************************

function movieFetchRequest(){
    const moviesObject = fetch(url);
    let loadingmsg = $('<div>');
    let loadEl = $('#load');
    loadingmsg.html("<b>loading</b>");
    loadEl.append(loadingmsg);

    moviesObject
        .then(response =>response.json())
        .then( data => {
            renderCards(data);
            if(DEBUG) {
                console.log(data);
            }
        })
        .finally(_ => {
            loadingmsg.remove();
        });
    //PROMISE COMPLETED
}

function renderCards(data) {
    let startHtml = ''
    for(let i=0 ;i<data.length ;i++){
        startHtml += renderMovieCards(data[i]);
    }
    $('#cards-container').html(startHtml);
    return data;
}



// ************************************************************************
                        // ADD MOVIE FUNCTION
// ************************************************************************

function addMovie() {

    let addMovieTitle=$('#movie-title').val();
    let addMovieGenre=$('#movie-genre').val();
    let addMovieRating=$('#movie-rating').val();
    let addMovieDescription=$('#movie-plot').val();
    let addMovieDirector=$('#movie-director').val();
    let addMovieYear=$('#movie-year').val();
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
    fetch(url,options).then(movieFetchRequest);
}



// ************************************************************************
                        // DELETE MOVIE FUNCTION
// ************************************************************************

function deleteMovie(id) {
    const removeMovie  = fetch(`${url}/${id}`, {

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

function editMovie(){
    const editMovieInfo = fetch(`${url}/id`, {

        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        //body: JSON.stringify(newMovieObj)
    })
        .then((response) => response.json())
        .catch(error => console.error(error)) /* handle errors */
}



// ************************************************************************
                            // RENDER CARDS
// ************************************************************************

function  renderMovieCards(movie) {

        let cardHTML= "";
        cardHTML +=

            `<div class="card mb-3">
                <div class="img">
                    <img class="card-img-top" src=${movie.poster} alt="Card image top">
                </div>                
                <div>
                    <button class="card-btn">Edit</button><button class="card-btn">Delete</button>
                </div>
                <div class="card-img-overlay">
                    <div class="text-background"  style = "width: 35%">
                        <h5 class="card-title card-text" id="title">${movie.title}</h5>
                        <p class="card-text" id="year">${movie.year}</p>
                        <p class="card-text" id="rating">${movie.rating}</p>
                    </div>                
                </div>
                <div class="card-body">    
                    <p class="card-text" id="plot">${movie.plot}</p>
                    <p class="card-text" id="genres">${movie.genre}</p>
                    <p class="card-text" id="director">${movie.director}</p>
                    <p class="card-text" id="cast">${movie.actors}</p>
                </div>            
            </div>`

    $('#rendered-card').html(cardHTML);


}

$(document).ready(function (){

    movieFetchRequest();
    $('#add-movie-btn').on('click', addMovie);

});
