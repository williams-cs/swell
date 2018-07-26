"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
const NumberNode_1 = require("../prims/NumberNode");
class LessThanEq {
    constructor(left, right) {
        this._newLine = false;
        this._left = left;
        this._right = right;
    }
    toString() {
        return "";
    }
    newLine() {
        return this._newLine;
    }
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode_1.NumberNode && rhs instanceof NumberNode_1.NumberNode) {
            return (new BooleanNode_1.BooleanNode(lhs.val <= rhs.val));
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