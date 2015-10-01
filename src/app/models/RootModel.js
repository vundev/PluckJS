/**
 * @author Nasko
 */
pluck.Model('app.RootModel', {}, {
    init : function() {
        this._super()
        this.currentPage = null
    },
    setCurrentPage : function(newPage) {
        if (newPage != this.currentPage) {
            this.currentPage = newPage
            return false
        }
        return true
    }
})
