var Twit = require('twit');

	var T = new Twit({
		consumer_key: process.env.TWITTER_CONSUMER_KEY
	    , consumer_secret: process.env.TWITTER_SECRET_KEY
	    , access_token: process.env.TWITTER_ACCESS_TOKEN
	    , access_token_secret: process.env.TWITTER_ACCESS_KEY
	});

	function retweetRecent(){
		T.get('search/tweets', {q: '#startup OR #entreprenuer', result_type: 'recent'},
			function(err, data, res){
				if (!err){
					var retweetId = data.statuses[0].id_str;
					var tweetString = data.statuses[0].text;
					T.post('statuses/retweet/' + retweetId, { }, function(err, res){
						if (res){
							console.log( 'retweeted ', tweetString);
						}
						if(err){
							console.log('retweet error', err);
						}
					});

				} 
					else{
						console.log('search err',err);
					}
			});
	}

retweetRecent();
setInterval(retweetRecent, 3600000); //do this every hour.
