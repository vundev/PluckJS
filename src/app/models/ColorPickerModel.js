/**
 * @author Nasko
 */
pluck.Model('app.ColorPickerModel', {}, (function() {
    var objectID = 0
    return {
        init : function() {
            this._super()
            this.id = objectID++
        }
    }
})())
