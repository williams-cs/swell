import { Expression } from "../Expression";
import {Scope} from '../structural/Scope';
import { NumberNode } from "../prims/NumberNode";
import { Some } from "space-lift";

export class RepeatNode implements Expression<any>{
    private _n: Expression<any>;
    private _body: Expression<any>;
    private _ws: string;
    private _newLine : boolean = true;

    /**
     * The constructor for repeat(n){}
     * @param n The number of times to repeat the loop's scope
     * @param body The enclosed body of the loop
     * @param ws Preceding whitespace
     */
    constructor(n: Expression<any>, body: Expression<any>){
        this._n = n;
        this._body = body;
        console.log(this._body.toString());
    }

    /**
     * Evaluates the repeat loop
     * @param context The current program context
     */
    eval(context: Scope){
        //create the block scope for the loop body
        let childCtx = new Scope(context, context.effects, context.eventLog);
        childCtx.canvas = Some(context.canvas.get());

        let n = this._n.eval(childCtx);
        if(!(n instanceof NumberNode)){
            throw new Error("The parameter for repeat() must be a number expression.");
        }

        let ret;
        for(var i = 0; i < n.val; i++) {
          ret = this._body.eval(childCtx);
        }
        return ret;
    }

    /**
     * Returns a string representation of the repeat statement
     */
    toString(): string {
        return 'repeat(' + this._n.toString() + ") {\n " + this._body.toString() + "}";
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }

    /**
     * Returns the body of the repeat loop
     */
    get body(): Expression<any>{
        return this._body;
    }

    /**
     * RepeatNodes cannot be drawn directly
     */
    draw(): void {
        throw new Error("Not implemented");
    }

    /**
     * Equals cannot be called directly on a repeat
     * @param right
     */
    equalsVal(right: Expression<any>): boolean{
        throw new Error("Cannot call equals directly on repeats");
    }
}
