"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
class And {
    constructor(left, right) {
        this._newLine = false;
        this._left = left;
        this._right = right;
    }
    toString() {
        return "";
    }
    eval(context) {
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof BooleanNode_1.BooleanNode && rhs instanceof BooleanNode_1.BooleanNode) {
            return new BooleanNode_1.BooleanNode(lhs.val && rhs.val);
        }
        else {
            throw new Error("The arguments to the 'and' operator must be booleans.");
        }
    }
    newLine() {
        return this._newLine;
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
exports.And = And;
//# sourceMappingURL=And.js.map