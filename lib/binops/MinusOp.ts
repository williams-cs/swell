import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';

export class MinusOp extends BinaryOperation<number>{
    constructor(left: Expression<number>, right: Expression<number>){
        super(left,right);
    }

    eval(): number{
        return this.left.eval() - this.right.eval();
    }
}