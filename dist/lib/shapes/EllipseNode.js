"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class EllipseNode {
    /**
     * Constructor for an EllipseNode, a node representing an ellipse
     * @param width The width of the ellipse
     * @param height The height of the ellipse
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
     * Returns this EllipseNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the ellipse on the canvas using EllipseEffect
     * @param context The current program context
     * @param dims The dimensions of the ellipse
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        dims.width = this._width;
        dims.height = this._height;
        let e = new EllipseEffect_1.EllipseEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this EllipseNode equals another EllipseNode (if their widths and heights are equal)
     * @param right The right side of the equality (must be an EllipseNode)
     */
    equalsVal(right) {
        if (right instanceof EllipseNode) {
            return (this.width.equalsVal(right.width) && this.height.equalsVal(right.height));
        }
        return false;
    }
    /**
     * Returns a string representation of the ellipse
     */
    toString() {
        return this._ws + "ellipse(" + this._width.toString() + ", " + this._height.toString() + ")";
    }
    move() { }
    /**
     * Returns the ellipse width
     */
    get width() {
        return this._width;
    }
    /**
     * Sets the ellipse width
     */
    set width(width) {
        this._width = width;
    }
    /**
    * Returns the ellipse height
    */
    get height() {
        return this._height;
    }
    /**
     * Sets the ellipse height
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
exports.EllipseNode = EllipseNode;
//# sourceMappingURL=EllipseNode.js.map