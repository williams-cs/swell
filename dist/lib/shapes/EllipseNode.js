"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class EllipseNode {
    constructor(width, height) {
        this._newLine = false;
        this._width = width;
        this._height = height;
    }
    draw(context, dims, ast) {
        dims.width = this._width;
        dims.height = this._height;
        let e = new EllipseEffect_1.EllipseEffect(this);
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
        return "ellipse(" + this._width.toString() + ", " + this._height.toString() + ")";
    }
}
exports.EllipseNode = EllipseNode;
//# sourceMappingURL=EllipseNode.js.map