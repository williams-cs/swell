"use strict";
/*import {BinaryOperation} from './BinaryOperation';
import {Expression} from './Expression';

// How represent operation? Seems pointless once have identified operation
class PlusOp extends BinaryOperation {
    //public op: PlusOp;
    //public left: number;
    //public right: number;

    constructor(op: PlusOp, left: Expression, right: Expression){
        super(op,left,right);
    }
    
    eval(): number {
        if(typeof this.left === 'number' && typeof this.right === 'number'){
            return (this.left as number) + (this.right as number);
        } else {
            return (this.left as BinaryOperation).eval() + (this.right as BinaryOperation).eval();
        }
    }
}
*/ 
