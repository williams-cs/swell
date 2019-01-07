"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const EmojiEffect_1 = require("../effects/EmojiEffect");
class EmojiNode {
    /**
     * Constructor for an Emoji Node
     * @param name The name of the EmojiNode
     * @param width The width of the EmojiNode
     * @param height The height of the EmojiNode
     * @param ws Preceding whitespace
     */
    constructor(name, width, height, ws) {
        this._newLine = false;
        this._width = width;
        this._height = height;
        this._name = name;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this EmojiNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the rectangle using EmojiEffect
     * @param context The current program context
     * @param dims The rectangle dimensions
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        dims.width = new NumberNode_1.NumberNode(this._width.eval(context).val, "");
        dims.height = new NumberNode_1.NumberNode(this._height.eval(context).val, "");
        let e = new EmojiEffect_1.EmojiEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this EmojiNode equals another (if their widths and heights are equal)
     * @param right The right side of the equality (must be an EmojiNode)
     */
    equalsVal(right) {
        if (right instanceof EmojiNode) {
            return (this.name.equalsVal(right.name) && this.width.equalsVal(right.width) && this.height.equalsVal(right.height));
        }
        return false;
    }
    move() { }
    /**
     * Returns a string representation of the EmojiNode
     */
    toString() {
        return this._ws + "emoji(" + this._name.toString() + ", " + this._width.toString() + ", " + this._height.toString() + ")";
    }
    /**
     * Returns the name of the EmojiNode
     */
    get name() {
        return this._name;
    }
    /**
     * Sets the name of the EmojiNode
     */
    set name(width) {
        this._name = name;
    }
    /**
     * Returns the width of the EmojiNode
     */
    get width() {
        return this._width;
    }
    /**
     * Sets the width of the EmojiNode
     */
    set width(width) {
        this._width = width;
    }
    /**
     * Returns the height of the EmojiNode
     */
    get height() {
        return this._height;
    }
    /**
     * Sets the height of the EmojiNode
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
exports.EmojiNode = EmojiNode;
//# sourceMappingURL=EmojiNode.js.map