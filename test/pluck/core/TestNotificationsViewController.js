/**
 * @author Nasko
 */
pl.ViewController('TestNotificationsViewController', {
    NOTIFICATION_TYPE : 'notificationType'
}, {
    init : function() {
        this._super(null, new TestNotificationsModel())
        this.interests = [this.constructor.NOTIFICATION_TYPE]
    },
    handleNotification : function(notification) {
        this._super(notification)
        if (notification.name == this.constructor.NOTIFICATION_TYPE) {
            this._model.notificationAccepted = true
        }
    },
    model : function() {
        return this._model
    }
})
