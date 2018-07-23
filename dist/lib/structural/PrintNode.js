"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrintNode {
    constructor(toPrint, dimensions) {
        this._scale = 1;
        this._toPrint = toPrint;
        this._dims = dimensions || null;
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
}
exports.PrintNode = PrintNode;
//# sourceMappingURL=PrintNode.js.map