/**
 * @author Nasko
 */

UnitTest('ViewControllerTest', {}, {
    init : function() {
        this._super()
    },
    setUp : function() {
        this.instance = new pluck.ViewController()
    },
    tearDown : function() {
        this.instance = null
    },
    shouldBeInstantiated : function() {
        assertEquals(pl_getQualifiedClassName(this.instance), 'pluck.ViewController')
    },
    /**
     *             3
     *           /
     *          2
     *        /  \
     *       1    4
     *      / \
     * root    5
     *      \
     *       6
     *
     * Node 1 is removed.
     */
    removeChildViewControllerWithSuccessors : function() {
        var child1 = new pluck.ViewController(null, null, String(1))
        var child2 = new pluck.ViewController(null, null, String(2))
        var child3 = new pluck.ViewController(null, null, String(3))
        var child4 = new pluck.ViewController(null, null, String(4))
        var child5 = new pluck.ViewController(null, null, String(5))
        var child6 = new pluck.ViewController(null, null, String(6))

        // create the tree
        this.instance.addChildViewController(child1)
        this.instance.addChildViewController(child6)
        child1.addChildViewController(child2)
        child1.addChildViewController(child5)
        child2.addChildViewController(child3)
        child2.addChildViewController(child4)

        this.instance.removeChildViewController(child1)
        assertTrue('root node has got only one child: child6', this.instance.children.length == 1)
        assertEquals(this.instance.children[0], child6)
        assertTrue('child1 has not got any children', child1.children.length == 0)
        assertTrue('child2 has not got any children', child2.children.length == 0)
        assertTrue('child3 has not got any children', child3.children.length == 0)
        assertTrue('child4 has not got any children', child4.children.length == 0)
        assertTrue('child5 has not got any children', child5.children.length == 0)
    },
    removeChildViewController : function() {
        var child = new pluck.ViewController(null, null, 'child')
        this.instance.addChildViewController(child)
        this.instance.removeChildViewController(child)
        assertTrue('root node has not got any children', this.instance.children.length == 0)
        assertEquals(child.parent, null)
    },
    addChildViewController : function() {
        var child = new pluck.ViewController(null, null, 'child')
        this.instance.addChildViewController(child)
        assertTrue('root node has one child', this.instance.children.length == 1)
        assertEquals(child.parent, this.instance)
    },
    notificationHandling : function() {
        var recipient = new TestNotificationsViewController()
        this.instance.addChildViewController(recipient)
        assertTrue('notification is not accepted yet', !recipient.model().notificationAccepted)
        this.instance.sendNotification(TestNotificationsViewController.NOTIFICATION_TYPE)
        assertTrue('notification is received successfully', recipient.model().notificationAccepted)
    }
})
