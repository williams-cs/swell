"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
// left and right are both expressions
class PlusOp extends BinaryOperation_1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
    }
    draw(context, x, y) {
    }
    eval(context) {
        let l = this.left;
        let r = this.right;
        let le = l.eval(new Scope_1.Scope(context));
        let re = r.eval(new Scope_1.Scope(context));
        return new NumberNode_1.NumberNode(le.val + re.val);
    }
}
exports.PlusOp = PlusOp;
