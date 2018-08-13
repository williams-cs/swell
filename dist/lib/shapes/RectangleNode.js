"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const RectangleEffect_1 = require("../effects/RectangleEffect");
class RectangleNode {
    /**
     * Constructor for a RectangleNode, a node representing a rectangle
     * @param width The width of the rectangle
     * @param height The height of the rectangle
     * @param ws Preceding whitespace
     */
    constructor(width, height, ws) {
        this._newLine = false;
        this._width = width;
        this._height = height;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this RectangleNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the rectangle using RectangleEffect
     * @param context The current program context
     * @param dims The rectangle dimensions
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        dims.width = new NumberNode_1.NumberNode(this._width.eval(context).val, "");
        dims.height = new NumberNode_1.NumberNode(this._height.eval(context).val, "");
        let e = new RectangleEffect_1.RectangleEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this RectangleNode equals another (if their widths and heights are equal)
     * @param right The right side of the equality (must be a RectangleNode)
     */
    equalsVal(right) {
        if (right instanceof RectangleNode) {
            return (this.width.equalsVal(right.width) && this.height.equalsVal(right.height));
        }
        return false;
    }
    move() { }
    /**
     * Returns a string representation of the rectangle
     */
    toString() {
        return this._ws + "rect(" + this._width.toString() + ", " + this._height.toString() + ")";
    }
    /**
     * Returns the width of the rectangle
     */
    get width() {
        return this._width;
    }
    /**
     * Sets the width of the rectangle
     */
    set width(width) {
        this._width = width;
    }
    /**
     * Returns the height of the rectangle
     */
    get height() {
        return this._height;
    }
    /**
     * Sets the height of the rectangle
     */
    set height(height) {
        this._height = height;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.RectangleNode = RectangleNode;
//# sourceMappingURL=RectangleNode.js.map