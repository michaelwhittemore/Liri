//conifguration loading all necessary modules
require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
//grab the user input
var input = process.argv.slice(2)
//the operator that selects what we do
var operation = input[0]
//the operand is what we use, it's a single string 
var operand = input.slice(1).join(" ")


spotifySong = function (songSearch) {
    if(songSearch.length==0){
        //I don't much care for Ace of Base so I changed the default to a different swedish group
        songSearch="Primo Victoria"
    }
    spotify.search({ type: 'track', query: songSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var track = data.tracks.items[0]
        //console.log(track)
        console.log("Artist: " + track.artists[0].name)
        console.log("Song Name: " + track.name)
        console.log("Album: " + track.album.name)
        console.log(track.external_urls.spotify)
    })
}


//the logic controlling which operation we use
if (operation == "spotify-this-song") {
    spotifySong(operand)
    
}



