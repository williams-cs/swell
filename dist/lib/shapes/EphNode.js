"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const EphEffect_1 = require("../effects/EphEffect");
class EphNode {
    /**
     * Constructor for an EphNode, a node representing something very special
     * @param width The width of the EphNode
     * @param height The height of the EphNode
     * @param ws Preceding whitespace
     */
    constructor(width, height, ws) {
        this._newLine = false;
        //this._image = image;
        this._width = width;
        this._height = height;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this EphNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the rectangle using EphEffect
     * @param context The current program context
     * @param dims The rectangle dimensions
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        dims.width = new NumberNode_1.NumberNode(this._width.eval(context).val, "");
        dims.height = new NumberNode_1.NumberNode(this._height.eval(context).val, "");
        let e = new EphEffect_1.EphEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this EphNode equals another (if their widths and heights are equal)
     * @param right The right side of the equality (must be an EphNode)
     */
    equalsVal(right) {
        if (right instanceof EphNode) {
            return (this.width.equalsVal(right.width) && this.height.equalsVal(right.height));
        }
        return false;
    }
    move() { }
    /**
     * Returns a string representation of the EphNode
     */
    toString() {
        return this._ws + "eph(" + this._width.toString() + ", " + this._height.toString() + ")";
    }
    /**
     * Returns the width of the EphNode
     */
    get width() {
        return this._width;
    }
    /**
     * Sets the width of the EphNode
     */
    set width(width) {
        this._width = width;
    }
    /**
     * Returns the height of the EphNode
     */
    get height() {
        return this._height;
    }
    /**
     * Sets the height of the EphNode
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
exports.EphNode = EphNode;
//# sourceMappingURL=EphNode.js.map