/**
 * @author Nasko
 */

var pl_trace = function() {
//<debug>
    console.log(arguments)
//</debug>
}
var pl_getQualifiedClassName = function(object) {
    if (object === undefined)
        return null
    if ( object instanceof Array)
        return 'array'
    return object.constructor.fullName || typeof object;
}
var pl_isMobile = function() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    } else {
        return false;
    }
}