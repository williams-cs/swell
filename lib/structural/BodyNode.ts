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
        private preOpenCurlyWS: string = "",
        private preCloseCurlyWS: string = ""
    ) {
        super();
    }

    eval(scope: Scope) {
        return this.expr.eval(scope);
    }

    toString(): string {
        return `${this.preOpenCurlyWS}{${this.expr}${this.preCloseCurlyWS}}`;
    }

}
