import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { NumberNode } from "../prims/NumberNode";
import { Some } from "space-lift";

export class RepeatNode extends Expression<any>{

    /**
     * The constructor for repeat(n){}
     * @param n The number of times to repeat the loop's scope
     * @param body The enclosed body of the loop
     * @param lws Preceding whitespace
     * @param rws Post whitespace
     */
    constructor(private _n: Expression<any>, private _body: Expression<any>, lws: string = "", rws: string = "") {
        super(lws, rws, true);
    }

    /**
     * Evaluates the repeat loop
     * @param context The current program context
     */
    eval(context: Scope) {
        //create the block scope for the loop body
        let childCtx = new Scope(context, context.effects, context.eventLog);
        childCtx.canvas = Some(context.canvas.get());

        let n = this.n.eval(childCtx);
        if (!(n instanceof NumberNode)) {
            throw new Error("The parameter for repeat() must be a number expression.");
        }

        let ret;
        for (var i = 0; i < n.val; i++) {
            ret = this.body.eval(childCtx);
        }
        return ret;
    }

    /**
     * Returns a string representation of the repeat statement
     */
    toString(): string {
        return this.lws + 'repeat(' + this.n + ") {\n " + this.body + "}" + this.rws;
    }

    /**
     * Returns the body of the repeat loop
     */
    get body(): Expression<any> {
        return this._body;
    }

    get n(): Expression<any> {
        return this._n;
    }
}
