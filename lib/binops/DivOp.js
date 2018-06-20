"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../Scope");
class DivOp extends BinaryOperation_1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
    }
    eval(context) {
        return this.left.eval(new Scope_1.Scope(new Map(), context)) / this.right.eval(new Scope_1.Scope(new Map(), context));
    }
}
exports.DivOp = DivOp;
