import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';

export class MulOp extends BinaryOperation<NumberNode>{
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>){
        super(left,right);
    }

    draw(context: Scope, x: number, y: number): void {
    
    }
    
    eval(context: Scope): NumberNode {
        return new NumberNode(this.left.eval(new Scope(context)).eval(context).val * this.right.eval(new Scope(context)).eval(context).val);
    }
}