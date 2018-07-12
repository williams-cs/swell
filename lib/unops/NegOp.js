"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnaryOperation_1 = require("./UnaryOperation");
const NumberNode_1 = require("../prims/NumberNode");
class NegOp extends UnaryOperation_1.UnaryOperation {
    constructor(val) {
        super(val);
    }
    draw(context, x, y) {
    }
    eval(context) {
        return new NumberNode_1.NumberNode(-this.val.eval(context));
    }
}
exports.NegOp = NegOp;
