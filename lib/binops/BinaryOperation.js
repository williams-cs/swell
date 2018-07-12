"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryOperation {
    constructor(_left, _right) {
        this._left = _left;
        this._right = _right;
    }
    ;
    draw(context, x, y) { }
    get left() {
        return this._left;
    }
    set left(left) {
        this._left = left;
    }
    get right() {
        return this._right;
    }
    set right(right) {
        this._right = right;
    }
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
