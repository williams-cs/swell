"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const VariableNode_1 = require("../vars/VariableNode");
// left side is variable, right side is val
// Declares new val
class DeclareOp extends BinaryOperation_1.BinaryOperation {
    /**
     * Constructor for the declare operation, which declares a variable for the first time
     * @param left The left side of the declare op (the variable)
     * @param right The right side of the op (the value)
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
     * Evaluates the declaration by declaring the variable in the context and assigning the value
     * @param context The current program context
     */
    eval(context) {
        if (this.left instanceof VariableNode_1.VariableNode) {
            context.declare(this.left.name);
            let r = this.right.eval(context);
            context.assign(this.left.name, r);
            return r;
        }
        throw new Error("HALP (in DeclareOp)");
    }
    /**
     * Returns a string representation of the declare op
     */
    toString() {
        return this._ws + "var " + this.left.toString() + ' = ' + this.right.toString();
    }
    /**
     * DeclareOps cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals can't be called direcly on a DeclareOp
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
exports.DeclareOp = DeclareOp;
//# sourceMappingURL=DeclareOp.js.map