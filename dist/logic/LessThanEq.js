"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class LessThanEq {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof __1.NumberNode && rhs instanceof __1.NumberNode) {
            return (new __1.BooleanNode(lhs.val <= rhs.val));
        }
        else {
            throw new Error("The arguments to the <= operator must be numeric.");
        }
    }
    draw() {
    }
    get left() {
        return this._left;
    }
    get right() {
        return this._right;
    }
}
exports.LessThanEq = LessThanEq;
//# sourceMappingURL=LessThanEq.js.map