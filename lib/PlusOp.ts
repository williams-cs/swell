import {BinaryOperation} from './BinaryOperation';

// How represent operation? Seems pointless once have identified operation
class PlusOp extends BinaryOperation{
    //public op: PlusOp;
    //public left: number;
    //public right: number;

    constructor(op: PlusOp, left: number | BinaryOperation, right: number | BinaryOperation){
        super(op,left,right);
    }
    eval(): number {
        if(this.left instanceof number && this.right instanceof number{
            return (this.left as number) + (this.right as number);
        } else{
            return this.left.eval() + this.right.eval();
        }
    }
}