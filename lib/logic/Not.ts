import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import { BooleanNode } from "../prims/BooleanNode";

export class Not implements Expression<BooleanNode>{
    private _expr: Expression<any>;

    constructor(expr: Expression<any>){
        this._expr = expr;
    }

    eval(context: Scope): BooleanNode {
        let e = this._expr.eval(context);
        if (e instanceof BooleanNode) {
            return new BooleanNode(!e.val);
        } else {
            throw new Error("The argument to the ! operator must be boolean.");
        }
        
    }

    draw(){

    }

    get expr(): Expression<any>{
        return this._expr;
    }
}