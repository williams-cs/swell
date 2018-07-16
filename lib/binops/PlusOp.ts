import {BinaryOperation, Expression, Scope, NumberNode} from '../..';

// left and right are both expressions
export class PlusOp extends BinaryOperation<NumberNode>{
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>){
        super(left,right);
    }

    draw(context: Scope, x: number, y: number): void {
    
    }
    
    eval(context: Scope): NumberNode {
        let l = this.left;
        let r = this.right;
        let le = l.eval(new Scope(context));
        let re = r.eval(new Scope(context));
        return new NumberNode(le.val + re.val);
    }
}