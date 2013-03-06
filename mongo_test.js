static_tags = ["happy","sad"]
tw = "I am currently very %happy"
for (var i = 0, ii = static_tags.length; i < ii; i++) {
	var re = new RegExp("[^\b]?[%]"+static_tags[i]+"\b?","gim");
	if (re.test(tw) ) { console.log(static_tags[i]); }
}