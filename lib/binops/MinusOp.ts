import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../Scope';

export class MinusOp extends BinaryOperation<number>{
    constructor(left: Expression<number>, right: Expression<number>){
        super(left,right);
    }

    draw(context: Scope): void {
    
    }
    
    eval(context: Scope): number{
        return this.left.eval(new Scope(context)) - this.right.eval(new Scope(context));
    }
}