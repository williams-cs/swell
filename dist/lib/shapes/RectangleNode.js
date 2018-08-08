"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const RectangleEffect_1 = require("../effects/RectangleEffect");
class RectangleNode {
    constructor(width, height, ws) {
        this._newLine = false;
        this._width = width;
        this._height = height;
        this._ws = ws;
    }
    draw(context, dims, ast) {
        dims.width = new NumberNode_1.NumberNode(this._width.eval(context).val, "");
        dims.height = new NumberNode_1.NumberNode(this._height.eval(context).val, "");
        let e = new RectangleEffect_1.RectangleEffect(this);
        e.draw(context, dims, ast);
    }
    eval(context) {
        return this;
    }
    move() { }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }
    newLine() {
        return this._newLine;
    }
    toString() {
        return this._ws + "rect(" + this._width.toString() + ", " + this._height.toString() + ")";
    }
}
exports.RectangleNode = RectangleNode;
//# sourceMappingURL=RectangleNode.js.map