"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("./Scope");
const space_lift_1 = require("space-lift");
class SequenceNode {
    /**
     * Constructor for a SequenceNode, the building block of the AST
     * @param left The left side of the Sequence
     * @param right The right side of the Sequence
     */
    constructor(left, right) {
        this._newLine = true;
        this._left = left;
        this._right = right;
    }
    /**
     * Evaluates the children in postorder (left, right, parent)
     * @param context The current program context
     */
    eval(context) {
        let leftScope = new Scope_1.Scope(context, context.effects, context.myState, context.eventLog);
        leftScope.canvas = space_lift_1.Some(context.canvas.get());
        //throwing away after evaling
        this._leftVal = this._left.eval(leftScope);
        this._rightVal = this._right.eval(leftScope); // leftScope may be modified now
    }
    /**
     * SequenceNodes cannot be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Cannot call draw() on SequenceNodes");
    }
    /**
     * Equals cannot be directly called on SequenceNodes
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on SequenceNode");
    }
    /**
     * Returns a string representation of the AST
     */
    toString() {
        let result = this._left.toString();
        if (this._left.newLine() == true) {
            result += '\n';
        }
        else {
            result += ";\n";
        }
        if (this._right.newLine() == false) {
            result += this._right.toString() + ";";
        }
        else {
            result += this._right.toString();
        }
        return result;
    }
    /**
     * Returns the left child
     */
    set left(left) {
        this._left = left;
    }
    /**
     * Sets the left child
     */
    get left() {
        return this._left;
    }
    /**
     * Returns the right child
     */
    set right(right) {
        this._right = right;
    }
    /**
     * Sets the right child
     */
    get right() {
        return this._right;
    }
    /**
     * Returns the value of the left chile
     */
    get leftVal() {
        return this._leftVal;
    }
    /**
     * Returns the value of the right chile
     */
    get rightVal() {
        return this._rightVal;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.SequenceNode = SequenceNode;
//# sourceMappingURL=SequenceNode.js.map