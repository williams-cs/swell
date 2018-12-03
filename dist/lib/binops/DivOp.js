"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
class DivOp extends BinaryOperation_1.BinaryOperation {
    /**
     * Constructor for the division operation
     * @param left The dividend
     * @param right The divisor
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        super(left, right);
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the division and evaluates into a single NumberNode
     * @param context The current program context
     */
    eval(context) {
        return new NumberNode_1.NumberNode(this.left.eval(new Scope_1.Scope(context)).eval(context).val / this.right.eval(new Scope_1.Scope(context)).eval(context).val);
    }
    /**
     * Division ops can't be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals can't be called directly on a division op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns a string representation of the division
     */
    toString() {
        return this._ws + this.left.toString() + ' / ' + this.right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.DivOp = DivOp;
//# sourceMappingURL=DivOp.js.map