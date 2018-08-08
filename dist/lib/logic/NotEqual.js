"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
const NumberNode_1 = require("../prims/NumberNode");
class NotEqual {
    constructor(left, right) {
        this._newLine = false;
        this._left = left;
        this._right = right;
    }
    toString() {
        return this._left.toString() + " not equals " + this._right.toString();
    }
    newLine() {
        return this._newLine;
    }
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode_1.NumberNode && rhs instanceof NumberNode_1.NumberNode) {
            return (new BooleanNode_1.BooleanNode(lhs.val !== rhs.val, ""));
        }
        else {
            throw new Error("The arguments to the != operator must be numeric.");
        }
    }
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    get left() {
        return this._left;
    }
    get right() {
        return this._right;
    }
}
exports.NotEqual = NotEqual;
//# sourceMappingURL=NotEqual.js.map