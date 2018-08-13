"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
class Equals {
    /**
     * Constructor for equality (==) operation
     * @param left The left side of the equality
     * @param right The right side of the equality
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
     * Performs the comparison and evaluates to a BooleanNode
     * @param context
     */
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        return new BooleanNode_1.BooleanNode(lhs.equalsVal(rhs));
    }
    /**
     * Returns a string representation of the equality op
     */
    toString() {
        return this._ws + this._left.toString() + ' equals ' + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals can't be called directly on an equality op
     * @param right
     */
    equalsVal(right) {
        throw new Error("well this is meta");
    }
    /**
     * Equality ops can't be drawn directly
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
exports.Equals = Equals;
//# sourceMappingURL=Equals.js.map