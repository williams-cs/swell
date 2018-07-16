"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class DivOp extends __1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
    }
    draw(context, x, y) {
    }
    eval(context) {
        return new __1.NumberNode(this.left.eval(new __1.Scope(context)).eval(context).val / this.right.eval(new __1.Scope(context)).eval(context).val);
    }
}
exports.DivOp = DivOp;
//# sourceMappingURL=DivOp.js.map