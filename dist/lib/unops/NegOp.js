"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class NegOp extends __1.UnaryOperation {
    constructor(val) {
        super(val);
    }
    draw(context, x, y) {
    }
    eval(context) {
        let v = this.val.eval(context);
        return new __1.NumberNode(-v.val);
    }
}
exports.NegOp = NegOp;
//# sourceMappingURL=NegOp.js.map