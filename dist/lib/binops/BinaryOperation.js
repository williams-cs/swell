"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryOperation {
    constructor(_left, _right) {
        this._left = _left;
        this._right = _right;
        this._newLine = false;
    }
    ;
    draw(context, dims, ast) { }
    toString() { return ""; }
    ;
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
    newLine() {
        return this._newLine;
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
//# sourceMappingURL=BinaryOperation.js.map