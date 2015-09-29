/**
 * @author Nasko
 */
pl.ViewController('app.NavigationController', {}, {
    init : function() {
        this._super()
    },
    onRegister : function() {
        var that = this
        this._view = $('li')
        this._view.on('tap click', function(event) {
            event.stopPropagation()
            event.preventDefault()
            that.sendNotification(app.RootController.CHANGE, {
                page : 'screen' + $(event.target).index()
            })
        })
    },
    dispose : function() {
        this._view.off('tap click')
    }
})
