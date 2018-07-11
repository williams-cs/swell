import { Scope, Expression } from "..";

export class ElseIfOp implements Expression<any>{
    private _cond: Expression<any>;
    private _body: Expression<any>;

    constructor(cond: Expression<any>, body: Expression<any>){
        this._cond = cond;
        this._body = body;
    }

    eval(context: Scope){
        if(this._cond.eval(context)){
            //this._body.eval(new Scope(context)); // new context?
            //this._body.eval(context);
            return this._body.eval(context);
            //return this._body.eval(new Scope(context));
        }
        return null;
        //return this._body.eval(context);
    }

    draw(){
        
    }

    get cond(): Expression<any>{
        return this._cond;
    }

    get body(): Expression<any>{
        return this._body;
    }
}