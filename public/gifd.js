
var currentTag = "";
// document ready
$(function() {
	
	$("#tweetfield").change(function() {
		var newTag = this.val();
		if (currentTag != newTag) {
			currentTag = newTag;
			getGifsByTag(currentTag,0,10,function(resp) {
				for (var i = 0, ii = resp.length; i < ii; i++) {
					var gif = resp[i];
					$("ul.items").append('<li class="item"><div class="item-image"><img src="'+gif.url+'"></div><p><strong>Tags:</strong><ul class="tag-list"><li><a href="#">Celebrate</a></li><li><a href="#">Happy</a></li><li><a href="#">Funny</a></li></ul></p></li>');
				}
			});
		}
	});

	

	$("ul.items > img").lazyload({
		container: $("ul.items")
	});

});

var endpoint = "http://localhost:8080";
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

function submitTweet(callback) {
	$.post(endpoint+"/t/post", data, callback);
}

function tagFromTweet(tw) {
	// Find tagged emotions in tweets
	
	for (var i = 0, ii = static_tags.length; i < ii; i++) {
		if (new Regexp("\b\%"+static_tags[i]+"\b")).test(tw) return static_tags[i];
	}	
	return "";
};

// TODO generalize or split function off
function getGifsByTag(tag, pos, count, callback) {
	//if (!pos) pos=0;
	//if (!count) count=1;
	console.log(".");
	$.get(endpoint+"/g/fetch/tag/"+tag+"/"+pos+"/"+count, callback);
}