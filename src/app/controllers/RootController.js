/**
 * @author Nasko
 */
pluck.ViewController('app.RootController', {
    CHANGE : 'change'
}, {
    init : function() {
        this._super(new app.Stage(), new app.RootModel())
        this.interests = [this.constructor.CHANGE]
    },
    handleNotification : function(notification) {
        if (notification.name == this.constructor.CHANGE) {
            if (this._model.setCurrentPage(notification.body.page)) {
                return
            }
            switch(this._model.currentPage) {
            case 'screen0':
                this.setControllers(new app.NavigationController().unique(), new app.ScreenController().unique())
                break
            case 'screen1':
                this.setControllers(new app.NavigationController().unique(), new app.ColorPickerController(), new app.ScreenController().unique())
                break
            }
        }
    },
    setControllers : function() {
        var args = pluck.ArrayTools.flatten(arguments)
        var length = args.length
        for (var i = 0; i < length; i++)
            this.addChildViewController(args[i])

        var rest = pluck.ArrayTools.diff(this.children, args)
        length = rest.length
        for ( i = 0; i < length; i++)
            this.removeChildViewController(rest[i])
    }
})
