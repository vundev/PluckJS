/**
 * @author Nasko
 */

$.Class('pl.ViewController', {
    _controllerMap : {},
    _notificationMap : new pl.NotificationMap(),
    _root : null,
    setRoot : function(root) {
        if (pl.ViewController._root)
            throw new Error('Root controller has been already set!')
        pl.ViewController._root = value
        // register root controller for handling notifications
        pl.ViewController._controllerMap[pl.ViewController._root.name] = pl.ViewController._root
        pl.ViewController._notificationMap.register(pl.ViewController._root)
        pl.ViewController._root.onRegister()
    },
    getRoot : function() {
        return pl.ViewController._root
    },
    disposeRootController : function() {
        //TODO: implement
    }
}, (function() {
    return {
        init : function(view, model, name) {
            this._view = view
            this._model = model
            this.name = pl_getQualifiedClassName(this) + ( name ? '_' + name : '')

            this.parent = null
            this.children = []

            this.interests = []
            this.autoDispose = true
        },
        sendNotification : function(type, body) {
            this.constructor._notificationMap.notify(new pl.Notification(type, body))
        },
        handleNotification : function() {
        },
        onRegister : function() {
        },
        onUnregister : function() {
        },
        hasChildViewController : function(child) {
            return pl.ArrayTools.has(this.children, child)
        },
        addChildViewController : function(child) {
            if (!this.hasChildViewController(child)) {
                // create the tree structure
                this.children.push(child)
                child.parent = this
                // register to map
                this.constructor._controllerMap[child.name] = child
                // register to notification map
                this.constructor._notificationMap.register(child)
                child.onRegister()
            }
            return child
        },
        removeChildViewController : function(child) {
            if (this.hasChildViewController(child)) {
                while (child.children.length > 0) {
                    child.removeChildViewController(child.children[0])
                }
                // removes the child from the tree structure starting from the leafs
                this.children.splice(this.children.indexOf(child), 1)
                child.parent = null
                // removes the child from the map
                delete this.constructor._controllerMap[child.name]
                // removes the child from the notification map
                this.constructor._notificationMap.unregister(child)
                child.onUnregister()
                if (this.autoDispose) {
                    child.destroy()
                }
            }
        },
        destroy : function() {
            this.dispose()
            _view = null
            _model = null
        },
        dispose : function() {
        },
        getController : function(name) {
            if (this.constructor._controllerMap[name] == undefined)
                return null
            return this.constructor._controllerMap[name]
        }
    }
})())
