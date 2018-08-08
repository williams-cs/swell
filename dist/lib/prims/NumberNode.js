"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import{Node} from './Node';
// Nodes representing numbers
// Should abstract Node class implement Expression?
class NumberNode {
    constructor(val, ws) {
        this._newLine = false;
        this._ws = "";
        //super(parent);
        this._val = val;
        this._ws = ws;
    }
    ;
    eval(context) {
        return this;
    }
    draw(context, dims, ast) {
    }
    toString() {
        return this._ws + this._val;
    }
    get val() {
        return this._val;
    }
    newLine() {
        return this._newLine;
    }
    set val(value) {
        this._val = value;
    }
}
exports.NumberNode = NumberNode;
//# sourceMappingURL=NumberNode.js.map