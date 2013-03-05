// Some script scope variables
var currentTag = "",
	overrideTag = false,
	listPosition = 0;

// document ready
$(function() {
	
	// Tweet entry form
	$("#tweetfield").change(function() {
		var newTag = this.val();
		if (currentTag != newTag && !overrideTag) {
			currentTag = newTag;
			getGifsByTag(currentTag,0,10,function(resp) {
				for (var i = 0, ii = resp.length; i < ii; i++) {
					var gif = resp[i];
					$("ul.items").append('<li class="item"><div class="item-image"><img src="'+gif.url+'"></div><p><strong>Tags:</strong><ul class="tag-list"><li><a href="#">Celebrate</a></li><li><a href="#">Happy</a></li><li><a href="#">Funny</a></li></ul></p></li>');
				}
			});
		}
	});
	
	// Submit Tweet
	$("#submittweet").click(function() {
		submitTweet($(this).val(), function(resp) {
			console.log("Response: "+resp);
		});
	});
	
	// GIF browsing UI
	// !?@#@$
	
	// Tag click UI
	$(".tag-click").click(function() {
		currentTag = $(this).val();
		overrideTag = true;
		getGifsByTag(currentTag,0,10,function(resp) {
			for (var i = 0, ii = resp.length; i < ii; i++) {
				var gif = resp[i];
				$("ul.items").append('<li class="item"><div class="item-image"><img src="'+gif.url+'"></div><p><strong>Tags:</strong><ul class="tag-list"><li><a href="#">Celebrate</a></li><li><a href="#">Happy</a></li><li><a href="#">Funny</a></li></ul></p></li>');
			}
		});
	});
	
	$(".cancel-tag-click").click(function() { 
		overrideTag = false;
		$("#tweetfield").change();
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


function startTwitterAuth() {

}

function submitTweet(txt, callback) {
	$.post(endpoint+"/t/send", data, callback);
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
	$.get(endpoint+"/g/fetch/tag/"+tag+"/"+pos+"/"+count, callback);
}