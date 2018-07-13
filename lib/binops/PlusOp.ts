import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import {NumberNode} from '../prims/NumberNode';

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
<<<<<<< HEAD
        //console.log("Add right: " + r);
        console.log("add: " + le + re);
        return le + re;
=======
        return new NumberNode(le.val + re.val);
>>>>>>> 6aa4ee7d5a9368069e972d96bd44b0ff446c22e1
    }
}