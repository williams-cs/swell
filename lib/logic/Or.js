"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Or {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    eval(context) {
        return (this._left.eval(context) || this._right.eval(context));
    }
    draw() {
    }
}
exports.Or = Or;
