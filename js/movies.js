$(document).ready(function (){

    const url = 'https://tide-opalescent-sled.glitch.me/movies';
//  <----functions for 1. adding 2. editing 3. deleting----->

    const moviesObject = fetch(`${url}`);

    function movieFetchRequest(){
         moviesObject
             .then($('#load').append('Loading'))
             .then((response)=> response.json())
             .then( (data)=>{
                 console.log(data);
             }).then()
            .catch( error => console.error(error) ); /* handle errors */
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
    // const url = 'https://tide-opalescent-sled.glitch.me/movies';
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
                const removeMovie  = fetch(`${url}`, {

                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((response) => response.json())
                    .then(data => {console.log(data);
                    })
                    .catch(error => console.error(error)) /* handle errors */
            }

    // console.log(deleteMovie());


//    ending document.ready
});
