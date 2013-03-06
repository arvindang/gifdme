// Some script scope variables
var currentTag = "",
	overrideTag = false,
	listPosition = 0;

// document ready
$(function() {
	$('.slider').hide();
	// Tweet entry form
	$(".tweet-form textarea").change(function() {
		var newTag = tagFromTweet($(this).val());
		if (currentTag != newTag && !overrideTag) {
			currentTag = newTag;
			if (currentTag != "") {
				$(".slider").show();
				getGifsByTag(currentTag,0,10,function(resp) {
					for (var i = 0, ii = resp.length; i < ii; i++) {
						var gif = resp[i];
						$("ul.items").append('<li class="item"><div class="item-image"><img src="'+gif.url+'"></div><p><strong>Tags:</strong><ul class="tag-list"><li><a href="#">Celebrate</a></li><li><a href="#">Happy</a></li><li><a href="#">Funny</a></li></ul></p></li>');
					}
				});
			} else {
				$(".slider").hide();
			}
		}
	});
	
	// Submit Tweet
	$("#sendTweet").click(function(e) {
		e.preventDefault();
		submitTweet(function(resp) {
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

var endpoint = "";
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
	window.location.href = "/signin";
}

function submitTweet(callback) {
	var txt = $(".tweet-form textarea").val(),
		link = "http://i.imgur.com/jvYIj5Q.gif";
		txt = txt + " " + link + " (via gifdme.com)";
	// TODO vet the link, tweet length etc
	console.log('<-');
	$.post(endpoint+"/t/send", {'status': txt}, function(res) {
		console.log(res);
		callback();
	});
}

function tagFromTweet(tw) {
	// Find tagged emotions in tweets
	
	for (var i = 0, ii = static_tags.length; i < ii; i++) {
		var re = new RegExp("[^\b]?[%]"+static_tags[i]+"\b?","gim");
		if (re.test(tw) ) { return static_tags[i]; }
	}	
	return "";
};

function insertGif(callback) {
	var gif = {
		url: $("#urlEntry").val(),
		tags: [$("#tagSet").val()]
	}
	
	$.post(endpoint+"/g/new", gif, function(res) {
		callback();
	});
}

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