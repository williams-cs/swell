import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';
import { Dimensions } from '../structural/Dimensions';

// left side is variable, right side is val
// Declares new val
export class DeclareOp<T> extends BinaryOperation<T>{
    private _ws : string;
    constructor(left: Expression<T>, right: Expression<T>, ws? : string){
        super(left,right);
        if(!(left instanceof VariableNode)){
            throw new Error("The left hand side of the assignment must be a variable.");
        }
        this._ws = ws;
        if(ws == undefined){
            this._ws = "";
        }
    }
    toString() : string {
        return this._ws + "var " + this.left.toString() + ' = ' + this.right.toString();
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