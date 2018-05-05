require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');



// console.log(process.env.SPOTIFY_ID);

    var spotify = new Spotify({
        id: keys.id,
        secret: keys.secret,
    });


    console.log(Spotify.id);


spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

;
