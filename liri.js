// --------------------------------------------------------------------------------------
//  Testing parameters
// 
// node liri.js movie-this Frozen
// node liri.js movie-this Charlie and the chocolate factory
//
// node liri.js concert-this Adele 
// node liri.js concert-this paul mccartney
// node liri.js concert-this third eye blind
// 
// node liri.js spotify-this-song '<song name here>'
// 
// node liri.js do-what-it-says
// 
// --------------------------------------------------------------------------------------

// code to read and set any environment variables with the dotenv package 
// require("dotenv").config();

// code required to import the keys.js file and store it in a variable 
// var keys = require("./keys.js");

// Grab the axios package...
var axios = require("axios");

// Grab the moment package...
var moment = require("moment");

// access Spotify keys information
// var spotify = new Spotify(keys.spotify);

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line arguments to capture the first argument
var action = inputString[2];

// allow for multi-word inputs (Activity 23-GeocoeNPM)
// take the inputstring from index 3 to the en and create a new array using the slice() method
// take that resulting array and join it back as a string with a " " separating the words
var target = capital_letter(inputString.slice(3).join(" ")); 

// file name variable
var logfile = 'log.txt';
var randomFile = 'random.txt';

// grab the fs package to handle read and append of the files
var fs = require("fs");

// call the performAction() function if arguments were passed - always since arguments inclued "node" and "liri.js"
if (action && target) {
    performAction(action, target);
} else if (action) {
    performAction(action);
} else if (inputString) {
    performAction();
} ;

// --------------------------------------------------------------------------------------
// function to perform an action based on what was requested
// 
//  Parameter values:
// 
//  action - the action to perform
//  target - what to perform the action on
// 
// --------------------------------------------------------------------------------------
function performAction(action, target) {

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

};
// --------------------------------------------------------------------------------------
//  end of performAction() function 
// --------------------------------------------------------------------------------------

function concertThis(artist = "Celine Dion") {

    // Bonus -- log to a logfile
    // logCommands("Concert Search:", artist);

    // log the result header
    console.log("Upcoming concerts for " + artist + ":");

    // bulid the artist parameter for search based on the user input passed into the function
    // according to the API website, the words in an Artist Name must be separated by "%20" instead of spaces
    artist = artist.replace(" ", "%20");

    // build the OMDB API quey with the movie specified  (Activity 17-OMDB-Axios)
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // establish variables for further processing
    var venue;
    var location;
    var eventDT;
    var event = [];

    // create a request with axios to the queryUrl
    axios.get(queryUrl)
        
    // If the request with axios is successful
    .then( function(response) {

        event = response.data;
        // console.log(event);

        for (let i=0; i < event.length; i++) {
            // Name of the venue
            venue = event[i].venue.name;
            // Venue location
            location = event[i].venue.city + ", " + event[i].venue.region + " - " + response.data[i].venue.country;
            // Date of the Event (use moment to format this as "MM/DD/YYYY")
            eventDT = event[i].datetime;
            eventDT = moment(eventDT).format('L');

            console.log(location + " at " + venue + " on " + eventDT);
        };

    })
    // If the request with axios is unsuccessful
    .catch(function(error) {
        console.log("Error in call to OMDB:  " + error);
    });

};

function spotifyThis(song = "The Sign") {

    // Bonus -- log to a logfile
    logCommands("Song Search:", song);

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

    // Bonus -- log to a logfile
    logCommands("Movie Search:", movie);
    
    // bulid the movie parameter for search based on the user input passed into the function
    // according to the API website, the words in a Movie Title must be separated by "+" instead of spaces
    movie = movie.replace(" ", "+");

    // build the OMDB API quey with the movie specified  (Activity 17-OMDB-Axios)
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy";

    // create a request with axios to the queryUrl
    axios.get(queryUrl)
        
    // If the request with axios is successful
    .then( function(response) {
        // Title of the movie.
        console.log("Title:  " + response.data.Title);
        // Year the movie came out.
        console.log("Year:  " + response.data.Year);
        // console.log("Year:  " + response.data.Released.substring(7));
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

// --------------------------------------------------------------------------------------
//  function to read a file and 'do-what-it-says' to do 
//  (Activity 12-ReadFile)
// --------------------------------------------------------------------------------------
function readRandom(fname) {

    // Bonus -- log to a logfile
    logCommands("Do what it says!");
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    // read the random file and store the contents in "data"
    fs.readFile(randomFile, "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data);
  
    // Then split it by commas (to make it more readable)  - separates values at the comma
    var dataArr = data.split(",");
  
    // We will then re-display the content as an array for later use.
    console.log(dataArr);

    //  perform the action requested by the file
    performAction(dataArr[0], capital_letter(dataArr[1]));
  
  });

};
// --------------------------------------------------------------------------------------
//  end of readRandom() function 
// --------------------------------------------------------------------------------------

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

// --------------------------------------------------------------------------------------
// function to capitalize the text before saving it.
// Found this function on W3 schools - https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-50.php
// --------------------------------------------------------------------------------------
function capital_letter(str) {
    // separate the str parameter into pieces based on the 'space' separator
    str = str.split(" ");

    // traverse the string pieces and convert the first character of each word to Upper Case and then concatenate the rest of the string.
    for (let i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    // return the capitalize string put back together with the 'space' separator.
    return str.join(" ");
};
// --------------------------------------------------------------------------------------
// end of the capital_letter() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// Bonus *****
//  function to log a message to a logfile to keep track of the activities 
//  (Activity 14-AppendFile)
// --------------------------------------------------------------------------------------
function logCommands(funcPerformed, target) {

    let msg = funcPerformed + "  ";

    if (target) {
        msg += target;
    };

    // add a line feed to the message
    msg = msg + '\n';

    // generate a log.txt - append to log.txt for all the commands being run
    // Append the commands into the "log.txt" file.
    // If the file doesn't exist, then it gets created on the fly.
    fs.appendFile(logfile, msg, function(err) {

        // If an error was experienced we will log it to the console
        if (err) {
        console.log(err);
        }
    
        // If no error is experienced, we'll log the phrase "log.txt was updated!" to the console.
        else {
        console.log("*** log.txt was updated! ***");
        }
    
    });

};
// --------------------------------------------------------------------------------------
//  end of logCommands() function 
// --------------------------------------------------------------------------------------