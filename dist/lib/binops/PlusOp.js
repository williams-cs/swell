"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
// left and right are both expressions
class PlusOp extends BinaryOperation_1.BinaryOperation {
    /**
     * Constructor for the addition operation
     * @param left The first addend
     * @param right The second addend
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
     * Performs the addition and returns a single NumberNode
     * @param context The current program context
     */
    eval(context) {
        return new NumberNode_1.NumberNode(this.left.eval(new Scope_1.Scope(context)).eval(context).val + this.right.eval(new Scope_1.Scope(context)).eval(context).val);
    }
    /**
     * Addition ops cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals cannot be called directly on an addition op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns a string representation of the addition op
     */
    toString() {
        return this._ws + this.left.toString() + ' + ' + this.right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.PlusOp = PlusOp;
//# sourceMappingURL=PlusOp.js.map