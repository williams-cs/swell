"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
const NumberNode_1 = require("../prims/NumberNode");
class LessThan {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    eval(context) {
        //console.log(this._left.eval(context) + " is less than " + this._right.eval(context));
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode_1.NumberNode && rhs instanceof NumberNode_1.NumberNode) {
            return (new BooleanNode_1.BooleanNode(lhs.val < rhs.val));
        }
        else {
            throw new Error("Arguments to less than must produce numeric values.");
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
exports.LessThan = LessThan;
//# sourceMappingURL=LessThan.js.map