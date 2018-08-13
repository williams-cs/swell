"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NOP {
    constructor() {
        /* A NOP is a placeholder operation that evaluates to nothing */
        this._newLine = true;
    }
    /**
     * Returns the NOP
     * @param context
     */
    eval(context) {
        return this;
    }
    /**
     * NOPs cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("NOPs cannot be drawn.");
    }
    /**
     * Returns a string representation of the NOP
     */
    toString() {
        return "";
    }
    /**
     * Returns whether this NOP equals another (spoiler: it doesn't)
     * @param right
     */
    equalsVal(right) {
        return false;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.NOP = NOP;
//# sourceMappingURL=NOP.js.map