"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const PlusOp_1 = require("./PlusOp");
const AssignOp_1 = require("./AssignOp");
const VariableNode_1 = require("../vars/VariableNode");
class Increment {
    /**
     * Constructor for Increment
     * @param variable The expression to increment
     * @param ws Tracks preceding whitespace
     */
    constructor(variable, ws) {
        this.expr = variable;
        if (variable instanceof VariableNode_1.VariableNode) {
            this.innerRep = new AssignOp_1.AssignOp(variable, new PlusOp_1.PlusOp(variable, new NumberNode_1.NumberNode(1)));
        }
        else {
            this.innerRep = new PlusOp_1.PlusOp(variable, new NumberNode_1.NumberNode(1, ""));
        }
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates increment into a number node
     * @param context The function scope
     */
    eval(context) {
        return this.innerRep.eval(context);
    }
    /**
     * Increments cannot be drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Cannot call equals directly on binops
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns a string representation of the increment expression
     */
    toString() {
        return this._ws + this.expr.toString() + "++";
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.Increment = Increment;
//# sourceMappingURL=Increment.js.map