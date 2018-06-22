"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../Scope");
// left and right are both expressions
class PlusOp extends BinaryOperation_1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
    }
    eval(context) {
        let l = this.left;
        let r = this.right;
        let le = l.eval(new Scope_1.Scope(context));
        //console.log("Add left: " + le);
        let re = r.eval(new Scope_1.Scope(context));
        //console.log("Add right: " + r);
        return le + re;
    }
}
exports.PlusOp = PlusOp;
