import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from '../prims/BooleanNode';
import { Some } from "space-lift";

export class WhileNode extends Expression<any> {

    /**
     * Constructor for a While loop
     * @param cond The While loop condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(private _cond: Expression<any>, private _body: Expression<any>, ws: string = "") {
        super(ws, true);
    }

    /**
     * Evaluates the body of the loop while the condition is true
     * @param context
     */
    eval(context: Scope) {
        let childCtx = new Scope(context, context.effects, context.eventLog);
        childCtx.canvas = Some(context.canvas.get());
        let res = this._cond.eval(childCtx);
        if (!(res instanceof BooleanNode)) {
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
        return this.ws + "while(" + this._cond.toString() + ") {\n " + this._body.toString() + "}";
    }
}
