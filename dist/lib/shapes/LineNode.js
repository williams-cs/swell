"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const LineEffect_1 = require("../effects/LineEffect");
class LineNode {
    /**
     * Constructor for a LineNode, a node representing a line
     * @param dx the run of the line
     * @param dy the rise of the line
     * @param ws Preceding whitespace
     */
    constructor(dx, dy, ws) {
        this._newLine = false;
        this._dx = dx;
        this._dy = dy;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this LineNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the line using LineEffect
     * @param context The current program context
     * @param dims The line dimensions
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        dims.width = new NumberNode_1.NumberNode(this._dx.eval(context).val, "");
        dims.height = new NumberNode_1.NumberNode(this._dy.eval(context).val, "");
        let e = new LineEffect_1.LineEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this LineNode equals another (if their dx and dy are equal)
     * @param right The right side of the equality (must be a LineNode)
     */
    equalsVal(right) {
        if (right instanceof LineNode) {
            return (this.dx.equalsVal(right.dx) && this.dy.equalsVal(right.dy));
        }
        return false;
    }
    move() { }
    /**
     * Returns a string representation of the line
     */
    toString() {
        return this._ws + "line(" + this._dx.toString() + ", " + this._dy.toString() + ")";
    }
    /**
     * Returns the run of the line
     */
    get dx() {
        return this._dx;
    }
    /**
     * Sets the run of the line
     */
    set dx(dx) {
        this._dx = dx;
    }
    /**
     * Returns the rise of the line
     */
    get dy() {
        return this._dy;
    }
    /**
     * Sets the rise of the line
     */
    set dy(dy) {
        this._dy = dy;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.LineNode = LineNode;
//# sourceMappingURL=LineNode.js.map