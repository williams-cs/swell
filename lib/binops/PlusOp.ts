import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../Scope';

// left and right are both expressions
export class PlusOp extends BinaryOperation<number>{
    constructor(left: Expression<number>, right: Expression<number>){
        super(left,right);
    }

    draw(context: Scope): void {
    
    }
    
    eval(context: Scope): number{
        let l = this.left;
        let r = this.right;
        let le = l.eval(new Scope(context));
        console.log("Add left: " + le);
        let re = r.eval(new Scope(context));
        console.log("Add right: " + r);
        return le + re;
    }
}