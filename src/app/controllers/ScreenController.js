/**
 * @author Nasko
 */
pl.ViewController('app.ScreenController', {}, {
    init : function() {
        this._super()
        this.interests = [app.ColorPickerController.CHANGE_COLOR]
    },
    onRegister : function() {
        this._view = new app.Screen('screen')
        this._view.y = 200
        this.parent._view.stage.addChild(this._view)
    },
    handleNotification : function(notification) {
        if (notification.name == app.ColorPickerController.CHANGE_COLOR) {
            this._view.changeColor(notification.body.color)
        }
    }
})
