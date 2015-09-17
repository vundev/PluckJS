/**
 * @author nasko
 */

UnitTest('ArrayToolsTest', {}, {
    init : function() {
        this._super()
    },
    testHas : function() {
        assertTrue('check for existing element', pl.ArrayTools.has([1, 2, 3], 1))
    },
    testFlatten : function() {
        var unflattened = [[1, 2, 3], [[4, 5], 6]]
        var flattened1 = [1, 2, 3, 4, 5, 6]
        var flattened2 = pl.ArrayTools.flatten(unflattened)
        var length = flattened1.length
        for (var i = 0; i < length; i++) {
            assertEquals(flattened1[i], flattened2[i])
        };
        assertEquals(length, flattened2.length)
    }
})
