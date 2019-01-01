"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
const space_lift_1 = require("space-lift");
class RepeatNode {
    /**
     * The constructor for repeat(n){}
     * @param n The number of times to repeat the loop's scope
     * @param body The enclosed body of the loop
     * @param ws Preceding whitespace
     */
    constructor(n, body) {
        this._newLine = true;
        this._n = n;
        this._body = body;
        console.log(this._body.toString());
        /*this._ws = ws;
        if(ws == undefined) {
            this._ws = "";
        }*/
        //console.log("repeat node constructed");
    }
    /**
     * Evaluates the repeat loop
     * @param context The current program context
     */
    eval(context) {
        let childCtx = new Scope_1.Scope(context, context.effects, context.eventLog);
        childCtx.canvas = space_lift_1.Some(context.canvas.get());
        let res = this._n.eval(childCtx);
        if (!(res instanceof NumberNode_1.NumberNode)) {
            throw new Error("The parameter for repeat() must be a number expression.");
        }
        let ret;
        for (var i = 0; i < res.val; i++) {
            ret = this._body.eval(childCtx);
        }
        return ret;
    }
    /**
     * Returns a string representation of the repeat statement
     */
    toString() {
        return 'repeat(' + this._n.toString() + ") {\n " + this._body.toString() + "}";
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Returns the body of the repeat loop
     */
    get body() {
        return this._body;
    }
    /**
     * RepeatNodes cannot be drawn directly
     */
    draw() {
        throw new Error("Not implemented");
    }
    /**
     * Equals cannot be called directly on a repeat
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on repeats");
    }
}
exports.RepeatNode = RepeatNode;
//# sourceMappingURL=RepeatNode.js.map