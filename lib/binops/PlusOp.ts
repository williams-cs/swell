import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../Scope';

// left and right are both expressions
export class PlusOp extends BinaryOperation<number>{
    constructor(left: Expression<number>, right: Expression<number>){
        super(left,right);
    }

    eval(context: Scope): number{
        let l = this.left;
        let r = this.right;
        let le = l.eval(new Scope(context));
        let re = r.eval(new Scope(context));
        return le + re;
    }
}