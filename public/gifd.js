

// document ready
$(function() {

	getGifByTag("happy",0,10,function(resp) {
			$(".slider ul").append('<li><img src="'+resp.url+'"/></li>');
		}, 5000);
	});

	$(".slider > img").lazyload({
		container: $(".slider");
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
function getGifsByTag(tag, pos, count, callback) {
	if (!pos) pos=0;
	if (!count) count=1;
	$.get("http://localhost:8080/g/fetch/tag/"+tag+"/"+pos, callback);
}