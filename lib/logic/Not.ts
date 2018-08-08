import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import { BooleanNode } from "../prims/BooleanNode";

export class Not implements Expression<BooleanNode>{
    private _expr: Expression<any>;
    private _newLine : boolean = false;

    constructor(expr: Expression<any>){
        this._expr = expr;
    }

    toString() :string {
        return "not " + this._expr.toString();
    }

    newLine() : boolean {
        return this._newLine;
    }

    eval(context: Scope): BooleanNode {
        let e = this._expr.eval(context);
        if (e instanceof BooleanNode) {
            return new BooleanNode(!e.val , "");
        } else {
            throw new Error("The argument to the ! operator must be boolean.");
        }
        
    }

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on logical ops");
    }

    draw(){
        throw new Error("Cannot call draw on logical ops");
    }

    get expr(): Expression<any>{
        return this._expr;
    }
}