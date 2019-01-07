"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
class Not {
    /**
     * Constructor for the logical Not (!) operation
     * @param expr The expression to be operated on (must be a BooleanNode)
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
     * Performs the Not operation and returns BooleanNode with result
     * @param context The current program context
     */
    eval(context) {
        let e = this._expr.eval(context);
        if (e instanceof BooleanNode_1.BooleanNode) {
            return new BooleanNode_1.BooleanNode(!e.val);
        }
        else {
            throw new Error("The argument to the ! operator must be boolean.");
        }
    }
    /**
     * Returns a string representation of the operation
     */
    toString() {
        return this._ws + "not " + this._expr.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on a Not op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * Not operations cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns expression to be operated on
     */
    get expr() {
        return this._expr;
    }
}
exports.Not = Not;
//# sourceMappingURL=Not.js.map