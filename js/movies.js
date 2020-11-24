$(document).ready(function (){


// functions for 1. adding 2. editing 3. deleting

    function addMovie(){
        var  movieName=fetch('https://codeup-json-server.glitch.me/movies')
         movieName.then(response=>response.json())
        console.log(response.json);
    }




//    ending document.ready
});