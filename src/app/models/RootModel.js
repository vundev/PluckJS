/**
 * @author Nasko
 */
pl.Model('app.RootModel', {}, (function() {
    function initStage() {
        this.renderer = new PIXI.WebGLRenderer(800, 600);
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container()
    }

    return {
        init : function() {
            this._super()
            this.currentPage = null
            initStage.call(this)
        },
        setCurrentPage : function(newPage) {
            if (newPage != this.currentPage) {
                this.currentPage = newPage
                return false
            }
            return true
        }
    }
})())
