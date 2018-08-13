"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BooleanNode {
    /**
     * Constructor for BooleanNode, a node representing a boolean
     * @param val The boolean value of the BooleanNode
     * @param ws Preceding white space
     */
    constructor(val, ws) {
        this._newLine = false;
        this._val = val;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    ;
    /**
     * Returns the BooleanNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * BooleanNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Returns whether this BooleanNode equals another
     * @param right The right side of the equality
     */
    equalsVal(right) {
        if (right instanceof BooleanNode) {
            return this.val === right.val;
        }
        return false;
    }
    /**
     * Returns a string representation of the BooleanNode
     */
    toString() {
        return this._ws + this._val;
    }
    /**
     * Returns the boolean value
     */
    get val() {
        return this._val;
    }
    /**
     * Sets the boolean value
     */
    set val(value) {
        this._val = value;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.BooleanNode = BooleanNode;
//# sourceMappingURL=BooleanNode.js.map