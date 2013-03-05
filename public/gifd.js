

// document ready
$(function() {

	getGifByTag("happy",0,function(resp) {
		window.setTimeout(function() {
			$(".item-image").empty().append('<img src="'+resp.url+'">')
		}, 5000);
	});

	

});

var static_tags = [
	"happy",
	"sad",
	"love",
	"hate",
	"party",
	"fail",
	"bored",
	"eyeroll"
];
function tagFromTweet(tw) {
	// Find tagged emotions in tweets
	
	for (var i = 0, ii = static_tags.length; i < ii; i++) {
		if Regexp.test("\b\%"+static_tags[i]+"\b",tw) return static_tags[i];
	}	
	return "";
};

// TODO generalize or split function off
function getGifByTag(tag, pos, callback) {
	if (!pos) pos=0
	$.get("http://localhost:8080/g/fetch/tag/"+tag+"/"+pos, callback);
}