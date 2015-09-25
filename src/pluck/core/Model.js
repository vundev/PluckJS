/**
 * @author Nasko
 */
$.Class('pl.Model', {}, {
    sendNotification : function(type, body) {
        pl.ViewController.getRoot().sendNotification(type, body)
    },
    dispose : function() {
    }
})
