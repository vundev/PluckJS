/**
 * @author nasko
 */
var assertTrue = function(message, what) {
    if (!what)
        throw new AssertError(AssertError.ASSERT_TRUE, message)
}
var assertEquals = function(e1, e2) {
    try {
        var check = e1.equals(e2) && e2.equals(e1)
    } catch(error) {
        check = e1 == e2
    }
    if (!check)
        throw new AssertError(AssertError.ASSERT_EQUALS, {
            e1 : e1,
            e2 : e2
        })
}
