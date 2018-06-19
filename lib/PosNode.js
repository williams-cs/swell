"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// A Position Node
class PosNode {
    constructor(val) {
        this.val = val;
    }
    eval() {
        return this.val;
    }
}
exports.PosNode = PosNode;
