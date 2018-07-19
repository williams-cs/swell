"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NumberEffect {
    constructor(num) {
        this._fontSize = 20;
        this._num = num;
        this._str = num.val.toString();
    }
    draw(context, x, y) {
        if (context.canvas.isDefined()) {
            let ctx = context.canvas.get().getContext("2d");
            let fontDeets = this._fontSize + "px Arial";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            ctx.fillText(this._str, x, y);
            let dims = ctx.measureText(this._str);
            this._w = dims.width;
            this._h = this._fontSize;
        }
    }
    ast() {
        throw new Error("Not implemented");
    }
    updateAST() {
        throw new Error("Not implemented");
    }
    x() {
        return this._x;
    }
    y() {
        return this._y;
    }
}
exports.NumberEffect = NumberEffect;
//# sourceMappingURL=NumberEffect.js.map