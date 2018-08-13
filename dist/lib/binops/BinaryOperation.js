"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryOperation {
    /**
     * Constructor for the BinOp abstract class
     * @param _left The left side of the binary operation
     * @param _right The right side of the binary operation
     */
    constructor(_left, _right) {
        this._left = _left;
        this._right = _right;
        this._newLine = false;
    }
    ;
    /**
     * Draws the binary operation, if applicable
     * @param context The current program context
     * @param dims The dimensions
     * @param ast The AST
     */
    draw(context, dims, ast) { }
    /**
     * Checks if equal to another expression
     * @param right The right side of the equality
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on BinOp");
    }
    /**
     * Returns a string representation of the binary operation
     */
    toString() { return ""; }
    ;
    /**
     * Gets left side of the binary operation
     */
    get left() {
        return this._left;
    }
    /**
     * Sets left side of the binary operation
     */
    set left(left) {
        this._left = left;
    }
    /**
     * Gets right side of the binary operation
     */
    get right() {
        return this._right;
    }
    /**
     * Sets right side of the binary operation
     */
    set right(right) {
        this._right = right;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.BinaryOperation = BinaryOperation;
//# sourceMappingURL=BinaryOperation.js.map