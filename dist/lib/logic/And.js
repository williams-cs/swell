"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
class And {
    /**
     * Constructor for logical 'and' (&&) operation
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
     * Performs the operation and returns a boolean of the result
     * @param context The current program context
     */
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof BooleanNode_1.BooleanNode && rhs instanceof BooleanNode_1.BooleanNode) {
            return new BooleanNode_1.BooleanNode(lhs.val && rhs.val);
        }
        else {
            throw new Error("The arguments to the 'and' operator must be booleans.");
        }
    }
    /**
     * Returns a string representation of the operation
     */
    toString() {
        return this._ws + this._left.toString() + ' and ' + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on the 'and' op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * The 'and' operation cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns the left side of the op
     */
    get left() {
        return this._left;
    }
    /**
     * Returns the right side of the op
     */
    get right() {
        return this._right;
    }
}
exports.And = And;
//# sourceMappingURL=And.js.map