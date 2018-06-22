"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import{Node} from './Node';
// Nodes representing strings
// Should abstract Node class implement Expression?
class StringNode {
    constructor(str) {
        this._str = str;
    }
    ;
    eval(context) {
        return this._str;
    }
    set str(value) {
        this._str = value;
    }
    get str() {
        return this._str;
    }
}
exports.StringNode = StringNode;
