"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnError_1 = require("./ReturnError");
class Return {
    /**
     * Constructor for a Return object, representing something to be returned in a function
     * @param expr The expression to be returned
     * @param ws Preceding whitespace
     */
    constructor(expr, ws) {
        this._newLine = false;
        this._expr = expr;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the expression to be returned and returns via a ReturnErro
     * @param context The current program context
     */
    eval(context) {
        // If return val is a var, returns that var's value
        let result = this._expr.eval(context);
        throw new ReturnError_1.ReturnError(result, context.retIDLookup());
    }
    /**
     * Equals cannot be called directly on Return nodes
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on Return");
    }
    /**
     * Returns a string representation of the Return node
     */
    toString() {
        return this._ws + "return " + this._expr.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Return nodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Cannot call draw on Return");
    }
}
exports.Return = Return;
//# sourceMappingURL=Return.js.map