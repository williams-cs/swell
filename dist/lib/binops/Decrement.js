"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const MinusOp_1 = require("./MinusOp");
const AssignOp_1 = require("./AssignOp");
const VariableNode_1 = require("../vars/VariableNode");
class Decrement {
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
    eval(context) {
        return this.innerRep.eval(context);
    }
    toString() {
        return this._ws + this.expr.toString() + "--";
    }
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    newLine() {
        return false;
    }
}
exports.Decrement = Decrement;
//# sourceMappingURL=Decrement.js.map