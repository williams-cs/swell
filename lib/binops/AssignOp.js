"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const VariableNode_1 = require("../vars/VariableNode");
// left side is variable, right side is val
class AssignOp extends BinaryOperation_1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
        if (!(left instanceof VariableNode_1.VariableNode)) {
            throw new Error("The left hand side of the assignment must be a variable.");
        }
    }
    draw(context) {
    }
    eval(context) {
        if (this.left instanceof VariableNode_1.VariableNode) {
            let left2 = this.left;
            context.declare(left2.name);
            //console.log("Name: " + left2.name);
            //console.log("Map name: " + context.lookup(left2.name));
            let r = this.right.eval(context);
            //console.log("r: " + r);
            context.assign(left2.name, r);
            //console.log("What got assigned: " + left2.name + " " + r);
            //console.log("Getting value from what got assigned: " + context.map.get(left2.name));
            //console.log("Val " + r);
            //test for if it's in local scope, parent scope, etc
            // need to check if it's in local scope, if not, keep going up
            return r;
        }
        throw new Error("HALP (in AssignOp)");
    }
}
exports.AssignOp = AssignOp;
