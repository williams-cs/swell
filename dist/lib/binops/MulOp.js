"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
class MulOp extends BinaryOperation_1.BinaryOperation {
    /**
     * Constructor for the multiplication operation
     * @param left The multiplicand
     * @param right The multiplier
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
     * Performs the multiplication and returns a single NumberNode
     * @param context The current program context
     */
    eval(context) {
        return new NumberNode_1.NumberNode(this.left.eval(new Scope_1.Scope(context)).eval(context).val * this.right.eval(new Scope_1.Scope(context)).eval(context).val);
    }
    /**
     * Returns a string representation of the multiplication op
     */
    toString() {
        return this._ws + this.left.toString() + ' * ' + this.right.toString();
    }
    /**
     * Multiplication ops cannot be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals cannot be called directly on a multiplicaiton operation
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
exports.MulOp = MulOp;
//# sourceMappingURL=MulOp.js.map