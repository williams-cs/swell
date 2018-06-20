import {UnaryOperation} from './UnaryOperation';
import {Expression} from '../Expression';

export class NegOp extends UnaryOperation<number>{
    constructor(val: Expression<number>){
        super(val);
    }

    eval(): number{
        return -this.val.eval();
    }
}