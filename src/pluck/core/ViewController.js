/**
 * @author Nasko
 */

$.Class('pluck.ViewController', {
    _controllerMap : {},
    _notificationMap : new pluck.NotificationMap(),
    _root : null,
    setRoot : function(root) {
        if (pluck.ViewController._root)
            throw new Error('Root controller has been already set!')
        pluck.ViewController._root = root
        // register root controller for handling notifications
        pluck.ViewController._controllerMap[pluck.ViewController._root.name] = pluck.ViewController._root
        pluck.ViewController._notificationMap.register(pluck.ViewController._root)
        pluck.ViewController._root.onRegister()
    },
    getRoot : function() {
        return pluck.ViewController._root
    },
    disposeRootController : function() {
        var root = pluck.ViewController._root
        while (root.children.length > 0) {
            root.removeChildViewController(root.children[0])
        }
        delete pluck.ViewController._controllerMap[root.name]
        pluck.ViewController._notificationMap.unregister(root)
        root.onUnregister()
        if (root.autoDispose)
            root.destroy()
        pluck.ViewController._root = null
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
            this.constructor._notificationMap.notify(new pluck.Notification(type, body))
        },
        handleNotification : function() {
        },
        onRegister : function() {
        },
        onUnregister : function() {
        },
        hasChildViewController : function(child) {
            return pluck.ArrayTools.has(this.children, child)
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
                if (child.autoDispose) {
                    child.destroy()
                }
            }
        },
        destroy : function() {
            this.dispose()
            if (this._view && 'dispose' in this._view)
                this._view.dispose()
            if (this._model && 'dispose' in this._model)
                this._model.dispose()
            this._view = null
            this._model = null
        },
        dispose : function() {
        },
        getController : function(name) {
            if (this.constructor._controllerMap[name] == undefined)
                return null
            return this.constructor._controllerMap[name]
        },
        unique : function() {
            return this.getController(this.name) || this
        }
    }
})())
