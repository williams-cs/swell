"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
class MinusOp extends BinaryOperation_1.BinaryOperation {
    /**
     * The constructor for the subtraction operation
     * @param left The minuend
     * @param right The subrahend
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
     * Performs the subtraction and evaluates to a single NumberNode
     * @param context The current program context
     */
    eval(context) {
        return new NumberNode_1.NumberNode(this.left.eval(new Scope_1.Scope(context)).eval(context).val - this.right.eval(new Scope_1.Scope(context)).eval(context).val);
    }
    /**
     * Subtraction ops can't be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals can't be called directly on subtraction
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns a string representation of the subtraction op
     */
    toString() {
        return this._ws + this.left.toString() + ' - ' + this.right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.MinusOp = MinusOp;
//# sourceMappingURL=MinusOp.js.map