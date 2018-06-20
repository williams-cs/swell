"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import{Node} from './Node';
// Nodes representing numbers
// Should abstract Node class implement Expression?
class NumberNode {
    constructor(val) {
        //super(parent);
        this._val = val;
    }
    ;
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
exports.NumberNode = NumberNode;
