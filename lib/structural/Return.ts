import { Expression } from "../Expression";
import { ReturnError } from "./ReturnError";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";

export class Return implements Expression<any>{
    private _expr: Expression<any>;
    private _newLine : boolean = false;
    private _ws : string;
    constructor(expr: Expression<any>, ws? : string){
        this._expr = expr;
        this._ws = ws;
        if (ws == undefined){
            this._ws = "";
        }
    }

    eval(context: Scope){
        // If return val is a var, returns that var's value
        let result = this._expr.eval(context); 
        console.log("return result: " + result);
        throw new ReturnError(result,context.retIDLookup());
        //return this._expr.eval(context); // will need typechecking at some point
    }

    toString() :string {
        return this._ws + "return " + this._expr.toString();
    }

    newLine() : boolean {
        return this._newLine;
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {}
}