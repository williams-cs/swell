"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnaryOperation_1 = require("./UnaryOperation");
class NegOp extends UnaryOperation_1.UnaryOperation {
    constructor(val) {
        super(val);
    }
    draw(context, x, y) {
    }
    eval(context) {
        return -this.val.eval(context);
    }
}
exports.NegOp = NegOp;
