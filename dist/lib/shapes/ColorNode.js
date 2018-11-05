"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColorNode {
    /**
     * Constructor for a ColorNode, a node representing an RGB color
     */
    constructor(red, green, blue) {
        this._newLine = false;
        this._red = red;
        this._green = green;
        this._blue = blue;
    }
    ;
    /**
     * Evaluates into a string RGB value
     * @param context The current program context
     */
    eval(context) {
        return this._red + " " + this._green + " " + this._blue;
    }
    /**
     * ColorNodes cannot currently be drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Returns whether this ColorNode equals another ColorNode
     * @param right The right side of the equality (must be a BooleanNode)
     */
    equalsVal(right) {
        if (right instanceof ColorNode) {
            return (this.red === right.red && this.green === right.green && this.blue === right.blue);
        }
        return false;
    }
    /**
     * Returns a string representation of the ColorNode
     */
    toString() {
        return "";
    }
    /**
     * Returns the red value
     */
    get red() {
        return this._red;
    }
    /**
     * Sets the red value
     */
    set red(red) {
        this._red = red;
    }
    /**
     * Returns the green value
     */
    get green() {
        return this._green;
    }
    /**
     * Sets the green value
     */
    set green(green) {
        this._green = green;
    }
    /**
     * Returns the blue value
     */
    get blue() {
        return this._blue;
    }
    /**
     * Sets the blue value
     */
    set blue(blue) {
        this._blue = blue;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.ColorNode = ColorNode;
//# sourceMappingURL=ColorNode.js.map