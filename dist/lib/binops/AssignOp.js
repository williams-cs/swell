"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const VariableNode_1 = require("../vars/VariableNode");
// left side is variable, right side is val
// Reassign new value to var
class AssignOp extends BinaryOperation_1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
        if (!(left instanceof VariableNode_1.VariableNode)) {
            throw new Error("The left hand side of the assignment must be a variable.");
        }
    }
    draw(context, dims, ast) {
    }
    eval(context) {
        if (this.left instanceof VariableNode_1.VariableNode) {
            //let left2: VariableNode = this.left as VariableNode;
            let r = this.right.eval(context);
            context.assign(this.left.name, r);
            return r;
        }
        throw new Error("HALP (in AssignOp)");
    }
    toString() {
        return this.left.toString() + ' = ' + this.right.toString();
    }
    get newLine() {
        return this.newLine;
    }
}
exports.AssignOp = AssignOp;
//# sourceMappingURL=AssignOp.js.map