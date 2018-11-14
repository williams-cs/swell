import { Expression } from "../Expression";
import {Scope} from '../structural/Scope';
import {BooleanNode} from '../prims/BooleanNode';
import { Dimensions } from "../structural/Dimensions";
import { Some } from "space-lift";

export class WhileNode implements Expression<any>{
    private _cond: Expression<any>;
    private _body: Expression<any>;
    private _newLine : boolean = true;
    private _ws: string;

    /**
     * Constructor for a While loop
     * @param cond The While loop condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(cond: Expression<any>, body: Expression<any>, ws?: string){
        this._cond = cond;
        this._body = body;
        this._ws = ws;
        if(ws == undefined) {
            this._ws = "";
        }
    }

    /**
     * Evaluates the body of the loop while the condition is true
     * @param context
     */
    eval(context: Scope){
        let childCtx = new Scope(context, context.effects, context.eventLog);
        childCtx.canvas = Some(context.canvas.get());
        let res = this._cond.eval(childCtx);
        if(!(res instanceof BooleanNode)){
            throw new Error("The condition must be a boolean expression.");
        }

        let ret;
        while(res.val){
            ret = this._body.eval(childCtx);
            res = this._cond.eval(childCtx);
        }
        return ret;
    }

    /**
     * Equals cannot be called directly on WhileNodes
     * @param right
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on While loop");
    }

    /**
     * WhileNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>){
        return "Cannot call draw on While loop";
    }

    /**
     * Returns a string representation of the While loop
     */
    toString(): string {
        return this._ws + "while(" + this._cond.toString() + ") {\n " + this._body.toString() + "}";
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}
