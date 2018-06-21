import {UnaryOperation} from './UnaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../Scope';

export class NegOp extends UnaryOperation<number>{
    constructor(val: Expression<number>){
        super(val);
    }

    eval(context: Scope): number{
        return -this.val.eval(context);
    }

    // put in UnaryOp class
    /*
    get value(): number{
        return this.val;
    }
    set value(value: number){
        this.val = value;
    }
    */
}