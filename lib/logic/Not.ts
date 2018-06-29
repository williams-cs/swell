import { Expression, Scope } from "..";

export class Not implements Expression<any>{
    private _expr: Expression<any>;

    constructor(expr: Expression<any>){
        this._expr = expr;
    }

    eval(context: Scope): boolean{
        return !(this._expr.eval(context));
    }

    draw(){

    }

    get expr(): Expression<any>{
        return this._expr;
    }
}