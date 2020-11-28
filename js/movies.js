let j;
let DEBUG = false;
const url = 'https://tide-opalescent-sled.glitch.me/movies'

//  <----functions for 1. adding 2. editing 3. deleting----->




//----------- loading------------------------
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
    //Promise completed
}

function renderCards(data) {
    let startHtml = ''
    for(let i=0 ;i<data.length ;i++){
        startHtml += renderMovieCards(data[i]);
    }
    $('#main-container').html(startHtml);
    return data;
}
// <-----------function add a movie------------------->

function addMovie() {
    let addMovieTitle=$('#movie-title').val()
    let addMovieGenre=$('#movie-genre').val()
    let addMovieRating=$('#movie-rating').val()
    let addMovieDescription=$('#movie-plot').val()
    let addMovieDirector=$('#movie-director').val()
    let addMovieYear=$('#movie-year').val()

    const newMovieObj = {
        title: addMovieTitle,
        rating: addMovieRating,
        poster: "https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_SX300.jpg",
        year: addMovieYear,
        genre: addMovieGenre,
        director: addMovieDirector,
        plot: addMovieDescription,
        actors: "Elizabeth Debicki, Robert Pattinson, John David Washington, Aaron Taylor-Johnson",
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovieObj),
    };
    // insert new movie
    fetch(url,options).then(movieFetchRequest);
};


//<-----------------------function to delete a movie----------------------->
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
//function to edit a movie


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




//<-----------------------------Render cards-------------------------->
function  renderMovieCards(movie) {
    let html= `<div class="card" >`
    html+=`
                 <img class="card-img-top" style="width: 200px" src=${movie.poster} alt="Card image top">
                 <div class="card-body">
                        <h3 class="card-title">${movie.title}</h3>
                        <h4 class="card-subtitle">Movie Description</h4>
                        <p class="card-text">This is a simple Card example</p>
                        <p><button onclick='deleteMovie(${movie.id})'>Delete</button></p>
                     </div></div>`
    return html;
}

$(document).ready(function (){

    movieFetchRequest();
    $('#addMovieBtn').on('click', addMovie);

});


// let table = $('<table>');
// data.forEach(movie=> {
//     let tdTitle = $('<td>');
//     tdTitle.html(movie.title);
//     let tdActor = $('<td>');
//     tdActor.html(movie.actors);
//     let tr = $('<tr>')
//     tr.append(tdTitle);
//     tr.append(tdActor);
//     table.append(tr)
// });
// $('body').append(table);



// const url = 'https://tide-opalescent-sled.glitch.me/movies';
