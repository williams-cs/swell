import { Scope, Expression } from "..";

export class ElseOp implements Expression<any>{
    private _body: Expression<any>;

    constructor(body: Expression<any>){
        this._body = body;
    }

    eval(context: Scope){
                //this._body.eval(new Scope(context)); // new context?
            //this._body.eval(context);
            return this._body.eval(context);
            //return this._body.eval(new Scope(context));
            //return this._body.eval(context);
    }

    draw(){
        
    }

    get body(): Expression<any>{
        return this._body;
    }
}