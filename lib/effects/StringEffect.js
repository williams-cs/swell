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
            let fontDeets = this._fontSize + "px Arial";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            ctx.fillText(this._str.str, x, y);
            let dims = ctx.measureText(this._str.str);
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
}
exports.StringEffect = StringEffect;
