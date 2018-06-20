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
/*
export class PlusOperation extends BinaryOperation<number>{
    constructor(left: Expression<number>, right: Expression<number>){
        super(left,right);
    }

    eval(): number{
        return this.left.eval() + this.right.eval();
    }
}
*/ 
