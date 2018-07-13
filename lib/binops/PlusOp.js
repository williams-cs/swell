"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryOperation_1 = require("./BinaryOperation");
const Scope_1 = require("../structural/Scope");
const NumberNode_1 = require("../prims/NumberNode");
// left and right are both expressions
class PlusOp extends BinaryOperation_1.BinaryOperation {
    constructor(left, right) {
        super(left, right);
    }
    draw(context, x, y) {
    }
    eval(context) {
        let l = this.left;
        let r = this.right;
        let le = l.eval(new Scope_1.Scope(context));
        let re = r.eval(new Scope_1.Scope(context));
<<<<<<< HEAD
        //console.log("Add right: " + r);
        console.log("add: " + le + re);
        return le + re;
=======
        return new NumberNode_1.NumberNode(le.val + re.val);
>>>>>>> 6aa4ee7d5a9368069e972d96bd44b0ff446c22e1
    }
}
exports.PlusOp = PlusOp;
//# sourceMappingURL=PlusOp.js.map