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
    private _ws : string;
    constructor(variable : Expression<any>, ws? : string){
        this.expr= variable;
        if(variable instanceof VariableNode){
            this.innerRep= new AssignOp(variable, new PlusOp(variable, new NumberNode(1)));
        }
        else {
            this.innerRep = new PlusOp(variable, new NumberNode(1, ""));
        }
        this._ws = ws;
        if (ws == undefined){
            this._ws= "";
        }
    }

    eval(context: Scope): NumberNode {
        return this.innerRep.eval(context);
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals directly on binary operations");
    }
    
    toString() : string {
        return this._ws + this.expr.toString() + "++";
    }
    newLine() : boolean {
        return false;
    }
}