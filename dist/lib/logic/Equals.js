"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
class Equals {
    constructor(left, right) {
        this._newLine = false;
        this._left = left;
        this._right = right;
    }
    toString() {
        return this._left.toString() + ' equals ' + this._right.toString();
    }
    newLine() {
        return this._newLine;
    }
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        return new BooleanNode_1.BooleanNode(lhs.equalsVal(rhs));
    }
    equalsVal(right) {
        throw new Error("well this is meta");
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
exports.Equals = Equals;
//# sourceMappingURL=Equals.js.map