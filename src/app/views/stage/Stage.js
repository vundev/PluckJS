/**
 * @author Nasko
 */
$.Class('app.Stage', {}, {
    init : function() {
        this.renderer = new PIXI.WebGLRenderer(800, 600);
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.animate()
    },
    animate : function() {
        this.renderer.render(this.stage);
        var that = this
        requestAnimationFrame(function() {
            that.animate()
        });
    }
})
