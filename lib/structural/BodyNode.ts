import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export class BodyNode extends Expression<any> {

    /**
     * The constructor for body nodes that follow if, function def, or loops
     * @param expr expression between curly braces
     * @param preOpenCurlyWS Whitespace preceding opening curly brace
     * @param preCloseCurlyWS Whitespace preceding closing curly brace
     */
    constructor(
        private expr: Expression<any>,
        preOpenCurlyWS: string = "",
        private preCloseCurlyWS: string = ""
    ) {
        super(preOpenCurlyWS);
    }

    eval(scope: Scope): any {
        return this.expr.eval(scope);
    }

    toString(): string {
        return `${this.ws}{${this.expr}${this.preCloseCurlyWS}}`;
    }

}
