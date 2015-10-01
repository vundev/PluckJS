/**
 * @author nasko
 */

UnitTest('ArrayToolsTest', {}, {
    init : function() {
        this._super()
    },
    testHas : function() {
        assertTrue('check for existing element', pluck.ArrayTools.has([1, 2, 3], 1))
    },
    testFlatten : function() {
        var unflattened = [[1, 2, 3], [[4, 5], 6]]
        var flattened1 = [1, 2, 3, 4, 5, 6]
        var flattened2 = pluck.ArrayTools.flatten(unflattened)
        assertTrue('flattened arrays are equal', pluck.ArrayTools.equals(flattened1, flattened2))
    },
    testMerge : function() {
        var merged = pluck.ArrayTools.merge([1, 2, 3], 2, [4, 5], 6)
        assertTrue('merge arrays', pluck.ArrayTools.equals(merged, [1, 2, 4, 5, 6, 3]))
        merged = pluck.ArrayTools.merge([1, 2, 3])
        assertTrue('', pluck.ArrayTools.equals(merged, [1, 2, 3]))
    },
    testDiff : function() {
        var a1 = [1, 2, 3]
        var a2 = [2, 3, 4]
        assertTrue('', pluck.ArrayTools.equals(pluck.ArrayTools.diff(a1, a2), [1]))
    }
})
