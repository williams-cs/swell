"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class And {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    eval(context) {
        return (this._left.eval(context) && this._right.eval(context));
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