"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class PrintNode {
    constructor(toPrint, x, y) {
        this._x = new __1.NumberNode(0);
        this._y = new __1.NumberNode(0);
        this._toPrint = toPrint;
        //this._x = x || 0;
        //this._y = y || 0;
        this._x = x || new __1.NumberNode(0);
        this._y = y || new __1.NumberNode(0);
    }
    draw(context, x, y) {
        throw new Error("Cannot call draw() on printOp");
    }
    // eval param and call draw
    eval(context) {
        let res = this._toPrint.eval(context);
        res.draw(context, this._x, this._y);
        return res;
    }
    get x() {
        return this._x.val;
    }
    set x(val) {
        this._x = new __1.NumberNode(val);
    }
    get y() {
        return this._y.val;
    }
    set y(val) {
        this._y = new __1.NumberNode(val);
    }
}
exports.PrintNode = PrintNode;
//# sourceMappingURL=PrintNode.js.map