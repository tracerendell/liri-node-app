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

}

switch (requestType) {
    case 'spotify-this-song':
        spotifyThisSong(requestInput);
        break;

    case 'my-tweets':
        myTweets();
        break;

    default:
        console.log("Bad-Request");
        break;
}


