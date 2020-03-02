# liri-node-app
Node.js Language Interpretation and Recognition Interface

# Author 
> Tim Shaffer

## Tech Used
* JavaScript
* node.js
    * dotenv
    * axios
    * moment
    * node-spotify-api
 

## Command Line Interface (CLI) 
* tasked with creating a CLI that takes in parameters and gives back data

## Parameters\Data Returned

* concert-this - will return upcoming concert information from the Bands in Town Artist Events API
    * Name of the Venue
    * Venue Location
    * Date of the event in "MM/DD/YYYY"

* spotify-this-song - will return information about the song title from the node-spotify-api package
    * Artist(s)
    * Song's Name
    * A preview link of the song from Spotify
    * The Album that the song is on

* movie-this - will return information about the movie from the OMDB (Open Movie Database) API 
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.   

* do-what-it-says - will read a file, random.txt, and perform one of the above actions based on what is in the file
    * ie.  spotify-this-song,"I Want it That Way" - will perform the spotify-this-song for the song "I Want it that Way"

* help - will provide the above list of valid commands 

# Instuctions 
LIRI will take in a list of parameters based on the CLI in the form - 

> node liri.js concert-this [artist/band name here]
>
> node liri.js spotify-this-song [song name here]
>
> node liri.js movie-this [movie name here]
>
> node liri.js do-what-it-says

1.  The first input is always **node** 
1.  The second input is always the name of the program, **liri.js** 
1.  The third input is the action to perform
    * If no action is provided, help will be returned to give a list of valid actions
1.  The remaining inputs are combined to populate the *name* information for that action
    * ie. third eye blind - treated as 3 separate inputs but will be combined into one string as 'Third Eye Blind"

## Program Organization

The program will first declare any necessary variables and make sure any required packages are pulled in.

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

Declaring the inputString directs the program to gather any relevant parameters

    // Takes in all of the command line arguments
    var inputString = process.argv;

The `performAction()` function drives the program based on the provided parameters.

Functions are called for each of the possible actions `concertThis()`, `spotifyThis()`, `movieThis()`, and `readRandom()`.  
If no action or **help** is declared, the `displayHelp()` function is called.


# Examples

1.  *node liri.js*

    ![Screenshot for No Action](/testing/screenshots/no_input.jpg)

1.  *node liri.js concert-this kiss*
    
    ![Screenshot for concert-this kiss](/testing/screenshots/concert-this_kiss.jpg)

1.  *node liri.js spotify-this-song hello*

    ![Screenshot for spotify-this-song hello](/testing/screenshots/spotify-this-song_hello.jpg)

1.  *node liri.js movie-this frozen*

    ![Screenshot for movie-this frozen](/testing/screenshots/movie-this_frozen.jpg)

1.  *node liri.js do-what-it-says*

    ![Screenshot for random.txt](/testing/screenshots/random.jpg)

    ![Screenshot for do-what-it-says](/testing/screenshots/do-what-it-says.jpg)


1. Video of the working app can be found here: https://youtu.be/e9y0UhRGu-A

