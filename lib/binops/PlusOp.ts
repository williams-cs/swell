import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import {NumberNode} from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';

// left and right are both expressions
export class PlusOp extends BinaryOperation<NumberNode>{
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>){
        super(left,right);
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }
    
    eval(context: Scope): NumberNode {
        let l = this.left;
        let r = this.right;
        let le = l.eval(new Scope(context));
        let re = r.eval(new Scope(context));
        return new NumberNode(le.val + re.val);
    }
}