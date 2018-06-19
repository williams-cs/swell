"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
// Nodes representing strings
// Should abstract Node class implement Expression?
class StringNode extends Node_1.Node {
    constructor(parent, str) {
        super(parent);
        this.str = str;
    }
    ;
    eval() {
        return this.str;
    }
}
exports.StringNode = StringNode;
