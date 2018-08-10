"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class EllipseNode {
    constructor(width, height, ws) {
        this._newLine = false;
        this._width = width;
        this._height = height;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    draw(context, dims, ast) {
        dims.width = this._width;
        dims.height = this._height;
        let e = new EllipseEffect_1.EllipseEffect(this);
        e.draw(context, dims, ast);
    }
    equalsVal(right) {
        if (right instanceof EllipseNode) {
            console.log(this.width + " " + this.height + " equals? " + right.width + " " + right.height);
            let bool1 = (this.width === right.width);
            let bool2 = (this.height === right.height);
            console.log("width: " + bool1.toString() + " height: " + bool2.toString());
            return (this.width === right.width && this.height === right.height);
        }
        return false;
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
        return this._ws + "ellipse(" + this._width.toString() + ", " + this._height.toString() + ")";
    }
}
exports.EllipseNode = EllipseNode;
//# sourceMappingURL=EllipseNode.js.map