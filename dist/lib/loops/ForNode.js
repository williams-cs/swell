"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
const BooleanNode_1 = require("../prims/BooleanNode");
const space_lift_1 = require("space-lift");
class ForNode {
    /**
     * Constructor for a For loop
     * @param init Initializes the variable used in the condition
     * @param cond The condition (must evaluate to BooleanNode)
     * @param post The postevaluation condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(init, cond, post, body, ws) {
        this._newLine = true;
        this._init = init;
        this._cond = cond;
        this._post = post;
        this._body = body;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the For loop
     * @param context The current program context
     */
    eval(context) {
        let childCtx = new Scope_1.Scope(context, context.effects, context.eventLog);
        childCtx.canvas = space_lift_1.Some(context.canvas.get());
        this._init.eval(childCtx); // initialize var
        let res = this._cond.eval(childCtx);
        if (!(res instanceof BooleanNode_1.BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }
        let ret;
        while (res.val) {
            ret = this._body.eval(childCtx);
            this._post.eval(childCtx);
            res = this._cond.eval(childCtx);
        }
        return ret;
    }
    /**
     * Equals cannot be called directly on ForNode
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on For loop");
    }
    /**
     * ForNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        return "Cannot call draw on For loop";
    }
    /**
     * Returns a string representation of the for loop
     */
    toString() {
        return this._ws + 'for(' + this._init.toString() + ", " + this._cond.toString() + ", " + this._post.toString() + ") {\n "
            + this._body.toString() + "}";
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.ForNode = ForNode;
//# sourceMappingURL=ForNode.js.map