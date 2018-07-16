"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class LessThan {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    eval(context) {
        //console.log(this._left.eval(context) + " is less than " + this._right.eval(context));
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof __1.NumberNode && rhs instanceof __1.NumberNode) {
            //console.log("They're both number nodes");
            //console.log(lhs.val + "<" + rhs.val);
            //let bool: boolean = lhs.val < rhs.val;
            //console.log("bool: " + bool);
            return (new __1.BooleanNode(lhs.val < rhs.val));
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