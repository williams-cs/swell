"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
class MulOp extends BinaryOperation_1.BinaryOperation {
    constructor(left, right, ws) {
        super(left, right);
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    eval(context) {
        return new NumberNode_1.NumberNode(this.left.eval(new Scope_1.Scope(context)).eval(context).val * this.right.eval(new Scope_1.Scope(context)).eval(context).val);
    }
    toString() {
        return this._ws + this.left.toString() + ' * ' + this.right.toString();
    }
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    newLine() {
        return false;
    }
}
exports.MulOp = MulOp;
//# sourceMappingURL=MulOp.js.map