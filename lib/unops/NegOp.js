"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnaryOperation_1 = require("./UnaryOperation");
class NegOp extends UnaryOperation_1.UnaryOperation {
    constructor(val) {
        super(val);
    }
    eval() {
        return -this.val.eval();
    }
}
exports.NegOp = NegOp;
