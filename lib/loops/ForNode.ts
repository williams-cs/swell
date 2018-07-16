import { Expression, Scope, BooleanNode, DeclareOp } from '../..';

export class ForNode implements Expression<any>{
    private _init: Expression<any>;
    private _cond: Expression<any>;
    private _adj: Expression<any>;
    private _body: Expression<any>;

    constructor(init: DeclareOp<any>, cond: Expression<any>, adj: Expression<any>, body: Expression<any>){
        this._init = init;
        this._cond = cond;
        this._adj = adj;
        this._body = body; 
    }

    eval(context: Scope){
        let childCtx = new Scope(context);

        let res = this._cond.eval(childCtx);
        if(!(res instanceof BooleanNode)){
            throw new Error("The condition must be a boolean expression.");
        } 
        this._init.eval(childCtx); // initialize var

        let ret;
        //let adjust;
        while(res.val){
            //console.log("Result.val: " + res.val);
            //console.log("I'm infinitely looping");
            ret = this._body.eval(childCtx);
            res = this._cond.eval(childCtx);
            this._adj.eval(childCtx);
            //ret = this._body.eval(childCtx);
        } 
        return ret;
        //let test = this._cond.eval(context);
        //console.log("test: " + test);
        //while(this._cond.eval(context)){
        //while(this._cond.eval(context)){
            /*
        while(this._cond.eval(context)){
            this._body.eval(context);
        }
        */
            //this._body.eval(context);
        //}
    }

    draw(context: Scope, x: number, y: number){

    }
}