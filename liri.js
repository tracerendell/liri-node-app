require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');


// console.log(keys);
// console.log(process.env.SPOTIFY_ID);

    var spotify = new Spotify(keys.spotify);
    var client = new Twitter(keys.twitter);
    // console.log(spotify.credentials.id);
    // console.log(client.options.consumer_key);
    
var nodeArgs = process.argv;
var requestType = nodeArgs[2];
var requestInput = "";

for(var i = 3; i < nodeArgs.length; i++) {
    requestInput = requestInput + " " + nodeArgs[i];
}

console.log("request type", requestType);
console.log("request input", requestInput);

var spotifyThisSong = function(requestInput) {
    if (requestInput === "") {
        requestInput = "The Sign"
    }
        spotify
  .search({ type: 'track', query: requestInput})
  .then(function(response) {
    console.log(JSON.stringify(response.tracks.items[0].artists[0].name));
  })
  .catch(function(err) {
    console.log(err);
  });

    
}

var myTweets = function(requestInput) {

    var params = {screen_name: requestInput};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      for(var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text + " " + tweets[i].created_at);
      }   
  }
  else {
    console.log("My Tweets Input ERROR");
}
});

var movieThis = function(requestInput) {
    if (requestInput === "") {
        requestInput = "Mr. Nobody"
    }

        var queryUrl = "http://www.omdbapi.com/?t=" + requestInput + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error, response, body) {
            if(!error && res.statusCode === 200) {
                console.log(
                    `   
                    Title:                  ${JSON.parse(body).Title}
                    Release Year:           ${JSON.parse(body).Year}
                    Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
                    IMDB Rating:            ${JSON.parse(body).imdbRating}
                    Country:                ${JSON.parse(body).Country}
                    Language:               ${JSON.parse(body).Language}
                    Plot:                   ${JSON.parse(body).Plot}
                    Actors:                 ${JSON.parse(body).Actors} `);
            }
        });
    }



}

switch (requestType) {
    case 'spotify-this-song':
        spotifyThisSong(requestInput);
        break;

    case 'my-tweets':
        myTweets();
        break;

    case 'movie-this':
        movieThis();
        break;

    default:
        console.log("Bad-Request");
        break;
}


