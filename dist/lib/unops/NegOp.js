"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnaryOperation_1 = require("./UnaryOperation");
const NumberNode_1 = require("../prims/NumberNode");
class NegOp extends UnaryOperation_1.UnaryOperation {
    /**
     * Constructor for a NegationOperation
     * @param val The value to be negated (must be a NumberNode)
     * @param ws Preceding whitespace
     */
    constructor(val, ws) {
        super(val);
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the value into the negative version
     * @param context The current program context
     */
    eval(context) {
        let v = this.val.eval(context);
        return new NumberNode_1.NumberNode(-v.val, "");
    }
    /**
     * NegOps cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Negation ops cannot be drawn directly");
    }
    /**
     * Equals cannot be called directly on a NegOp
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on NegOp");
    }
    /**
     * Returns a string representation of the NegOp
     */
    toString() {
        return this._ws + "-" + this.val;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.NegOp = NegOp;
//# sourceMappingURL=NegOp.js.map