"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
// Nodes representing numbers
// Should abstract Node class implement Expression?
class NumberNode extends Node_1.Node {
    constructor(parent, val) {
        super(parent);
        this.val = val;
    }
    ;
    eval() {
        return this.val;
    }
}
exports.NumberNode = NumberNode;
