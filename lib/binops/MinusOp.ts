import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';

export class MinusOp extends BinaryOperation<NumberNode>{
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>){
        super(left,right);
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }
    
    eval(context: Scope): NumberNode{
        return new NumberNode(this.left.eval(new Scope(context)).eval(context).val - this.right.eval(new Scope(context)).eval(context).val);
    }

    toString() : string {
        return this.left.toString() + ' - ' + this.right.toString();
    }
}