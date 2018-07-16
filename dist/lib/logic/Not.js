"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class Not {
    constructor(expr) {
        this._expr = expr;
    }
    eval(context) {
        let e = this._expr.eval(context);
        if (e instanceof __1.BooleanNode) {
            return new __1.BooleanNode(!e.val);
        }
        else {
            throw new Error("The argument to the ! operator must be boolean.");
        }
    }
    draw() {
    }
    get expr() {
        return this._expr;
    }
}
exports.Not = Not;
//# sourceMappingURL=Not.js.map