//conifguration loading all necessary modules
require("dotenv").config();
var fs = require("fs")
var moment = require("moment")
var axios = require("axios");
var keys = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});


//function for searching for a song
spotifySong = function (songSearch) {
    if (songSearch.length == 0) {
        //I don't much care for Ace of Base so I changed the default to a different swedish group
        songSearch = "Primo Victoria"
    }
    spotify.search({ type: 'track', query: songSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var track = data.tracks.items[0]
        console.log("Artist: " + track.artists[0].name)
        console.log("Song Name: " + track.name)
        console.log("Album: " + track.album.name)
        console.log(track.external_urls.spotify)
    })
}
//function for searching for concerts
bandsInTown = function (bandSearch) {
    axios.get("https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=codingbootcamp").then(
        function (response) {
            if (response.data.length == 0) {
                console.log("No Events Found")
                return
            }
            var data = response.data[0]

            var venue = data.venue.name
            var city = data.venue.city
            var country = data.venue.country
            var state = data.venue.region
            var time = moment(data.datetime, "YYYY-MM-DDthh").format("MMM Do YYYY")
            console.log(`${venue} in ${city}, ${state}, ${country}, on ${time}`)
        }
    )
}
//function for searching OMBD
OMDBsearch = function (movieSearch) {
    //deafult search is for Mr. Nobody
    if (movieSearch.length == 0) {
        movieSearch = "Mr.%20Nobody"
    }
    axios.get("https://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            var data = response.data
            console.log("Title: " + data.Title)
            console.log("Year: " + data.Year)
            console.log("IMBD rating: " + data.imdbRating)
            console.log("Rotten Tomamto rating: " + data.Ratings[1].Value)
            console.log("Country: " + data.Country)
            console.log("Language: " + data.Language)
            console.log("Plot: " + data.Plot)
            console.log("Actors: " + data.Actors)
        }
    )

}
//reads random.txt
whatItSays = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data=data.split(",")
        inputHandler(data[0],data[1])
    })  
}
//the logic controlling which operation we use
inputHandler = function (operation,operand) {
    
    if (operation == "spotify-this-song") {
        spotifySong(operand)
    }
    else if (operation == "concert-this") {
        bandsInTown(operand)
    }
    else if (operation == "movie-this") {
        OMDBsearch(operand)
    }
    else if (operation == "do-what-it-says") {
        whatItSays(operand)
    }
    fs.appendFile("log.txt", operation+" "+operand+",", function(err) {
        if (err) {
          return console.log(err);
        }
      });
}
//grab the user input
var input = process.argv.slice(2)
//the operator that selects what we do
var operation = input[0]
//the operand is what we use, it's a single string 
var operand = input.slice(1).join("%20")
inputHandler(operation,operand)