"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
class PlusOp extends BinaryOperation_1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
    }
    eval() {
        return this.left.eval() + this.right.eval();
    }
}
exports.PlusOp = PlusOp;
