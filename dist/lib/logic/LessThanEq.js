"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
const NumberNode_1 = require("../prims/NumberNode");
class LessThanEq {
    /**
     * Constructor for LessThanEq (less than or equal to, <=) operation
     * @param left The left side of the operation
     * @param right The right side of the operation
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the LessThanEq comparison and returns BooleanNode with result
     * @param context The current program context
     */
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode_1.NumberNode && rhs instanceof NumberNode_1.NumberNode) {
            return (new BooleanNode_1.BooleanNode(lhs.val <= rhs.val));
        }
        else {
            throw new Error("The arguments to the <= operator must be numeric.");
        }
    }
    /**
     * Returns a string representation of the operation
     */
    toString() {
        return this._ws + this._left.toString() + " <= " + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on LessThanEq op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * LessThanEq ops cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns left side of operation
     */
    get left() {
        return this._left;
    }
    /**
     * Returns right side of operation
     */
    get right() {
        return this._right;
    }
}
exports.LessThanEq = LessThanEq;
//# sourceMappingURL=LessThanEq.js.map