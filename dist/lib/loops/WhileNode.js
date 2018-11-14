"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
const BooleanNode_1 = require("../prims/BooleanNode");
const space_lift_1 = require("space-lift");
class WhileNode {
    /**
     * Constructor for a While loop
     * @param cond The While loop condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(cond, body, ws) {
        this._newLine = true;
        this._cond = cond;
        this._body = body;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the body of the loop while the condition is true
     * @param context
     */
    eval(context) {
        let childCtx = new Scope_1.Scope(context, context.effects, context.eventLog);
        childCtx.canvas = space_lift_1.Some(context.canvas.get());
        let res = this._cond.eval(childCtx);
        if (!(res instanceof BooleanNode_1.BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }
        let ret;
        while (res.val) {
            ret = this._body.eval(childCtx);
            res = this._cond.eval(childCtx);
        }
        return ret;
    }
    /**
     * Equals cannot be called directly on WhileNodes
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on While loop");
    }
    /**
     * WhileNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        return "Cannot call draw on While loop";
    }
    /**
     * Returns a string representation of the While loop
     */
    toString() {
        return this._ws + "while(" + this._cond.toString() + ") {\n " + this._body.toString() + "}";
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.WhileNode = WhileNode;
//# sourceMappingURL=WhileNode.js.map