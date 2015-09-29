/**
 * @author Nasko
 */
$.Class('pl.Model', {}, {
    init : function() {
    },
    sendNotification : function(type, body) {
        pl.ViewController.getRoot().sendNotification(type, body)
    },
    dispose : function() {
    }
})
