"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import{Node} from './Node';
// Nodes representing numbers
// Should abstract Node class implement Expression?
class NumberNode {
    constructor(val) {
        //super(parent);
        this.val = val;
    }
    ;
    eval() {
        return this.val;
    }
}
exports.NumberNode = NumberNode;
