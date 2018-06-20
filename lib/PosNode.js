"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// A Position Node
class PosNode {
    constructor(val) {
        this._val = val;
    }
    eval(context) {
        return this._val;
    }
    get val() {
        return this._val;
    }
    set val(value) {
        this._val = value;
    }
}
exports.PosNode = PosNode;
