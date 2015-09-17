/**
 * @author nasko
 */

UnitTest('globalTest', {}, {
    init : function() {
        this._super()
    },
    testGetQualifiedClassName : function() {
        assertEquals(pl_getQualifiedClassName({}), 'object')
        assertEquals(pl_getQualifiedClassName(Array), 'function')
        assertEquals(pl_getQualifiedClassName(function() {
        }), 'function')
        assertEquals(pl_getQualifiedClassName(new Array()), 'array')
        assertEquals(pl_getQualifiedClassName(new UnitTest()), 'UnitTest')
        assertEquals(pl_getQualifiedClassName(5), 'number')
        assertEquals(pl_getQualifiedClassName('pluck'), 'string')
        assertEquals(pl_getQualifiedClassName(true), 'boolean')
    }
})
