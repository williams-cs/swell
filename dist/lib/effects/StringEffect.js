"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringEffect {
    constructor(str) {
        this._fontSize = 20;
        this._str = str;
    }
    draw(context, x, y) {
        if (context.canvas.isDefined()) {
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            let fontDeets = this._fontSize + "px Arial";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            console.log("StringEffect String: " + this._str.val);
            ctx.fillText(this._str.val, x, y);
            console.log("woohoo");
            let dims = ctx.measureText(this._str.val);
            this._w = dims.width;
            this._h = this._fontSize;
            context.effects.push(this);
        }
        else {
            console.log("canvas is NOT defined");
        }
    }
    ast() {
        throw new Error("Not implemented");
    }
    updateAST() {
        throw new Error("Not implemented");
    }
    drawTextGuides(x, y, w, h, corner) {
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if (corner !== 0) {
            switch (corner) { //colors the guide blue if selected
                case 2:
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue');
                    break;
            }
        }
        else {
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white');
        }
    }
    drawSquare(x, y, w, h, color) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }
}
exports.StringEffect = StringEffect;
//# sourceMappingURL=StringEffect.js.map