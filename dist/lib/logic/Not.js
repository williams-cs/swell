"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
class Not {
    constructor(expr) {
        this._newLine = false;
        this._expr = expr;
    }
    toString() {
        return "not " + this._expr.toString();
    }
    newLine() {
        return this._newLine;
    }
    eval(context) {
        let e = this._expr.eval(context);
        if (e instanceof BooleanNode_1.BooleanNode) {
            return new BooleanNode_1.BooleanNode(!e.val);
        }
        else {
            throw new Error("The argument to the ! operator must be boolean.");
        }
    }
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    get expr() {
        return this._expr;
    }
}
exports.Not = Not;
//# sourceMappingURL=Not.js.map