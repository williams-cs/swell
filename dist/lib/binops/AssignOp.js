"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const VariableNode_1 = require("../vars/VariableNode");
// left side is variable, right side is val
// Reassign new value to var
class AssignOp extends BinaryOperation_1.BinaryOperation {
    /**
     * Constructor for an assignment operation
     * @param left The left side of the assignment (the var)
     * @param right The right side of the assignment (the value)
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        super(left, right);
        if (!(left instanceof VariableNode_1.VariableNode)) {
            throw new Error("The left hand side of the assignment must be a variable.");
        }
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates assign op by assigning value to var
     * @param context The current context
     */
    eval(context) {
        if (this.left instanceof VariableNode_1.VariableNode) {
            let r = this.right.eval(context);
            context.assign(this.left.name, r);
            return r;
        }
        throw new Error("HALP (in AssignOp)");
    }
    /**
     * Returns a string representation of the AssignOp
     */
    toString() {
        return this._ws + this.left.toString() + ' = ' + this.right.toString();
    }
    /**
     * AssignOps can't be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals can't be called directly on AssignOp
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.AssignOp = AssignOp;
//# sourceMappingURL=AssignOp.js.map