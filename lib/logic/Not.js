"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Not {
    constructor(expr) {
        this._expr = expr;
    }
    eval(context) {
        return !(this._expr.eval(context));
    }
    draw() {
    }
    get expr() {
        return this._expr;
    }
}
exports.Not = Not;
//# sourceMappingURL=Not.js.map