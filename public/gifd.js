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
	callback("dummy tweeted: "+txt);
	//$.post(endpoint+"/t/send", data, callback);
}

function tagFromTweet(tw) {
	// Find tagged emotions in tweets
	
	for (var i = 0, ii = static_tags.length; i < ii; i++) {
		var re = new Regexp("[^\b]?[%]"+static_tags[i]+"\b?","gim");
		if re.test(tw) { return static_tags[i]; }
	}	
	return "";
};

function lazyGifList() {
	var gifCount = $("ul.items li").length;
	if (listPosition >= gifCount-3) {
		// near end of list, load more items
		getGifsByTag(currentTag,gifCount,10,function(resp) {
			for (var i = 0, ii = resp.length; i < ii; i++) {
				var gif = resp[i];
				$("ul.items").append('<li class="item"><div class="item-image"><img src="'+gif.url+'"></div><p><strong>Tags:</strong><ul class="tag-list"><li><a href="#">Celebrate</a></li><li><a href="#">Happy</a></li><li><a href="#">Funny</a></li></ul></p></li>');
			}
		});
	}
}

// TODO generalize or split function off
function getGifsByTag(tag, pos, count, callback) {
	$.get(endpoint+"/g/fetch/tag/"+tag+"/"+pos+"/"+count, callback);
}