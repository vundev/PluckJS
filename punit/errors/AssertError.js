/**
 * @author nasko
 */
function AssertError(type, msg) {
    Error.call(this)
    this.type = type
    this.msg = msg
}

AssertError.ASSERT_TRUE = 'assertTrueError'
AssertError.ASSERT_EQUALS = 'assertEqualsError'
AssertError.constructor = AssertError
AssertError.prototype = {
    __proto__ : Error.prototype,
    toString : function(scope) {
        switch(this.type) {
            case AssertError.ASSERT_TRUE:
                return scope + ' ' + this.msg + ' expected: <true> but was: <false>'
                break;
            case AssertError.ASSERT_EQUALS:
                return scope + ' expected: <' + this.msg.e2 + '> but was: <' + this.msg.e1 + '>'
                break;
        }

    }
}
