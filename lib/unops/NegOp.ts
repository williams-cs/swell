import {UnaryOperation} from './UnaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';

export class NegOp extends UnaryOperation<NumberNode>{
    constructor(val: Expression<NumberNode>){
        super(val);
    }

    draw(context: Scope, x: number, y: number): void {
    
    }
    
    eval(context: Scope): NumberNode{
        return new NumberNode(-this.val.eval(context));
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