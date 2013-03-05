

// document ready
$(function() {

	getGifsByTag("happy",0,10,function(resp) {
		console.log("..");
		console.log(resp);
		for (gif in resp) {
			$("ul.items").append('<li class="item"><div class="item-image"><img src="'+gif.url+'"></div><p><strong>Tags:</strong><ul class="tag-list"><li><a href="#">Celebrate</a></li><li><a href="#">Happy</a></li><li><a href="#">Funny</a></li></ul></p></li>');
		}
	});

	$("ul.items > img").lazyload({
		container: $("ul.items")
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
		//if Regexp.test("\b\%"+static_tags[i]+"\b",tw) return static_tags[i];
	}	
	return "";
};

// TODO generalize or split function off
function getGifsByTag(tag, pos, count, callback) {
	//if (!pos) pos=0;
	//if (!count) count=1;
	console.log(".");
	$.get("http://localhost:8080/g/fetch/tag/"+tag+"/"+pos+"/"+count, callback);
}