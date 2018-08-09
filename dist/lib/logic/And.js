"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
class And {
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    toString() {
        return this._ws + this._left.toString() + ' and' + this._right.toString();
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
exports.And = And;
//# sourceMappingURL=And.js.map