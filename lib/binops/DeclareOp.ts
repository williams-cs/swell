import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';
import { Dimensions } from '../structural/Dimensions';

// left side is variable, right side is val
// Declares new val
export class DeclareOp<T> extends BinaryOperation<T>{
    constructor(left: Expression<T>, right: Expression<T>){
        super(left,right);
        if(!(left instanceof VariableNode)){
            throw new Error("The left hand side of the assignment must be a variable.");
        }
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }
    
    toString() : string {
        return "var" + this.left.toString() + ' = ' + this.right.toString();
    }
    eval(context: Scope): T{
        if(this.left instanceof VariableNode){
            //let left2: VariableNode = this.left as VariableNode;
            context.declare(this.left.name); 
          
            let r = this.right.eval(context);

            context.assign(this.left.name,r);
            return r;
        }
        throw new Error("HALP (in DeclareOp)");
    }
    newLine() : boolean {
        return false;
    }
}