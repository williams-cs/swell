import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../Scope';

export class DivOp extends BinaryOperation<number>{
    constructor(left: Expression<number>, right: Expression<number>){
        super(left,right);
    }

    eval(context: Scope): number{
        return this.left.eval(new Scope(new Map(), context)) / this.right.eval(new Scope(new Map(), context));
    }
}