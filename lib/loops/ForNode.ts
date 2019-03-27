import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from '../prims/BooleanNode';
import { Some } from "space-lift";

export class ForNode extends Expression<any> {

    /**
     * Constructor for a For loop
     * @param init Initializes the variable used in the condition
     * @param cond The condition (must evaluate to BooleanNode)
     * @param post The postevaluation condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(
        private _init: Expression<any>,
        private _cond: Expression<BooleanNode>,
        private _post: Expression<any>,
        private _body: Expression<any>,
        ws: string = "",
    ) {
        super(ws, true);
    }

    /**
     * Evaluates the For loop
     * @param context The current program context
     */
    eval(context: Scope) {
        //create the block scope for the loop body
        let childCtx = context.copy(false);

        //Initialize loop variable
        this._init.eval(childCtx);

        //checks the loop condition
        let res = this._cond.eval(childCtx);
        if (!(res instanceof BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }

        let ret;
        while (res.val) {
            //evaluate the loop body
            ret = this._body.eval(childCtx);
            //update the loop variable
            this._post.eval(childCtx);
            //check the loop condition
            res = this._cond.eval(childCtx);
        }
        return ret;
    }

    toString(): string {
        return this.ws + 'for(' + this._init + ", " + this._cond + ", " + this._post + ") {\n " + this._body + "}";
    }
}
