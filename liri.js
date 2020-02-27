// --------------------------------------------------------------------------------------
//  Testing parameters
// 
//  concert-this
//  1) with 1 name artist
//  2) with multiple name artist
//  3) with no information to be found
// node liri.js concert-this kiss
// node liri.js concert-this third eye blind
// node liri.js concert-this rofo audio
// 
// 
//  spotify-this-song
//  1) with 1 name song
//  2) with multiple name songs
//  3) with no song provided
// node liri.js spotify-this-song hello
// node liri.js spotify-this-song yellow submarine
// node liri.js spotify-this-song
// 
//
//  movie-this
//  1) with 1 name artist
//  2) with multiple name artist
//  3) with no movie provided
// node liri.js movie-this Frozen 
// node liri.js movie-this Charlie and the chocolate factory
// node liri.js movie-this
// 
// 
//  do-what-it says (Modify the random.txt with the above listed test parameters)
// node liri.js do-what-it-says
// 
// --------------------------------------------------------------------------------------

// code to read and set any environment variables with the .env package 
require("dotenv").config();

// code required to import the keys.js file and store it in a variable 
var keys = require("./keys.js");

// Grab the axios package...
var axios = require("axios");

// Grab the moment package...
var moment = require("moment");

// Grab the Spotify API package
var Spotify = require('node-spotify-api');

// access Spotify keys information
var spotify = new Spotify(keys.spotify);

// file name variable
var logfile = 'log.txt';
var randomFile = 'random.txt';

// grab the fs package to handle read and append of the files
var fs = require("fs");

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line arguments to capture the first argument
var action = inputString[2];

// allow for multi-word inputs (Activity 23-GeocoeNPM)
// take the inputstring from index 3 to the en and create a new array using the slice() method
// take that resulting array and join it back as a string with a " " separating the words
var target = inputString.slice(3).join(" "); 

// call the performAction() function if arguments were passed - always since arguments inclued "node" and "liri.js"
if (action && target) {

    target = capital_letter(target);
    performAction(action, target);

} 
else if (action) {

    performAction(action);

} 
else if (inputString) {

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

        case "help":
            displayHelp();
            break;

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
            console.log('\nNo Action Provided To Take!');
            console.log('\nHere is some help: ');
            performAction("help");
            break;
    };

};
// --------------------------------------------------------------------------------------
//  end of performAction() function 
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
//  function to log all the capabilities of LIRI when help is requested
// --------------------------------------------------------------------------------------
function displayHelp() {

    // Log all the things that LIRI can do to the console
    console.log("\nLIRI can: \n");

    console.log("* concert-this");

    console.log("* spotify-this-song");

    console.log("* movie-this");

    console.log("* do-what-it-says\n");

};
// --------------------------------------------------------------------------------------
//  end of displayHelp() function 
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
//  function to build and perform the API call to Bands In Town for a given artist 
// 
//  Parameter values:
// 
//  artist - the artist or group as provided (default = "Celine Dion")
// 
// --------------------------------------------------------------------------------------
function concertThis(artist = "Celine Dion") {

    // bulid the artist parameter for search based on the user input passed into the function
    // according to the API website, the words in an Artist Name must be separated by "%20" instead of spaces
    var artistSrch = artist.replace(" ", "%20");

    // build the OMDB API quey with the movie specified  (Activity 17-OMDB-Axios)
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistSrch + "/events?app_id=codingbootcamp";

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

        if (event.length > 0) {
            // log the result header
            console.log("\nUpcoming concerts for " + artist + ": \n");

            // log the event information
            for (let i=0; i < event.length; i++) {
                
                // Name of the venue
                venue = event[i].venue.name;
                
                // Venue location
                location = event[i].venue.city; 
                
                if (event[i].venue.region) {
                    location += ", " + event[i].venue.region;
                };
                
                location += " - " + response.data[i].venue.country;

                // Date of the Event (use moment to format this as "MM/DD/YYYY")
                eventDT = event[i].datetime;
                eventDT = moment(eventDT).format('L');

                console.log(location + " at " + venue + " on " + eventDT);

            };
     
            // Bonus -- log to a logfile
            logCommands("Concert Search:", artist);

        } else {

            // log the result header
            console.log("No Upcoming concerts for " + artist + " were found.");   
        }

    })
    // If the request with axios is unsuccessful
    .catch(function(error) {

        console.log("Error in call to OMDB:  " + error);

    });

};
// --------------------------------------------------------------------------------------
//  end of concertThis() function 
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
//  function to build and perform the API call to Spotify for a given song 
// 
//  Parameter values:
// 
//  song- the name of the song as provided (default = "The Sign")
// 
// --------------------------------------------------------------------------------------
function spotifyThis(song = "The Sign") {

    // local variables to make gathering the data easier
    var track = [];
    var artistArray = [];
    var artist;

    // Testing to just return 2
    // spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
    spotify.search({ type: 'track', query: song }, function(err, data) {
        
        if (err) {

          return console.log('Error occurred in spotify process: ' + err);

        }
       
        // store the resulting list in an array
        track = data.tracks.items;

        // make sure there is at least 1 entry
        if (track.length > 0) {

            // log the track information
            for (let i=0; i < track.length; i++) {

                // Log the counter which is i + 1
                if (i === 0) {
                    console.log("\n")
                };

                console.log(i + 1);

                // Artist(s) - held in an array
                artistArray = track[i].artists;
                
                // grab the first entry in the array
                artist = artistArray[0].name;

                // if there are more than 1 artist on the album 
                if (artistArray.length > 1) {

                    // loop through the artists to string together with a comma separator
                    for (let i=1; i < artistArray.length; i++) { 
                        artist += ", " + artistArray[i].name;
                    };

                };

                // log the artist information
                console.log("Artist(s): " + artist);

                // The song's name
                console.log("Song Name: " + track[i].name);

                // A preview link of the song from Spotify
                console.log("Preview Link: " + track[i].preview_url);

                // The album that the song is from
                console.log("Album: " + track[i].album.name);

                // spaceholder to separate the list more clearly
                console.log("-----------------------------------------------");

            };

            // Bonus -- log to a logfile 
            logCommands("Song Search:", song);

        } else {

            // log the result header
            console.log("No Song information was found for " + song + ".");  

        }
        
      });

};
// --------------------------------------------------------------------------------------
//  end of spotifyThis() function 
// --------------------------------------------------------------------------------------

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
    // according to the API website, the words in a Movie Title must be separated by "+" instead of spaces
    var movieSrch = movie.replace(" ", "+");

    // build the OMDB API quey with the movie specified  (Activity 17-OMDB-Axios)
    var queryUrl = "http://www.omdbapi.com/?t=" + movieSrch + "&plot=short&apikey=trilogy";

    // create a request with axios to the queryUrl
    axios.get(queryUrl)
        
    // If the request with axios is successful
    .then( function(response) {

        // Spacing 
        console.log("\n");

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

        // Bonus -- log to a logfile
        logCommands("Movie Search:", movie);

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

    // read the random file and store the contents in "data"
    fs.readFile(randomFile, "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {

      return console.log(error);

    }
  
    // Then split it by commas (to make it more readable)  - separates values at the comma
    var dataArr = data.split(",");

    // Bonus -- log to a logfile
    logCommands("Do what it says!");

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
// function to capitalize some text for better display
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

    // start to format the logged message
    let msg = moment().format('L');         // start with the date in the 'MM/DD/YYYY' format
    msg += ", " + moment().format('LTS');   // add the time in the 'HH:MM:SS AM" format
    msg += " | " + funcPerformed + "  ";    // add the functionality that was requested

    // the message is formatted but add an artist, song, or movie if it was provided
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
        console.log("\n*** log.txt was updated! ***");
        }
    
    });

};
// --------------------------------------------------------------------------------------
//  end of logCommands() function 
// --------------------------------------------------------------------------------------