"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LessThan {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    eval(context) {
        //console.log(this._left.eval(context) + " is less than " + this._right.eval(context));
        return (this._left.eval(context) < this._right.eval(context));
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
exports.LessThan = LessThan;
