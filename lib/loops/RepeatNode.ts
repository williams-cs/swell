import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { NumberNode } from "../prims/NumberNode";
import { BooleanNode } from "../prims/BooleanNode";

export class RepeatNode extends Expression<any> {

    /**
     * Constructor for a Repeat loop
     * @param cond The iteration condition (evaluates to NumberNode)
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(private cond: Expression<NumberNode>, private body: Expression<any>, ws: string = "") {
        super(ws);
    }

    /**
     * Evaluates the body of the loop while the iteration number is positive
     * @param context
     */
    eval(context: Scope) {
        let res = this.cond.eval(context);
        if (!(res instanceof NumberNode)) {
            throw new Error("Repeat count must be a number.");
        }

        let ret = null;
        while (res.val > 0) {
            //evaluate loop body
            let childCtx = new Scope(context);
            ret = this.body.eval(childCtx);
            
            //decrement
            res.val--;
            
        }
        return ret;
    }

    toString(): string {
        return this.ws + "repeat(" + this.cond.toString() + ") {\n " + this.body.toString() + "}";
    }
}
