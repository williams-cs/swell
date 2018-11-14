import { Expression } from "../Expression";
import {Scope} from '../structural/Scope';
import {BooleanNode} from '../prims/BooleanNode';
import { Dimensions } from "../structural/Dimensions";
import { Some } from "space-lift";

export class ForNode implements Expression<any>{
    private _init: Expression<any>;
    private _cond: Expression<any>;
    private _post: Expression<any>;
    private _body: Expression<any>;
    private _ws: string;
    private _newLine: boolean = true;

    /**
     * Constructor for a For loop
     * @param init Initializes the variable used in the condition
     * @param cond The condition (must evaluate to BooleanNode)
     * @param post The postevaluation condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(init: Expression<any>, cond: Expression<BooleanNode>, post: Expression<any>, body: Expression<any>, ws?: string){
        this._init = init;
        this._cond = cond;
        this._post = post;
        this._body = body;
        this._ws = ws;
        if(ws == undefined) {
            this._ws = "";
        }
    }

    /**
     * Evaluates the For loop
     * @param context The current program context
     */
    eval(context: Scope){
        let childCtx = new Scope(context, context.effects, context.eventLog);
        childCtx.canvas = Some(context.canvas.get());
        this._init.eval(childCtx); // initialize var

        let res = this._cond.eval(childCtx);
        if(!(res instanceof BooleanNode)){
            throw new Error("The condition must be a boolean expression.");
        }

        let ret;
        while(res.val){
            ret = this._body.eval(childCtx);
            this._post.eval(childCtx);
            res = this._cond.eval(childCtx);
        }
        return ret;
    }

    /**
     * Equals cannot be called directly on ForNode
     * @param right
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals on For loop");
    }

    /**
     * ForNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>){
        return "Cannot call draw on For loop";
    }

    /**
     * Returns a string representation of the for loop
     */
    toString(): string {
        return this._ws + 'for(' + this._init.toString() + ", " + this._cond.toString() + ", " + this._post.toString() + ") {\n "
            + this._body.toString() + "}";
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}
