/**
 * @author Nasko
 */

var app = app || {}

app.ColorPicker = function ColorPicker(id) {
    PIXI.Container.call(this);
    this.id = id
    this.interactive = true
    this.draw();
}

app.ColorPicker.prototype = Object.create(PIXI.Container.prototype);
app.ColorPicker.prototype.constructor = app.ColorPicker;

app.ColorPicker.prototype.draw = function() {
    var background = new PIXI.Graphics()
    background.beginFill(0xffffff * Math.random())
    background.drawRect(0, 0, 200, 200)
    background.endFill()

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

    var text = new PIXI.Text('id: ' + this.id, style);

    this.addChild(background)
    this.addChild(text)
}