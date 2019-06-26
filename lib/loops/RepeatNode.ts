import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { NumberNode } from "../prims/NumberNode";
import { BooleanNode } from "../prims/BooleanNode";

export class RepeatNode extends Expression<any> {

    /**
     * Constructor for a Repeat loop
     * @param init Initializes the variable used in the condition
     * @param cond The iteration condition (evaluates to NumberNode)
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(private _init: Expression<any>,private _cond: Expression<NumberNode>, private _body: Expression<any>, ws: string = "") {
        super(ws);
    }

    /**
     * Evaluates the body of the loop while the iteration number is positive
     * @param context
     */
    eval(context: Scope) {
        let childCtx = context.copy();
        this._init.eval(childCtx)

        let res = this._cond.eval(childCtx);
        if (!(res instanceof NumberNode)) {
            throw new Error("The condition must be a number.");
        }

        let ret;
        while (res.val > 0) {
            //evaluate loop body
            ret = this._body.eval(childCtx);

            //evaluate loop condition
            res.val = res.val - 1;
        }
        return ret;
    }

    toString(): string {
        return this.ws + "repeat(" + this._cond.toString() + ") {\n " + this._body.toString() + "}";
    }
}
