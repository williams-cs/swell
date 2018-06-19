"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
// A Position Node
class PosNode extends Node_1.Node {
    constructor(parent, val) {
        super(parent);
        this.val = val;
    }
    eval() {
        return this.val;
    }
}
exports.PosNode = PosNode;
