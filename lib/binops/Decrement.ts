import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import {NumberNode} from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
import { MinusOp } from './MinusOp';
import { AssignOp } from './AssignOp';
import { VariableNode } from '../vars/VariableNode';

export class Decrement implements Expression<any>{
    private innerRep : Expression<any>;
    private expr : Expression<any>;
    constructor(variable : Expression<any>){
        this.expr= variable;
        if(variable instanceof VariableNode){
            this.innerRep= new AssignOp(variable, new MinusOp(variable, new NumberNode(1)));
        }
        else {
            this.innerRep = new MinusOp(variable, new NumberNode(1));
        }
    }
    
    eval(context: Scope): NumberNode {
        return this.innerRep.eval(context);
    }

    toString() : string {
        return this.expr.toString() + "--";
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals directly on binary operations");
    }
    
    newLine() : boolean {
        return false;
    }
}