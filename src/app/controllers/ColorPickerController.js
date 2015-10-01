/**
 * @author Nasko
 */
pl.ViewController('app.ColorPickerController', {
    CHANGE_COLOR : 'changeColor'
}, {
    init : function() {
        this._super()
        this.autoDispose = false
    },
    onRegister : function() {
        this._model = new app.ColorPickerModel()
        this._view = new app.ColorPicker(this._model.id)
        this.parent._view.stage.addChild(this._view)
        pl_trace('register', this._model.id)

        var that = this
        this._view.on(pl_isMobile() ? 'tap' : 'click', function(event) {
            that.sendNotification(that.constructor.CHANGE_COLOR, {
                color : 0xffffff * Math.random()
            })
        })

        this._view.x = -this._view.width
        TweenMax.to(this._view, 1, {
            x : 0,
            delay : 1
        })
    },
    onUnregister : function() {
        var that = this
        this._view.interactive = false
        TweenMax.to(this._view, 1, {
            x : -this._view.width,
            onComplete : function() {
                that.destroy()
            },
            overwrite : 1
        })
    },
    dispose : function() {
        pl_trace('dispose', this._model.id)
        var parent = this._view.parent
        parent.removeChild(this._view)
        this._view.removeAllListeners('click')
        this._view.removeAllListeners('tap')
        TweenMax.killTweensOf(this._view)
    }
})
