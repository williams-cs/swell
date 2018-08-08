import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import {NumberNode} from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
import { PlusOp } from './PlusOp';
import { AssignOp } from './AssignOp';
import { VariableNode } from '../vars/VariableNode';

export class Increment implements Expression<any>{
    private innerRep : Expression<any>;
    private expr : Expression<any>;
    constructor(variable : Expression<any>){
        this.expr= variable;
        if(variable instanceof VariableNode){
            this.innerRep= new AssignOp(variable, new PlusOp(variable, new NumberNode(1, "")));
        }
        else {
            this.innerRep = new PlusOp(variable, new NumberNode(1, ""));
        }
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
    
    }
    
    eval(context: Scope): NumberNode {
        return this.innerRep.eval(context);
    }

    toString() : string {
        return this.expr.toString() + "++";
    }
    newLine() : boolean {
        return false;
    }
}