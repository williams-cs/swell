import { Expression } from "../Expression";
import { ReturnError } from "./ReturnError";
import { Scope } from "../..";

export class Return implements Expression<any>{
    private _expr: Expression<any>;
    constructor(expr: Expression<any>){
        this._expr = expr;
    }

    eval(context: Scope){
        // If return val is a var, returns that var's value
        let result = this._expr.eval(context); // don't have child method!
        throw new ReturnError(result,context.retIDLookup());
        //return this._expr.eval(context); // will need typechecking at some point
    }

    draw(context: Scope, x: number, y: number): void {}
}