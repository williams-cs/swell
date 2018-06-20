"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnaryOperation_1 = require("./UnaryOperation");
const Scope_1 = require("../Scope");
class NegOp extends UnaryOperation_1.UnaryOperation {
    constructor(val) {
        super(val);
    }
    eval(context) {
        return -this.val.eval(new Scope_1.Scope(new Map(), context));
    }
}
exports.NegOp = NegOp;
