"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("./Scope");
class SequenceNode {
    constructor(left, right) {
        this._left = left;
        this._right = right;
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
    eval(context) {
        return [this._left.eval(new Scope_1.Scope(new Map(), context)), this._right.eval(new Scope_1.Scope(new Map(), context))];
    }
}
exports.SequenceNode = SequenceNode;
