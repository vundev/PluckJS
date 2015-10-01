/**
 * @author Nasko
 */

function PluckMain() {
    pl_trace('start pluck')
    pluck.ViewController.setRoot(new app.RootController())
    pluck.ViewController.getRoot().sendNotification(app.RootController.CHANGE, { page:'screen0' } )
}
