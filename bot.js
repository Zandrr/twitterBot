var Twit = require('twit');

	var T = new Twit({
		consumer_key: 'OYy4O4P1GNYVrnU45FOl9DO0e'
	    , consumer_secret: 'ChvBdb2hbgk9hc7ZADK69C1v7bqXL4067gRo7YJIJkiNFpturp'
	    , access_token: '717100216-J3uDCaRC7T9Vwe6Xd7ON43DHX84Pd8IztMjIflMU'
	    , access_token_secret: 'f6btJg78SmnmtVrS6MJTmB4HzwdOtZurOffmo42lJOBZa'
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
setInterval(retweetRecent, 3600000); //do this every hour
