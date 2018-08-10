import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';

export class MulOp extends BinaryOperation<NumberNode>{
    private _ws : string;
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>, ws? : string){
        super(left,right);
        this._ws = ws;
        if(ws == undefined){
            this._ws = "";
        }
    }
    
    eval(context: Scope): NumberNode {
        return new NumberNode(this.left.eval(new Scope(context)).eval(context).val * this.right.eval(new Scope(context)).eval(context).val);
    }

    toString() : string {
        return this._ws + this.left.toString() + ' * ' + this.right.toString();
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