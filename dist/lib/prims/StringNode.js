"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class StringNode {
    /**
     * Constructor for a StringNode, a node representing a string
     * @param str The string stored in the node
     * @param ws Preceding whitespace
     */
    constructor(str, ws) {
        this._newLine = false;
        this._str = str;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this StringNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the String using StringEffect
     * @param context The current program context
     * @param dims The dimensions of the string to be drawn
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        let e = new StringEffect_1.StringEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this StringNode equals another StringNode
     * @param right The right side of the equality, must be a StringNode
     */
    equalsVal(right) {
        if (right instanceof StringNode) {
            return this.val === right.val;
        }
        return false;
    }
    /**
     * Returns a string representation of the StringNode
     */
    toString() {
        return this._ws + '\"' + this._str + '\"';
    }
    /**
     * Sets the string stored in the node
     */
    set str(value) {
        this._str = value;
    }
    /**
     * Returns the string stored in the node
     */
    get val() {
        return this._str;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.StringNode = StringNode;
//# sourceMappingURL=StringNode.js.map