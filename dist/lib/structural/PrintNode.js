"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
class PrintNode {
    constructor(toPrint, x, y, dimensions) {
        this._x = new NumberNode_1.NumberNode(0);
        this._y = new NumberNode_1.NumberNode(0);
        this._scale = 1;
        this._toPrint = toPrint;
        //this._x = x || 0;
        //this._y = y || 0;
        this._x = x || new NumberNode_1.NumberNode(0);
        this._y = y || new NumberNode_1.NumberNode(0);
        this._dims = dimensions || null;
    }
    draw(context, x, y) {
        throw new Error("Cannot call draw() on printOp");
    }
    // eval param and call draw
    eval(context) {
        let res = this._toPrint.eval(context);
        res.draw(context, this._x.eval(context).val, this._y.eval(context).val, this._dims, this);
        return res;
    }
    get x() {
        return this._x;
    }
    set x(val) {
        this._x = val;
    }
    get y() {
        return this._y;
    }
    set y(val) {
        this._y = val;
    }
    get toPrint() {
        return this._toPrint;
    }
    get dims() {
        return this._dims;
    }
}
exports.PrintNode = PrintNode;
//# sourceMappingURL=PrintNode.js.map