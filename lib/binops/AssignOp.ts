import { BinaryOp } from './BinaryOp';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';

export class AssignOp<T> extends BinaryOp<T> {

    /**
     * Constructor for an assignment operation
     * @param left The left side of the assignment (the var)
     * @param right The right side of the assignment (the value)
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<T>, right: Expression<T>, ws: string = "") {
        if (!(left instanceof VariableNode)) {
            throw("Left side is not a variable");
        }
        super(left, right, ws);
    }

    eval(context: Scope): T {
        if (!(this.left instanceof VariableNode)) {
            throw("Left side is not a variable");
        }
        let r: T = this.right.eval(context);
        context.assign(this.left.name, r);
        return r;
    }

    toString(): string {
        return this.ws + this.left + " = " + this.right;
    }
}
