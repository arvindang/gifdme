

// document ready
$(function() {

	getGifByTag("happy",0,function(resp) {
		window.setTimeout(function() {
			$(".item-image").empty().append('<img src="'+resp.url+'">')
		}, 5000);
	});

	

});

// TODO generalize or split function off
function getGifByTag(tag, pos, callback) {
	if (!pos) pos=0
	$.get("http://localhost:8080/g/fetch/tag/"+tag+"/"+pos, callback);
}