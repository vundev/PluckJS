/**
 * @author Nasko
 */

function PluckMain() {
    pl_trace('start pluck')
    pl.ViewController.setRoot(new app.RootController())
    pl.ViewController.getRoot().sendNotification(app.RootController.CHANGE, { page:'screen0' } )
}
