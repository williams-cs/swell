import { Expression, Scope } from '..';
import { Conditional } from '../conditionals/Conditional';

export class WhileNode implements Expression<any>{
    private _cond: Expression<any>;
    private _body: Expression<any>;

    constructor(cond: Expression<any>, body: Expression<any>){
        this._cond = cond;
        this._body = body; // can also be separate, just difference in parsing
    }

    eval(context: Scope){
        let childCtx = new Scope(context);

        let res = this._cond.eval(childCtx);
        if(typeof res != 'boolean'){
            throw new Error("The condition must be a boolean expression.");
        } 

        let ret;
        while(res){
            ret = this._body.eval(childCtx);
            res = this._cond.eval(childCtx);
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