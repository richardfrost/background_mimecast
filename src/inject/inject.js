chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		document.documentElement.addEventListener("click", handleAnchorClick, false);
	}
	}, 10);
});

var mimecastUrl = "https://us-api.mimecast.com/m/release/";

function findParentByTagName(element, tagName) {
	var parent = element;

	while (parent !== null && parent.tagName !== tagName.toUpperCase()) {
		parent = parent.parentNode;
	}

	return parent;
}

function handleAnchorClick(event) {
	event = event || window.event;

	if (findParentByTagName(event.target || event.srcElement, "A")) {
		var href = event.srcElement.getAttribute("href");
		if (href.includes(mimecastUrl)) {
			event.preventDefault();
			hiddenGetImage(href);
		}
	}
}

function hiddenGetFrame(url){
	console.log("Hidden Get: ", url);
	var i = document.createElement('iframe');
	i.style.display = 'none';
	i.onload = function() { i.parentNode.removeChild(i); };
	i.src = url;
	document.body.appendChild(i);
}

function hiddenGetImage(url){
	console.log("Hidden Get: ", url);
	(new Image()).src = url;
}
