import { Expression } from "../Expression";
import { ReturnError } from "./ReturnError";
import { Scope } from "./Scope";

export class Return extends Expression<any> {

    /**
     * Constructor for a Return object, representing something to be returned in a function
     * @param expr The expression to be returned
     * @param lws Preceding whitespace
     * @param rws Post whitespace
     */
    constructor(private _expr: Expression<any>, lws: string = "", rws: string = "") {
        super(rws);
    }

    /**
     * Evaluates the expression to be returned and returns via a ReturnErro
     * @param context The current program context
     */
    eval(context: Scope) {
        // If return val is a var, returns that var's value
        let result = this._expr.eval(context);
        throw new ReturnError(result, context.retIDLookup());
    }

    toString(): string {
        return this.lws + "return " + this._expr + this.rws;
    }
}
