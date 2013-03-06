// Some script scope variables
var currentTag = "",
	overrideTag = false,
	listPosition = 0;
	selectedGif = -1;
// document ready
$(function() {
	$('.slider').hide();
	// Tweet entry form
	$(".tweet-form textarea").keyup(function() {
		var newTag = tagFromTweet($(this).val());
		if (currentTag != newTag && !overrideTag) {
			currentTag = newTag;
			if (currentTag != "") {
				$(".slider").show();
				getGifsByTag(currentTag,0,10,function(resp) {
					for (var i = 0, ii = resp.length; i < ii; i++) {
						var gif = resp[i];
						console.log(gif);
						$("ul.items").empty().append('<li class="item"><div class="item-image"><img id="gif'+i+'" src="'+gif.url+'"></div><p><strong>Tags:</strong><ul class="tag-list"><li><a href="#">Celebrate</a></li><li><a href="#">Happy</a></li><li><a href="#">Funny</a></li></ul></p></li>');
					}
				});
			} else {
				$(".slider").hide();
			}
		}
	});
	
	// Submit Tweet

	$("#sendTweet").on('click',function(e) {
		e.preventDefault();
		console.log("FFSS");
		submitTweet(function(resp) {
			console.log("Response: "+resp);
		});
	});
	// GIF browsing UI
	// !?@#@$
	
	$(".item-image img").live('click', function() {
		var i = $(this);
		var gifId = i.attr("id").substring(3);
		gifId = parseInt(gifId);
		
		if (selectedGif == gifId) {
			i.removeClass('.toggleImage');
			selectedGif = -1;
		} else {
			i.addClass('.toggleImage');
			$("gif"+selectedGif).removeClass('.toggleImage');
			selectedGif = gifId;
		}
	});
	
	// Tag click UI
	$(".tag-click").click(function() {
		currentTag = $(this).val();
		overrideTag = true;
		getGifsByTag(currentTag,0,10,function(resp) {
			for (var i = 0, ii = resp.length; i < ii; i++) {
				var gif = resp[i];
				$("ul.items").empty().append('<li class="item"><div class="item-image"><img src="'+gif.url+'"></div><p><strong>Tags:</strong><ul class="tag-list"><li><a href="#">Celebrate</a></li><li><a href="#">Happy</a></li><li><a href="#">Funny</a></li></ul></p></li>');
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
	if (!txt || selectedGif == -1 || txt.length>112) {
		alert('something went wrong');
		return;
	}
	
	var txt = $(".tweet-form textarea").val(),
		link = $("#gif"+selectedGif).attr("src");
		txt = txt + " " + link + " (gifdme)";
	// TODO vet the link, tweet length etc
	$.post(endpoint+"/t/send", {'status': txt}, function(res) {
		console.log(res);
		callback();
	});
}

function tagFromTweet(tw) {
	// Find tagged emotions in tweets
	
	for (var i = 0, ii = static_tags.length; i < ii; i++) {
		var re = new RegExp("[^\b]?[%]"+static_tags[i]+"[\b$]?","gim");
		if (re.test(tw) ) { return static_tags[i]; }
	}	
	return "";
};

function insertGif(u, t, callback) {
	var gif = {
		url: u,
		tags: [t]
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
				$("ul.items").append('<li class="item"><div class="item-image"><img id="gif'+(gifCount+i)+'"src="'+gif.url+'"></div><p><strong>Tags:</strong><ul class="tag-list"><li><a href="#">Celebrate</a></li><li><a href="#">Happy</a></li><li><a href="#">Funny</a></li></ul></p></li>');
			}
		});
	}
}

// TODO generalize or split function off
function getGifsByTag(tag, pos, count, callback) {
	$.get(endpoint+"/g/fetch/tag/"+tag+"/"+pos+"/"+count, callback);
}