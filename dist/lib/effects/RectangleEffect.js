"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaintEvent_1 = require("../logging/PaintEvent");
class RectangleEffect {
    constructor(num) {
        this._dims = null;
        this._fontSize = 20;
        this._num = num;
        this._str = num.val.toString();
    }
    draw(context, dims, ast) {
        if (context.canvas.isDefined()) {
            let ctx = context.canvas.get().getContext("2d");
            let fontDeets = this._fontSize + "px Arial";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            ctx.fillText(this._str, this._x, this._y);
            let dims = ctx.measureText(this._str);
            this._w = dims.width;
            this._h = this._fontSize;
        }
    }
    update() {
    }
    logPaint() {
        return new PaintEvent_1.PaintEvent(this._str);
    }
    // logMove(): string {
    //     let moveStr = new DragEvent(this._str, this._x1, this._y1, this._dims.x, this._dims.y);
    //     return moveStr.assembleLog();
    // }
    // logResize(): string {
    //     let sizeStr = new ResizeEvent(this._str, this._size1, this._fontSize);
    //     return sizeStr.assembleLog();
    // }
    ast() {
        throw new Error("Not implemented");
    }
    updateAST() {
        throw new Error("Not implemented");
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get dims() {
        return this._dims;
    }
}
exports.RectangleEffect = RectangleEffect;
//# sourceMappingURL=RectangleEffect.js.map