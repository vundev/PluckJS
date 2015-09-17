/**
 * @author nasko
 */
$.Class('TestSuite', {}, {
    init : function() {

    },
    run : function() {
        var total = 0
        var failure = 0
        var length = arguments.length
        for (var i = 0; i < length; i++) {
            var testCase = arguments[i]
            testCase.run()
            total += testCase.total
            failure += testCase.failure
        }
        pl_trace('Tests run: ' + total + ', Failures: ' + failure)
    }
})
