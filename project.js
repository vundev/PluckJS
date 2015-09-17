/**
 * Do not modify this file
 * @author nasko
 */

//<debug>
function pl_makeHttpRequest(type, url, onComplete) {
    var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200)
            onComplete(request)
    }
    request.open(type, url, true)
    request.send()
}

pl_makeHttpRequest("GET", "config.json", function(request) {
    var src = JSON.parse(request.responseText)
    pl_makeHttpRequest("GET", "app_config.json", function(_request) {
        // merge app src with pluck src
        var appSrc = JSON.parse(_request.responseText)
        var position = src.length - 1
        for (var i = 0; i < appSrc.length; i++) {
            src.splice(position + i, 0, appSrc[i])
        }
        // load preloadjs which will load necessary js and css from config.json
        pl_loadScript('http://code.createjs.com/preloadjs-0.4.1.min.js', function() {
            var queue = new createjs.LoadQueue();
            queue.on('complete', init)
            for (var i = 0; i < src.length; i++) {
                var item = src[i]
                if (item.paralel) {
                    queue.loadManifest(item.paralel)
                } else
                    queue.loadFile(item)
            }
        })
    })
})
//</debug>

//<release>
if (RELEASE)
    pl_loadCSS('./project.css?v=' + PluckProject.version, init)

// Creates object from the Main class
function init() {
    $(PluckMain)
}

//</release>