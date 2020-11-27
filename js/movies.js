$(document).ready(function (){

    const url = 'https://tide-opalescent-sled.glitch.me/movies'

    //  <----functions for 1. adding 2. editing 3. deleting----->

    const moviesObject = fetch(`${url}`)
        .then(response=>response.json())
        .then(data => {console.log(data)

    });
    //----------- loading------------------------
    function movieFetchRequest(){
        let loadingmsg = $('<div>');
        let loadEl = $('#load');
        loadingmsg.html("<b>loading</b>");
        loadEl.append(loadingmsg);
         // moviesObject
             // // .then(res => res.json())
             // .then(function (data) {
             //      let startHtml = ''
             //         for(let i=0;i<5;i++){
             //            startHtml += renderMovieCards(data,i);
             //     }
             //     ${'#main-container'}.html(startHtml)
             // })
             // .finally(f => {
             //         loadingmsg.remove();
             //     });
    }

    console.log(movieFetchRequest());

// <-----------function add a movie------------------->

function addMovie() {
    const addNewMovie = {
        actors: 'Chris Hemsworth, Robert Downey Jr.',
        directors: "Joss Whedon",
        genre: "Fantasy",
        id: 5,
        plot: "Superheros fight bad guys",
        poster: "",
        rating: 5,
        title: 'Avengers',
        year: "2012"
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addNewMovie),

    };

}

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
    function  renderMovieCards(data) {
           starthtml+=
               `<div class="card">
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
