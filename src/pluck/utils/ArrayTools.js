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
    },
    merge : function(array, position) {
        var elements = pl.ArrayTools.flatten(Array.prototype.slice.call(arguments).slice(2))
        var length = elements.length
        for (var i = 0; i < length; i++) {
            array.splice(position + i, 0, elements[i])
        }
        return array
    },
    equals : function(array1, array2) {
        if (array1.length != array2.length)
            return false
        var length = array1.length
        for (var i = 0; i < length; i++) {
            if (array1[i] != array2[i])
                return false
        }
        return true
    },
    diff : function(array, compare) {
        var unique = []
        var length = array.length
        for (var i = 0; i < length; i++)
            if (!pl.ArrayTools.has(compare, array[i]))
                unique.push(array[i])
        return unique
    }
}, {
    init : function() {
        throw new Error('static class')
    }
})
