import {BinaryOperation, Expression, Scope, VariableNode} from '../..';

// left side is variable, right side is val
// Declares new val
export class DeclareOp<T> extends BinaryOperation<T>{
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
            let left2: VariableNode = this.left as VariableNode;
            context.declare(left2.name); 
            //console.log("Name: " + left2.name);
            //console.log("Map name: " + context.lookup(left2.name));

            let r = this.right.eval(context);
            //console.log("r: " + r);

            context.assign(left2.name,r);

            //console.log("What got assigned: " + left2.name + " " + r);
            //console.log("Getting value from what got assigned: " + context.map.get(left2.name));
            //console.log("Val " + r);

            //test for if it's in local scope, parent scope, etc
            // need to check if it's in local scope, if not, keep going up

            return r;
        }
        throw new Error("HALP (in DeclareOp)");
    }
}