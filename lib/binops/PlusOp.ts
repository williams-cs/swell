import {BinaryOperation} from './BinaryOperation';
import {Expression} from '../Expression';
import {Scope} from '../structural/Scope';
import {NumberNode} from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';

// left and right are both expressions
export class PlusOp extends BinaryOperation<NumberNode>{
    private _ws : string;
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>, ws? : string){
        super(left,right);
        this._ws = ws;
        if(ws == undefined){
            this._ws = "";
        }
    }
    
    eval(context: Scope): NumberNode {
        let l = this.left;
        let r = this.right;
        let le = l.eval(new Scope(context));
        let re = r.eval(new Scope(context));
        return new NumberNode(le.val + re.val);
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals directly on binary operations");
    }


    toString() : string {
        return this._ws + this.left.toString() + ' + ' + this.right.toString();
    }
    newLine() : boolean {
        return false;
    }
}