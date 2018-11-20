require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require("node-spotify-api")

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    var track=data.tracks.items[0]
    //console.log(track)
    console.log("Artist: "+track.artists[0].name)
    console.log("Song Name: "+track.name)
    console.log("Album: "+track.album.name)
    console.log(track.external_urls.spotify)
})




