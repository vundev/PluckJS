/**
 * Do not modify this file
 * @author nasko
 */

//<debug>
var xmlhttp;
if (window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp = new XMLHttpRequest();
} else {
	// code for IE6, IE5
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		// libs from config.json
		var appSrc = JSON.parse(xmlhttp.responseText)
		// load preloadjs which will load necessary js and css from config.json
		pl_loadScript('http://code.createjs.com/preloadjs-0.4.1.min.js', function() {
			var queue = new createjs.LoadQueue();
			queue.on('complete', init)
			for (var i = 0; i < appSrc.length; i++) {
				var item = appSrc[i]
				if (item.paralel) {
					queue.loadManifest(item.paralel)
				} else
					queue.loadFile(item)
			}
		})
	}
}
xmlhttp.open("GET", "config.json", true);
xmlhttp.send();
//</debug>

//<release>
if (RELEASE)
	pl_loadCSS('./project.css?v=' + PluckProject.version, init)

// Creates object from the Main class
function init() {
	$(PluckMain)
}

//</release>