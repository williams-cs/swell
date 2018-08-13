"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnaryOperation {
    /**
     * Abstract class constructor for Unary Operations
     * @param _val The object to be operated on
     */
    constructor(_val) {
        this._val = _val;
        this._newLine = false;
    }
    ;
    /**
     * Abstract draw method for undrawable UnaryOps
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Unary Operations cannot be drawn directly");
    }
    /**
     * Equals cannot be called directly on UnaryOps
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on UnaryOp");
    }
    ;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Returns the UnaryOp value
     */
    get val() {
        return this._val;
    }
    /**
     * Sets the UnaryOp value
     */
    set val(value) {
        this._val = value;
    }
}
exports.UnaryOperation = UnaryOperation;
//# sourceMappingURL=UnaryOperation.js.map