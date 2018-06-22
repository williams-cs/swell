import { Expression } from "./Expression";
import { Scope } from "./Scope";

export class BodyNode implements Expression<any>{
    private _returnVal: string;

    constructor(returnVal: string){
        this._returnVal = returnVal;
    }

    eval(context: Scope){
        return context.lookup(this._returnVal, context);
    }
}