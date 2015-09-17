/**
 * @author nasko
 */

$.Class('UnitTest', {

}, {
    init : function() {
        this.total = 0
        this.failure = 0
    },
    setUp : function() {

    },
    tearDown : function() {

    },
    run : function() {
        this.total = 0
        this.failure = 0
        var prototype = this.constructor.prototype
        var reserved = ['init', 'setUp', 'tearDown', 'run', 'constructor', 'Class', 'proxy', 'callback']
        for (var key in prototype) {
            if (!pl.ArrayTools.has(reserved, key) && typeof prototype[key] == 'function') {
                this.total++
                this.setUp()
                try {
                    this[key].call(this)
                } catch(error) {
                    pl_trace(error.toString(this.constructor.fullName + '::' + key))
                    this.failure++
                }
                this.tearDown()
            }
        }
    }
})
