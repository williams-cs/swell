import { Expression } from "../Expression";
import { Scope } from "./Scope";

export class Return extends Expression<any> {

    /**
     * Constructor for a Return object, representing something to be returned in a function
     * @param expr The expression to be returned
     * @param preWS Whitespace preceding the keyword 'return'
     * @param postWS Whitespace succeeding the keyword 'return'
     */
    constructor(private expr: Expression<any>, preWS: string = "", private postWS: string = "") {
        super(preWS);
    }

    /**
     * Evaluates the expression to be returned and returns via a ReturnErro
     * @param context The current program context
     */
    eval(scope: Scope): any {
        return this.expr.eval(scope);
    }

    toString(): string {
        return `${this.ws}return${this.postWS}${this.expr}`;
    }
}
