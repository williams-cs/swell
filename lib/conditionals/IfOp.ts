import { Scope, Expression } from "..";

export class IfOp implements Expression<any>{
    private _cond: Expression<any>;
    private _body: Expression<any>;

    constructor(cond: Expression<any>, body: Expression<any>){
        this._cond = cond;
        this._body = body;
    }

    eval(context: Scope){
        let condresult = this._cond.eval(context);
        console.log("Condition result: " + condresult);
        if(condresult){
            //this._body.eval(new Scope(context)); // new context?
            //this._body.eval(context);

            let result = this._body.eval(context);
            console.log("If result (IfOp): " + result);
            return result;
            //return this._body.eval(new Scope(context));
        }
        //return null; // could this be a problem?
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