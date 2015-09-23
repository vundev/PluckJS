/**
 * @author Nasko
 */
$.Class('pl.NotificationMap', {}, (function() {

    function registerRecipient(notificationType, controller) {
        if ( notificationType in this._data) {
            var recipients = getRecipients.call(this, notificationType)
            recipients.push(controller)
        } else {
            this._data[notificationType] = []
            this._data[notificationType][0] = controller
        }
    }

    function getRecipients(notificationType) {
        return this._data[notificationType]
    }

    return {
        init : function() {
            this._data = {}
        },
        register : function(controller) {
            var interests = controller.interests
            var length = interests.length
            for (var i = 0; i < length; i++)
                registerRecipient.call(this, interests[i], controller)
        },
        unregister : function(controller) {
            var interests = controller.interests
            var length = interests.length
            for (var i = 0; i < length; i++) {
                var recipients = getRecipients.call(this, interests[i])
                recipients.splice(recipients.indexOf(controller), 1)
            }
        },
        notify : function(notification) {
            var recipients = getRecipients.call(this, notification.type)
            if (recipients) {
                recipients = recipients.concat()
                var length = recipients.length
                for (var i = 0; i < length; i++)
                    recipients[i].handleNotification(notification)
            }
        }
    }
})())
