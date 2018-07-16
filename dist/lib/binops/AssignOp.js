"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
// left side is variable, right side is val
// Reassign new value to var
class AssignOp extends __1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
        if (!(left instanceof __1.VariableNode)) {
            throw new Error("The left hand side of the assignment must be a variable.");
        }
    }
    draw(context, x, y) {
    }
    eval(context) {
        if (this.left instanceof __1.VariableNode) {
            let left2 = this.left;
            let r = this.right.eval(context);
            context.assign(left2.name, r);
            return r;
        }
        throw new Error("HALP (in AssignOp)");
    }
}
exports.AssignOp = AssignOp;
//# sourceMappingURL=AssignOp.js.map