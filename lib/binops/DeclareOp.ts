import { BinaryOp } from './BinaryOp';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';

export class DeclareOp<T> extends BinaryOp<T> {

    private ws2: string;     //whitespace preceding "="
    /**
     * Constructor for the declare operation, which declares a variable for the first time
     * @param left The left side of the declare op (the variable)
     * @param right The right side of the op (the value)
     * @param ws1 whitespace preceding "var" keyword
     * @param ws2 whitespace preceding "="
     */
    constructor(left: Expression<T>, right: Expression<T>, ws1: string = "", ws2: string = "") {
        if (!(left instanceof VariableNode)) {
            throw("Left side is not a variable");
        }
        super(left, right, ws1);
        this.ws2 = ws2;
    }

    eval(context: Scope): T {
        if (!(this.left instanceof VariableNode)) {
            throw("Left side is not a variable");
        }
        context.declare(this.left.name);
        let r: T = this.right.eval(context);
        context.assign(this.left.name, r);
        return r;
    }

    toString(): string {
        return `${this.ws}var${this.left}${this.ws2}=${this.right}`;
    }
}
