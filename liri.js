var Twitter = require("twitter");
var keys = require("keys.js");
var request = require("request");

var fs = require("fs");

var action = process.argv[2];

command(action, argument);

function command(action, argument) {

	argument = getThirdArgument();

	switch (action) {
		
		case "my-tweets": 
		getTweets();
		break;

		case "do-what-it-says": 
		doWhatItSays();
		break;
	}
}

function getThirdArgument() {

	argumentArray = process.argv;

	for (var i = 3; i < argumentArray.length; i++) {
		argument += argumentArray[i];
	}
	return argument;
}


function getTweets() {
	
	var client = new Twitter(keys.twitterKeys);

	
	var params = {q: '@TossKami', count: 20};

	client.get('search/tweets', params, function(error, tweets, response) {
	  if (!error) {

	  	for (var i = 0; i < tweets.statuses.length; i++) {
	  		var tweetText = tweets.statuses[i].text;
	  		logOutput("Tweet Text: " + tweetText);
	  		var tweetCreationDate = tweets.statuses[i].created_at;
	  		logOutput("Tweet Creation Date: " + tweetCreationDate);
	  	}
	  } else {
	  	logOutput(error);
	  }
	});
}

function doWhatItSays() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {

			var randomArray = data.split(",");

			action = randomArray[0];

			argument = randomArray[1];

			doSomething(action, argument);
		}
	});
}

