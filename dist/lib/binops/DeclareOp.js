"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const VariableNode_1 = require("../vars/VariableNode");
// left side is variable, right side is val
// Declares new val
class DeclareOp extends BinaryOperation_1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
        if (!(left instanceof VariableNode_1.VariableNode)) {
            throw new Error("The left hand side of the assignment must be a variable.");
        }
    }
    toString() {
        return "var " + this.left.toString() + ' = ' + this.right.toString();
    }
    eval(context) {
        if (this.left instanceof VariableNode_1.VariableNode) {
            //let left2: VariableNode = this.left as VariableNode;
            context.declare(this.left.name);
            let r = this.right.eval(context);
            context.assign(this.left.name, r);
            return r;
        }
        throw new Error("HALP (in DeclareOp)");
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
exports.DeclareOp = DeclareOp;
//# sourceMappingURL=DeclareOp.js.map