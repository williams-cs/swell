"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
class MinusOp extends BinaryOperation_1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
    }
    draw(context, x, y) {
    }
    eval(context) {
        return new NumberNode_1.NumberNode(this.left.eval(new Scope_1.Scope(context)).eval(context).val - this.right.eval(new Scope_1.Scope(context)).eval(context).val);
    }
}
exports.MinusOp = MinusOp;
//# sourceMappingURL=MinusOp.js.map