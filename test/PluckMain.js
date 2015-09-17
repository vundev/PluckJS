/**
 * @author nasko
 */

function PluckMain() {
    new TestSuite().run(
        new globalTest(),
        new ArrayToolsTest()
    )
}
