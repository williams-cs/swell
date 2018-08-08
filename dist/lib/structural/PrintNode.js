"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrintNode {
    constructor(toPrint, dimensions, ws) {
        this._scale = 1;
        this._newLine = false;
        this._toPrint = toPrint;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
        this._dims = dimensions || null;
    }
    toString() {
        return this._ws + "print(" + this.toPrint.toString() + ", " + this.dims.toString() + ")";
    }
    equalsVal(right) {
        throw new Error("Cannot call equals on PrintNode");
    }
    draw(context, dims, ast) {
        throw new Error("Cannot call draw() on printOp");
    }
    // eval param and call draw
    eval(context) {
        let res = this._toPrint.eval(context);
        res.draw(context, this._dims, this);
        return res;
    }
    get toPrint() {
        return this._toPrint;
    }
    get dims() {
        return this._dims;
    }
    newLine() {
        return this._newLine;
    }
}
exports.PrintNode = PrintNode;
//# sourceMappingURL=PrintNode.js.map