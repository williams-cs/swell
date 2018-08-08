"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const PlusOp_1 = require("./PlusOp");
const AssignOp_1 = require("./AssignOp");
const VariableNode_1 = require("../vars/VariableNode");
class Increment {
    constructor(variable) {
        this.expr = variable;
        if (variable instanceof VariableNode_1.VariableNode) {
            this.innerRep = new AssignOp_1.AssignOp(variable, new PlusOp_1.PlusOp(variable, new NumberNode_1.NumberNode(1)));
        }
        else {
            this.innerRep = new PlusOp_1.PlusOp(variable, new NumberNode_1.NumberNode(1, ""));
        }
    }
    eval(context) {
        return this.innerRep.eval(context);
    }
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    equalsVal(right) {
        throw new Error("Cannot call equals directly on binary operations");
    }
    toString() {
        return this.expr.toString() + "++";
    }
    newLine() {
        return false;
    }
}
exports.Increment = Increment;
//# sourceMappingURL=Increment.js.map