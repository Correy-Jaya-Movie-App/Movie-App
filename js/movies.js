$(document).ready(function (){
let j;
    const url = 'https://tide-opalescent-sled.glitch.me/movies'

    //  <----functions for 1. adding 2. editing 3. deleting----->

    const moviesObject = fetch(`${url}`)

    let loadingmsg = $('<div>');
    let loadEl = $('#load');
    loadingmsg.html("<b>loading</b>");
    loadEl.append(loadingmsg);

    //----------- loading------------------------
    function movieFetchRequest(){
         moviesObject
             .then(response =>response.json())
             .then( data => {
                  let startHtml = ''
                     for(let i=0 ;i<5 ;i++){
                        startHtml += renderMovieCards(data,i);
                 }
                 $('#main-container').html(startHtml)
             })
             .finally(f => {
                     loadingmsg.remove();
                 });
    }

    console.log(movieFetchRequest());

// <-----------function add a movie------------------->

function addMovie() {
    const addNewMovie = {
        title: "tenet",
        rating: "5",
        poster: "https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_SX300.jpg",
        year: "2020",
        genre: "Action, Sci-Fi",
        director: "Christopher Nolan",
        plot: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
        actors: "Elizabeth Debicki, Robert Pattinson, John David Washington, Aaron Taylor-Johnson",
        id: 3
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addNewMovie),

    };

}

    console.log(addMovie());

    //<-----------------------function to delete a movie----------------------->
            function deleteMovie() {

                const removeMovie  = fetch(`${url}/id`, {

                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((response) => response.json())
                    .catch(error => console.error(error)) /* handle errors */
            }
//function to edit a movie


    function editMovie(){
        const editMovieInfo = fetch(`${url}/id`, {

        method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .catch(error => console.error(error)) /* handle errors */
    }


//____________________Render cards------------------
    function  renderMovieCards(data,j) {
           let html= `<div class="card">`
               html+=`
                 <img class="card-img-top" src="" alt="Card image top">
                 <div class="card-body">
                        <h3 class="card-title">Movie title</h3>
                        <h4 class="card-subtitle">Movie Description</h4>
                        <p class="card-text">This is a simple Card example</p>
                     </div></div>`
                   return html;
    }
//    ending document.ready

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
