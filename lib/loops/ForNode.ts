import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import {BooleanNode} from '../prims/BooleanNode';
import {DeclareOp} from '../binops/DeclareOp';
import { Dimensions } from "../structural/Dimensions";

export class ForNode implements Expression<any>{
    private _init: Expression<any>;
    private _cond: Expression<any>;
    private _post: Expression<any>;
    private _body: Expression<any>;
    private _newLine : boolean = true;

    constructor(init: Expression<any>, cond: Expression<BooleanNode>, post: Expression<any>, body: Expression<any>){
        this._init = init;
        this._cond = cond;
        this._post = post;
        this._body = body; 
    }

    eval(context: Scope){
        let childCtx = new Scope(context);

        this._init.eval(childCtx); // initialize var

        let res = this._cond.eval(childCtx);
        if(!(res instanceof BooleanNode)){
            throw new Error("The condition must be a boolean expression.");
        } 

        let ret;
        //let adjust;
        while(res.val){
            ret = this._body.eval(childCtx);
            this._post.eval(childCtx);
            res = this._cond.eval(childCtx);
            //this._post.eval(childCtx);
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

    draw(context: Scope, dims: Dimensions, ast: Expression<any>){

    }

    toString() :string {
        return "";
    }

    newLine() : boolean {
        return this._newLine;
    }
}