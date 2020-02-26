// code to read and set any environment variables with the dotenv package 
require("dotenv").config();

// code required to import the keys.js file and store it in a variable 
var keys = require("./keys.js");

// access Spotify keys information
var spotify = new Spotify(keys.spotify);

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line arguments to capture the first argument
var action = inputString[2];
var target = inputString[3]; 

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

function movieThis(movie = "Mr. Nobody") {
// movie-this
// node liri.js movie-this '<movie name here>'
// 
// Title of the movie.
// Year the movie came out.
// IMDB Rating of the movie
// Rotten Tomatoes Rating of the movie.
// Country where the movie was produced.
// Language of the movie.
// Plot of the movie.
// Actors in the movie.
// 
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

};

function readRandom(fname) {
// do-what-it-says
// node liri.js do-what-it-says
// 
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

};
