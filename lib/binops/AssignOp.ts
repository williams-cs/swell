import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';

// left side is variable, right side is val
// Reassign new value to var
export class AssignOp<T> extends BinaryOperation<T>{
    constructor(left: Expression<T>, right: Expression<T>){
        super(left,right);
        if(!(left instanceof VariableNode)){
            throw new Error("The left hand side of the assignment must be a variable.");
        }
    }

    draw(context: Scope, x: number, y: number): void {
    
    }
    
    eval(context: Scope): T{
        if(this.left instanceof VariableNode){
            //let left2: VariableNode = this.left as VariableNode;
            let r = this.right.eval(context);

            context.assign(this.left.name,r);

            return r;
        }
        throw new Error("HALP (in AssignOp)");
    }
}