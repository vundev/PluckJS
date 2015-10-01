/**
 * @author Nasko
 */
$.Class('pluck.Model', {}, {
    init : function() {
    },
    sendNotification : function(type, body) {
        pluck.ViewController.getRoot().sendNotification(type, body)
    },
    dispose : function() {
    }
})
