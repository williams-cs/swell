"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import{Node} from './Node';
// Nodes representing strings
// Should abstract Node class implement Expression?
class StringNode {
    constructor(str) {
        this.str = str;
    }
    ;
    eval() {
        return this.str;
    }
}
exports.StringNode = StringNode;
