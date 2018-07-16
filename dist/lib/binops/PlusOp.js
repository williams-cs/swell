"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
// left and right are both expressions
class PlusOp extends __1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
    }
    draw(context, x, y) {
    }
    eval(context) {
        let l = this.left;
        let r = this.right;
        let le = l.eval(new __1.Scope(context));
        let re = r.eval(new __1.Scope(context));
        return new __1.NumberNode(le.val + re.val);
    }
}
exports.PlusOp = PlusOp;
//# sourceMappingURL=PlusOp.js.map