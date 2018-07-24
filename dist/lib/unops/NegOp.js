"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnaryOperation_1 = require("./UnaryOperation");
const NumberNode_1 = require("../prims/NumberNode");
class NegOp extends UnaryOperation_1.UnaryOperation {
    constructor(val) {
        super(val);
    }
    draw(context, dims, ast) {
    }
    eval(context) {
        let v = this.val.eval(context);
        return new NumberNode_1.NumberNode(-v.val);
    }
}
exports.NegOp = NegOp;
//# sourceMappingURL=NegOp.js.map