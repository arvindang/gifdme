// Some script scope variables
var currentTag = "",
	overrideTag = false,
	listPosition = 0,
	selectedGif = -1;
//slideNumber = Math[round](getScroll() / ( scrollableArea / slider.children.length) );

// document ready
$(function() {
	$('.slider').hide();
	
	var theSlider = $('.slider').get();
	if (theSlider.length > 0) {
		theSlider[0].addEventListener('slide', setCurrentGif);
	}
	
	// Tweet entry form
	$(".tweet-form textarea").keyup(function() {
		var newTag = tagFromTweet($(this).val());
		if (currentTag != newTag && !overrideTag) {
			currentTag = newTag;
			if (currentTag != "") {
				$(".slider").show();
				getGifsByTag(currentTag,0,10,function(resp) {
					$("ul.items li").remove();
					selectedGif = 0;
					listPosition = 10;
					for (var i = 0, ii = resp.length; i < ii; i++) {
						var gif = resp[i];
						console.log(gif);
						$("ul.items").append('<li class="item"><div class="item-image"><img id="gif'+i+'" src="'+gif.url+'"></div></li>');
					}
				});
			} else {
				$(".slider").hide();
				selectedGif = -1;
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
	/*
	$("ul.items").on('click', '.item-image img', function() {
		var i = $(this);
		var gifId = i.attr("id").substring(3);
		gifId = parseInt(gifId);
		if (selectedGif == gifId) {
			i.removeClass('toggleImage');
			selectedGif = -1;
		} else {
			i.addClass('toggleImage');
			$("gif"+selectedGif).removeClass('toggleImage');
			selectedGif = gifId;
		}
	});
	*/

	// Tag click UI
	$(".tag-click").click(function() {
		currentTag = $(this).val();
		overrideTag = true;
		getGifsByTag(currentTag,0,10,function(resp) {
			$("ul.items li").remove();
			listPosition = 10;
			for (var i = 0, ii = resp.length; i < ii; i++) {
				var gif = resp[i];
				$("ul.items").append('<li class="item"><div class="item-image"><img src="'+gif.url+'"></div></li>');
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


function setCurrentGif(slider) {
	console.log(slider);
	selectedGif = slider.detail.slideNumber;
	lazyGifList();
}

function submitTweet(callback) {

	var txt = $(".tweet-form textarea").val(),
		link = $("#gif"+selectedGif).attr("src");
		txt = txt + " " + link + " @gifdme";
	console.log(link);
	if (!txt || selectedGif == -1 || txt.length>113 || (typeof link == "undefined")) {
		console.log(txt.length)
		console.log(link);
		if (selectedGif == -1) {
			alert('select a gif, first!');
		} else {
			alert('something went wrong');
		}
		return;
	}

	// TODO vet the link, tweet length etc
	$.post(endpoint+"/t/send", {'status': txt, 'url': link}, function(res,err) {
		console.log(res);
		if (res == "error") {
			//console.log(err);
			callback('error');
		} else {
			callback();
			window.location.href = './mobile-post.html';
		}
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
	console.log(u);
	$.post(endpoint+"/g/new", gif, function(res) {
		callback();
	});
}

function deleteGif(u) {
	$.get(endpoint+"/g/admin/delete",u, function(res) {
		console.log("Deleted gif for: "+u);
	});
}

function lazyGifList() {
	var gifCount = $("ul.items li").length;
	if (listPosition >= gifCount-2) {
		// near end of list, load more items
		getGifsByTag(currentTag,gifCount,4,function(resp) {
			for (var i = 0, ii = resp.length; i < ii; i++) {
				var gif = resp[i];
				$("ul.items").append('<li class="item"><div class="item-image"><img id="gif'+(gifCount+i)+'" src="'+gif.url+'"></div></li>');
			}
		});
	}
}

// TODO generalize or split function off
function getGifsByTag(tag, pos, count, callback) {
	$.get(endpoint+"/g/fetch/tag/"+tag+"/"+pos+"/"+count, callback);
}