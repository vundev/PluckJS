/**
 * @author Nasko
 */

app.Screen = function Screen(label) {
    PIXI.Container.call(this);
    this._label = label
    this._background = null
    this.draw();
}

app.Screen.prototype = Object.create(PIXI.Container.prototype);
app.Screen.prototype.constructor = app.Screen;

app.Screen.prototype.draw = function() {
    this._background = new PIXI.Graphics()
    this._background.beginFill(0xfff000)
    this._background.drawRect(0, 0, 200, 200)
    this._background.endFill()

    var style = {
        font : 'bold italic 26px Arial',
        fill : '#F7EDCA',
        stroke : '#4a1850',
        strokeThickness : 5,
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 6,
        wordWrap : true,
        wordWrapWidth : 440
    };

    var text = new PIXI.Text(this._label, style);

    this.addChild(this._background)
    this.addChild(text)
}

app.Screen.prototype.changeColor = function(color) {
    this._background.clear()
    this._background.beginFill(color)
    this._background.drawRect(0, 0, 200, 200)
    this._background.endFill()
}
