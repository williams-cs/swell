"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const MinusOp_1 = require("./MinusOp");
const AssignOp_1 = require("./AssignOp");
const VariableNode_1 = require("../vars/VariableNode");
class Decrement {
    /**
     * Constructor for the decrement operation
     * @param variable The expression to be decremented
     * @param ws Preceding whitespace
     */
    constructor(variable, ws) {
        this.expr = variable;
        if (variable instanceof VariableNode_1.VariableNode) {
            this.innerRep = new AssignOp_1.AssignOp(variable, new MinusOp_1.MinusOp(variable, new NumberNode_1.NumberNode(1)));
        }
        else {
            this.innerRep = new MinusOp_1.MinusOp(variable, new NumberNode_1.NumberNode(1));
        }
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the decrement op to a NumberNode
     * @param context The current program context
     */
    eval(context) {
        return this.innerRep.eval(context);
    }
    /**
     * Returns a string representation of the decrement op
     */
    toString() {
        return this._ws + this.expr.toString() + "--";
    }
    /**
     * Decrement ops can't be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals can't be called directly on decrement
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return false;
    }
}
exports.Decrement = Decrement;
//# sourceMappingURL=Decrement.js.map