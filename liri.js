// --------------------------------------------------------------------------------------
//  Testing parameters
// 
// node liri.js movie-this Frozen
// node liri.js movie-this Avengers Endgame
// 
// --------------------------------------------------------------------------------------

// code to read and set any environment variables with the dotenv package 
// require("dotenv").config();

// code required to import the keys.js file and store it in a variable 
// var keys = require("./keys.js");

// Grab the axios package...
var axios = require("axios");

// access Spotify keys information
// var spotify = new Spotify(keys.spotify);

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line arguments to capture the first argument
var action = inputString[2];

// allow for multi-word inputs (Activity 23-GeocoeNPM)
// take the inputstring from index 3 to the en and create a new array using the slice() method
// take that resulting array and join it back as a string with a " " separating the words
var target = inputString.slice(3).join(" "); 

// perform an action based on what action was requested
switch(action) {
    case "concert-this":
        concertThis(target);
        break;
    
    case "spotify-this-song":
        spotifyThis(target);
        break;

    case "movie-this":
        movieThis(target);
        break;

    case "do-what-it-says":
        readRandom(randomFile)
        break;

    default:
        console.log('No Action To Take!');
        break;
};

function concertThis(artist = "Celine Dion") {
// concert-this
// node liri.js concert-this <artist/band name here>
// 
// This will search the Bands in Town Artist Events API 
// ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") 
// for an artist and render the following information about each event to the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

};

function spotifyThis(song = "The Sign") {
// spotify-this-song
// node liri.js spotify-this-song '<song name here>'
// 
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// 
// If no song is provided then your program will default to "The Sign" by Ace of Base.

};

// --------------------------------------------------------------------------------------
//  function to build and perform the API call to OMDB for a given movie 
// 
//  Parameter values:
// 
//  movie - the movie as provided (default = "Mr. Nobody")
// 
// --------------------------------------------------------------------------------------
function movieThis(movie = "Mr. Nobody") {
    
    // bulid the movie parameter for search based on the user input passed into the function
    movie = movie.replace(" ", "+");

    // build the OMDB API quey with the movie specified  (Activity 17-OMDB-Axios)
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    // create a request with axios to the queryUrl
    axios.get(queryUrl)
        
    // If the request with axios is successful
    .then( function(response) {
        // Title of the movie.
        console.log("Title:  " + response.data.Title);
        // Year the movie came out.
        console.log("Released Year:  " + response.data.Released.substring(7));
        // IMDB Rating of the movie
        console.log("IMDB Rating:  " + response.data.imdbRating);
        // Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes Rating:  " + findRatings(response.data.Ratings));
        // Country where the movie was produced.
        console.log("Country:  " + response.data.Country);
        // Language of the movie.
        console.log("Language:  " + response.data.Language);
        // Plot of the movie.
        console.log("Plot:  " + response.data.Plot);
        // Actors in the movie.
        console.log("Actors:  " + response.data.Actors);
    })
    // If the request with axios is unsuccessful
    .catch(function(error) {
        console.log("Error in call to OMDB:  " + error);
    });

};
// --------------------------------------------------------------------------------------
//  end of movieThis() function 
// --------------------------------------------------------------------------------------

function readRandom(fname) {
// do-what-it-says
// node liri.js do-what-it-says
// 
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

};

// --------------------------------------------------------------------------------------
//  function to sort through the Ratings Array returned by OMDB to get a specific one
// 
//  Parameter values:
// 
//  array - the ratings array from the response
//  key - the object key to search for (default = 'Source')
//  value - the value of the key to be retrieved (efault = 'Rotten Tomatoes')
// --------------------------------------------------------------------------------------
function findRatings(array, key='Source', value='Rotten Tomatoes') {

    // iterate over the passed in array
    for (var i = 0; i < array.length; i++) {

        // see if the object key ("Source") is equal to the search string
        if (array[i][key] === value) {

            // return the value from the key "Value" field
            return array[i]["Value"];

        }

    }

    // if the requested Ratings are not found
    return null;

};
// --------------------------------------------------------------------------------------
//  end of findRatings() function 
// --------------------------------------------------------------------------------------