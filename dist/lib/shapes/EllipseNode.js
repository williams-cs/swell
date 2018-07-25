"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class EllipseNode {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    draw(context, dims, ast) {
        let radius = this._width.eval(context).val / 2;
        dims.radius = new NumberNode_1.NumberNode(radius);
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
    toString() {
        return "ellipse(" + this._width.toString() + ", " + this._height.toString() + ")";
    }
}
exports.EllipseNode = EllipseNode;
//# sourceMappingURL=EllipseNode.js.map