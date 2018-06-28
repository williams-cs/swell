"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("./Scope");
class SequenceNode {
    constructor(left, right) {
        this._left = left;
        this._right = right;
    }
    draw(context) {
    }
    eval(context) {
        let leftScope = new Scope_1.Scope(context);
        //throwing away after evaling
        this._leftVal = this._left.eval(leftScope);
        this._rightVal = this._right.eval(leftScope); // leftScope may be modified now
    }
    set left(left) {
        this._left = left;
    }
    get left() {
        return this._left;
    }
    set right(right) {
        this._right = right;
    }
    get right() {
        return this._right;
    }
    get leftVal() {
        return this._leftVal;
    }
    get rightVal() {
        return this._rightVal;
    }
}
exports.SequenceNode = SequenceNode;
