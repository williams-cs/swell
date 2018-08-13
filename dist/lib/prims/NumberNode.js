"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import{Node} from './Node';
// Nodes representing numbers
// Should abstract Node class implement Expression?
class NumberNode {
    /**
     * Constructor for a NumberNode, a node representing a number
     * @param val The number value
     * @param ws Preceding whitespace
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
     * Returns this NumberNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * NumberNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Numbers cannot be drawn directly.");
    }
    /**
     * Returns whether this NumberNode equals another NumberNode
     * @param right The right side of the equality (must be a NumberNode)
     */
    equalsVal(right) {
        if (right instanceof NumberNode) {
            return this.val === right.val;
        }
        return false;
    }
    /**
     * Returns a string representation of the NumberNode
     */
    toString() {
        return this._ws + this._val;
    }
    /**
     * Returns the number stored in the node
     */
    get val() {
        return this._val;
    }
    /**
     * Sets the value of the number stored in the node
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
exports.NumberNode = NumberNode;
//# sourceMappingURL=NumberNode.js.map