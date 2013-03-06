var static_tags = ['happy','sad'];
function tagFromTweet(tw) {
	// Find tagged emotions in tweets
	
	for (var i = 0, ii = static_tags.length; i < ii; i++) {
		var re = new RegExp("[^\b]?[%]"+static_tags[i]+"\b?","gim");
		if (re.test(tw) ) { return static_tags[i]; }
	}	
	return "";
};
console.log(tagFromTweet("I am pretty happy tonight")!="");
console.log(tagFromTweet("I am pretty %happy tonight")!="");