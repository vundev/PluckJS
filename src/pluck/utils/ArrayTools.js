/**
 * @author nasko
 */
$.Class('pl.ArrayTools', {
    has : function(array, what) {
        return array.indexOf(what) > -1
    },
    flatten : function(array) {
        var flattened = new Array()
        var length = array.length
        for (var i = 0; i < length; i++) {
            var item = array[i]
            if (pl_getQualifiedClassName(item) == 'array')
                flattened = flattened.concat(pl.ArrayTools.flatten(item))
            else
                flattened.push(item)
        }
        return flattened
    }
}, {
    init : function() {
        throw new Error('static class')
    }
})
