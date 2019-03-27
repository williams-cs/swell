import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';

export class BodyNode extends Expression<any> {

    private expr: Expression<any>;
    private ws2: string;
    /**
     * The constructor for body nodes that follow if, function def, or repeat node
     * @param expr expression between curly braces
     * @param ws1 Preceding whitespace
     * @param ws2 ws before close brace
     */
    constructor(
        expr: Expression<any>,
        ws1: string = "",
        ws2: string = ""
    ) {
        super(ws1);
        this.expr = expr;
        this.ws2 = ws2;
    }

    eval(scope: Scope) {
        return this.expr.eval(scope);
    }

    toString(): string {
        return `${this.ws}{${this.expr.toString()}${this.ws2}}`;
    }

}
