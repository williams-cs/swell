"use strict";
// An abstract class for binary operations. 
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryOperation {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
    ;
}
exports.BinaryOperation = BinaryOperation;
class PlusOperation extends BinaryOperation {
    constructor(left, right) {
        super(left, right);
    }
    eval() {
        return this.left.eval() + this.right.eval();
    }
}
exports.PlusOperation = PlusOperation;
