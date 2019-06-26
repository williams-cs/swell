import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { NumberNode } from "../prims/NumberNode";

export class RepeatNode extends Expression<any> {

    /**
     * Constructor for a Repeat loop
     * @param cond The While loop condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(private _cond: Expression<any>, private _body: Expression<any>, ws: string = "") {
        super(ws);
    }

    /**
     * Evaluates the body of the loop while the condition is true
     * @param context
     */
    eval(context: Scope) {
        let childCtx = context.copy();
        let res = this._cond.eval(childCtx);
        if (!(res instanceof NumberNode)) {
            throw new Error("The condition must be a boolean expression.");
        }

        let ret;
        while (res.val) {
            ret = this._body.eval(childCtx);
            res = this._cond.eval(childCtx);
        }
        return ret;
    }

    toString(): string {
        return this.ws + "repeat(" + this._cond.toString() + ") {\n " + this._body.toString() + "}";
    }
}
