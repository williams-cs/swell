import {UnaryOperation} from './UnaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';

export class NegOp extends UnaryOperation<NumberNode>{
    constructor(val: Expression<NumberNode>){
        super(val);
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }
    
    eval(context: Scope): NumberNode{
        let v = this.val.eval(context);
        return new NumberNode(-v.val, "");
    }

    toString() : string {
        return "-" + this.val;
    }

    newLine() : boolean {
        return this.newLine();
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