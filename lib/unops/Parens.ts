import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { UnaryOp } from "./UnaryOp";

export class Parens<T> extends UnaryOp<T> {

    constructor(
        expr: Expression<T>,
        preOpenParenWS: string = "",
        private preCloseParenWS: string = ""
    ) {
        super(expr, preOpenParenWS);
    }

    eval(context: Scope): T {
        return this.expr.eval(context);
    }

    toString(): string {
        return `${this.ws}(${this.expr}${this.preCloseParenWS})`;
    }
}
