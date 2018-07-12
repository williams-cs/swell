import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';

export class MulOp extends BinaryOperation<number>{
    constructor(left: Expression<number>, right: Expression<number>){
        super(left,right);
    }

    draw(context: Scope): void {
    
    }
    
    eval(context: Scope): number{
        return this.left.eval(new Scope(context)) * this.right.eval(new Scope(context));
    }
}