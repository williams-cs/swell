"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class EllipseNode {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    draw(context, dims, ast) {
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
    get heigth() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }
}
exports.EllipseNode = EllipseNode;
//# sourceMappingURL=EllipseNode.js.map