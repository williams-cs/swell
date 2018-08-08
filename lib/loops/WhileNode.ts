import { Expression } from "../Expression";
import {Scope} from '../structural/Scope'; 
import {BooleanNode} from '../prims/BooleanNode';
import { Dimensions } from "../structural/Dimensions";

export class WhileNode implements Expression<any>{
    private _cond: Expression<any>;
    private _body: Expression<any>;
    private _newLine : boolean = true;
    private _ws : string;

    constructor(cond: Expression<any>, body: Expression<any>, ws : string){
        this._cond = cond;
        this._body = body; 
        this._ws = ws;
    }

    eval(context: Scope){
        let childCtx = new Scope(context);

        let res = this._cond.eval(childCtx);
        if(!(res instanceof BooleanNode)){
            throw new Error("The condition must be a boolean expression.");
        } 

        let ret;
        while(res.val){
            //console.log("Result.val: " + res.val);
            //console.log("I'm infinitely looping");
            ret = this._body.eval(childCtx);
            res = this._cond.eval(childCtx);
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

    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on While loop");
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>){
        return "Cannot call draw on While loop";
    }

    toString() :string {
        return this._ws + "while(" + this._cond.toString() + ") {\n " + this._body.toString() + "}";
    }
    newLine() : boolean {
        return this._newLine;
    }
}